// src/redux/slices/dragSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null, // payload being dragged
	dragType: null, // e.g. "product", "attribute", etc.
	dragStart: false, // true while dragging
	dragEnd: false, // true after drag ends
};

const dragSlice = createSlice({
	name: 'dragBoard',
	initialState,
	reducers: {
		// 🏁 Begin dragging
		startDrag: (state, action) => {
			const { dragType } = action.payload;
			state.dragType = dragType || null;
			state.dragStart = true;
			state.dragEnd = false;
		},

		// 🛑 End dragging (user released mouse)
		endDrag: (state, action) => {
			const { data } = action.payload;
			state.data = data;
			state.dragStart = false;
			state.dragEnd = true;
		},

		// ♻️ Reset everything manually
		resetDrag: () => initialState,
	},
});

export const { startDrag, endDrag, resetDrag } = dragSlice.actions;
export default dragSlice.reducer;
