import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';

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
		retry: false,
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
		retry: false,
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
		retry: false,
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

// Images are owned by their own sub-resource routes now, independent of the
// main product-details PUT — each of these four touches one item's
// imageCatalog and invalidates just that item, not the whole list.
const useAddShopItemImagesMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, files }) => {
			const formData = new FormData();
			files.forEach((file) => formData.append('images', file));

			return axiosCall({
				url: `/api/shop-items/${id}/images`,
				method: 'POST',
				data: formData,
			});
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['shop-item', variables.id] });
			toast.success('Images added successfully');
		},
	});
};

const useRemoveShopItemImageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, imageId }) =>
			axiosCall({
				url: `/api/shop-items/${id}/images/${imageId}`,
				method: 'DELETE',
			}),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['shop-item', variables.id] });
			toast.success('Image removed successfully');
		},
	});
};

const useReorderShopItemImagesMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, order }) =>
			axiosCall({
				url: `/api/shop-items/${id}/images/reorder`,
				method: 'PATCH',
				data: { order },
			}),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['shop-item', variables.id] });
		},
	});
};

const useTagShopItemImageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, imageId, attrTag }) =>
			axiosCall({
				url: `/api/shop-items/${id}/images/${imageId}/tags`,
				method: 'PATCH',
				data: { attrTag },
			}),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['shop-item', variables.id] });
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
	useAddShopItemImagesMutation,
	useRemoveShopItemImageMutation,
	useReorderShopItemImagesMutation,
	useTagShopItemImageMutation,
};

const ShopItemServices = {
	get: useGetShopItemsQuery,
	getOne: useGetShopItemByIdQuery,
	getRelated: useGetRelatedShopItemsQuery,
	create: useCreateShopItemMutation,
	update: useUpdateShopItemMutation,
	delete: useDeleteShopItemMutation,
	addImages: useAddShopItemImagesMutation,
	removeImage: useRemoveShopItemImageMutation,
	reorderImages: useReorderShopItemImagesMutation,
	tagImage: useTagShopItemImageMutation,
};

export default ShopItemServices;
