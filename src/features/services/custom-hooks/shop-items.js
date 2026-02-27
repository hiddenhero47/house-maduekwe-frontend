import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetShopItemsQuery = (params = {}) => {
	return useQuery({
		queryKey: ['shop-items', params],
		queryFn: () =>
			axiosCall({
				url: '/api/shop-items',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
	});
};

const useGetShopItemByIdQuery = (id) => {
	return useQuery({
		queryKey: ['shop-item', id],
		queryFn: () =>
			axiosCall({
				url: `/api/shop-items/${id}`,
				method: 'GET',
			}),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});
};

const useGetRelatedShopItemsQuery = (id, limit = 8) => {
	return useQuery({
		queryKey: ['shop-item-related', id],
		queryFn: () =>
			axiosCall({
				url: `/api/shop-items/${id}/related`,
				method: 'GET',
				params: { limit },
			}),
		enabled: !!id,
		refetchOnWindowFocus: false,
	});
};

const useCreateShopItemMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/shop-items',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['shop-items'] });
			toast.success('Shop item created successfully');
		},
	});
};

const useUpdateShopItemMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/shop-items/${id}`,
				method: 'PUT',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['shop-items', 'shop-item-related'],
			});
			toast.success('Shop item updated successfully');
		},
	});
};

const useDeleteShopItemMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/shop-items/${id}`,
				method: 'DELETE',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['shop-items'] });
			toast.success('Shop item deleted successfully');
		},
	});
};

export {
	useGetShopItemsQuery,
	useGetShopItemByIdQuery,
	useGetRelatedShopItemsQuery,
	useCreateShopItemMutation,
	useUpdateShopItemMutation,
	useDeleteShopItemMutation,
};

const ShopItemServices = {
	get: useGetShopItemsQuery,
	getOne: useGetShopItemByIdQuery,
	getRelated: useGetRelatedShopItemsQuery,
	create: useCreateShopItemMutation,
	update: useUpdateShopItemMutation,
	delete: useDeleteShopItemMutation,
};

export default ShopItemServices;
