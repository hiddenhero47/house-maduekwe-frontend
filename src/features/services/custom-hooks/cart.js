import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

// Get cart
const useGetCartQuery = () => {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ['cart'],
		queryFn: () =>
			axiosCall({
				url: '/api/cart',
				method: 'GET',
			}),
		refetchOnWindowFocus: false,
		retry: false,
		onSuccess: (data) => {
			const { itemList: items = [] } = data || {};
			const count = items?.length || 0;
			queryClient.setQueryData(['cart-count'], count);
		}
	});
};

// Get cart count
const useGetCartCountQuery = () => {
	return useQuery({
		queryKey: ['cart-count'],
		queryFn: () =>
			axiosCall({
				url: '/api/cart/count',
				method: 'GET',
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

// Add to cart
const useAddToCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/cart',
				method: 'POST',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
			queryClient.invalidateQueries({ queryKey: ['cart-count'] });
			toast.success('🛒 Item added to cart');
		},
	});
};

// Remove from cart
const useRemoveFromCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/cart',
				method: 'DELETE',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] });
			queryClient.invalidateQueries({ queryKey: ['cart-count'] });
			toast.success('Item removed from cart');
		},
	});
};

export { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation };

const CartServices = {
	get: useGetCartQuery,
	getCount: useGetCartCountQuery,
	add: useAddToCartMutation,
	remove: useRemoveFromCartMutation,
};

export default CartServices;
