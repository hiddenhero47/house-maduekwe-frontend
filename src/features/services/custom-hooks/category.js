import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

// Get categories
const useGetCategoriesQuery = (params = {}) => {
	return useQuery({
		queryKey: ['categories', params],
		queryFn: () =>
			axiosCall({
				url: '/api/categories',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
	});
};

// Create category
const useCreateCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/categories',
				method: 'POST',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Category created successfully');
		},
	});
};

// Update category
const useUpdateCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/categories/${id}`,
				method: 'PUT',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Category updated successfully');
		},
	});
};

// Delete category
const useDeleteCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/categories/${id}`,
				method: 'DELETE',
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			toast.success('Category deleted');
		},
	});
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
