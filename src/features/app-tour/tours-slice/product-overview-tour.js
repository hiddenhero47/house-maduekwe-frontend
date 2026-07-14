import { runTour } from '../driver';

export const runHoldButtonTour = () => {
	runTour({
		tourKey: 'product-hold-button-v1',
		options: {
			allowClose: true,
			overlayClickBehavior: 'nextStep',
		},
		steps: [
			{
				element: '#holdForGuestCheckout',
				popover: {
					title: 'Hold for Guest Checkout',
					description: `Click this button to save the selected product for Guest Checkout. 
                    Your saved items stay together, so you can review and purchase them later without creating an account.`,
					side: 'top',
					align: 'center',
				},
			},
		],
	});
};
