import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetCategoriesQuery = () => {
	return useQuery(
		['categories'],
		() =>
			axiosCall({
				url: '/api/categories',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/categories',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['categories']);
				toast.success('Category created successfully');
			},
		}
	);
};

const useUpdateCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ id, data }) =>
			axiosCall({
				url: `/api/categories/${id}`,
				method: 'PUT',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['categories']);
				toast.success('Category updated successfully');
			},
		}
	);
};

const useDeleteCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(id) =>
			axiosCall({
				url: `/api/categories/${id}`,
				method: 'DELETE',
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['categories']);
				toast.success('Category deleted');
			},
		}
	);
};

export {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
};

const CategoryServices = {
	get: useGetCategoriesQuery,
	create: useCreateCategoryMutation,
	update: useUpdateCategoryMutation,
	delete: useDeleteCategoryMutation,
};

export default CategoryServices;
