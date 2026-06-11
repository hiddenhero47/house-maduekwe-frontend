import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';

// Get all attributes
const useGetAttributesQuery = (params = {}) => {
	return useQuery({
		queryKey: ['attributes', params],
		queryFn: () =>
			axiosCall({
				url: '/api/attributes',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

// Get attribute by ID
const useGetAttributeByIdQuery = (id) => {
	return useQuery({
		queryKey: ['attribute', id],
		queryFn: () =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'GET',
			}),
		enabled: !!id,
		refetchOnWindowFocus: false,
		retry: false,
	});
};

// Create attribute
const useCreateAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/attributes',
				method: 'POST',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attributes'] });
			toast.success('Attribute created successfully');
		},
	});
};

// Update attribute
const useUpdateAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'PUT',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attributes'] });
			toast.success('Attribute updated successfully');
		},
	});
};

// Delete attribute
const useDeleteAttributeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/attributes/${id}`,
				method: 'DELETE',
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['attributes'] });
			toast.success('Attribute deleted successfully');
		},
	});
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
