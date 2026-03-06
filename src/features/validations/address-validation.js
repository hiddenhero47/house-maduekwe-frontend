import * as Yup from 'yup';

export const addressValidationSchema = Yup.object().shape({
	city: Yup.string().trim().required('Please select a city for your address'),

	state: Yup.string().trim().required('Please select a state for your address'),

	country: Yup.string()
		.trim()
		.required('Please select a country for your address')
		.matches(
			/^[A-Z]{2}$/,
			'Country must be a valid 2-letter country code (e.g. NG, US)'
		),

	fullAddress: Yup.string()
		.trim()
		.required('Please add your full address description'),

	description: Yup.string().trim().optional(),

	coordinates: Yup.object({
		lat: Yup.number()
			.typeError('Latitude must be a number')
			.required('Latitude is required'),

		lng: Yup.number()
			.typeError('Longitude must be a number')
			.required('Longitude is required'),
	})
		.nullable()
		.notRequired()
		.default(undefined),

	isDefault: Yup.boolean().optional(),
});
