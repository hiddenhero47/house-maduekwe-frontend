import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';

const useGetAllShipmentsQuery = (params = {}) => {
	return useQuery({
		queryKey: ['shipments', params],
		queryFn: () =>
			axiosCall({
				url: '/api/shipments',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetShipmentForOrderQuery = (orderId, options = {}) => {
	return useQuery({
		queryKey: ['shipment', orderId],
		queryFn: () =>
			axiosCall({
				url: `/api/shipments/orders/${orderId}`,
				method: 'GET',
			}),
		enabled: !!orderId && (options.enabled ?? true),
		retry: false,
	});
};

const useCreateShipmentMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ orderId, data }) =>
			axiosCall({
				url: `/api/shipments/orders/${orderId}`,
				method: 'POST',
				data,
			}),
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: ['shipments'] });
			queryClient.invalidateQueries({ queryKey: ['shipment', orderId] });
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			toast.success('Shipment created');
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message || 'Failed to create shipment');
		},
	});
};

const useUpdateShipmentStatusMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ orderId, data }) =>
			axiosCall({
				url: `/api/shipments/orders/${orderId}/status`,
				method: 'PATCH',
				data,
			}),
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: ['shipments'] });
			queryClient.invalidateQueries({ queryKey: ['shipment', orderId] });
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			toast.success('Shipment status updated');
		},
		onError: (error) => {
			toast.error(
				error?.response?.data?.message || 'Failed to update shipment status'
			);
		},
	});
};

export {
	useGetAllShipmentsQuery,
	useGetShipmentForOrderQuery,
	useCreateShipmentMutation,
	useUpdateShipmentStatusMutation,
};

const ShipmentServices = {
	getAll: useGetAllShipmentsQuery,
	getForOrder: useGetShipmentForOrderQuery,
	create: useCreateShipmentMutation,
	updateStatus: useUpdateShipmentStatusMutation,
};

export default ShipmentServices;
