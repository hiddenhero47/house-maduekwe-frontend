import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';
import {
	removeFromHoldings,
	clearHoldings,
} from '../../../store/slice/holding';
import {
	HoldingWrapper,
	Footer,
	ShopItem,
	AddToCartBtn,
} from './holding.style';
import { attributeType } from '../../../utilities/app-const';
import CartServices from '../../../features/services/custom-hooks/cart';
import BubbleSlide from '../../../components/loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Holding({ close }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { mutate: addToCart, isPending } = CartServices.add();
	const { holdings } = useSelector((state) => state.holdings);

	const { user } = useSelector((state) => state.auth);
	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;

	const removeItem = (tempId) => {
		dispatch(removeFromHoldings({ tempId }));
	};

	const selectPlaceholder = (data) => {
		if (!data) return '';

		const colorAttr = data.selectedAttributes?.find(
			(attr) => attr?.Attribute?.type === attributeType.COLOR
		);

		const attrImage = colorAttr?.images?.[0]?.url;

		const placeHolder = data.shopItem?.placeHolder?.url;

		const firstImage = data.shopItem?.imageCatalog?.[0]?.url;

		return attrImage || placeHolder || firstImage || '';
	};

	const cartServer = () => {
		if (!activeUser) {
			toast.info('Please log in to add items to your cart');

			setTimeout(() => {
				navigate('/authentication');
			}, 1500);

			return;
		}

		const payload = holdings.map((item) => ({
			shopItem: item?.shopItem._id,
			quantity: item?.quantity,
			selectedAttributes: item?.selectedAttributes,
		}));

		const isValidData =
			payload &&
			Array.isArray(payload) &&
			payload.length > 0 &&
			payload.every(
				(item) =>
					item.shopItem &&
					typeof item.quantity === 'number' &&
					item.quantity > 0
			);

		if (isValidData) {
			addToCart(
				{ itemList: [...payload] },
				{
					onSuccess: () => {
						dispatch(clearHoldings());
						close();
					},
				}
			);
		}
	};

	return (
		<HoldingWrapper className="flex flex-col gap-3">
			{/* Header */}
			<div className="flex justify-between items-center pb-2 px-1">
				<h2 className="text-[17px] font-semibold">
					Holdings ({holdings.length})
				</h2>

				<button
					onClick={() => dispatch(clearHoldings())}
					className="text-[13px] text-red-500 hover:underline"
				>
					Clear All
				</button>
			</div>

			{/* Items List */}
			<div className="Y_scroll_style flex flex-col gap-3 min-h-[200px] max-h-[40vh] overflow-y-auto pr-1">
				{holdings.map((item, i) => (
					<ShopItem key={i}>
						<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
							<div className="imageHolder rounded-[inherit]">
								<img src={selectPlaceholder(item)} alt="Error" />
							</div>
						</div>

						<div className="info">
							<span className="name">{item?.shopItem?.name}</span>
							<span className="price">
								{item?.shopItem?.price} {item?.shopItem?.currency}
							</span>
						</div>

						<button
							className="remove_btn"
							onClick={() => removeItem(item.tempId)}
						>
							<i>
								<FaTrash />
							</i>
						</button>
					</ShopItem>
				))}
			</div>

			{/* Footer Buttons */}
			<Footer>
				<AddToCartBtn
					$isLoading={isPending}
					type="button"
					onClick={() => cartServer()}
				>
					<div className="content">Move to Cart</div>

					<div className="loader">
						<BubbleSlide color="var(--addToCart-text)" height="20px" />
					</div>
				</AddToCartBtn>

				<button type="button" onClick={() => close()} className="btn btn_anon">
					Continue Shopping{' '}
					<i>
						<FaArrowRightLong />
					</i>
				</button>
			</Footer>
		</HoldingWrapper>
	);
}

export default Holding;
