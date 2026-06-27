import * as Yup from 'yup';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const checkoutValidationSchema = Yup.object({
	itemList: Yup.array()
		.of(Yup.string().matches(objectIdRegex, 'Invalid cart item id').required())
		.min(1, 'At least one item is required')
		.required('Item list is required'),

	consigneesName: Yup.string()
		.trim()
		.min(2, 'Consignee name is too short')
		.max(100, 'Consignee name is too long')
		.required('Please provide the full name of the consignee'),

	selectedAddress: Yup.string()
		.matches(objectIdRegex, 'Invalid address id')
		.nullable()
		.notRequired()
		.required('Shipping address is required'),
});

export const nameValidationSchema = Yup.object({
	name: Yup.string()
		.trim()
		.min(2, 'Consignee name is too short')
		.max(100, 'Consignee name is too long')
		.required('Please provide the full name of the consignee'),
});
