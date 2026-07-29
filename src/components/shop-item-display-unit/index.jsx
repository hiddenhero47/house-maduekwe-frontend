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
	Image,
	SoldOut,
} from './index.style';
import { MdOutlineError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ModalSlider from '../sliders/modal-slider/index';
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from 'react-icons/hi2';
import { FaBasketShopping } from 'react-icons/fa6';
import { attributeType, ItemStatusType } from '../../utilities/app-const';
import { useDispatch, useSelector } from 'react-redux';
import { startDrag, endDrag, resetDrag } from '../../store/slice/drag-board';
import { addToHoldings } from '../../store/slice/holding';
import {
	groupAttributesByType,
	groupedVariantsChecker,
	attributesError,
} from '../../utilities/basic-functions';
import {
	handleHolding,
	handleCartServer,
} from '../../utilities/product-services';
import { toast } from '../../layouts/toast/toast-handler';

function ShopItem({
	id = '',
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

	const { user } = useSelector((state) => state.auth);
	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;

	const [attribute, configAttribute] = useState({
		currentDisplay: null,
		currentSize: null,
		currentColor: null,
	});

	const holding = () => {
		handleHolding({
			product,
			attribute,
			quantity: 1,
			dispatch,
			addToHoldingsAction: addToHoldings,
			afterSuccess: () => dispatch(resetDrag()),
		});
	};

	const cartServer = () => {
		handleCartServer({
			product,
			attribute,
			quantity: 1,
			activeUser,
			navigate,
			dispatch,
			afterSuccess: (selectedItem) => endDrag({ data: selectedItem }),
			holding, // pass callback
		});
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
		const holdDelay = 380;

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

	// 📱 Touch cancel (interruptions like scroll, notification bar pull, gesture nav)
	const handleTouchCancel = () => {
		if (ghostRef.current) {
			ghostRef.current.remove();
			ghostRef.current = null;
		}
		setIsDragging(false);
		dispatch(resetDrag());
	};

	// 🎯 Attach global listeners when dragging starts
	useEffect(() => {
		if (!isDragging) return;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		// 📱 Touch events
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('touchcancel', handleTouchCancel);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);

			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('touchcancel', handleTouchCancel);
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

	const getImagePosition = (image) => {
		if (!image?.width || !image?.height) return 'center';
		const ratio = image.width / image.height;
		// Square-ish (0.8 to 1.25)
		if (ratio > 0.8 && ratio < 1.25) return 'center';
		// Tall or wide rectangle → top gives better visual
		return 'top';
	};

	return (
		<ShopItemWrapper
			id={id}
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
						<button
							id={id ? `${id}_holding` : ''}
							className="add_to_holding"
							onClick={() => holding()}
						>
							<i>
								<FaBasketShopping />
							</i>
						</button>

						<SoldOut
							$isSoldOut={
								product?.status === ItemStatusType.SOLD_OUT ||
								product?.quantity <= 0
							}
						>
							<span>SOLD OUT</span>
						</SoldOut>

						<div className="display_container_screen">
							<ModalSlider currentIndex={index}>
								{productDisplay.map((image, i) => (
									<div key={i} className="imageHolder slider_body">
										<Image
											src={image?.url}
											alt="error"
											draggable="false"
											onContextMenu={(e) => e.preventDefault()}
											// style={{ touchAction: 'none' }}
											onLoad={(e) => {
												const img = e.currentTarget;
												const ratio = img.naturalWidth / img.naturalHeight;
												const position = ratio < 0.66 ? 'top' : 'center';
												img.style.objectPosition = position;
											}}
										/>
									</div>
								))}
							</ModalSlider>
						</div>

						<button onClick={() => slideOn(-1)} className="arrows_left">
							<i>
								<HiMiniArrowSmallLeft />
							</i>
						</button>
						<button onClick={() => slideOn(1)} className="arrows_right">
							<i>
								<HiMiniArrowSmallRight />
							</i>
						</button>
					</div>
					<Controller className="display_controller">
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
							<div className="mt-[4px] overflow-x-auto scroll_style">
								<h3>
									{product?.name} <span>${product?.price}</span>
								</h3>
							</div>

							<div className="mt-[10px] overflow-x-auto scroll_style">
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
											>
												<span>✓</span>
											</Color>
										))}
									</div>
									<div className="size">
										{attributesDisplay.size.map((attr, i) => {
											const sizeValue = attr?.Attribute?.display;
											const isActive =
												attr?.Attribute?.display ===
												attribute?.currentSize?.Attribute?.display;
											const isValid = attributesError({
												currentAttr: attr,
												otherAttr: attribute.currentColor,
												shopItem: product,
												quantity: 1,
											});
											return (
												<Size
													onClick={() => {
														configAttribute({
															...attribute,
															currentSize: attr,
														});
													}}
													key={i}
													$active={isActive}
													disabled={!isValid}
													$isError={!isValid}
												>
													<span>{sizeValue}</span>
												</Size>
											);
										})}
									</div>
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
