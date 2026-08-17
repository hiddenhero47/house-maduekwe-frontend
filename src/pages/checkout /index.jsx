import React, { useState, useMemo } from 'react';
import {
	Container,
	Card,
	Summary,
	ProviderRow,
	PaymentArea,
	SaveBtn,
	PayNowBtn,
} from './elements/index.style';
import Spinner from '../../components/loaders/spinners/Spinner';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import CustomSelect from '../../components/form-components/select/custom-select';
import PaymentServices from '../../features/services/custom-hooks/payments';
import { OrderServices } from '../../features/services/custom-hooks/orders';
import PaymentProviderServices from '../../features/services/custom-hooks/payment-providers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import StripePaymentForm from './elements/stripe/strip-form';
import { getCurrencySymbol } from '../../utilities/basic-functions';
import { useSelector, useDispatch } from 'react-redux';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Index() {
	const query = new URLSearchParams(location.search);
	
	const { theme } = useSelector((state) => state.themes);

	const { orderId } = useParams();

	const checkoutType = query.get('checkoutType');

	const { data, isPending } = OrderServices.useGetOrder(orderId, checkoutType);

	const { order, payment } = data || {};

	const { data: providers } = PaymentProviderServices.getClient();

	const { mutateAsync: createStripeIntent, isPending: isCreatingIntent } =
		PaymentServices.createStripeIntent();

	const [clientData, setClientData] = useState(null);
	const [provider, setProvider] = useState('');
	const [isPaying, setIsPaying] = useState(false);
	const [error, setError] = useState('');

	const providerOptions = useMemo(() => {
		if (!providers) return [];

		return providers?.map((prov) => ({
			label: prov?.provider,
			value: prov?.provider,
		}));
	}, [providers]);

	const handleCreateIntent = async () => {
		if (provider !== 'stripe') return;

		setError('');

		try {
			const res = await createStripeIntent({
				paymentId: payment?._id,
			});

			// assuming backend returns { clientSecret }
			setClientData(res);
		} catch (err) {
			setError('Failed to initialize Stripe.');
		}
	};

	return (
		<Container>
			<h1 id="title_small" className="text-[28px] font-[Audiowide] mb-[32px]">
				Checkout
			</h1>

			<div id="main_body">
				{/* Payment Provider */}
				<div id="payment_wrapper" className="main_box flex flex-col">
					<h1 id="title_big" className="text-[28px] font-[Audiowide] mb-[32px]">
						Checkout
					</h1>

					<Card>
						<h3 className="font-semibold text-[16px]">Payment Method</h3>

						<ProviderRow>
							<div className="form_control">
								<label>Provider</label>
								<CustomSelect
									value={provider}
									onChange={(v) => setProvider(v)}
									options={providerOptions}
									placeholder="Select payment provider"
									useBackground
									paddingX="14px"
									paddingY="9px"
								/>
							</div>

							<SaveBtn
								onClick={handleCreateIntent}
								$isLoading={isCreatingIntent}
								disabled={!provider}
								type="button"
							>
								<div className="content">Initialize Payment</div>

								<div className="loader">
									<BubbleSlide color="var(--addToCart-text)" height="20px" />
								</div>
							</SaveBtn>
						</ProviderRow>

						{!clientData && (
							<PaymentArea>
								<span className="text-sm text-[var(--mainBody-sbText)]">
									Select Stripe and initialize payment
								</span>
							</PaymentArea>
						)}

						{clientData?.clientSecret && (
							<Elements
								stripe={stripePromise}
								options={{
									clientSecret: clientData?.clientSecret,
									appearance: { theme: theme === 'dark' ? 'night' : 'stripe' },
								}}
							>
								<PaymentArea>
									<StripePaymentForm
										isPaying={isPaying}
										setIsPaying={setIsPaying}
										setError={setError}
										PayNowBtn={PayNowBtn}
										BubbleSlide={BubbleSlide}
										order={order}
										payment={payment}
									/>
								</PaymentArea>
							</Elements>
						)}

						{error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
					</Card>
				</div>

				{/* Order Summary */}
				<Summary className="main_box">
					<div>
						<h3>Order Summary</h3>
						<p className="items_count">
							{order?.items?.length || 'Nill'} items in cart
						</p>
					</div>

					<div className="breakdown">
						<div className="row">
							<span className="label">Subtotal</span>
							<span className="value">
								{getCurrencySymbol(payment?.currency) || '$'}{' '}
								{order?.totalAmount || 'Nill'}
							</span>
						</div>

						<div className="row">
							<span className="label">Shipping</span>
							<span className="value">
								{getCurrencySymbol(payment?.currency) || '$'}
								{order?.shippingFee}
							</span>
						</div>

						<div className="row">
							<span className="label">Tax</span>
							<span className="value">
								{getCurrencySymbol(payment?.currency) || '$'}{' '}
								{order?.totalVat || 'Nill'}
							</span>
						</div>
					</div>

					<div className="divider" />

					<div className="total_box">
						<span>Total</span>
						<span>
							{getCurrencySymbol(payment?.currency) || '$'}{' '}
							{payment?.amountToPay || 'Nill'}
						</span>
					</div>

					<p className="secure_note">
						Secure checkout powered by your selected provider
					</p>
				</Summary>
			</div>
		</Container>
	);
}

export default Index;
