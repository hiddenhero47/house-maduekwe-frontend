import * as Yup from 'yup';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const consigneesNameValidation = Yup.object({
	firstName: Yup.string()
		.trim()
		.min(1, 'First name is too short')
		.max(50, 'First name is too long')
		.required('First name is required'),
	lastName: Yup.string()
		.trim()
		.min(1, 'Last name is too short')
		.max(50, 'Last name is too long')
		.required('Last name is required'),
}).required("Please provide the consignee's name");

export const checkoutValidationSchema = Yup.object({
	itemList: Yup.array()
		.of(Yup.string().matches(objectIdRegex, 'Invalid cart item id').required())
		.min(1, 'At least one item is required')
		.required('Item list is required'),

	consigneesName: consigneesNameValidation,

	selectedAddress: Yup.string()
		.matches(objectIdRegex, 'Invalid address id')
		.nullable()
		.notRequired()
		.required('Shipping address is required'),
});

export const nameValidationSchema = Yup.object({
	name: Yup.string()
		.trim()
		.min(1, 'Name is too short')
		.max(50, 'Name is too long')
		.required('Please provide a name'),
});
