import * as Yup from 'yup';
import { ItemStatusType } from '../../utilities/app-const';

// ✅ Regex for Mongo ObjectId (24 hex characters)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// ✅ Helper for ObjectId validation
const objectIdValidation = Yup.string()
	.matches(objectIdRegex, 'Invalid ID')
	.required('ID is required');

// Attribute schema
export const attributeValidationSchema = Yup.object().shape({
	Attribute: objectIdValidation,
	isDefault: Yup.boolean(),
	quantity: Yup.number()
		.typeError('Quantity must be a number')
		.min(0, 'Quantity cannot be negative'),
	additionalAmount: Yup.number()
		.typeError('Additional amount must be a number')
		.min(0, 'Additional amount cannot be negative'),
});

// Main shop item schema
export const shopItemValidationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	brand: Yup.string(),
	status: Yup.string()
		.oneOf(Object.values(ItemStatusType), 'Invalid status')
		.required('Status is required'),
	description: Yup.string(),
	price: Yup.number()
		.typeError('Price must be a number')
		.required('Price is required')
		.min(0, 'Price cannot be negative'),
	vat: Yup.number()
		.typeError('VAT must be a number')
		.required('VAT is required')
		.min(0, 'VAT cannot be negative'),
	currency: Yup.string().required('Currency is required'),
	category: objectIdValidation,
	subCategory: Yup.string(),
	quantity: Yup.number()
		.typeError('Quantity must be a number')
		.required('Quantity is required')
		.min(0, 'Quantity cannot be negative'),
	attributes: Yup.array()
		.of(attributeValidationSchema)
		.test(
			'single-default',
			'Only one attribute can be marked as default',
			(attrs) => {
				if (!attrs) return true;
				const defaultCount = attrs.filter((a) => a.isDefault).length;
				return defaultCount <= 1;
			}
		),
	discount: Yup.number()
		.typeError('Discount must be a number')
		.min(0, 'Discount cannot be negative')
		.default(0),
	highlights: Yup.array().of(Yup.string()),
	classTags: Yup.array().of(Yup.string()),
});
