import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetAttributesQuery = () => {
	return useQuery(
		['attributes'],
		() =>
			axiosCall({
				url: '/api/attributes',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useGetAttributeByIdQuery = (id) => {
	return useQuery(
		['attribute', id],
		() =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'GET',
			}),
		{
			enabled: !!id,
			refetchOnWindowFocus: false,
		}
	);
};

const useCreateAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/attributes',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['attributes']);
				toast.success('Attribute created successfully');
			},
		}
	);
};

const useUpdateAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ id, data }) =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'PUT',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['attributes']);
				toast.success('Attribute updated successfully');
			},
		}
	);
};

const useDeleteAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(id) =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'DELETE',
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['attributes']);
				toast.success('Attribute deleted successfully');
			},
		}
	);
};

export {
	useGetAttributesQuery,
	useGetAttributeByIdQuery,
	useCreateAttributeMutation,
	useUpdateAttributeMutation,
	useDeleteAttributeMutation,
};

const AttributeServices = {
	getAll: useGetAttributesQuery,
	getById: useGetAttributeByIdQuery,
	create: useCreateAttributeMutation,
	update: useUpdateAttributeMutation,
	delete: useDeleteAttributeMutation,
};

export default AttributeServices;
