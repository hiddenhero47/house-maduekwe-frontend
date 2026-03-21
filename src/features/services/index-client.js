import axios from 'axios';
import { store } from '../../store/index';
import { toast } from 'react-toastify';

// Get user details
const userDetails = () => {
	let authState = store.getState().auth;
	return authState || {};
};

const BASE_URL = import.meta.env.VITE_BASE_URL?.trim();
const CRUD_TYPE = import.meta.env.VITE_AXIOS_CRUD_TYPE?.trim()?.split(' ') || [
	'GET',
	'POST',
	'PUT',
	'DELETE',
	'PATCH',
];

console.log(BASE_URL);

const successResponseHandler = (res) => {
	return res;
};

const errorResponseHandler = (error) => {
	const message =
		error.response?.data?.message ||
		error.response?.data ||
		error.message ||
		'An unknown error occurred';

	if (error.response && error.response.status === 400) {
		const message = error?.response?.data?.message;
		if (['2FA_REQUIRED', 'Invalid 2FA token'].includes(message)) {
			error.is2FARequired = true;
			return Promise.reject(error);
		}
	}

	toast.error(message.toString());
	return Promise.reject(error);
};

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 60000,
	headers: {},
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (req) {
		const { token } = userDetails();

		if (token) {
			req.headers.Authorization = `Bearer ${token}`;
		}

		// Reattach the base url
		if (!req.url.startsWith('http')) {
			req.url = BASE_URL + req.url.replace(/^\/+/, '');
		}
		return req;
	},
	function (error) {
		// Handle the error
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(res) => {
		return successResponseHandler(res);
	},
	(error) => {
		return errorResponseHandler(error);
	}
);

export const axiosCall = async (arg) => {
	const { url, method, data, params } = arg;

	if (!url || !method || !CRUD_TYPE.includes(method)) {
		throw new Error('axiosCall error');
	}

	try {
		const response = await axiosInstance({
			method,
			url,
			params,
			data,
		});

		return response.data; // Return only the data part of the response
	} catch (error) {
		const message =
			error.response?.data?.message ||
			error.response?.data ||
			error.message ||
			'An unknown error occurred';
		console.error('Axios Error:', message);
		throw error;
	}
};

export default axiosInstance;
