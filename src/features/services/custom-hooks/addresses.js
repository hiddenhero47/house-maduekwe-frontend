import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';
import { useSelector } from 'react-redux';

// Get all addresses
const useGetAddressesQuery = () => {
	const { user, token } = useSelector((state) => state.auth);
	return useQuery({
		queryKey: ['addresses'],
		queryFn: () =>
			axiosCall({
				url: '/api/addresses',
				method: 'GET',
			}),
		enabled: !!token || !!user?._id,
		refetchOnWindowFocus: false,
		retry: false,
	});
};

// Create address
const useCreateAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/addresses',
				method: 'POST',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
			toast.success('Address added successfully');
		},
	});
};

// Update address
const useUpdateAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/addresses/${id}`,
				method: 'PUT',
				data,
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
			toast.success('Address updated successfully');
		},
	});
};

// Delete address
const useDeleteAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/addresses/${id}`,
				method: 'DELETE',
			}),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
			toast.success('Address deleted successfully');
		},
	});
};

export {
	useGetAddressesQuery,
	useCreateAddressMutation,
	useUpdateAddressMutation,
	useDeleteAddressMutation,
};

const AddressServices = {
	getAll: useGetAddressesQuery,
	create: useCreateAddressMutation,
	update: useUpdateAddressMutation,
	delete: useDeleteAddressMutation,
};

export default AddressServices;
