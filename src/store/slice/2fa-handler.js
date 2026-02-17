import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	url: null,
	payload: null,
	options: null,
	isOpen: false,
};

const twoFaHandlerSlice = createSlice({
	name: 'twoFaHandler',
	initialState,
	reducers: {
		handle2FaError: (state, action) => {
            const { url, payload, options, isOpen } = action.payload;
            if (!url || !payload || !isOpen) return;
            state.url = url;
            state.payload = payload;
            state.isOpen = !!isOpen;
            state.options = options;
        },

        reset2FaHandler: () => initialState,
	},
});

export const { handle2FaError, reset2FaHandler } = twoFaHandlerSlice.actions;
export default twoFaHandlerSlice.reducer;
