import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetPaymentProvidersQuery = (params = {}) => {
	return useQuery({
		queryKey: ['payment-providers', params],
		queryFn: () =>
			axiosCall({
				url: '/api/payment-providers',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
	});
};

const useGetClientPaymentProvidersQuery = () => {
	return useQuery({
		queryKey: ['payment-providers', 'client'],
		queryFn: () =>
			axiosCall({
				url: '/api/payment-providers/client',
				method: 'GET',
			}),
		refetchOnWindowFocus: false,
	});
};

const useCreatePaymentProviderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/payment-providers',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['payment-providers'],
			});
			toast.success('Payment provider created successfully');
		},
	});
};

const useUpdatePaymentProviderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/payment-providers/${id}`,
				method: 'PUT',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['payment-providers'],
			});
			toast.success('Payment provider updated successfully');
		},
	});
};

const useDisablePaymentProviderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/payment-providers/${id}`,
				method: 'DELETE',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['payment-providers'],
			});
			toast.success('Payment provider disabled');
		},
	});
};

const useDeletePaymentProviderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/payment-providers/${id}/permanent`,
				method: 'DELETE',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['payment-providers'],
			});
			toast.success('Payment provider permanently deleted');
		},
	});
};

export {
	useGetPaymentProvidersQuery,
	useGetClientPaymentProvidersQuery,
	useCreatePaymentProviderMutation,
	useUpdatePaymentProviderMutation,
	useDisablePaymentProviderMutation,
	useDeletePaymentProviderMutation,
};

const PaymentProviderServices = {
	get: useGetPaymentProvidersQuery,
	getClient: useGetClientPaymentProvidersQuery,
	create: useCreatePaymentProviderMutation,
	update: useUpdatePaymentProviderMutation,
	disable: useDisablePaymentProviderMutation,
	deletePermanent: useDeletePaymentProviderMutation,
};

export default PaymentProviderServices;
