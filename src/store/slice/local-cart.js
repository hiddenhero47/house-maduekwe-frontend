import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../utilities/basic-functions';

const LOCAL_CART_STORAGE_KEY = 'local-cart';
const LOCAL_CART_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

const isExpired = (item) => Date.now() >= item.expiresAt;

const removeExpiredItems = (items) => items.filter((item) => !isExpired(item));

const saveLocalCart = (items) => {
	localStorage.setItem(
		LOCAL_CART_STORAGE_KEY,
		JSON.stringify(removeExpiredItems(items))
	);
};

const loadLocalCart = () => {
	const stored = getFromLocalStorage(LOCAL_CART_STORAGE_KEY);

	if (!stored) return [];

	try {
		const items = JSON.parse(stored);

		const validItems = removeExpiredItems(items);

		// Keep localStorage clean
		saveLocalCart(validItems);

		return validItems;
	} catch {
		localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
		return [];
	}
};

// Generate a temporary unique ID for local tracking
const generateTempId = () =>
	`${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const initialState = {
	items: loadLocalCart(),
	isOpen: false,
};

const localCartSlice = createSlice({
	name: 'localCart',
	initialState,

	reducers: {
		// ➕ Add an item to local cart
		addToLocalCart: (state, action) => {
			const {
				shopItem,
				quantity = 1,
				selectedAttributes = [],
			} = action.payload;

			const items = removeExpiredItems(state.items);

			items.push({
				tempId: generateTempId(),
				expiresAt: Date.now() + LOCAL_CART_EXPIRY_MS,
				shopItem,
				quantity,
				selectedAttributes,
			});

			state.items = items;

			saveLocalCart(state.items);
		},

		// ❌ Remove an item by its temporary ID
		removeFromLocalCart: (state, action) => {
			const { tempId } = action.payload;

			state.items = removeExpiredItems(state.items).filter(
				(item) => item.tempId !== tempId
			);

			saveLocalCart(state.items);
		},

		// 🧹 Clear all local cart items
		clearLocalCart: (state) => {
			state.items = [];

			saveLocalCart([]);
		},

		// Open / close / toggle guest checkout
		openGuestCheckout: (state) => {
			state.items = removeExpiredItems(state.items);

			saveLocalCart(state.items);

			state.isOpen = true;
		},

		closeGuestCheckout: (state) => {
			state.isOpen = false;
		},

		toggleGuestCheckout: (state) => {
			state.items = removeExpiredItems(state.items);

			saveLocalCart(state.items);

			state.isOpen = !state.isOpen;
		},

		// Reset the local cart
		resetLocalCart: () => {
			saveLocalCart([]);

			return {
				...initialState,
				items: [],
			};
		},
	},
});

// ✅ Selector for backend-ready data
export const selectPreparedLocalCart = (state) =>
	state.localCart.items.map((item) => ({
		shopItemId: item.shopItem._id,
		quantity: item.quantity,
		selectedAttributes: item.selectedAttributes,
	}));

// ✅ Export actions
export const {
	addToLocalCart,
	removeFromLocalCart,
	clearLocalCart,
	openGuestCheckout,
	closeGuestCheckout,
	toggleGuestCheckout,
	resetLocalCart,
} = localCartSlice.actions;

export default localCartSlice.reducer;
