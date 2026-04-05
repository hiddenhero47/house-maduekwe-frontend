import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	ColorCircle,
	SizeButton,
	AddToCartBtn,
	DetailsWrapper,
	HoldBtn,
	Increment,
} from './index.style';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { attributeType } from '../../../utilities/app-const';
import { FaShoppingBasket } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addToHoldings } from '../../../store/slice/holding';
import { IoIosAdd } from 'react-icons/io';
import { RiSubtractLine } from 'react-icons/ri';
import { ensureUser } from '../../../store/slice/auth';
import CartServices from '../../../features/services/custom-hooks/cart';
import { toast } from 'react-toastify';
import BubbleSlide from '../../../components/loaders/bubbles/BubbleSlide';

function Details({
	product,
	attribute,
	configAttribute,
	setIndex,
	quantity,
	setQuantity,
}) {
	const dispatch = useDispatch();
	const { mutate: addToCart, isPending } = CartServices.add();

	const { colors, sizes } = useMemo(() => {
		if (!product?.attributes) return { colors: [], sizes: [] };

		return {
			colors: product.attributes.filter(
				(a) => a?.Attribute?.type === attributeType.COLOR
			),
			sizes: product.attributes.filter(
				(a) => a?.Attribute?.type === attributeType.SIZE
			),
		};
	}, [product]);

	// COLOR SELECTOR
	const setColor = (attr) => {
		configAttribute((prev) => ({
			...prev,
			currentColor: attr,
			currentDisplay: attr?.images ?? null,
		}));
		setIndex(0);
	};

	// SIZE SELECTOR
	const setSize = (attr) =>
		configAttribute((prev) => ({
			...prev,
			currentSize: attr,
		}));

	const rating = product?.rating || 4;

	const holding = () => {
		const selectedItem = {
			shopItem: product,
			quantity: 1,
			selectedAttributes: [
				...(attribute.currentColor ? [attribute.currentColor] : []),
				...(attribute.currentSize ? [attribute.currentSize] : []),
			],
		};

		console.log('📦 Add to holding', selectedItem);
		dispatch(addToHoldings(selectedItem));
	};

	const increaseQuantity = (value = 1) => {
		setQuantity((prev) => prev + value);
	};

	const decreaseQuantity = (value = 1) => {
		setQuantity((prev) => Math.max(prev - value, 1));
	};

	const cartServer = () => {
		const selectedItem = {
			shopItem: product?._id,
			quantity: quantity,
			selectedAttributes: [
				...(attribute.currentColor ? [attribute.currentColor] : []),
				...(attribute.currentSize ? [attribute.currentSize] : []),
			],
		};

		const isValidData =
			selectedItem &&
			typeof selectedItem === 'object' &&
			Object.keys(selectedItem).length > 0;

		if (isValidData) {
			addToCart({ itemList: [selectedItem] });
		}
	};

	return (
		<DetailsWrapper>
			<div className="flex justify-between w-full items-center mb-6 text-[var(--mainBody-text)]">
				<h1 className="text-[19.3px] font-bold font-[Inter]">
					{product?.name || 'Product Name'}
				</h1>

				<p className="text-[22px] font-semibold font-[Inter]">
					${product?.price || '0.00'}
				</p>
			</div>

			{/* <div className="flex items-center mb-8">
				<span className="text-sm mr-1 text-[var(--mainBody-sbText)]">3.9</span>

				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((i) =>
						i <= rating ? (
							<FaStar key={i} className="text-yellow-500 w-5 h-5" />
						) : (
							<FaRegStar key={i} className="text-gray-300 w-5 h-5" />
						)
					)}
				</div>

				<a className="text-sm ml-3 text-[var(--intro-logo)] cursor-pointer">
					50 reviews
				</a>
			</div> */}

			<div>
				<h3 className="text-sm font-medium mb-2 text-[var(--mainBody-sbText)]">
					Color
				</h3>

				<div className="flex gap-3">
					{colors.map((attr, i) => {
						const colorValue = attr?.Attribute?.display;
						const isActive =
							attribute.currentColor?.Attribute?.display === colorValue;

						return (
							<ColorCircle
								key={i}
								onClick={() => setColor(attr)}
								$color={colorValue}
								$active={isActive}
							/>
						);
					})}
				</div>
			</div>

			<div className="mt-8">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium text-[var(--mainBody-sbText)]">
						Size
					</h3>
					<span className="text-sm text-[var(--intro-logo)] cursor-pointer">
						Size guide
					</span>
				</div>

				<div className="flex flex-wrap w-full gap-[10px]">
					{sizes.map((attr, i) => {
						const sizeValue = attr?.Attribute?.display;
						const isActive =
							attribute.currentSize?.Attribute?.display === sizeValue;

						return (
							<SizeButton
								key={i}
								$active={isActive}
								onClick={() => setSize(attr)}
							>
								{sizeValue}
							</SizeButton>
						);
					})}
				</div>
			</div>

			<div className="mt-5 flex justify-between items-center">
				<HoldBtn onClick={() => holding()}>
					<i>
						<FaShoppingBasket />
					</i>
					Hold Item
					<i>
						<IoIosArrowForward />
					</i>
				</HoldBtn>

				<Increment>
					<button
						className="qty-btn"
						type="button"
						onClick={() => decreaseQuantity()}
					>
						<RiSubtractLine />
					</button>

					<span className="qty-value">{quantity}</span>

					<button
						className="qty-btn"
						type="button"
						onClick={() => increaseQuantity()}
					>
						<IoIosAdd />
					</button>
				</Increment>
			</div>
			<AddToCartBtn
				$isLoading={isPending}
				onClick={() =>
					dispatch(
						ensureUser(
							() => cartServer(),
							() => toast.warning('Can not add to cart, User not logged in 🛒')
						)
					)
				}
			>
				<div className="content">
					Add To Cart
					<i className="ml-1">
						<FaCartShopping />
					</i>
				</div>
				<div className="loader">
					<BubbleSlide color="var(--addToCart-text)" height="20px" />
				</div>
			</AddToCartBtn>

			<div className="mt-8 pb-[35px] border-b-[var(--mainBody-line)] border-b-[1.2px]">
				<h3 className="text-sm font-semibold mb-3 text-[var(--mainBody-text)]">
					Description
				</h3>
				<p className="text-sm text-[var(--mainBody-sbText)] leading-6">
					{product?.description || 'This product has no description available.'}
				</p>
			</div>

			{product?.highlights && (
				<div className="mt-8">
					<h3 className="text-sm font-semibold text-[var(--mainBody-text)]">
						Highlights
					</h3>
					<ul className="list-disc pl-5 mt-3 text-sm space-y-2">
						{product?.highlights?.map((h, i) => (
							<li key={i} className="text-[var(--mainBody-sbText)]">
								{h}
							</li>
						))}
					</ul>
				</div>
			)}
		</DetailsWrapper>
	);
}

Details.propTypes = {
	product: PropTypes.object,
	attribute: PropTypes.object,
	configAttribute: PropTypes.func,
};

export default Details;
