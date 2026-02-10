import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetMyPaymentsQuery = (params = {}) => {
	return useQuery(
		['payments', 'me', params],
		() =>
			axiosCall({
				url: '/api/payments/me',
				method: 'GET',
				params,
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useGetPaymentsQuery = (params = {}) => {
	return useQuery(
		['payments', params],
		() =>
			axiosCall({
				url: '/api/payments',
				method: 'GET',
				params,
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useCreateStripeIntentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/payments/stripe-intent',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				toast.success('Stripe payment intent created successfully');
				queryClient.invalidateQueries(['payments', 'me']);
			},
		}
	);
};

export {
	useGetMyPaymentsQuery,
	useGetPaymentsQuery,
	useCreateStripeIntentMutation,
};

const PaymentServices = {
	getMy: useGetMyPaymentsQuery,
	getAll: useGetPaymentsQuery,
	createStripeIntent: useCreateStripeIntentMutation,
};

export default PaymentServices;
