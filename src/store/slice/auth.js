import { createSlice } from '@reduxjs/toolkit';
import { roleType } from '../../utilities/app-const';

export const ensureUser = (next, fallback) => (dispatch, getState) => {
	const { user, token } = getState().auth;

	const isAuthenticated =
		Boolean(token) &&
		user &&
		typeof user === 'object' &&
		Object.keys(user).length > 0;

	if (isAuthenticated) {
		next?.();
	} else {
		fallback?.();
	}
};

export const ensureRole =
	(allowedRoles = [], next, fallback) =>
	(dispatch, getState) => {
		const { user, token } = getState().auth;

		// 1. Must be authenticated first
		if (!token || !user || !user.role) {
			fallback?.();
			return;
		}

		// 2. Role check (matches Mongoose enum)
		if (allowedRoles.includes(user.role)) {
			next?.();
		} else {
			fallback?.();
		}
	};

const initialState = {
	user: {},
	token: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},

		setToken: (state, action) => {
			state.token = action.payload;
		},

		updateUser: (state, action) => {
			const updates = action.payload || {};

			Object.keys(updates).forEach((key) => {
				const value = updates[key];
				// only update if value is not null or undefined
				if (value !== null && value !== undefined) {
					state.user[key] = value;
				}
			});
		},

		logout: () => {
			// intentionally left blank. It works to trigger the root reducer state purge.
			return initialState;
		},
	},
});

export const selectUser = (state) => state.auth;

export const { logout, setUser, setToken, updateUser } = authSlice.actions;

export default authSlice.reducer;
