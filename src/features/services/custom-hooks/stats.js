import { useQuery } from '@tanstack/react-query';
import { axiosCall } from '../index-client';

const useGetOverviewQuery = () => {
	return useQuery({
		queryKey: ['stats', 'overview'],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/overview',
				method: 'GET',
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetSalesTimeseriesQuery = (period = 'day') => {
	return useQuery({
		queryKey: ['stats', 'sales-timeseries', period],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/sales-timeseries',
				method: 'GET',
				params: { period },
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetOrderStatusBreakdownQuery = (params = {}) => {
	return useQuery({
		queryKey: ['stats', 'order-status-breakdown', params],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/order-status-breakdown',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetCheckoutTypeBreakdownQuery = (params = {}) => {
	return useQuery({
		queryKey: ['stats', 'checkout-type-breakdown', params],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/checkout-type-breakdown',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetTopSellingItemsQuery = (params = {}) => {
	return useQuery({
		queryKey: ['stats', 'top-selling-items', params],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/top-selling-items',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetPaymentSummaryQuery = (params = {}) => {
	return useQuery({
		queryKey: ['stats', 'payment-summary', params],
		queryFn: () =>
			axiosCall({
				url: '/api/stats/payment-summary',
				method: 'GET',
				params,
			}),
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export {
	useGetOverviewQuery,
	useGetSalesTimeseriesQuery,
	useGetOrderStatusBreakdownQuery,
	useGetCheckoutTypeBreakdownQuery,
	useGetTopSellingItemsQuery,
	useGetPaymentSummaryQuery,
};

const StatsServices = {
	overview: useGetOverviewQuery,
	salesTimeseries: useGetSalesTimeseriesQuery,
	orderStatusBreakdown: useGetOrderStatusBreakdownQuery,
	checkoutTypeBreakdown: useGetCheckoutTypeBreakdownQuery,
	topSellingItems: useGetTopSellingItemsQuery,
	paymentSummary: useGetPaymentSummaryQuery,
};

export { StatsServices };
