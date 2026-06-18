import { createSlice } from '@reduxjs/toolkit';

// Generate a temporary unique ID for local tracking
const generateTempId = () =>
	`${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const initialState = {
	holdings: [],
	show: true,
	isOpen: false,
	stage: 'display',
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

		// open / close / toggle / change
		openMenu: (state, action) => {
			state.isOpen = true;
			state.stage = action.payload ?? state.stage;
		},
		closeMenu: (state) => {
			state.stage = 'display';
			state.isOpen = false;
		},
		toggleMenu: (state) => {
			state.isOpen = !state.isOpen;
		},
		changeStage: (state, action) => {
			state.stage = action?.payload;
		},

		// 👁️ Show / hide / toggle
		showHoldings: (state) => {
			state.show = true;
		},
		hideHoldings: (state) => {
			state.show = false;
		},
		toggleHoldings: (state) => {
			state.show = !state.show;
		},

		resetHolding: () => ({ ...initialState }),
	},
});

// ✅ Selector for backend-ready data
export const selectPreparedHoldings = (state) =>
	state.holdings.holdings.map((item) => ({
		shopItemId: item.shopItem._id,
		quantity: item.quantity,
		selectedAttributes: item.selectedAttributes,
	}));

// ✅ Export actions
export const {
	addToHoldings,
	removeFromHoldings,
	clearHoldings,
	showHoldings,
	hideHoldings,
	toggleHoldings,
	openMenu,
	closeMenu,
	toggleMenu,
	changeStage,
	resetHolding,
} = holdingSlice.actions;

export default holdingSlice.reducer;
