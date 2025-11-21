import React, { useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	ShopItemWrapper,
	SkeletonLoader,
	ErrorWrapper,
	ShopItemContent,
	Controller,
	Color,
	Size,
} from './index.style';
import { MdOutlineError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ModalSlider from '../sliders/modal-slider/index';
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from 'react-icons/hi2';
import { FaBasketShopping } from 'react-icons/fa6';
import { attributeType } from '../../utilities/app-const';
import { useDispatch } from 'react-redux';
import { startDrag, endDrag, resetDrag } from '../../store/slice/drag-board';
import { addToHoldings } from '../../store/slice/holding';

function ShopItem({
	useBackground = true,
	width,
	height,
	className,
	product,
	isLoading,
}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isDragging, setIsDragging] = useState(false);
	const [index, setIndex] = useState(0);
	const startPos = useRef({ x: 0, y: 0 });
	const ghostRef = useRef(null);

	const [attribute, configAttribute] = useState({
		currentDisplay: null,
		currentSize: null,
		currentColor: null,
	});

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
		dispatch(resetDrag()); // ♻️ reset drag after holding
		dispatch(addToHoldings(selectedItem));
	};

	const cartServer = () => {
		const selectedItem = {
			shopItemId: product?._id,
			quantity: 1,
			selectedAttributes: [
				...(attribute.currentColor ? [attribute.currentColor] : []),
				...(attribute.currentSize ? [attribute.currentSize] : []),
			],
		};

		console.log('🛒 Add to cart', selectedItem);
		dispatch(endDrag({ data: selectedItem })); // ✅ mark drag as ended
	};

	// 🧠 Start dragging (only if mouse is held down)
	const handleMouseDown = (e) => {
		if (!product) return;
		if (e.target.tagName !== 'IMG') return;

		e.preventDefault();

		const target = e.currentTarget; // ✅ save the reference before timeout
		const holdDelay = 120;

		const timeoutId = setTimeout(() => {
			setIsDragging(true);
			startPos.current = { x: e.clientX, y: e.clientY };
			const rect = target.getBoundingClientRect();

			dispatch(startDrag({ dragType: 'shop-item' }));

			// ✅ use saved reference here
			const ghost = target.cloneNode(true);
			ghost.id = 'customDragGhost';
			Object.assign(ghost.style, {
				position: 'fixed',
				pointerEvents: 'none',
				/* 🟩 EXACT px size from original element */
				width: `${rect.width}px`,
				height: `${rect.height}px`,

				top: `${e.clientY}px`,
				left: `${e.clientX}px`,
				transform: 'translate(-50%, -50%) scale(0.95)',
				opacity: '0.95',
				transition: 'transform 0.15s ease, opacity 0.15s ease',
				zIndex: '9999',
				boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
				borderRadius: '12px',
			});
			document.body.appendChild(ghost);
			ghostRef.current = ghost;
		}, holdDelay);

		const cancelHold = () => clearTimeout(timeoutId);
		window.addEventListener('mouseup', cancelHold, { once: true });
	};

	// 🧠 Handle drag move (global)
	const handleMouseMove = (e) => {
		if (!isDragging || !ghostRef.current) return;
		const ghost = ghostRef.current;
		ghost.style.top = `${e.clientY}px`;
		ghost.style.left = `${e.clientX}px`;
	};

	// 🧠 Handle mouse up (global)
	const handleMouseUp = (e) => {
		if (!isDragging) return;
		setIsDragging(false);

		const ghost = ghostRef.current;
		if (ghost) {
			ghost.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
			ghost.style.opacity = '0';
			ghost.style.transform = 'translate(-50%, -50%) scale(0.6)';
			setTimeout(() => ghost.remove(), 250);
			ghostRef.current = null;
		}

		const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
		const cart = document.getElementById('myCart');
		if (cart && dropTarget && cart.contains(dropTarget)) {
			cartServer();
		} else if (startPos.current.y - e.clientY > 150) {
			holding();
		}
	};

	// 📱 Touch start (same as mouse down)
	const handleTouchStart = (e) => {
		if (!product) return;

		const touch = e.touches[0];
		if (!touch) return;

		// Only start drag if touching the image
		if (e.target.tagName !== 'IMG') return;

		const target = e.currentTarget;
		const holdDelay = 190;

		const timeoutId = setTimeout(() => {
			setIsDragging(true);
			startPos.current = { x: touch.clientX, y: touch.clientY };

			const rect = target.getBoundingClientRect();
			dispatch(startDrag({ dragType: 'shop-item' }));

			const ghost = target.cloneNode(true);
			ghost.id = 'customDragGhost';

			Object.assign(ghost.style, {
				position: 'fixed',
				pointerEvents: 'none',
				width: `${rect.width}px`,
				height: `${rect.height}px`,
				top: `${touch.clientY}px`,
				left: `${touch.clientX}px`,
				transform: 'translate(-50%, -50%) scale(0.95)',
				opacity: '0.95',
				transition: 'transform 0.15s ease, opacity 0.15s ease',
				zIndex: '9999',
				boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
				borderRadius: '12px',
			});
			document.body.appendChild(ghost);
			ghostRef.current = ghost;
		}, holdDelay);

		const cancelHold = () => clearTimeout(timeoutId);
		window.addEventListener('touchend', cancelHold, { once: true });
	};

	// 📱 Touch move (same as mouse move)
	const handleTouchMove = (e) => {
		if (!isDragging || !ghostRef.current) return;
		const touch = e.touches[0];
		if (!touch) return;

		const ghost = ghostRef.current;
		ghost.style.top = `${touch.clientY}px`;
		ghost.style.left = `${touch.clientX}px`;
	};

	// 📱 Touch end (same as mouse up)
	const handleTouchEnd = (e) => {
		if (!isDragging) return;
		setIsDragging(false);

		const ghost = ghostRef.current;
		if (ghost) {
			ghost.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
			ghost.style.opacity = '0';
			ghost.style.transform = 'translate(-50%, -50%) scale(0.6)';
			setTimeout(() => ghost.remove(), 250);
			ghostRef.current = null;
		}

		const touch = e.changedTouches[0];
		if (!touch) return;

		const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
		const cart = document.getElementById('myCart');

		if (cart && dropTarget && cart.contains(dropTarget)) {
			cartServer();
		} else if (startPos.current.y - touch.clientY > 150) {
			holding();
		}
	};

	// 🎯 Attach global listeners when dragging starts
	useEffect(() => {
		if (!isDragging) return;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		// 📱 Touch events
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);

			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDragging]);

	// 🖼️ Product display setup
	const productDisplay = useMemo(() => {
		if (!product) return [];

		if (Array.isArray(attribute.currentDisplay)) {
			return attribute.currentDisplay;
		}

		const catalog = product.imageCatalog || [];
		const placeHolder = product.placeHolder;
		return [
			...catalog.filter((img) => img === placeHolder),
			...catalog.filter((img) => img !== placeHolder),
		];
	}, [attribute.currentDisplay, product]);

	const attributesDisplay = useMemo(() => {
		if (!product) return { color: [], size: [] };

		let color = product?.attributes.filter(
			(attr) => attr.Attribute.type === attributeType.COLOR
		);
		let size = product?.attributes.filter(
			(attr) => attr.Attribute.type === attributeType.SIZE
		);

		return { color, size };
	}, [product]);

	// ↔️ Slide navigation
	const slideOn = (value) => {
		const newIndex = value + index;
		if (newIndex >= 0 && newIndex < productDisplay.length) setIndex(newIndex);
	};

	return (
		<ShopItemWrapper
			$useBackground={useBackground}
			width={width}
			height={height}
			className={className}
			$isDragging={isDragging}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
			onDoubleClick={() => navigate(`/overview/${product._id}`)}
		>
			{isLoading ? (
				<SkeletonLoader />
			) : !product ? (
				<ErrorWrapper>
					<MdOutlineError size={32} />
					<span>No product found</span>
				</ErrorWrapper>
			) : (
				<ShopItemContent>
					<div className="display_unit">
						<button id="addToHolding" onClick={() => holding()}>
							<i>
								<FaBasketShopping />
							</i>
						</button>

						<div className="display_container_screen">
							<ModalSlider currentIndex={index}>
								{productDisplay.map((image, i) => (
									<div key={i} className="imageHolder slider_body">
										<img src={image?.url} alt="error" draggable="false" />
									</div>
								))}
							</ModalSlider>
						</div>

						<button onClick={() => slideOn(-1)} id="arrowsLeft">
							<i>
								<HiMiniArrowSmallLeft />
							</i>
						</button>
						<button onClick={() => slideOn(1)} id="arrowsRight">
							<i>
								<HiMiniArrowSmallRight />
							</i>
						</button>
					</div>
					<Controller id="displayController">
						<div className="display_navigator">
							{productDisplay.map((x, i) => (
								<button
									className={index === i ? 'active' : ''}
									onClick={() => slideOn(i - index)}
									key={i}
								>
									<span></span>
								</button>
							))}
						</div>

						<div className="attributes_display">
							<h3>
								{product?.name} <span>${product?.price}</span>
							</h3>

							<div className="select_attributes">
								<div className="color">
									{attributesDisplay.color.map((attr, i) => (
										<Color
											$value={attr?.Attribute?.display}
											onClick={() => {
												configAttribute({
													...attribute,
													currentColor: attr,
													currentDisplay: attr?.images,
												});
												setIndex(0);
											}}
											key={i}
											$active={
												attr?.Attribute?.display ===
												attribute?.currentColor?.Attribute?.display
											}
										/>
									))}
								</div>
								<div className="size">
									{attributesDisplay.size.map((attr, i) => (
										<Size
											onClick={() => {
												configAttribute({
													...attribute,
													currentSize: attr,
												});
											}}
											key={i}
											$active={
												attr?.Attribute?.display ===
												attribute?.currentSize?.Attribute?.display
											}
										>
											<span>{attr?.Attribute?.display}</span>
										</Size>
									))}
								</div>
							</div>
						</div>
					</Controller>
				</ShopItemContent>
			)}
		</ShopItemWrapper>
	);
}

ShopItem.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	useBackground: PropTypes.bool,
	product: PropTypes.object,
	isLoading: PropTypes.bool,
};

export default ShopItem;
