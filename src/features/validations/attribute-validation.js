import * as Yup from 'yup';
import { attributeType } from '../../utilities/app-const';

export const attributeValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required('A name is needed for this attribute')
		.min(1, 'Name cannot be empty')
		.max(100, 'Name is too long'),

	type: Yup.string()
		.oneOf(Object.values(attributeType), 'Invalid attribute type')
		.required('Attribute type is needed'),

	value: Yup.mixed()
		.required('A value is needed for this attribute')
		.test(
			'is-valid-value',
			'Value must be a string or number',
			(val) => typeof val === 'string' || typeof val === 'number'
		),

	isMixed: Yup.boolean(),

	display: Yup.string().when('isMixed', {
		is: false,
		then: (schema) =>
			schema
				.trim()
				.required('Display value is required')
				.min(1, 'Display cannot be empty'),
		otherwise: (schema) => schema.notRequired(),
	}),

	multiDisplay: Yup.array()
		.of(Yup.string().trim().min(1, 'Display values cannot be empty'))
		.when('isMixed', {
			is: true,
			then: (schema) =>
				schema
					.min(1, 'At least one display value is required')
					.required('Display values are required'),
			otherwise: (schema) => schema.notRequired(),
		}),
});
