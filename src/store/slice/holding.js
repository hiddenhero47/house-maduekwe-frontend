import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../utilities/basic-functions';

const HOLDINGS_STORAGE_KEY = 'holdings';
const HOLDING_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

const isExpired = (item) => Date.now() >= item.expiresAt;

const removeExpiredItems = (holdings) =>
	holdings.filter((item) => !isExpired(item));

const saveHoldings = (holdings) => {
	localStorage.setItem(
		HOLDINGS_STORAGE_KEY,
		JSON.stringify(removeExpiredItems(holdings))
	);
};

const loadHoldings = () => {
	const stored = getFromLocalStorage(HOLDINGS_STORAGE_KEY);
	if (!stored) return [];
	try {
		const holdings = JSON.parse(stored);
		const validHoldings = removeExpiredItems(holdings);
		// Keep localStorage clean
		saveHoldings(validHoldings);
		return validHoldings;
	} catch {
		localStorage.removeItem(HOLDINGS_STORAGE_KEY);
		return [];
	}
};

// Generate a temporary unique ID for local tracking
const generateTempId = () =>
	`${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const initialState = {
	holdings: loadHoldings(),
	show: false,
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

			const holdings = removeExpiredItems(state.holdings);

			holdings.push({
				tempId: generateTempId(),
				expiresAt: Date.now() + HOLDING_EXPIRY_MS,
				shopItem,
				quantity,
				selectedAttributes,
			});

			state.holdings = holdings;
			saveHoldings(state.holdings);
		},

		// ❌ Remove an item by its temporary ID
		removeFromHoldings: (state, action) => {
			const { tempId } = action.payload;
			state.holdings = removeExpiredItems(state.holdings).filter(
				(item) => item.tempId !== tempId
			);
			saveHoldings(state.holdings);
		},

		// 🧹 Clear all holdings
		clearHoldings: (state) => {
			state.holdings = [];
			saveHoldings([]);
		},

		// open / close / toggle / change
		openMenu: (state, action) => {
			state.holdings = removeExpiredItems(state.holdings);
			saveHoldings(state.holdings);
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
		resetHolding: () => {
			saveHoldings([]);
			return {
				...initialState,
				holdings: [],
			};
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
