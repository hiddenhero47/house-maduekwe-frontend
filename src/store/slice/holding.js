import { createSlice } from '@reduxjs/toolkit';

// Generate a temporary unique ID for local tracking
const generateTempId = () =>
	`${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const initialState = {
	holdings: [],
};

const holdingSlice = createSlice({
	name: 'holdings',
	initialState,
	reducers: {
		// ➕ Add an item to holdings
		addToHoldings: (state, action) => {
			const {
				shopItem,
				quantity = 1,
				selectedAttributes = [],
			} = action.payload;

			const newItem = {
				tempId: generateTempId(),
				shopItem, // full object used for UI display
				quantity,
				selectedAttributes,
			};

			state.holdings.push(newItem);
		},

		// ❌ Remove an item by its temporary ID
		removeFromHoldings: (state, action) => {
			const { tempId } = action.payload;
			state.holdings = state.holdings.filter((item) => item.tempId !== tempId);
		},

		// 🧹 Clear all holdings
		clearHoldings: (state) => {
			state.holdings = [];
		},
	},
});

// ✅ Selector for backend-ready data
export const selectPreparedHoldings = (state) =>
	state.holdings.holdings.map((item) => ({
		shopItemId: item.shopItem._id,
		quantity: item.quantity,
		selectedAttributes: item.selectedAttributes,
	}));

export const { addToHoldings, removeFromHoldings, clearHoldings } =
	holdingSlice.actions;

export default holdingSlice.reducer;
