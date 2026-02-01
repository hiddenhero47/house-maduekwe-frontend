import * as Yup from 'yup';
import { roleType } from '../../utilities/app-const';

export const userValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required('Please add a name')
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name is too long'),

	email: Yup.string()
		.trim()
		.email('Invalid email address')
		.required('Please add an email'),

	password: Yup.string()
		.required('Please add a password')
		.min(8, 'Password must be at least 8 characters')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number'),

	role: Yup.string()
		.oneOf(Object.values(roleType), 'Invalid role')
		.default(roleType.BASIC),

	phoneNumber: Yup.object()
		.shape({
			number: Yup.string()
				.trim()
				.matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
				.nullable(),

			country: Yup.string()
				.trim()
				.uppercase()
				.matches(
					/^[A-Z]{2}$/,
					'Phone country must be a valid 2-letter country code (e.g. NG, US)'
				)
				.nullable(),
		})
		.nullable(),

	authProviders: Yup.array()
		.of(
			Yup.object().shape({
				provider: Yup.string()
					.oneOf(['local', 'google', 'apple'])
					.required('Auth provider is required'),

				providerId: Yup.string().required('Provider ID is required'),
			})
		)
		.default([]),
});
