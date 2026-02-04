import * as Yup from 'yup';
import { roleType } from '../../utilities/app-const';

export const userLoginValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name is too long'),

	email: Yup.string()
		.trim()
		.lowercase() // 👈 THIS is what you were thinking of
		.email('Invalid email address')
		// optional extra strict regex (email-safe characters)
		.matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Invalid email format')
		.required('User email is required'),

	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number'),

	// OPTIONAL — backend can still default this
	role: Yup.string().oneOf(Object.values(roleType)).optional(),

	// OPTIONAL
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
		.nullable()
		.optional(),

	// OPTIONAL
	authProviders: Yup.array()
		.of(
			Yup.object().shape({
				provider: Yup.string().oneOf(['local', 'google', 'apple']).required(),

				providerId: Yup.string().required(),
			})
		)
		.optional(),
});

export const userCreateValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required('User name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name is too long'),

	email: Yup.string()
		.trim()
		.lowercase() // 👈 THIS is what you were thinking of
		.email('Invalid email address')
		// optional extra strict regex (email-safe characters)
		.matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Invalid email format')
		.required('User email is required'),

	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number'),

	// OPTIONAL — backend can still default this
	role: Yup.string().oneOf(Object.values(roleType)).optional(),

	// OPTIONAL
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
		.nullable()
		.optional(),

	// OPTIONAL
	authProviders: Yup.array()
		.of(
			Yup.object().shape({
				provider: Yup.string().oneOf(['local', 'google', 'apple']).required(),

				providerId: Yup.string().required(),
			})
		)
		.optional(),
});
