import * as Yup from 'yup';
import { attributeType } from '../../utilities/app-const';

export const attributeValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required('A name is needed for this attribute')
		.min(1, 'Name cannot be empty')
		.max(100, 'Name is too long'),

	value: Yup.mixed()
		.test(
			'is-string-or-number',
			'Value must be a string or a number',
			(val) => typeof val === 'string' || typeof val === 'number'
		)
		.required('A value is needed for this attribute'),

	type: Yup.string()
		.oneOf(Object.values(attributeType), 'Invalid attribute type')
		.required('Attribute type is needed'),

	display: Yup.mixed()
		.test(
			'is-string-or-array-of-strings',
			'Display must be a string or an array of strings',
			(val) =>
				typeof val === 'string' ||
				(Array.isArray(val) && val.every((item) => typeof item === 'string'))
		)
		.default(''),
});
