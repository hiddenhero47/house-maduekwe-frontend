import React, { useState, useEffect } from 'react';
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
} from './elements/index.style';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineToggleOff } from 'react-icons/md';
import { MdOutlineToggleOn } from 'react-icons/md';
import CartServices from '../../features/services/custom-hooks/cart';
import CartLoader from './elements/cart-loader/cart-loader';
import { groupAttributesByType } from '../../utilities/basic-functions';
import { attributeType } from '../../utilities/app-const';
import Spinner from '../../components/loaders/spinners/Spinner';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';
import AddressServices from '../../features/services/custom-hooks/addresses';
import { CheckoutServices } from '../../features/services/custom-hooks/orders';
import { getCurrencySymbol } from '../../utilities/basic-functions';
import { CgRadioChecked } from "react-icons/cg";
import { CgRadioCheck } from "react-icons/cg";

function Index() {
	const navigate = useNavigate();

	const { data, isPending } = CartServices.get();
	const { itemList: cartItems = [] } = data || {};

	const { mutate: removeFromCart, isPending: isRemoving } =
		CartServices.remove();

	const { data: addresses, isPending: IsLoadingAddr } =
		AddressServices.getAll();

	const { mutate: confirmCheckout, isPending: isConfirming } =
		CheckoutServices.confirm();

	const { mutate: checkout, isPending: isCheckingOut } =
		CheckoutServices.checkout();

	const [checkoutData, setCheckoutData] = useState({});
	const [excludedItems, setExcludedItems] = useState([]);
	const [selectedAddr, setSelectedAddr] = useState();
	const [loadingId, setLoadingId] = useState();

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
		if (!data?.itemList?.length || !selectedAddr) return;

		// 1️⃣ Get all cart item IDs
		const allItemIds = data.itemList.map((item) => item._id);

		// 2️⃣ Remove excluded items
		const finalItemIds = allItemIds.filter((id) => !excludedItems.includes(id));

		// 3️⃣ Only confirm if there are items left
		if (finalItemIds.length > 0) {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, selectedAddr, excludedItems]);

	const checkoutCart = async () => {
		if (!data?.itemList?.length || !selectedAddr || !checkoutData) return;

		const allItemIds = data.itemList.map((item) => item._id);
		const finalItemIds = allItemIds.filter((id) => !excludedItems.includes(id));

		if (finalItemIds.length > 0) {
			checkout(
				{
					itemList: finalItemIds,
					selectedAddress: selectedAddr,
				},
				{
					onSuccess: (response) => {
						const orderId = response?.order?._id;
						navigate(`/checkout/${orderId}`);
					},
				}
			);
		}
	};

	return (
		<Container className="Y_scroll_style">
			<h1 className="text-[30px] font-normal font-[Audiowide] pt-[20px] mb-[50px]">
				Shopping Cart
			</h1>

			<div className="flex flex-wrap gap-[10px] w-full">
				<div id="cartItems">
					<ul role="list">
						<CartLoader isLoading={isPending} data={cartItems || []} />
						{cartItems &&
							!isPending &&
							cartItems?.length > 0 &&
							cartItems?.map((item, index) => (
								<li
									key={item?._id || index}
									className="py-[30px] border-b border-b-[var(--mainBody-line)]"
								>
									<Item>
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
														const ratio = img.naturalWidth / img.naturalHeight;
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
																{getDisplay(item, attributeType.SIZE) || 'Nill'}
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

													<div className='w-[2px] rounded-full h-[25px] bg-[var(--mainBody-line)]'></div>

													<ToggleBtn
														onClick={() => toggleExclude(item?._id)}
														$isExcluded={excludedItems.includes(item?._id)}
													>
														{excludedItems.includes(item?._id) ? (
															<i><CgRadioCheck /></i>
														) : (
															<i><CgRadioChecked /></i>
														)}
													</ToggleBtn>
												</p>

												<button
													disabled={isRemoving}
													type="button"
													className="text-[15px] text-[var(--intro-logo)]"
													onClick={() => removeItem(item?._id)}
												>
													Remove
												</button>
											</div>
										</div>
										<ItemLoader
											$isLoading={isRemoving && item?._id === loadingId}
										>
											<Spinner thin="50px" />
										</ItemLoader>
									</Item>
								</li>
							))}
					</ul>
				</div>

				<div id="cartSummary">
					<AddressSelect
						$isLoading={IsLoadingAddr}
						$isEmpty={!addresses?.length}
					>
						<h3 className="flex items-center justify-between">
							Delivery Address
							{checkoutData?.order?.shippingFee && (
								<span>
									Fee:{' '}
									{getCurrencySymbol(checkoutData?.payment?.currency) || '$'}
									{checkoutData?.order?.shippingFee}
								</span>
							)}
						</h3>

						{IsLoadingAddr && (
							<div className="loading_overlay">
								<Spinner thin="45px" />
							</div>
						)}

						{!IsLoadingAddr && !addresses?.length && (
							<div className="empty_state">No saved addresses found.</div>
						)}

						{!IsLoadingAddr && addresses?.length > 0 && (
							<div className="address_list scroll_style">
								{addresses.map((addr) => (
									<AddressBox
										key={addr._id}
										$isSelected={selectedAddr === addr._id}
										onClick={() => setSelectedAddr(addr._id)}
									>
										<p className="full_address">{addr.fullAddress}</p>

										<div className="meta">
											<span>State: {addr.state}</span>
											<span>City: {addr.city}</span>
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
									{getCurrencySymbol(checkoutData?.payment?.currency) || '$'}{' '}
									{checkoutData?.order?.totalAmount || 'Nill'}
								</p>
							</div>

							<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									Tax estimate
								</p>
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									{getCurrencySymbol(checkoutData?.payment?.currency) || '$'}{' '}
									{checkoutData?.order?.totalVat || 'Nill'}
								</p>
							</div>

							<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top total_sc">
								<p>Order total</p>
								<p>
									{getCurrencySymbol(checkoutData?.payment?.currency) || '$'}{' '}
									{checkoutData?.payment?.amountToPay || 'Nill'}
								</p>
							</div>

							<Footer>
								<CheckoutBtn
									type="button"
									onClick={checkoutCart}
									$isLoading={isCheckingOut}
								>
									<div className="content">Checkout</div>
									<div className="loader">
										<BubbleSlide color="var(--addToCart-text)" height="20px" />
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
				</div>
			</div>
		</Container>
	);
}

export default Index;
