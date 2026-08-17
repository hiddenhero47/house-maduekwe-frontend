import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
	Container,
	Item,
	ColorCircle,
	SummaryContainer,
	Footer,
	ToggleBtn,
	ItemLoader,
	AddressSelect,
	AddressBox,
	CheckoutBtn,
	Unavailable,
	AddBtn,
	HoldingItem,
	HoldingActions,
	CustomerName,
} from './elements/index.style';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineToggleOff } from 'react-icons/md';
import { MdOutlineToggleOn } from 'react-icons/md';
import CartServices from '../../features/services/custom-hooks/cart';
import CartLoader from './elements/cart-loader/cart-loader';
import {
	groupAttributesByType,
	groupedVariantsChecker,
	attributesError,
	getUnavailableInfo,
} from '../../utilities/basic-functions';
import { attributeType, ItemStatusType } from '../../utilities/app-const';
import Spinner from '../../components/loaders/spinners/Spinner';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { useNavigate, Link } from 'react-router-dom';
import AddressServices from '../../features/services/custom-hooks/addresses';
import { CheckoutServices } from '../../features/services/custom-hooks/orders';
import { getCurrencySymbol } from '../../utilities/basic-functions';
import { CgRadioChecked } from 'react-icons/cg';
import { CgRadioCheck } from 'react-icons/cg';
import { IoIosInformationCircle } from 'react-icons/io';
import { toast } from '../../layouts/toast/toast-handler';
import { FaLocationDot } from 'react-icons/fa6';
import CreateAddress from '../../components/modal-assets/address/create-address';
import EditAddress from '../../components/modal-assets/address/edit-address';
import { useSelector, useDispatch } from 'react-redux';
import CustomInput from '../../components/form-components/input/custom-input';
import { openMenu, removeFromHoldings } from '../../store/slice/holding';
import {
	nameValidationSchema,
	checkoutValidationSchema,
} from '../../features/validations/checkout-validation';
import { CHECKOUT_TYPES } from '../../utilities/app-const';
import { FiEdit2 } from 'react-icons/fi';
import {
	removeFromLocalCart,
	openGuestCheckout,
} from '../../store/slice/local-cart';

