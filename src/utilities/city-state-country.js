import countriesJson from "./countries.json";
import statesJson from "./states.json";
import citiesJson from "./cities.json";
import currenciesJson from "./accepted-currencies.json";

const countries = countriesJson;
const states = statesJson;
const cities = citiesJson;
const currencies = currenciesJson;

// Country
export const getCountryOptions = () => {
    return countries.countries.map((country) => ({
        label: `${country.flag_emoji} ${country.name}`,
        value: country.id.toString(),
    }));
};

export const getCountrySortName = (countryId) => {
    const country = countries.countries.find((country) => country.id.toString() === countryId);
    return country ? country.sort_name : null;
};

export const getCountryId = (countryCode) => {
    const country = countries.countries.find((country) => country.sort_name === countryCode);
    return country ? country.id.toString() : null;
};

export const getCountryName = (countryId) => {
    const country = countries.countries.find((country) => country.id.toString() === countryId);
    return country ? country.name : null;
};

// States
export const getStatesOptions = (countryId) => {
    const filteredStates = states.states.filter((state) => state.country_id === countryId);
    const resultStates = filteredStates.length > 0 ? filteredStates : states.states;

    return resultStates.map((state) => ({
        label: state.name,
        value: state.id,
    }));
};

export const getStatesId = ({ countryId, stateName }) => {
    const state = states.states.find((state) => state.country_id === countryId && state.name === stateName);
    return state ? state.id : null;
};

export const getStatesName = (stateId) => {
    const state = states.states.find((state) => state.id === stateId);
    return state ? state.name : null;
};

// Cities
export const getCitiesOptions = (stateId) => {
    const filteredCities = cities?.cities?.filter((city) => city.state_id === stateId);
    const resultCities = filteredCities.length > 0 ? filteredCities : cities.cities;

    return resultCities.map((city) => ({
        label: city.name,
        value: city.id,
    }));
};

export const getCityId = ({ stateId, cityName }) => {
    const city = cities?.cities.find((city) => city.state_id === stateId && city.name === cityName);
    return city ? city.id : null;
};

export const getCitiesName = (cityId) => {
    const city = cities.cities.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
};

// Currencies
export const getCurrencyOptions = () => {
    return currencies.currencies.map((currency) => ({
        label: currency.currency,
        value: currency.id.toString(),
    }));
};

export const getCurrencyCode = ({ currencyId, isNumeric = false }) => {
    const currency = currencies.currencies.find((currency) => currency.id.toString() === currencyId);
    return currency ? (isNumeric ? currency.numeric_code : currency.alphabetic_code) : null;
};

export const getCurrencyCodeByCounty = ({ countryCode, isNumeric = false }) => {
    const country = countries.countries.find((country) => country.sort_name === countryCode);
    const currency = country ? currencies.currencies.find((currency) => currency.country_id === country.id) : null;

    return currency ? (isNumeric ? currency.numeric_code : currency.alphabetic_code) : null;
};
