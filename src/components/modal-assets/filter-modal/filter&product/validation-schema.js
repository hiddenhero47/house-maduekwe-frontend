import * as Yup from 'yup';

export const validationSchema = Yup.object({
	search: Yup.string().trim(),

	category: Yup.string().nullable(),
	subCategory: Yup.string().nullable(),

	colorAttributes: Yup.string().nullable(),
	sizeAttributes: Yup.string().nullable(),

	classTags: Yup.string().nullable(),

	minPrice: Yup.number()
		.typeError('Min price must be a number')
		.min(0, 'Min price cannot be negative')
		.notRequired(),

	maxPrice: Yup.number()
		.typeError('Max price must be a number')
		.min(0, 'Max price cannot be negative')
		.when('minPrice', {
			is: (val) => val !== '' && val !== null && val !== undefined,
			then: (schema) =>
				schema
					.required('Max price is required when min price is set')
					.min(Yup.ref('minPrice'), 'Max price must be ≥ min price'),
			otherwise: (schema) => schema.notRequired(),
		}),
});
