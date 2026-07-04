import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';
import { CHECKOUT_TYPES } from '../../../utilities/app-const';

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
		retry: false,
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
		retry: false,
	});
};

const useGetOrderByIdQuery = (id, options = {}) => {
	return useQuery({
		queryKey: ['order', id],
		queryFn: () =>
			axiosCall({
				url: `/api/orders/${id}`,
				method: 'GET',
			}),
		enabled: !!id && (options.enabled ?? true),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetOrderByIdPublicQuery = (id, options = {}) => {
	return useQuery({
		queryKey: ['order-public', id],
		queryFn: () =>
			axiosCall({
				url: `/api/orders/${id}/public`,
				method: 'GET',
			}),
		enabled: !!id && (options.enabled ?? true),
		refetchOnWindowFocus: false,
		retry: false,
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
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/checkout',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			// toast.success('Order placed successfully');
			queryClient.invalidateQueries({
				queryKey: ['cart-count'],
			});
		},
		onError: () => {
			// toast.error('Checkout failed');
		},
	});
};

const useGuestCheckoutMutation = () => {
	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/guest-checkout',
				method: 'POST',
				data,
			}),
	});
};

const useCancelOrderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/orders/${id}/cancel`,
				method: 'PATCH',
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['orders'],
			});

			queryClient.invalidateQueries({
				queryKey: ['orders', 'me'],
			});

			toast.success('Order cancelled successfully');
		},

		onError: (error) => {
			toast.error(error?.response?.data?.message || 'Failed to cancel order');
		},
	});
};

const useGetOrderQuery = (id, checkoutType) => {
	const isUserCheckout = checkoutType === CHECKOUT_TYPES.USER;
	const userQuery = useGetOrderByIdQuery(id, {
		enabled: isUserCheckout,
	});
	const guestQuery = useGetOrderByIdPublicQuery(id, {
		enabled: !isUserCheckout,
	});
	return isUserCheckout ? userQuery : guestQuery;
};

const useCancelExpiredOrdersAdminMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/cancel-expired',
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

			toast.success('Expired orders cancelled successfully');
		},
	});
};

const useCancelExpiredGuestOrdersMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/orders/guest/cancel-expired',
				method: 'PATCH',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['order-public'],
			});

			toast.success('Order was cancelled successfully');
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
	useGetOrderByIdPublicQuery,
	useCancelOrderMutation,
	useCancelExpiredOrdersAdminMutation,
	useCancelExpiredGuestOrdersMutation,
};

const OrderServices = {
	getMy: useGetMyOrdersQuery,
	getAll: useGetOrdersQuery,
	getOne: useGetOrderByIdQuery,
	getOnePublic: useGetOrderByIdPublicQuery,
	useGetOrder: useGetOrderQuery,
	updateStatus: useUpdateOrderStatusMutation,
	cancel: useCancelOrderMutation,
	cancelExpired: useCancelExpiredOrdersAdminMutation,
	cancelExpiredGuest: useCancelExpiredGuestOrdersMutation,
};

const CheckoutServices = {
	confirm: useConfirmCheckoutMutation,
	checkout: useCheckoutMutation,
	guestCheckout: useGuestCheckoutMutation,
};

export { OrderServices, CheckoutServices };
