import React, { useState } from 'react';
import {
	Container,
	Header,
	Section,
	StatusPill,
	ShopItem,
	Color,
	Size,
	SpanStatus,
	GhostButton,
} from './elements/index.style';
import { getCountryByCode } from '../../utilities/city-state-country';
import { OrderServices } from '../../features/services/custom-hooks/orders';
import { groupAttributesByType } from '../../utilities/basic-functions';
import { attributeType } from '../../utilities/app-const';
import CandleWrapper from '../../components/loaders/candles/Candle';
import { useParams, useNavigate } from 'react-router-dom';

function Index() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data, isPending } = OrderServices.getOne(id);
	const { order, payment } = data || {};

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
			<div className="flex items-center justify-between mb-[10px]">
				<h1>Order Details</h1>

				<GhostButton onClick={() => navigate(-1)}>← Back</GhostButton>
			</div>

			{isPending ? (
				<div className='m-[auto]'>
					<CandleWrapper color="var(--mainBody-sbKitText)" />
				</div>
			) : (
				<>
					{/* HEADER */}
					<Header>
						<div>
							<p className="header_label">Order reference</p>
							<p className="header_Value">#{order?._id}</p>
						</div>

						<StatusPill $status={order?.status}>{order?.status}</StatusPill>
					</Header>

					{/* CUSTOMER + ADDRESS */}
					<Section>
						<div className="cubicle">
							<h3 className="section_title">Customer</h3>
							<p className="section_Value">{order?.userEmail}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Shipping Address</h3>
							<p className="section_Value">
								{order?.address?.fullAddress} {order?.address?.city}
								<br />
								{order?.address?.state},{' '}
								{getCountryByCode(order?.address?.country)?.name}
							</p>
						</div>
					</Section>

					{/* PAYMENT DETAILS 🔥 */}
					<Section>
						<div className="cubicle">
							<h3 className="section_title">
								Payment Status{' '}
								<SpanStatus $status={payment?.status}>
									{payment?.status}
								</SpanStatus>
							</h3>
							<p className="section_Value">#{payment?._id}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Provider</h3>
							<p className="section_Value">{payment?.provider || 'N/A'}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Reference</h3>
							<p className="section_Value">{payment?.reference || 'N/A'}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Transaction Fee</h3>
							<p className="section_Value">
								{payment?.transactionFee} {payment?.currency}
							</p>
						</div>
					</Section>

					{/* ORDER FINANCIALS 🔥 */}
					<Section>
						<div className="cubicle">
							<h3 className="section_title">Total Amount</h3>
							<p className="section_Value">
								{order?.totalAmount} {payment?.currency}
							</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">VAT</h3>
							<p className="section_Value">{order?.totalVat}</p>
						</div>

						<div className="cubicle">
							<h3 className="section_title">Shipping Fee</h3>
							<p className="section_Value">
								{order?.shippingFee} {payment?.currency}
							</p>
						</div>
					</Section>

					{/* ITEMS */}
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
		</Container>
	);
}

export default Index;
