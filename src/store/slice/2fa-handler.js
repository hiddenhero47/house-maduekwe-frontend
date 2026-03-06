import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const twoFaHandlerSlice = createSlice({
	name: 'twoFaHandler',
	initialState,
	reducers: {
		handleOpen: (state, action) => {
			state.isOpen = action.payload;
		},

		reset2FaHandler: () => initialState,
	},
});

export const { reset2FaHandler, handleOpen } = twoFaHandlerSlice.actions;
export default twoFaHandlerSlice.reducer;
