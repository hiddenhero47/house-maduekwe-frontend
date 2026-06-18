import * as Yup from 'yup';

export const guestCheckoutValidationSchema = Yup.object({
	fullName: Yup.string().trim().required("Consignee's full name is required"),

	email: Yup.string()
		.trim()
		.email('Enter a valid email address')
		.required('Email is required'),

	phoneNumber: Yup.string().nullable(),

	country: Yup.string().required('Country is required'),

	state: Yup.string().required('State is required'),

	city: Yup.string().required('City is required'),

	zipCode: Yup.string().nullable(),

	stateLine: Yup.string().nullable(),

	fullAddress: Yup.string().trim().required('Full address is required'),
});
