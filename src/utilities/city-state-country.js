import countriesJson from './countries.json';
import statesJson from './states.json';
import citiesJson from './cities.json';
import currenciesJson from './accepted-currencies.json';

const countries = countriesJson;
const states = statesJson;
const cities = citiesJson;
const currencies = currenciesJson;

const normalize = (val) => val?.toString();

// Country
export const getCountryOptions = () =>
	countries.countries.map((country) => ({
		label: `${country.flag_emoji} ${country.name}`,
		value: normalize(country.sort_name),
	}));

export const getCountryByCode = (countryCode) =>
	countries.countries.find(
		(c) => normalize(c.sort_name) === normalize(countryCode)
	);

// States
export const getStatesOptions = (countryCode) => {
	const country = getCountryByCode(countryCode);
	if (!country) return [];

	return states.states
		.filter((state) => normalize(state.country_id) === normalize(country.id))
		.map((state) => ({
			label: state.name,
			value: state.name,
		}));
};

// Cities
export const getCitiesOptions = (countryCode, stateName) => {
	const country = getCountryByCode(countryCode);
	if (!country || !stateName) return [];

	const state = states.states.find(
		(s) =>
			normalize(s.country_id) === normalize(country.id) &&
			s.name.toLowerCase() === stateName.toLowerCase()
	);

	if (!state) return [];

	return cities.cities
		.filter((city) => normalize(city.state_id) === normalize(state.id))
		.map((city) => ({
			label: city.name,
			value: city.name,
		}));
};

// Currencies

// Currency lookups
const currencyById = new Map(
	currencies.currencies.map((c) => [normalize(c.id), c])
);

const currencyByCountryId = new Map(
	currencies.currencies.map((c) => [normalize(c.country_id), c])
);

// Country lookup
const countryByCode = new Map(
	countries.countries.map((c) => [normalize(c.sort_name), c])
);

export const getCurrencyOptions = () =>
	currencies.currencies.map((currency) => ({
		label: currency.currency,
		value: normalize(currency.id),
	}));

export const getCurrencyCode = ({ currencyId, isNumeric = false }) => {
	if (!currencyId) return null;

	const currency = currencyById.get(normalize(currencyId));
	if (!currency) return null;

	return isNumeric ? currency.numeric_code : currency.alphabetic_code;
};

export const getCurrencyCodeByCountry = ({
	countryCode,
	isNumeric = false,
}) => {
	if (!countryCode) return null;

	const country = countryByCode.get(normalize(countryCode));
	if (!country) return null;

	const currency = currencyByCountryId.get(normalize(country.id));
	if (!currency) return null;

	return isNumeric ? currency.numeric_code : currency.alphabetic_code;
};
