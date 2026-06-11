import React from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../../../layouts/toast/toast-handler';

function StripePaymentForm({
	isPaying,
	setIsPaying,
	setError,
	PayNowBtn,
	BubbleSlide,
}) {
	const navigate = useNavigate();

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
				console.log('Payment success 🎉', paymentIntent);
				toast.success('Payment success 🎉');
				navigate('/settings?currentSettings=orders');
			}
		} catch {
			setError('Something went wrong during payment.');
		} finally {
			setIsPaying(false);
		}
	};

	return (
		<div className='flex flex-col w-full gap-[20px]'>
			<div className="w-full">
				<PaymentElement />
			</div>

			<PayNowBtn type="button" onClick={handlePayment} $isLoading={isPaying}>
				<div className="content">Confirm & Pay</div>
				<div className="loader">
					<BubbleSlide height="25px" />
				</div>
			</PayNowBtn>
		</div>
	);
}

export default StripePaymentForm;
