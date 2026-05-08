import React from 'react';
import {
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
} from './preview-order.style';
import { getCountryByCode } from '../../../../utilities/city-state-country';
import { OrderServices } from '../../../../features/services/custom-hooks/orders';
import { groupAttributesByType } from '../../../../utilities/basic-functions';
import { attributeType, ORDER_STATUS } from '../../../../utilities/app-const';
import CandleWrapper from '../../../../components/loaders/candles/Candle';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';

function OrderPreview({ orderId }) {
	const navigate = useNavigate();
	const { data, isPending } = OrderServices.getOne(orderId);
	const { order, payment } = data || {};

	const { mutate: cancelOrder, isPending: isCanceling } =
		OrderServices.cancel();

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
		<PageWrapper>
			{isPending && (
				<div className="countian">
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
									onClick={() => cancelOrder(order._id)}
								>
									<div className="content">Cancel</div>

									<div className="loader">
										<BubbleSlide color="var(--mainBody-text)" height="16px" />
									</div>
								</ActionButton>

								<ActionButton
									type="button"
									onClick={() => navigate(`/checkout/${order._id}`)}
								>
									<div className="content">Pay Now</div>

									<div className="loader">
										<BubbleSlide color="var(--addToCart-text)" height="16px" />
									</div>
								</ActionButton>
							</div>
						</OrderActions>
					)}
					<Header>
						<div>
							<p className="header_label">Order reference</p>
							<p className="header_Value">#{order?._id}</p>
						</div>

						<StatusPill $status={order?.status}>{order?.status}</StatusPill>
					</Header>

					<Section>
						<div className="cubicle">
							<h3 className="section_title">Customer</h3>
							<p className="section_Value">{order?.user?.email}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Shipping address</h3>
							<p className="section_Value capitalize">
								{order?.address?.fullAddress} {order?.address?.city} <br />
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
							<p className="section_Value capitalize">
								{order?.shippingFee} {payment?.currency}
							</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title flex items-center gap-[5px]">
								Payment Ref{' '}
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

					{/* SHIPPING DETAILS 🔥 */}
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
							<div className="w-[100%] max-w-[600px] flex flex-col gap-[10px]">
								{(order?.items || []).map((item, index) => (
									<ShopItem key={item?._id || index}>
										<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
											<div className="imageHolder rounded-[inherit]">
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
										</div>

										<div className="info">
											<span className="name">{item?.shopItem?.name}</span>
											<span className="price">
												{item?.shopItem?.price} {item?.shopItem?.currency}
											</span>
										</div>

										<div className="ml-[auto] flex flex-col items-center gap-[10px]">
											<div className="nos">
												{' '}
												{item?.quantity} <span>Qty</span>
											</div>
											<div className="flex gap-[10px] items-center">
												<Size>
													{getDisplay(item, attributeType.SIZE) || 'Nill'}
												</Size>{' '}
												<Color
													$color={getDisplay(item, attributeType.COLOR) || ''}
													$active={true}
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
	);
}

export default OrderPreview;
