import {
	configureStore,
	combineReducers,
} from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import themes from './slice/app-theme';

// Combine all reducers
const appReducer = combineReducers({
	themes,
});

// Create a no-op storage for environments without `window` (e.g., server-side rendering)
const createNoopStorage = () => ({
	getItem() {
		return Promise.resolve(null);
	},
	setItem(_, value) {
		return Promise.resolve(value);
	},
	removeItem() {
		return Promise.resolve();
	},
});

// Select appropriate storage for Redux Persist
const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage();

// Persist configuration
const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['other'], // Specify state slices to exclude from persistence
};

// Root reducer with logout handling
const rootReducer = (state, action) => {
	if (action.type === 'auth/logout') {
		// Clear persisted state and reset Redux store
		storage.removeItem('persist:root');
		localStorage.clear();
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: import.meta.env.NODE_ENV !== 'production', // Enable dev tools in non-production environments
});

// Create Persistor
export const persistor = persistStore(store);

// Optional: Setup Redux Toolkit query listeners
setupListeners(store.dispatch);
