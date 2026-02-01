import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetAddressesQuery = () => {
	return useQuery(
		['addresses'],
		() =>
			axiosCall({
				url: '/api/addresses',
				method: 'GET',
			}),
		{
			refetchOnWindowFocus: false,
		}
	);
};

const useCreateAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(data) =>
			axiosCall({
				url: '/api/addresses',
				method: 'POST',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['addresses']);
				toast.success('Address added successfully');
			},
		}
	);
};

const useUpdateAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ id, data }) =>
			axiosCall({
				url: `/api/addresses/${id}`,
				method: 'PUT',
				data,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['addresses']);
				toast.success('Address updated successfully');
			},
		}
	);
};

const useDeleteAddressMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		(id) =>
			axiosCall({
				url: `/api/addresses/${id}`,
				method: 'DELETE',
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['addresses']);
				toast.success('Address deleted successfully');
			},
		}
	);
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
