import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetMyPaymentsQuery = (params = {}) => {
	return useQuery({
		queryKey: ['payment', 'me', params],
		queryFn: () =>
			axiosCall({
				url: '/api/payment/me',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetPaymentsQuery = (params = {}) => {
	return useQuery({
		queryKey: ['payment', params],
		queryFn: () =>
			axiosCall({
				url: '/api/payment',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useCreateStripeIntentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/payment/stripe-intent',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			toast.success('Stripe payment intent created successfully');
			queryClient.invalidateQueries({
				queryKey: ['payments', 'me'],
			});
		},
	});
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
