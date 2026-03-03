import React, { useState } from 'react';
import {
	Container,
	Card,
	ProviderRow,
	PaymentArea,
	SaveBtn,
} from './elements/index.style';
import Spinner from '../../components/loaders/spinners/Spinner';
import CustomSelect from '../../components/form-components/select/custom-select';

function Index() {
	const [provider, setProvider] = useState('');
	const [isCreatingIntent, setIsCreatingIntent] = useState(false);
	const [intentReady, setIntentReady] = useState(false);

	const providerOptions = [
		{ label: 'Stripe', value: 'stripe' },
		{ label: 'Paystack', value: 'paystack' },
	];

	const handleCreateIntent = () => {
		setIsCreatingIntent(true);

		setTimeout(() => {
			setIsCreatingIntent(false);
			setIntentReady(true);
		}, 1500);
	};

	return (
		<Container>
			<h1 className="text-[28px] font-[Audiowide]">Checkout</h1>

			<div className='left_side'>
				{/* Order Summary */}
				<Card>
					<h3 className="font-semibold text-[16px]">Order Summary</h3>

					<div className="flex justify-between text-sm">
						<span>Subtotal</span>
						<span>$99.00</span>
					</div>

					<div className="flex justify-between text-sm">
						<span>Tax</span>
						<span>$8.00</span>
					</div>

					<div className="flex justify-between font-semibold border-t pt-3">
						<span>Total</span>
						<span>$107.00</span>
					</div>
				</Card>

				{/* Payment Provider */}
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
						>
							<div className="content">Initialize Payment</div>

							<div className="loader">
								<Spinner thin="28px" />
							</div>
						</SaveBtn>
					</ProviderRow>

					<PaymentArea>
						{!intentReady && (
							<span className="text-sm text-[var(--mainBody-sbText)]">
								Select provider and initialize payment
							</span>
						)}

						{intentReady && provider === 'stripe' && (
							<div className="w-full">
								{/* Stripe Elements Mount Point */}
								<div id="stripe-element" className="w-full" />
							</div>
						)}
					</PaymentArea>

					{intentReady && (
						<SaveBtn>
							<div className="content">Confirm & Pay</div>
						</SaveBtn>
					)}
				</Card>
			</div>
		</Container>
	);
}

export default Index;
