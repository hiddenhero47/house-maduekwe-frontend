import * as Yup from 'yup';

export const guestCheckoutValidationSchema = Yup.object({
	consigneesName: Yup.string()
		.trim()
		.required("Consignee's full name is required"),
	email: Yup.string()
		.trim()
		.email('Enter a valid email address')
		.required('Email is required'),
	phoneNumber: Yup.object({
		number: Yup.string().trim().required('Phone number is required'),
		country: Yup.string()
			.trim()
			.uppercase()
			.matches(
				/^[A-Z]{2}$/,
				'Phone country must be a valid 2-letter country code'
			)
			.required('Phone country is required'),
	})
		.nullable()
		.notRequired(),
	country: Yup.string().required('Country is required'),
	state: Yup.string().required('State is required'),
	city: Yup.string().required('City is required'),
	zipCode: Yup.string().optional(),
	stateLine: Yup.string().optional(),
	fullAddress: Yup.string().trim().required('Full address is required'),
});
