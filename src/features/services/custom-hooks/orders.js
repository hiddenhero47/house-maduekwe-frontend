import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetMyOrdersQuery = (params = {}) => {
	return useQuery({
		queryKey: ['orders', 'me', params],
		queryFn: () =>
			axiosCall({
				url: '/api/orders/me',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
	});
};

const useGetOrdersQuery = (params = {}) => {
	return useQuery({
		queryKey: ['orders', params],
		queryFn: () =>
			axiosCall({
				url: '/api/orders',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
	});
};

const useGetOrderByIdQuery = (id) => {
	return useQuery({
		queryKey: ['orders', id],
		queryFn: () =>
			axiosCall({
				url: `/api/orders/${id}`,
				method: 'GET',
			}),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});
};

const useUpdateOrderStatusMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => 
			axiosCall({
				url: `/api/orders/${id}/status`,
				method: 'PATCH',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['orders'],
			});
			queryClient.invalidateQueries({
				queryKey: ['orders', 'me'],
			});
			toast.success('Order status updated');
		},
	});
};

const useConfirmCheckoutMutation = () => {
	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/confirm-checkout',
				method: 'POST',
				data,
			}),
		onError: () => {
			toast.error('Failed to confirm checkout');
		},
	});
};

const useCheckoutMutation = () => {
	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/checkout',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			toast.success('Order placed successfully');
		},
		onError: () => {
			toast.error('Checkout failed');
		},
	});
};

export {
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useUpdateOrderStatusMutation,
	useConfirmCheckoutMutation,
	useCheckoutMutation,
	useGetOrderByIdQuery,
};

const OrderServices = {
	getMy: useGetMyOrdersQuery,
	getAll: useGetOrdersQuery,
	getOne: useGetOrderByIdQuery,
	updateStatus: useUpdateOrderStatusMutation,
};

const CheckoutServices = {
	confirm: useConfirmCheckoutMutation,
	checkout: useCheckoutMutation,
};

export { OrderServices, CheckoutServices };
