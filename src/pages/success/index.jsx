import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiCheckCircle, HiOutlineEnvelope } from 'react-icons/hi2';
import { FaArrowRightLong } from 'react-icons/fa6';
import {
	Container,
	Card,
	IconHolder,
	Title,
	SubTitle,
	Divider,
	Details,
	DetailRow,
	EmailNotice,
	ButtonGroup,
	PrimaryBtn,
	SecondaryBtn,
	OrderBadge,
} from './elements/index.style';
import { CHECKOUT_TYPES } from '../../utilities/app-const';

function Index() {
	const navigate = useNavigate();
	const location = useLocation();

	const query = new URLSearchParams(location.search);

	const amount = query.get('amount') || '--';
	const currency = query.get('currency') || '$';
	const orderId = query.get('orderId') || '--';
	const checkoutType = query.get('checkoutType');

	const isGuest = checkoutType === CHECKOUT_TYPES.GUEST;

	const formatAmount = (value) => {
		const number = Number(value);

		if (Number.isNaN(number)) {
			return `${currency}${value}`;
		}

		return `${currency}${number.toLocaleString()}`;
	};

	return (
		<Container className="Y_scroll_style">
			<Card className="Y_scroll_style">
				<div className='py-[20px]'>
					<div id="main_body">
						<IconHolder>
							<HiCheckCircle />
						</IconHolder>

						<Title>Payment Successful</Title>

						<SubTitle>
							Thank you for your purchase.
							<br />
							Your payment has been received successfully and your order is now
							being prepared.
						</SubTitle>

						<Divider />

						<Details>
							<h3>Order Details</h3>

							<DetailRow>
								<span>Amount Paid</span>

								<strong>{formatAmount(amount)}</strong>
							</DetailRow>

							<DetailRow>
								<span>Order ID</span>

								<strong>{orderId}</strong>
							</DetailRow>

							<DetailRow>
								<span>Checkout Type</span>

								<OrderBadge $guest={isGuest}>
									{isGuest ? 'Guest Checkout' : 'Registered User'}
								</OrderBadge>
							</DetailRow>
						</Details>

						<EmailNotice>
							<div className="icon">
								<HiOutlineEnvelope />
							</div>

							<div className="content">
								<h4>Confirmation Email Sent</h4>

								<p>
									A confirmation email containing your receipt and order
									information has been sent to your email address.
								</p>

								<span>
									You can use the email to keep track of your purchase and
									future updates.
								</span>
							</div>
						</EmailNotice>

						<ButtonGroup>
							{!isGuest && (
								<SecondaryBtn
									type="button"
									onClick={() => navigate('/settings?currentSettings=orders')}
								>
									View My Orders
								</SecondaryBtn>
							)}

							<PrimaryBtn type="button" onClick={() => navigate('/products')}>
								Continue Shopping
								<i>
									<FaArrowRightLong />
								</i>
							</PrimaryBtn>
						</ButtonGroup>
					</div>
				</div>
			</Card>
		</Container>
	);
}

export default Index;
