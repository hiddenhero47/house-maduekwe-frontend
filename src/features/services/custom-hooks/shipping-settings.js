import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosCall } from '../index-client';
import { toast } from '../../../layouts/toast/toast-handler';

const useGetShippingSettingsQuery = () => {
	return useQuery({
		queryKey: ['shipping-settings'],
		queryFn: () =>
			axiosCall({
				url: '/api/shipping-settings',
				method: 'GET',
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useUpdateShippingSettingsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) =>
			axiosCall({
				url: '/api/shipping-settings',
				method: 'PUT',
				data,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['shipping-settings'] });
			toast.success('Shipment settings updated');
		},
	});
};

export { useGetShippingSettingsQuery, useUpdateShippingSettingsMutation };

const ShippingSettingsServices = {
	get: useGetShippingSettingsQuery,
	update: useUpdateShippingSettingsMutation,
};

export default ShippingSettingsServices;
