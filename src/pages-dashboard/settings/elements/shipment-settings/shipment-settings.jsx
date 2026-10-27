import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { ShipmentSettingsWrapper, SubmitBtn } from './shipment-settings.style';
import { ToggleSwitch } from '../index.style';
import CustomInput from '../../../../components/form-components/input/custom-input';
import CustomTextarea from '../../../../components/form-components/input/custom-textarea';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import SearchSelect from '../../../../components/form-components/select/search-select';
import ShippingSettingsServices from '../../../../features/services/custom-hooks/shipping-settings';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import CandleWrapper from '../../../../components/loaders/candles/Candle';
import { MdLocalShipping } from 'react-icons/md';
import { ENABLED_SHIPPING_PROVIDERS } from '../../../../utilities/app-const';
import ReferenceServices from '../../../../features/services/custom-hooks/reference';
import ExportFeeServices from '../../../../features/services/custom-hooks/export-fee';

const hasAnyOriginField = (addr) =>
	Object.values(addr || {}).some((v) => typeof v === 'string' && v.trim());

function ShipmentSettings() {
	const { data, isPending } = ShippingSettingsServices.get();
	const { mutate: updateSettings, isPending: isSaving } =
		ShippingSettingsServices.update();
	const { data: acceptedCountries = ['US'] } =
		ExportFeeServices.getAcceptedCountries();

	const initialValues = {
		activeProvider: data?.activeProvider || 'internal',
		enabled: data?.enabled ?? true,
		autoCreateShipment: data?.autoCreateShipment ?? false,
		fallbackProviders: data?.fallbackProviders || [],
		originAddress: {
			country: data?.originAddress?.country || '',
			state: data?.originAddress?.state || '',
			city: data?.originAddress?.city || '',
			addressLine1: data?.originAddress?.addressLine1 || '',
			zipCode: data?.originAddress?.zipCode || '',
		},
	};

	const providerOptions = ENABLED_SHIPPING_PROVIDERS.map((p) => ({
		label: p,
		value: p,
	}));

	const validate = (formValues) => {
		const validationErrors = {};
		const addr = formValues.originAddress;

		if (hasAnyOriginField(addr)) {
			const addrErrors = {};

			['country', 'state', 'city', 'addressLine1'].forEach((field) => {
				if (!addr[field]?.trim()) {
					addrErrors[field] = 'Required once any origin field is set';
				}
			});

			if (Object.keys(addrErrors).length) {
				validationErrors.originAddress = addrErrors;
			}
		}

		return validationErrors;
	};

	const onSubmit = (formValues) => {
		const payload = {
			activeProvider: formValues.activeProvider,
			enabled: formValues.enabled,
			autoCreateShipment: formValues.autoCreateShipment,
			fallbackProviders: formValues.fallbackProviders,
		};

		if (hasAnyOriginField(formValues.originAddress)) {
			payload.originAddress = formValues.originAddress;
		}

		updateSettings(payload);
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues,
		enableReinitialize: true,
		validate,
		onSubmit,
	});

	const {
		activeProvider,
		enabled,
		autoCreateShipment,
		fallbackProviders,
		originAddress,
	} = values;

	const { data: dataCountries, isPending: isPendingCountries } =
		ReferenceServices.getCountries();
	const { data: dataStates } = ReferenceServices.getStates(originAddress.country);
	const { data: dataCities } = ReferenceServices.getCities(
		originAddress.country,
		originAddress.state
	);

	const countryOptions = useMemo(() => {
		if (!dataCountries?.data) return [];
		const accepted = new Set(acceptedCountries.map((c) => c?.toUpperCase()));
		return dataCountries.data
			.filter((c) => accepted.has(c.isoCode))
			.map((c) => ({ label: `${c.flag} ${c.name}`, value: c.isoCode }));
	}, [dataCountries?.data, acceptedCountries]);

	const stateOptions = useMemo(() => {
		if (!dataStates?.data) return [];
		return dataStates.data.map((s) => ({ label: s.name, value: s.isoCode }));
	}, [dataStates?.data]);

	const cityOptions = useMemo(() => {
		if (!dataCities?.data) return [];
		return dataCities.data.map((c) => ({ label: c.name, value: c.name }));
	}, [dataCities?.data]);

	const toggleFallbackProvider = (provider) => {
		setFieldValue(
			'fallbackProviders',
			fallbackProviders.includes(provider)
				? fallbackProviders.filter((p) => p !== provider)
				: [...fallbackProviders, provider]
		);
	};

	if (isPending) {
		return (
			<ShipmentSettingsWrapper>
				<div className="countian">
					<CandleWrapper color="var(--mainBody-sbKitText)" />
				</div>
			</ShipmentSettingsWrapper>
		);
	}

	return (
		<ShipmentSettingsWrapper>
			<div className="header">
				<div>
					<h3>Shipment Settings</h3>
					<p>
						Controls which provider ships orders, whether shipping is active,
						and where packages originate from.
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="section">
					<div className="toggle_row">
						<div>
							<label>Shipping Enabled</label>
							<p className="hint">
								Turn off to pause creating new shipments app-wide.
							</p>
						</div>

						<ToggleSwitch className="switch">
							<input
								type="checkbox"
								checked={enabled}
								onChange={(e) => setFieldValue('enabled', e.target.checked)}
							/>
							<span className="slider" />
						</ToggleSwitch>
					</div>

					<div className="toggle_row">
						<div>
							<label>Auto-create Shipment on Payment</label>
							<p className="hint">
								Not wired up yet — toggling this has no effect until automatic
								shipment creation ships.
							</p>
						</div>

						<ToggleSwitch className="switch">
							<input
								type="checkbox"
								checked={autoCreateShipment}
								onChange={(e) =>
									setFieldValue('autoCreateShipment', e.target.checked)
								}
							/>
							<span className="slider" />
						</ToggleSwitch>
					</div>

					<div className="form_control">
						<label>Active Provider</label>

						<CustomSelect
							id="activeProvider"
							name="activeProvider"
							value={activeProvider}
							handleChange={handleChange}
							onBlur={handleBlur}
							placeholder="Select shipping provider"
							options={providerOptions}
							paddingX="14px"
							paddingY="9px"
							useBackground
						/>
					</div>

					{ENABLED_SHIPPING_PROVIDERS.length > 1 && (
						<div className="form_control">
							<label>Fallback Providers</label>
							<p className="hint">
								Tried in the order checked, only when the active provider
								can't quote a price for a customer's address.
							</p>

							{ENABLED_SHIPPING_PROVIDERS.filter(
								(p) => p !== activeProvider
							).map((provider) => (
								<div className="toggle_row" key={provider}>
									<label className="capitalize">{provider}</label>

									<ToggleSwitch className="switch">
										<input
											type="checkbox"
											checked={fallbackProviders.includes(provider)}
											onChange={() => toggleFallbackProvider(provider)}
										/>
										<span className="slider" />
									</ToggleSwitch>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="section">
					<h4>Origin Address</h4>
					<p className="hint">
						Where packages ship from. Optional — leave blank if not set yet.
					</p>

					<div className="grid-3">
						<div className="form_control">
							<label>Country</label>

							<SearchSelect
								id="originAddress.country"
								name="originAddress.country"
								value={originAddress.country}
								handleChange={handleChange}
								onChange={() => {
									setFieldValue('originAddress.state', '');
									setFieldValue('originAddress.city', '');
								}}
								onBlur={handleBlur}
								placeholder={
									isPendingCountries ? 'Loading countries...' : 'Select country'
								}
								options={countryOptions}
								paddingX="14px"
								paddingY="9px"
								useBackground
								disabled={isPendingCountries}
								isError={
									touched.originAddress?.country &&
									errors.originAddress?.country
								}
								errormessage={errors.originAddress?.country}
							/>
						</div>

						<div className="form_control">
							<label>State</label>

							<SearchSelect
								id="originAddress.state"
								name="originAddress.state"
								value={originAddress.state}
								handleChange={handleChange}
								onChange={() => setFieldValue('originAddress.city', '')}
								onBlur={handleBlur}
								placeholder="Select state"
								options={stateOptions}
								paddingX="14px"
								paddingY="9px"
								useBackground
								isError={
									touched.originAddress?.state && errors.originAddress?.state
								}
								errormessage={errors.originAddress?.state}
							/>
						</div>

						<div className="form_control">
							<label>City</label>

							<SearchSelect
								id="originAddress.city"
								name="originAddress.city"
								value={originAddress.city}
								handleChange={handleChange}
								onBlur={handleBlur}
								placeholder="Select city"
								options={cityOptions}
								paddingX="14px"
								paddingY="9px"
								useBackground
								isError={
									touched.originAddress?.city && errors.originAddress?.city
								}
								errormessage={errors.originAddress?.city}
							/>
						</div>
					</div>

					<div className="grid-2">
						<div className="form_control">
							<label>Street Address</label>

							<CustomTextarea
								id="originAddress.addressLine1"
								name="originAddress.addressLine1"
								value={originAddress.addressLine1}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Street name, house number, etc. — not city/state/zip, those are above"
								paddingX="14px"
								paddingY="9px"
								useBackground
								minHeight="70px"
								isError={
									touched.originAddress?.addressLine1 &&
									errors.originAddress?.addressLine1
								}
								errormessage={errors.originAddress?.addressLine1}
							/>
						</div>

						<div className="form_control">
							<label>Zip Code</label>

							<CustomInput
								id="originAddress.zipCode"
								name="originAddress.zipCode"
								value={originAddress.zipCode}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Optional"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>
				</div>

				<SubmitBtn type="submit" $isLoading={isSaving} disabled={isSaving}>
					<div className="content">
						Save Shipment Settings <MdLocalShipping />
					</div>

					<div className="loader">
						<BubbleSlide color="var(--addToCart-text)" height="20px" />
					</div>
				</SubmitBtn>
			</form>
		</ShipmentSettingsWrapper>
	);
}

export default ShipmentSettings;
