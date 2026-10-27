import { useQuery } from '@tanstack/react-query';
import { axiosCall } from '../index-client';

// Country/state/city lookup data — static reference data, not customer-
// specific, so a long staleTime avoids re-fetching the same lists on every
// form mount.

const useGetCountriesQuery = () => {
	return useQuery({
		queryKey: ['reference-countries'],
		queryFn: () =>
			axiosCall({
				url: '/api/reference/countries',
				method: 'GET',
			}),
		staleTime: 1000 * 60 * 60, // 1 hour
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetStatesQuery = (countryCode) => {
	return useQuery({
		queryKey: ['reference-states', countryCode],
		queryFn: () =>
			axiosCall({
				url: `/api/reference/countries/${countryCode}/states`,
				method: 'GET',
			}),
		enabled: Boolean(countryCode),
		staleTime: 1000 * 60 * 60,
		refetchOnWindowFocus: false,
		retry: false,
	});
};

const useGetCitiesQuery = (countryCode, stateCode) => {
	return useQuery({
		queryKey: ['reference-cities', countryCode, stateCode],
		queryFn: () =>
			axiosCall({
				url: `/api/reference/countries/${countryCode}/cities`,
				method: 'GET',
				params: stateCode ? { state: stateCode } : undefined,
			}),
		enabled: Boolean(countryCode),
		staleTime: 1000 * 60 * 60,
		refetchOnWindowFocus: false,
		retry: false,
	});
};

export { useGetCountriesQuery, useGetStatesQuery, useGetCitiesQuery };

const ReferenceServices = {
	getCountries: useGetCountriesQuery,
	getStates: useGetStatesQuery,
	getCities: useGetCitiesQuery,
};

export default ReferenceServices;
