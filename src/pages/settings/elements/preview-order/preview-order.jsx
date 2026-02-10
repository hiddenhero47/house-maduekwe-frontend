import React from 'react';
import {
	PageWrapper,
	Header,
	Section,
	StatusPill,
	ShopItem,
	Color,
	Size,
} from './preview-order.style';

function OrderPreview({ orderId }) {
	const image =
		'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg';
	return (
		<PageWrapper>
			<Header>
				<div>
					<p className="header_label">Order reference</p>
					<p className="header_Value">#6983be857e5ccacc13888ebf</p>
				</div>

				<StatusPill $status={'processing'}>processing</StatusPill>
			</Header>

			<Section>
				<div className="cubicle">
					<h3 className="section_title">Customer</h3>
					<p className="section_Value">charlesokonkwo74@gmail.com</p>
				</div>

				<div className="cubicle">
					<h3 className="section_title">Shipping address</h3>
					<p className="section_Value capitalize">
						121 ugwuoba street, independence layout enugu. <br />
						enugu state nigeria
					</p>
				</div>
			</Section>

			<Section>
				<div className="cubicle">
					<h3 className="section_title">Shipping Fee</h3>
					<p className="section_Value capitalize">10 USD</p>
				</div>

				<div className="cubicle">
					<h3 className="section_title">Payment Ref</h3>
					<p className="section_Value">#6983be857e5ccacc13888ebf</p>
				</div>
			</Section>

			<Section>
				<div className="cubicle">
					<h3 className="section_title">Total Amount</h3>
					<p className="section_Value">200 USD</p>
				</div>
			</Section>

			<Section>
				<div className="cubicle">
					<h3 className="section_title">Items</h3>
					<div className="w-[100%] max-w-[600px] flex flex-col gap-[10px]">
						<ShopItem>
							<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
								<div className="imageHolder rounded-[inherit]">
									<img src={image} alt="Error" />
								</div>
							</div>

							<div className="info">
								<span className="name">Basic Tee 6-Pack</span>
								<span className="price">192 USD</span>
							</div>

							<div className="ml-[auto] flex flex-col items-center gap-[5px]">
								<div className="nos">
									{' '}
									1 <span>Qty</span>
								</div>
								<div className="flex gap-[10px] items-center">
									<Size>M</Size> <Color $color={'#5b594f'} $active={true} />
								</div>
							</div>
						</ShopItem>

						<ShopItem>
							<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
								<div className="imageHolder rounded-[inherit]">
									<img src={image} alt="Error" />
								</div>
							</div>

							<div className="info">
								<span className="name">Basic Tee 6-Pack</span>
								<span className="price">192 USD</span>
							</div>

							<div className="ml-[auto] flex flex-col items-center gap-[5px]">
								<div className="nos">
									{' '}
									1 <span>Qty</span>
								</div>
								<div className="flex gap-[10px] items-center">
									<Size>XXL</Size> <Color $color={'#5b594f'} $active={true} />
								</div>
							</div>
						</ShopItem>
					</div>
				</div>
			</Section>
		</PageWrapper>
	);
}

export default OrderPreview;
