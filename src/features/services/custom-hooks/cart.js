import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetCartQuery = () => {
	return useQuery(
		['cart'],
		() =>
			axiosCall({
				url: '/api/cart',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useAddToCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/cart',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cart']);
				toast.success('Item added to cart');
			},
		}
	);
};

const useRemoveFromCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(itemIds) =>
			axiosCall({
				url: '/api/cart',
				method: 'DELETE',
				data: { itemIds },
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['cart']);
				toast.success('Item removed from cart');
			},
		}
	);
};

export { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation };

const CartServices = {
	get: useGetCartQuery,
	add: useAddToCartMutation,
	remove: useRemoveFromCartMutation,
};

export default CartServices;