function Index() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { holdings } = useSelector((state) => state.holdings);
	const { items: localCartItems } = useSelector((state) => state.localCart);
	const { user } = useSelector((state) => state.auth);

	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;

	const { data, isPending, isFetching } = CartServices.get();
	const { itemList: cartItems = [] } = data || {};

	const cartList = activeUser ? cartItems || [] : localCartItems || [];

	const { mutate: removeFromCart, isPending: isRemoving } =
		CartServices.remove();

	const { data: addresses, isFetching: IsLoadingAddr } =
		AddressServices.getAll();

	const { mutate: confirmCheckout, isPending: isConfirming } =
		CheckoutServices.confirm();

	const { mutate: checkout, isPending: isCheckingOut } =
		CheckoutServices.checkout();

	const [checkoutData, setCheckoutData] = useState({});
	const [excludedItems, setExcludedItems] = useState([]);
	const [selectedAddr, setSelectedAddr] = useState();
	const [loadingId, setLoadingId] = useState();
	const [consignee, setConsignee] = useState({
		name: '',
		isError: false,
		touched: false,
	});

	const onChangeConsignee = async (value) => {
		const isValid = await nameValidationSchema.isValid({
			name: value,
		});
		setConsignee((prev) => ({
			...prev,
			name: value,
			isError: !isValid,
		}));
	};

	const toggleExclude = (id) => {
		setExcludedItems(
			(prev) =>
				prev.includes(id)
					? prev.filter((i) => i !== id) // remove
					: [...prev, id] // add
		);
	};

	const removeItem = async (id) => {
		if (!id) return;
		setLoadingId(id);
		removeFromCart({ itemIds: [id] });
	};

	const handleRemoveItem = (item) => {
		if (activeUser) {
			removeItem(item?._id);
			return;
		}
		dispatch(removeFromLocalCart({ tempId: item?.tempId }));
	};

	const getImage = (currentItem) => {
		const grouped =
			groupAttributesByType(currentItem?.selectedAttributes || {}) || {};

		const colorList = grouped[attributeType.COLOR] || [];

		const image =
			colorList?.[0]?.images?.[0]?.url ||
			currentItem?.shopItem?.placeHolder?.url ||
			currentItem?.shopItem?.imageCatalog?.[0]?.url ||
			null;

		return image;
	};

	const getDisplay = (currentItem, key) => {
		const grouped =
			groupAttributesByType(currentItem?.selectedAttributes || {}) || {};
		const attList = grouped[key] || [];
		return attList[0]?.Attribute.display;
	};

	useEffect(() => {
		if (!IsLoadingAddr && addresses?.length && !selectedAddr) {
			const defaultAddress = addresses.find((addr) => addr.isDefault);
			setSelectedAddr(defaultAddress?._id || addresses[0]._id);
		}
	}, [IsLoadingAddr, addresses, selectedAddr]);

	useEffect(() => {
		if (!data?.itemList?.length || !selectedAddr) {
			setCheckoutData({});
			return;
		}
		// 1️⃣ Get all cart item IDs
		const allItemIds = data.itemList.map((item) => item._id);

		// 2️⃣ Remove excluded items
		const finalItemIds = allItemIds.filter((id) => !excludedItems.includes(id));

		// 3️⃣ Only confirm if there are items left
		// Nothing left to checkout
		if (!finalItemIds.length) {
			setCheckoutData({});
			return;
		}

		confirmCheckout(
			{
				itemList: finalItemIds,
				selectedAddress: selectedAddr,
			},
			{
				onSuccess: (response) => {
					setCheckoutData(response);
				},
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, selectedAddr, excludedItems]);

	const checkoutCart = async () => {
		// if (!data?.itemList?.length || !selectedAddr || !checkoutData) return;
		if (!data?.itemList?.length || !checkoutData) return;

		const allItemIds = data.itemList.map((item) => item._id);
		const finalItemIds = allItemIds.filter((id) => !excludedItems.includes(id));

		const stockIssues = (checkoutData?.stock || [])
			.map((s, index) => ({ ...s, index }))
			.filter((s) => !s.isAvailable);

		const isValid = await checkoutValidationSchema.isValid({
			itemList: finalItemIds,
			selectedAddress: selectedAddr,
			consigneesName: consignee.name,
		});

		if (stockIssues.length > 0) {
			toast.warning(`${stockIssues[0].message}`);
			return;
		}

		if (checkoutData?.isPendingOrder) {
			toast.warning(
				'You have a pending orders. Please complete or cancel it before checking out.'
			);
			return;
		}

		if (!isValid) {
			const message =
				!finalItemIds.length > 0
					? 'No checkout item'
					: !selectedAddr
						? 'select an address'
						: 'Invalid consignee name';
			toast.warning(message);
			return;
		}

		if (finalItemIds.length > 0) {
			checkout(
				{
					itemList: finalItemIds,
					selectedAddress: selectedAddr,
					consigneesName: consignee.name,
				},
				{
					onSuccess: (response) => {
						const orderId = response?.order?._id;
						navigate(
							`/checkout/${orderId}?checkoutType=${CHECKOUT_TYPES.USER}`
						);
					},
				}
			);
		}
	};

	const modalRef = useRef(null);
	const openModal = () => {
		modalRef.current?.open();
	};

	const [editInfo, setEditInfo] = useState(null);
	const modalRefEdit = useRef(null);
	const openEditModal = (info) => {
		setEditInfo(info);
		modalRefEdit.current?.open();
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

	const removeHolding = (tempId) => {
		dispatch(removeFromHoldings({ tempId }));
	};

	const localCartSummary = useMemo(() => {
		if (activeUser || !localCartItems?.length) {
			return {
				itemCount: 0,
				subtotal: 0,
				totalVat: 0,
				orderTotal: 0,
				currency: '',
			};
		}

		let subtotal = 0;
		let totalVat = 0;
		let itemCount = 0;

		const currency = localCartItems[0]?.shopItem?.currency || '';

		localCartItems.forEach((item) => {
			const product = item?.shopItem;

			const price = Number(product?.price) || 0;
			const quantity = Number(item?.quantity) || 0;
			const vat = Number(product?.vat) || 0;
			const discount = Number(product?.discount) || 0;

			// Discount is treated as a percentage.
			const discountedPrice =
				discount > 0 ? price - (price * discount) / 100 : price;

			const itemSubtotal = discountedPrice * quantity;
			const itemVat = (itemSubtotal * vat) / 100;

			subtotal += itemSubtotal;
			totalVat += itemVat;
			itemCount += quantity;
		});

		return {
			itemCount,
			subtotal,
			totalVat,
			orderTotal: subtotal + totalVat,
			currency,
		};
	}, [activeUser, localCartItems]);

	return (
		<Container
			className="Y_scroll_style"
			$isPendingOrder={checkoutData?.isPendingOrder}
			$activeUser={activeUser}
		>
			<h1 className="text-[30px] font-normal font-[Audiowide] pt-[20px] mb-[50px]">
				Shopping Cart
			</h1>

			{checkoutData?.isPendingOrder && (
				<Link
					to="/settings?currentSettings=orders"
					className="pending_order_notice"
				>
					<div className="info">
						<p>You already have a pending order</p>

						<span>
							Complete payment or cancel the order before checking out again.
						</span>
					</div>

					<div className="action">
						View Order <i>→</i>
					</div>
				</Link>
			)}

			<div className="flex flex-wrap gap-[10px] w-full">
				<div id="cartItems">
					<ul role="list">
						<CartLoader
							isLoading={activeUser ? isPending || isFetching : false}
							data={cartList || []}
						/>
						{cartList &&
							(!isPending || !activeUser) &&
							cartList?.length > 0 &&
							cartList?.map((item, index) => {
								const stockDetails = getUnavailableInfo({
									shopItem: item?.shopItem,
									selectedAttributes: item?.selectedAttributes,
									quantity: item?.quantity,
									stockInfo: checkoutData?.stock || [],
								});

								const itemId = activeUser ? item?._id : item?.tempId;

								return (
									<li
										key={itemId || index}
										className="py-[30px] border-b border-b-[var(--mainBody-line)]"
									>
										<Item $unavailable={stockDetails?.status}>
											<button
												className="image_button"
												onClick={() =>
													navigate(`/overview/${item?.shopItem?._id}`)
												}
											>
												<div className="imageHolder">
													<img
														src={getImage(item)}
														alt="Error"
														onLoad={(e) => {
															const img = e.currentTarget;
															const ratio =
																img.naturalWidth / img.naturalHeight;
															const position = ratio < 0.79 ? 'top' : 'center';
															img.style.objectPosition = position;
														}}
													/>
												</div>
											</button>

											<div className="ml-[clamp(5px,5%,25px)] flex flex-col w-full justify-between py-[8px] pr-[8px]">
												<div className="flex justify-between w-full">
													<div>
														<h3>{item?.shopItem?.name}</h3>
														<div className="flex gap-[10px] flex-wrap">
															<p>
																<span>size :</span>{' '}
																<span>
																	{getDisplay(item, attributeType.SIZE) ||
																		'Nill'}
																</span>
															</p>
															<div className="flex items-center gap-[10px]">
																<span>color :</span>{' '}
																<ColorCircle
																	$color={
																		getDisplay(item, attributeType.COLOR) || ''
																	}
																	$active={true}
																/>
															</div>
														</div>
													</div>

													<h3>${item?.shopItem?.price}</h3>
												</div>

												<div className="flex justify-between w-full items-center">
													<p className="flex items-center gap-[10px]">
														Qty {item?.quantity}{' '}
														{activeUser && (
															<>
																<span className="w-[2px] rounded-full h-[25px] bg-[var(--mainBody-line)]" />
																<ToggleBtn
																	onClick={() => toggleExclude(item?._id)}
																	$isExcluded={excludedItems.includes(
																		item?._id
																	)}
																>
																	{excludedItems.includes(item?._id) ? (
																		<i>
																			<CgRadioCheck />
																		</i>
																	) : (
																		<i>
																			<CgRadioChecked />
																		</i>
																	)}
																</ToggleBtn>
															</>
														)}
													</p>

													<button
														disabled={activeUser && isRemoving}
														type="button"
														className="text-[15px] text-[var(--intro-logo)]"
														onClick={() => handleRemoveItem(item)}
													>
														Remove
													</button>
												</div>
											</div>
											<ItemLoader
												$isLoading={
													activeUser && isRemoving && item?._id === loadingId
												}
											>
												<Spinner thin="50px" />
											</ItemLoader>

											<Unavailable $unavailable={stockDetails?.status}>
												<div className="icon">
													<IoIosInformationCircle />
												</div>

												<div className="content">
													<h3>{stockDetails?.title}</h3>
													<p>{stockDetails?.message}</p>
													<span>{stockDetails?.recommendation}</span>
												</div>
											</Unavailable>
										</Item>
									</li>
								);
							})}
					</ul>

					{holdings.length > 0 && (
						<ul role="list" className="holdings_list">
							<li className="holding_header">
								<h3>Saved Holdings ({holdings.length})</h3>
								<span>
									Items waiting to be moved to cart or use guest checkout
								</span>
							</li>

							{holdings.map((item) => (
								<li key={item.tempId}>
									<HoldingItem>
										<div className="imageHolder">
											<img
												src={selectPlaceholder(item)}
												alt={item?.shopItem?.name}
											/>
										</div>

										<div className="details">
											<div>
												<h4>{item?.shopItem?.name}</h4>
												<p>Qty {item.quantity}</p>
											</div>

											<div className="actions">
												<h4>${item?.shopItem?.price}</h4>

												<button
													type="button"
													onClick={() => removeHolding(item.tempId)}
												>
													Remove
												</button>
											</div>
										</div>
									</HoldingItem>
								</li>
							))}

							<li>
								<HoldingActions>
									<button
										type="button"
										className="add_btn"
										onClick={() => dispatch(openMenu('display'))}
									>
										Add All To Cart
									</button>

									<button
										type="button"
										className="guest_btn"
										onClick={() => dispatch(openMenu('guest'))}
									>
										Guest Checkout
									</button>
								</HoldingActions>
							</li>
						</ul>
					)}
				</div>

				<div id="cartSummary">
					{activeUser ? (
						<>
							<CustomerName>
								<h3>Consignee's Name</h3>

								<CustomInput
									id="name"
									name="name"
									value={consignee?.name || ''}
									onChange={(e) => onChangeConsignee(e.target.value)}
									placeholder="Enter Your Full Name, Fist & Last"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</CustomerName>

							<AddressSelect
								$isLoading={IsLoadingAddr}
								$isEmpty={!addresses?.length}
							>
								<h3 className="flex items-center justify-between">
									Delivery Address
									{checkoutData?.order?.shippingFee && (
										<span>
											Fee:{' '}
											{getCurrencySymbol(checkoutData?.payment?.currency) ||
												'$'}
											{checkoutData?.order?.shippingFee}
										</span>
									)}
								</h3>

								{IsLoadingAddr && (
									<div className="h-[50px]">
										<div className="loading_overlay">
											<Spinner thin="45px" />
										</div>
									</div>
								)}

								{!IsLoadingAddr && !addresses?.length && (
									<div className="empty_state">
										<p>No saved addresses found.</p>
										<AddBtn type="button" onClick={openModal}>
											Add address <FaLocationDot />
										</AddBtn>
									</div>
								)}

								{!IsLoadingAddr && addresses?.length > 0 && (
									<div className="address_list scroll_style">
										{addresses.map((addr) => (
											<AddressBox
												key={addr._id}
												$isSelected={selectedAddr === addr._id}
												onClick={() => setSelectedAddr(addr._id)}
											>
												<div className="address_content">
													<div>
														<p className="full_address">{addr.fullAddress}</p>

														<div className="meta">
															<span>State: {addr.state}</span>
															<span>City: {addr.city}</span>
														</div>
													</div>

													<button
														type="button"
														className="edit_btn"
														onClick={(e) => {
															e.stopPropagation();
															openEditModal(addr);
														}}
														aria-label="Edit address"
													>
														<FiEdit2 />
													</button>
												</div>
											</AddressBox>
										))}
									</div>
								)}
							</AddressSelect>

							<SummaryContainer>
								<div className="w-full flex flex-col">
									<h3 className="mb-[24px] font-semibold text-[18px] note flex items-center justify-between">
										Order summary
										{isConfirming && (
											<BubbleSlide color="var(--mainBody-text)" height="20px" />
										)}
									</h3>

									<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] note_sc">
										<p className="text-[15px] text-[var(--mainBody-sbText)]">
											Subtotal
										</p>
										<p className="text-[15px] text-[var(--mainBody-sbText)]">
											{getCurrencySymbol(checkoutData?.payment?.currency) || ''}{' '}
											{checkoutData?.order?.totalAmount || ''}
										</p>
									</div>

									<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
										<p className="text-[15px] text-[var(--mainBody-sbText)]">
											Tax estimate
										</p>
										<p className="text-[15px] text-[var(--mainBody-sbText)]">
											{getCurrencySymbol(checkoutData?.payment?.currency) || ''}{' '}
											{checkoutData?.order?.totalVat || ''}
										</p>
									</div>

									<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top total_sc">
										<p>Order total</p>
										<p>
											{getCurrencySymbol(checkoutData?.payment?.currency) || ''}{' '}
											{checkoutData?.payment?.amountToPay || ''}
										</p>
									</div>

									<Footer>
										<CheckoutBtn
											className="btn"
											type="button"
											onClick={checkoutCart}
											$isLoading={isCheckingOut}
										>
											<div className="content">Checkout</div>
											<div className="loader">
												<BubbleSlide
													color="var(--addToCart-text)"
													height="20px"
												/>
											</div>
										</CheckoutBtn>

										<button
											type="button"
											onClick={() => navigate('/products')}
											className="btn btn_continue"
										>
											Continue Shopping{' '}
											<i>
												<FaArrowRightLong />
											</i>
										</button>
									</Footer>
								</div>
							</SummaryContainer>
						</>
					) : (
						<SummaryContainer>
							<div className="w-full flex flex-col">
								<h3 className="mb-[24px] font-semibold text-[18px] note flex items-center justify-between">
									Order summary
								</h3>

								<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] note_sc">
									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										Items
									</p>

									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										{localCartSummary.itemCount}
									</p>
								</div>

								<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										Subtotal
									</p>

									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										{getCurrencySymbol(localCartSummary.currency) || ''}{' '}
										{localCartSummary.subtotal.toFixed(2)}
									</p>
								</div>

								<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										Tax estimate
									</p>

									<p className="text-[15px] text-[var(--mainBody-sbText)]">
										{getCurrencySymbol(localCartSummary.currency) || ''}{' '}
										{localCartSummary.totalVat.toFixed(2)}
									</p>
								</div>

								<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top total_sc">
									<p>Order total</p>

									<p>
										{getCurrencySymbol(localCartSummary.currency) || ''}{' '}
										{localCartSummary.orderTotal.toFixed(2)}
									</p>
								</div>

								<Footer>
									<CheckoutBtn
										className="btn"
										type="button"
										onClick={() => dispatch(openGuestCheckout())}
									>
										<div className="content">Checkout as Guest</div>
									</CheckoutBtn>

									<button
										type="button"
										className="btn btn_continue"
										onClick={() => navigate('/authentication')}
									>
										<div className="content">Login to unlock more features</div>
									</button>

									<button
										type="button"
										onClick={() => navigate('/products')}
										className="btn btn_continue"
									>
										Continue Shopping{' '}
										<i>
											<FaArrowRightLong />
										</i>
									</button>
								</Footer>
							</div>
						</SummaryContainer>
					)}
				</div>
			</div>
			<CreateAddress
				ref={modalRef}
				openModal={openModal}
				closeModal={() => modalRef.current?.close()}
			/>

			<EditAddress
				ref={modalRefEdit}
				openModal={openModal}
				closeModal={() => modalRefEdit.current?.close()}
				address={editInfo}
				clean={() => setEditInfo(null)}
			/>
		</Container>
	);
}

export default Index;
