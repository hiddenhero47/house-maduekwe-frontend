import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BrowserProvider } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import {
	initWcProviderEvents,
	clearWcSessions,
} from '../../features/web3-services/web3-utilities';
// import icon from '../../assets/images/raffle-icon5.png';

export const walletTypes = {
	Type1: 'injected',
	Type2: 'walletconnect',
};

const optionalChains = [1, 137, 56]; // Add more supported chains if needed
const WCprojectID = process.env.REACT_APP_WC_PROJECT_ID;
const dAppUrl = "https://7c2682bf35b6.ngrok-free.app"

const wcProviderModule = async () => {
	const provider = await EthereumProvider.init({
		projectId: WCprojectID,
		metadata: {
			name: 'Not a Raffle',
			description: 'My Website Description',
			url: dAppUrl,
			icons: [`${dAppUrl}/logo512.png`],
		},
		optionalChains,
		showQrModal: true,
		rpcMap: {
			// 1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
			1: 'https://eth.llamarpc.com',
			137: 'https://polygon-rpc.com',
			56: 'https://bsc-dataseed.binance.org/',
		},
		relayUrl: 'wss://relay.walletconnect.com',
	});
	return provider;
};

const initialState = {
	address: null,
	chainId: null,
	walletData: null, // address, provider, signer
	menuIsActive: true,
	pending: false,
	isConnected: false,
	connectionError: false,
	walletType: null,
	message: '',
};

let wcProvider = null;

// Async thunk to connect non-injected wallet using ethers.js
export const connectWalletGlobal = createAsyncThunk(
	'wallet/connectNonInjected',
	async (_, thunkAPI) => {
		try {
			wcProvider = await wcProviderModule();
			await wcProvider.connect();
			initWcProviderEvents(wcProvider, thunkAPI.dispatch);

			const provider = new BrowserProvider(wcProvider);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();

			return {
				address,
				provider: JSON.stringify(provider),
				signer: JSON.stringify(signer),
				chainId: network?.chainId?.toString(),
			};
		} catch (error) {
			const message = error?.message || String(error);
			await thunkAPI.dispatch(disconnectWallet());
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Async thunk to reconnect non-injected wallet using ethers.js
export const reconnectWallet = createAsyncThunk(
	'wallet/reconnectWalletConnect',
	async (_, thunkAPI) => {
		try {
			if (!wcProvider) {
				wcProvider = await wcProviderModule();
			}

			if (
				wcProvider &&
				wcProvider.session &&
				wcProvider.session?.acknowledged
			) {
				initWcProviderEvents(wcProvider, thunkAPI.dispatch);

				const provider = new BrowserProvider(wcProvider);
				const signer = await provider.getSigner();
				const address = await signer.getAddress();
				const network = await provider.getNetwork();
				return {
					address,
					provider: JSON.stringify(provider),
					signer: JSON.stringify(signer),
					chainId: network?.chainId?.toString(),
				};
			}

			return thunkAPI.rejectWithValue('No active WalletConnect session');
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

// Async thunk to connect injected wallet using ethers.js
export const connectWallet = createAsyncThunk(
	'wallet/connect',
	async (_, thunkAPI) => {
		try {
			if (!window.ethereum) throw new Error('MetaMask not detected');

			await window.ethereum.request({ method: 'eth_requestAccounts' });

			const provider = new BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();

			return {
				address,
				provider: JSON.stringify(provider),
				signer: JSON.stringify(signer),
				chainId: network?.chainId?.toString(),
			};
		} catch (error) {
			const message = error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Async thunk to disconnect wallet (manually clear state)
export const disconnectWallet = createAsyncThunk(
	'wallet/disconnect',
	async ({ isInjected = false } = {}, thunkAPI) => {
		try {
			if (isInjected) {
				console.log(
					'[Wallet] Injected wallet disconnect — clearing state only'
				);
				return true;
			}

			if (wcProvider && wcProvider.disconnect) {
				console.log('[Wallet] WalletConnect disconnecting...');
				if (wcProvider.removeAllListeners) wcProvider.removeAllListeners();
				await wcProvider.disconnect();
				wcProvider = null;
			}
			clearWcSessions();
			return true;
		} catch (error) {
			const message = error?.message || String(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		resetWalletState: (state) => {
			state.pending = false;
			state.isConnected = false;
			state.connectionError = false;
			state.message = '';
		},
		activateMenu: (state, action) => {
			state.menuIsActive = action.payload;
		},
		updateAccount: (state, action) => {
			if (state.walletData) {
				state.walletData.address = action.payload;
			}
			state.address = action.payload;
		},
		updateChain: (state, action) => {
			if (state.walletData) {
				state.walletData.chainId = action.payload;
			}
			state.chainId = action.payload;
		},
		refresh: (state) => {
			state.pending = false;
			state.connectionError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			// connect wallet
			.addCase(connectWallet.pending, (state) => {
				state.pending = true;
			})
			.addCase(connectWallet.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletType = walletTypes.Type1;
				state.walletData = action.payload;
				state.address = action?.payload?.address;
				state.chainId = action?.payload?.chainId;
			})
			.addCase(connectWallet.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// connect non-injected wallet
			.addCase(connectWalletGlobal.pending, (state) => {
				state.pending = true;
			})
			.addCase(connectWalletGlobal.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletType = walletTypes.Type2;
				state.walletData = action.payload;
				state.address = action.payload.address;
				state.chainId = action.payload.chainId;
			})
			.addCase(connectWalletGlobal.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// reconnect non-injected wallet
			.addCase(reconnectWallet.pending, (state) => {
				state.pending = true;
			})
			.addCase(reconnectWallet.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletType = walletTypes.Type2;
				state.walletData = action.payload;
				state.address = action.payload.address;
				state.chainId = action.payload.chainId;
			})
			.addCase(reconnectWallet.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// disconnect wallet
			.addCase(disconnectWallet.fulfilled, (state) => {
				state.isConnected = false;
				state.walletData = null;
				state.walletType = null;
				state.address = null;
				state.chainId = null;
				state.message = '';
			})
			.addCase(disconnectWallet.rejected, (state, action) => {
				state.connectionError = true;
				state.message = action.payload;
			});
	},
});

export const {
	resetWalletState,
	activateMenu,
	updateAccount,
	updateChain,
	refresh,
} = walletSlice.actions;
export default walletSlice.reducer;
