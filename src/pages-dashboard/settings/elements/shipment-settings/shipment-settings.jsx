import React from 'react';
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
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../../utilities/city-state-country';

const hasAnyOriginField = (addr) =>
	Object.values(addr || {}).some((v) => typeof v === 'string' && v.trim());

function ShipmentSettings() {
	const { data, isPending } = ShippingSettingsServices.get();
	const { mutate: updateSettings, isPending: isSaving } =
		ShippingSettingsServices.update();

	const initialValues = {
		activeProvider: data?.activeProvider || 'internal',
		enabled: data?.enabled ?? true,
		autoCreateShipment: data?.autoCreateShipment ?? false,
		originAddress: {
			country: data?.originAddress?.country || '',
			state: data?.originAddress?.state || '',
			city: data?.originAddress?.city || '',
			fullAddress: data?.originAddress?.fullAddress || '',
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

			['country', 'state', 'city', 'fullAddress'].forEach((field) => {
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

	const { activeProvider, enabled, autoCreateShipment, originAddress } = values;

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
								placeholder="Select country"
								options={getCountryOptions() || []}
								paddingX="14px"
								paddingY="9px"
								useBackground
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
								options={getStatesOptions(originAddress.country) || []}
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
								options={
									getCitiesOptions(originAddress.country, originAddress.state) ||
									[]
								}
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
							<label>Full Address</label>

							<CustomTextarea
								id="originAddress.fullAddress"
								name="originAddress.fullAddress"
								value={originAddress.fullAddress}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Street name, house number, etc."
								paddingX="14px"
								paddingY="9px"
								useBackground
								minHeight="70px"
								isError={
									touched.originAddress?.fullAddress &&
									errors.originAddress?.fullAddress
								}
								errormessage={errors.originAddress?.fullAddress}
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
