import React, { useState } from 'react';
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
} from './elements/index.style';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlineToggleOff } from 'react-icons/md';
import { MdOutlineToggleOn } from 'react-icons/md';
import CartServices from '../../features/services/custom-hooks/cart';
import { roleType } from '../../utilities/app-const';
import { ensureRole } from '../../store/slice/auth';
import CartLoader from './elements/cart-loader/cart-loader';
import { groupAttributesByType } from '../../utilities/basic-functions';
import { attributeType } from '../../utilities/app-const';
import Spinner from '../../components/loaders/spinners/Spinner';
import { useNavigate } from 'react-router-dom';
import AddressServices from "../../features/services/custom-hooks/addresses";

function Index() {
	const navigate = useNavigate();
	const { data, isPending } = CartServices.get();
	const { itemList: cartItems = [] } = data || {};
	const { mutate: removeFromCart, isPending: isRemoving } =
		CartServices.remove();
	const {data: addresses, isPending: IsLoadingAddr} = AddressServices.getAll();

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
	return (
		<Container>
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
													<ToggleBtn
														onClick={() => toggleExclude(item?._id)}
														$isExcluded={excludedItems.includes(item?._id)}
													>
														{excludedItems.includes(item?._id) ? (
															<MdOutlineToggleOff />
														) : (
															<MdOutlineToggleOn />
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
					<AddressSelect $isLoading={IsLoadingAddr} $isEmpty={!addresses?.length}>
						<h3>Delivery Address</h3>

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
							<h3 className="mb-[24px] font-semibold text-[18px] note">
								Order summary
							</h3>

							<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] note_sc">
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									Subtotal
								</p>
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									$99.00
								</p>
							</div>

							<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									Tax estimate
								</p>
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									$8.32
								</p>
							</div>

							<div className="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top total_sc">
								<p>Order total</p>
								<p>$112.32</p>
							</div>

							<Footer>
								<button onClick={() => {}} className="btn btn_checkout">
									Checkout
								</button>

								<button onClick={() => {}} className="btn btn_continue">
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
