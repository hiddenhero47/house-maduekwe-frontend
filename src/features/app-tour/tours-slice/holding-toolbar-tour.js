import { runTour } from '../driver';

export const runHoldingToolbarTour = () => {
	runTour({
		tourKey: 'holding-toolbar-v1',
		options: {
			allowClose: true,
			overlayClickBehavior: 'nextStep',
		},
		steps: [
			{
				element: '#holdingToolbar',
				popover: {
					title: 'Your Holding',
					description: 'Products you save for Guest Checkout appear here.',
					side: 'left',
					align: 'center',
				},
			},
			{
				element: '#holdingToolbar',
				popover: {
					title: 'Move It Anywhere',
					description:
						'Press and hold to drag the toolbar anywhere on your screen.',
					side: 'left',
					align: 'center',
				},
			},
			{
				element: '#holdingToolbar',
				popover: {
					title: 'Open Holding',
					description:
						'Double-click the toolbar to review or checkout your saved products.',
					side: 'left',
					align: 'center',
				},
			},
		],
	});
};
