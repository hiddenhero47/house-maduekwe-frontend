import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetItemGroupsQuery = () => {
	return useQuery(
		['item-groups'],
		() =>
			axiosCall({
				url: '/api/item-groups',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useCreateItemGroupMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/item-groups',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['item-groups']);
				toast.success('Item group created successfully');
			},
		}
	);
};

const useUpdateItemGroupMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ id, data }) =>
			axiosCall({
				url: `/api/item-groups/${id}`,
				method: 'PUT',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['item-groups']);
				toast.success('Item group updated successfully');
			},
		}
	);
};

const useDeleteItemGroupMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(id) =>
			axiosCall({
				url: `/api/item-groups/${id}`,
				method: 'DELETE',
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['item-groups']);
				toast.success('Item group deleted');
			},
		}
	);
};

export {
	useGetItemGroupsQuery,
	useCreateItemGroupMutation,
	useUpdateItemGroupMutation,
	useDeleteItemGroupMutation,
};

const ItemGroupServices = {
	get: useGetItemGroupsQuery,
	create: useCreateItemGroupMutation,
	update: useUpdateItemGroupMutation,
	delete: useDeleteItemGroupMutation,
};

export default ItemGroupServices;
