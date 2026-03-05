import React from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

function StripePaymentForm({
	isPaying,
	setIsPaying,
	setError,
	PayNowBtn,
	BubbleSlide,
}) {
	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = async () => {
		if (!stripe || !elements) return;

		setIsPaying(true);
		setError('');

		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				redirect: 'if_required',
			});

			if (error) {
				setError(error.message || 'Payment failed');
				return;
			}

			if (paymentIntent?.status === 'succeeded') {
				console.log('Payment success', paymentIntent);
			}
		} catch {
			setError('Something went wrong during payment.');
		} finally {
			setIsPaying(false);
		}
	};

	return (
		<>
			<div className="w-full">
				<PaymentElement />
			</div>

			<PayNowBtn type="button" onClick={handlePayment} $isLoading={isPaying}>
				<div className="content">Confirm & Pay</div>
				<div className="loader">
					<BubbleSlide height="25px" />
				</div>
			</PayNowBtn>
		</>
	);
}

export default StripePaymentForm;
