import React from 'react';
import {
	Container,
	PageWrapper,
	Header,
	Section,
	StatusPill,
	ShopItem,
	Color,
	Size,
	SpanStatus,
	OrderActions,
	ActionButton,
} from './elements/index.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../utilities/city-state-country';
import { OrderServices } from '../../features/services/custom-hooks/orders';
import { groupAttributesByType } from '../../utilities/basic-functions';
import {
	attributeType,
	ORDER_STATUS,
	CHECKOUT_TYPES,
} from '../../utilities/app-const';
import CandleWrapper from '../../components/loaders/candles/Candle';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';

function Index() {
	const navigate = useNavigate();
	const location = useLocation();
	const query = new URLSearchParams(location.search);

	const orderId = query.get('orderId');
	const email = query.get('email');
	const { data, isPending } = OrderServices.getOnePublic(orderId);
	const { order, payment } = data || {};

	const { mutate: cancelOrder, isPending: isCanceling } =
		OrderServices.cancelExpiredGuest();

	const getImage = (currentItem) => {
		const grouped =
			groupAttributesByType(currentItem?.selectedAttributes || {}) || {};

		const colorList = grouped[attributeType.COLOR] || [];

		return (
			colorList?.[0]?.images?.[0]?.url ||
			currentItem?.shopItem?.placeHolder?.url ||
			currentItem?.shopItem?.imageCatalog?.[0]?.url ||
			null
		);
	};

	const getDisplay = (currentItem, key) => {
		const grouped =
			groupAttributesByType(currentItem?.selectedAttributes || {}) || {};
		const attList = grouped[key] || [];
		return attList?.[0]?.Attribute?.display;
	};

	return (
		<Container className="Y_scroll_style">
			<PageWrapper>
				{isPending && (
					<div className="loading_wrapper">
						<CandleWrapper color="var(--mainBody-sbKitText)" />
					</div>
				)}

				{!isPending && (
					<>
						{order?.status === ORDER_STATUS.PENDING && (
							<OrderActions>
								<div className="info">
									<span className="title">Pending Payment</span>

									<p>
										This order is awaiting payment confirmation. You can cancel
										the order or continue payment.
									</p>
								</div>

								<div className="actions">
									<ActionButton
										type="button"
										$variant="danger"
										$isLoading={isCanceling}
										onClick={() => cancelOrder({email: order?.userEmail || email})}
									>
										<div className="content">Cancel</div>

										<div className="loader">
											<BubbleSlide color="var(--mainBody-text)" height="16px" />
										</div>
									</ActionButton>

									<ActionButton
										type="button"
										onClick={() =>
											navigate(
												`/checkout/${order._id}?checkoutType=${CHECKOUT_TYPES.GUEST}`
											)
										}
									>
										<div className="content">Pay Now</div>

										<div className="loader">
											<BubbleSlide
												color="var(--addToCart-text)"
												height="16px"
											/>
										</div>
									</ActionButton>
								</div>
							</OrderActions>
						)}

						<Header>
							<div>
								<p className="header_label">Order Reference</p>

								<p className="header_Value">#{order?._id}</p>
							</div>

							<StatusPill $status={order?.status}>{order?.status}</StatusPill>
						</Header>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Consignee</h3>

								<p className="section_Value">{order?.consigneesName}</p>
							</div>

							<div className="cubicle">
								<h3 className="section_title">Email</h3>

								<p className="section_Value">{order?.email}</p>
							</div>

							<div className="cubicle">
								<h3 className="section_title">Phone</h3>

								<p className="section_Value">{order?.phoneNumber || 'N/A'}</p>
							</div>
						</Section>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Shipping Address</h3>

								<p className="section_Value capitalize">
									{order?.address?.fullAddress} {order?.address?.city}
									<br />
									<span className="text-[var(--mainBody-sbKitText)]">
										{order?.address?.state}
										{', '}
										{getCountryByCode(order?.address?.country)?.name}
									</span>
								</p>
							</div>
						</Section>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Shipping Fee</h3>

								<p className="section_Value">
									{order?.shippingFee} {payment?.currency}
								</p>
							</div>

							<div className="cubicle">
								<h3 className="section_title flex items-center gap-[5px]">
									Payment Ref
									<SpanStatus $status={payment?.status}>
										{payment?.status}
									</SpanStatus>
								</h3>

								<p className="section_Value">#{payment?._id}</p>
							</div>
						</Section>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Total Amount</h3>

								<p className="section_Value">
									{payment?.amountToPay} {payment?.currency}
								</p>
							</div>
						</Section>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Company Name</h3>

								<p className="section_Value">
									{order?.shippingDetails?.company || 'N/A'}
								</p>
							</div>

							<div className="cubicle">
								<h3 className="section_title">Tracking Number</h3>

								<p className="section_Value">
									{order?.shippingDetails?.trackingNumber || 'N/A'}
								</p>
							</div>
						</Section>

						<Section>
							<div className="cubicle">
								<h3 className="section_title">Items</h3>

								<div className="w-full max-w-[650px] flex flex-col gap-[10px]">
									{(order?.items || []).map((item, index) => (
										<ShopItem key={item?._id || index}>
											<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
												<div className="imageHolder rounded-[inherit]">
													<img
														src={getImage(item)}
														alt={item?.shopItem?.name}
														onLoad={(e) => {
															const img = e.currentTarget;

															const ratio =
																img.naturalWidth / img.naturalHeight;

															img.style.objectPosition =
																ratio < 0.79 ? 'top' : 'center';
														}}
													/>
												</div>
											</div>

											<div className="info">
												<span className="name">{item?.shopItem?.name}</span>

												<span className="price">
													{item?.shopItem?.price} {item?.shopItem?.currency}
												</span>
											</div>

											<div className="ml-auto flex flex-col items-center gap-[10px]">
												<div className="nos">
													{item?.quantity} <span>Qty</span>
												</div>

												<div className="flex gap-[10px] items-center">
													<Size>
														{getDisplay(item, attributeType.SIZE) || 'N/A'}
													</Size>

													<Color
														$active
														$color={getDisplay(item, attributeType.COLOR) || ''}
													/>
												</div>
											</div>
										</ShopItem>
									))}
								</div>
							</div>
						</Section>
					</>
				)}
			</PageWrapper>
		</Container>
	);
}

export default Index;
