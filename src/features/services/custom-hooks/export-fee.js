import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from 'react-toastify';

const useGetExportFeesQuery = (active) => {
	return useQuery({
		queryKey: ['export-fees', active],
		queryFn: () =>
			axiosCall({
				url: '/api/export-fees',
				method: 'GET',
				params: typeof active === 'boolean' ? { active } : undefined,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useCreateExportFeeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/export-fees',
				method: 'POST',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['export-fees'],
			});
			toast.success('Export fee created successfully');
		},
	});
};

const useUpdateExportFeeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) =>
			axiosCall({
				url: `/api/export-fees/${id}`,
				method: 'PUT',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['export-fees'],
			});
			toast.success('Export fee updated successfully');
		},
	});
};

const useDisableExportFeeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/export-fees/${id}/disable`,
				method: 'PATCH',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['export-fees'],
			});
			toast.success('Export fee disabled');
		},
	});
};

const useDeleteExportFeePermanentlyMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) =>
			axiosCall({
				url: `/api/export-fees/${id}/permanent`,
				method: 'DELETE',
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['export-fees'],
			});
			toast.success('Export fee permanently deleted');
		},
	});
};

export {
	useGetExportFeesQuery,
	useCreateExportFeeMutation,
	useUpdateExportFeeMutation,
	useDisableExportFeeMutation,
	useDeleteExportFeePermanentlyMutation,
};

const ExportFeeServices = {
	get: useGetExportFeesQuery,
	create: useCreateExportFeeMutation,
	update: useUpdateExportFeeMutation,
	disable: useDisableExportFeeMutation,
	deletePermanent: useDeleteExportFeePermanentlyMutation,
};

export default ExportFeeServices;
