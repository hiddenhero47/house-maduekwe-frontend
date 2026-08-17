import { runTour } from '../driver';

// export const runProductTour = () => {
// 	runTour({
// 		tourKey: 'products-v1',

// 		options: {
// 			allowClose: false,
// 			overlayClickBehavior: 'nextStep', // or 'close' (default)
// 		},

// 		steps: [
// 			{
// 				element: '#shopItem0',
// 				popover: {
// 					title: 'Browse Products',
// 					description: `Each product card is interactive. You can drag it, add it to your Holding list, 
// 						send it directly to your Cart, or open it for more details.`,
// 					side: 'bottom',
// 					align: 'center',
// 				},
// 			},
// 			{
// 				element: '#shopItem0_holding',
// 				onHighlightStarted: () => {
// 					document.querySelector('#shopItem0_holding')?.classList.add('show');
// 				},
// 				onDeselected: () => {
// 					document
// 						.querySelector('#shopItem0_holding')
// 						?.classList.remove('show');
// 				},
// 				popover: {
// 					title: 'Guest Checkout',
// 					description:
// 						'Click this Holding button to save the product for Guest Checkout. No account is required.',
// 					side: 'left',
// 					align: 'center',
// 				},
// 			},
// 			{
// 				element: '#shopItem0',
// 				popover: {
// 					title: 'Drag & Drop',
// 					description:
// 						'You can also drag a product anywhere on the page to quickly add it to your Holding list.',
// 					side: 'right',
// 					align: 'center',
// 				},
// 			},
// 			{
// 				element: '#myCart',
// 				popover: {
// 					title: 'Quick Add to Cart',
// 					description:
// 						'Drag a product onto the Cart icon to add it directly to your shopping cart.',
// 					side: 'bottom',
// 					align: 'center',
// 				},
// 			},
// 			{
// 				element: '#shopItem0',
// 				popover: {
// 					title: 'Open Product',
// 					description:
// 						'Double-click any product card to view its full details, images, sizes, and available options.',
// 					side: 'top',
// 					align: 'center',
// 				},
// 			},
// 		],
// 	});
// };

export const runProductTour = () => {
	runTour({
		tourKey: 'products-v2',

		options: {
			allowClose: false,
			overlayClickBehavior: 'nextStep',
		},

		steps: [
			{
				element: '#shopItem0',
				popover: {
					title: 'Browse Products',
					description:
						'Each product card is interactive. You can drag a product, add it to your Cart, or open it to view more details.',
					side: 'bottom',
					align: 'center',
				},
			},
			{
				element: '#shopItem0',
				popover: {
					title: 'Drag & Drop',
					description:
						'Press and drag a product anywhere on the page. You can use this to quickly add products to your cart.',
					side: 'right',
					align: 'center',
				},
			},
			{
				element: '#myCart',
				popover: {
					title: 'Quick Add to Cart',
					description:
						'Drag a product onto the Cart icon to quickly add it to your shopping cart.',
					side: 'bottom',
					align: 'center',
				},
			},
			{
				element: '#shopItem0',
				popover: {
					title: 'Open Product',
					description:
						'Click or Double-click a product to view its full details, images, sizes, colors, and available options.',
					side: 'top',
					align: 'center',
				},
			},
		],
	});
};
