import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';

// Get packages
const useGetPackagesQuery = (params = {}) => {
	return useQuery({
		queryKey: ['packages', params],
		queryFn: () =>
			axiosCall({
				url: '/api/packages',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

// Create package
const useCreatePackageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/packages',
				method: 'POST',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['packages'] });
			toast.success('Package created successfully');
		},
	});
};

// Update package
const useUpdatePackageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/packages/${id}`,
				method: 'PUT',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['packages'] });
			toast.success('Package updated successfully');
		},
	});
};

// Delete package
const useDeletePackageMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/packages/${id}`,
				method: 'DELETE',
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['packages'] });
			toast.success('Package deleted');
		},
	});
};

export {
	useGetPackagesQuery,
	useCreatePackageMutation,
	useUpdatePackageMutation,
	useDeletePackageMutation,
};

const PackageServices = {
	get: useGetPackagesQuery,
	create: useCreatePackageMutation,
	update: useUpdatePackageMutation,
	delete: useDeletePackageMutation,
};

export default PackageServices;
