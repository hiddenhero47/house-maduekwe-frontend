import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ColorCircle, SizeButton, AddToCartBtn } from './index.style';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { attributeType } from '../../../utilities/app-const';

function Details({ product, attribute, configAttribute }) {
	// Extract colors + sizes based on your real DB structure
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
	const setColor = (attr) =>
		configAttribute((prev) => ({
			...prev,
			currentColor: attr,
			currentDisplay: attr?.images ?? null,
		}));

	// SIZE SELECTOR
	const setSize = (attr) =>
		configAttribute((prev) => ({
			...prev,
			currentSize: attr,
		}));

	const rating = product?.rating || 4;

	return (
		<div className="flex flex-col px-[15%]">
			<div className="flex justify-between w-full items-center mb-6 text-[var(--mainBody-text)]">
				<h1 className="text-[19.3px] font-bold font-[Inter]">
					{product?.name || 'Product Name'}
				</h1>

				<p className="text-[22px] font-semibold font-[Inter]">
					${product?.price || '0.00'}
				</p>
			</div>

			<div className="flex items-center mb-8">
                <span className='text-sm mr-1 text-[var(--mainBody-sbText)]'>3.9</span>

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
			</div>

			<div>
				<h3 className="text-sm font-medium mb-2 text-[var(--mainBody-sbText)]">Color</h3>

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

			{/* 📐 SIZES */}
			<div className="mt-8">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium text-[var(--mainBody-sbText)]">Size</h3>
					<span className="text-sm text-[var(--intro-logo)] cursor-pointer">
						Size guide
					</span>
				</div>

				<div className="grid grid-cols-4 gap-3">
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

			{/* ADD TO CART */}
			<AddToCartBtn>Add to cart</AddToCartBtn>

			{/* DESCRIPTION */}
			{/* <div className="mt-10">
				<h3 className="text-sm font-medium mb-3">Description</h3>
				<p className="text-sm text-gray-700 leading-6">
					{product?.description || 'This product has no description available.'}
				</p>
			</div> */}

			{/* HIGHLIGHTS */}
			{/* <div className="mt-8">
				<h3 className="text-sm font-medium">Highlights</h3>
				<ul className="list-disc pl-5 mt-3 text-sm space-y-2">
					{product?.highlights?.map((h, i) => (
						<li key={i} className="text-gray-700">
							{h}
						</li>
					))}
				</ul>
			</div> */}

			{/* DETAILS */}
			{/* <div className="mt-8">
				<h3 className="text-sm font-medium">Details</h3>
				<p className="text-sm text-gray-600 mt-3 leading-6">
					{product?.details ||
						'Detailed information about this product will appear here.'}
				</p>
			</div> */}
		</div>
	);
}

Details.propTypes = {
	product: PropTypes.object,
	attribute: PropTypes.object,
	configAttribute: PropTypes.func,
};

export default Details;
