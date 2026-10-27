import React, { useMemo } from 'react';
import {
	ModalWrapper,
	MyForm,
	SubmitBtn,
	DefaultToggle,
} from './address.style';
import Modal from '../../modal/index_modal';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { useFormik } from 'formik';
import CustomTextarea from '../../form-components/input/custom-textarea';
import SearchSelect from '../../form-components/select/search-select';
import CustomInput from '../../form-components/input/custom-input';
import { addressValidationSchema } from '../../../features/validations/address-validation';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import ReferenceServices from '../../../features/services/custom-hooks/reference';
import AddressServices from '../../../features/services/custom-hooks/addresses';
import ExportFeeServices from '../../../features/services/custom-hooks/export-fee';

function EditAddress({ ref, closeModal, address, clear }) {
	// ✅ Memoized initial values (same pattern as category)
	const initialValues = useMemo(
		() => ({
			country: address?.country || '',
			state: address?.state || '',
			city: address?.city || '',
			zipCode: address?.zipCode || '',
			addressLine2: address?.addressLine2 || '',
			addressLine1: address?.addressLine1 || '',
			description: address?.description || '',
			isDefault: address?.isDefault || false,
		}),
		[address]
	);

	const { data: acceptedCountries = ['US'] } =
		ExportFeeServices.getAcceptedCountries();

	const { mutate: updateAddress, isPending } = AddressServices.update();

	const onSubmit = (values) => {
		updateAddress(
			{ id: address._id, data: values },
			{
				onSuccess: () => {
					closeModal?.();
				},
			}
		);
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
		validationSchema: addressValidationSchema,
		onSubmit,
		enableReinitialize: true, // ✅ VERY IMPORTANT
	});

	const {
		country,
		state,
		city,
		addressLine1,
		description,
		isDefault,
		zipCode,
		addressLine2,
	} = values;

	const { data: dataCountries, isPending: isPendingCountries } =
		ReferenceServices.getCountries();
	const { data: dataStates } = ReferenceServices.getStates(country);
	const { data: dataCities } = ReferenceServices.getCities(country, state);

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

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => clear && clear()}
			onOpen={() => {}}
			refName={ref}
			animation
		>
			<ModalWrapper>
				{/* HEADER */}
				<div className="modal_header">
					<div>
						<h3>Edit Address</h3>
						<p>Update your address details.</p>
					</div>

					<button className="closeBtn" onClick={closeModal}>
						<IoIosCloseCircle />
					</button>
				</div>

				<MyForm onSubmit={handleSubmit}>
					{/* LOCATION SECTION */}
					<div className="section">
						<h4>Location Details</h4>

						<div className="grid-2 mb-[5px]">
							<div className="form_control">
								<label>Country</label>
								<SearchSelect
									id="country"
									name="country"
									value={country}
									handleChange={handleChange}
									onChange={() => {
										setFieldValue('state', '');
										setFieldValue('city', '');
									}}
									onBlur={handleBlur}
									isError={touched.country && errors.country}
									errormessage={errors.country}
									placeholder={
										isPendingCountries ? 'Loading countries...' : 'Select country'
									}
									options={countryOptions}
									paddingX="14px"
									paddingY="9px"
									useBackground
									disabled={isPendingCountries}
								/>
							</div>

							<div className="form_control">
								<label>State</label>
								<SearchSelect
									id="state"
									name="state"
									value={state}
									handleChange={handleChange}
									onChange={() => setFieldValue('city', '')}
									onBlur={handleBlur}
									isError={touched.state && errors.state}
									errormessage={errors.state}
									placeholder="Select state"
									options={stateOptions}
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>

						<div className="grid-2 mb-[5px]">
							<div className="form_control">
								<label>City</label>
								<SearchSelect
									id="city"
									name="city"
									value={city}
									handleChange={handleChange}
									onBlur={handleBlur}
									isError={touched.city && errors.city}
									errormessage={errors.city}
									placeholder="Select city"
									options={cityOptions}
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>

							<div className="form_control">
								<label>Zip Code</label>
								<CustomInput
									id="zipCode"
									name="zipCode"
									value={zipCode}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.zipCode && errors.zipCode}
									errormessage={errors.zipCode}
									placeholder="code"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>
					</div>

					{/* ADDRESS SECTION */}
					<div className="section">
						<h4>Address Information</h4>

						<div className="form_control mb-[7px]">
							<label>Street Address</label>
							<CustomTextarea
								id="addressLine1"
								name="addressLine1"
								value={addressLine1}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.addressLine1 && errors.addressLine1}
								errormessage={errors.addressLine1}
								placeholder="Street name, house number, etc. — not city/state/zip, those are above"
								paddingX="14px"
								paddingY="9px"
								useBackground
								minHeight="70px"
							/>
						</div>

						<div className="form_control mb-[9px]">
							<label>Apartment</label>
							<CustomInput
								id="addressLine2"
								name="addressLine2"
								value={addressLine2}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.addressLine2 && errors.addressLine2}
								errormessage={errors.addressLine2}
								placeholder="Optional (e.g. Apartment 4B)"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="form_control">
							<label>Description (Optional)</label>
							<CustomInput
								id="description"
								name="description"
								value={description}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="e.g. Office address, Home delivery"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					{/* DEFAULT */}
					<DefaultToggle>
						<div>
							<strong>Set as Default Address</strong>
							<p>This address will be used at checkout.</p>
						</div>

						<label className="switch">
							<input
								type="checkbox"
								name="isDefault"
								checked={isDefault}
								onChange={handleChange}
							/>
							<span className="slider" />
						</label>
					</DefaultToggle>

					<SubmitBtn
						type="submit"
						$isLoading={isPending}
						disabled={isPending}
						className="mt-[20px]"
					>
						<div className="content">
							<HiViewGridAdd />
							Save Address
						</div>
						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</MyForm>
			</ModalWrapper>
		</Modal.Center>
	);
}

export default EditAddress;
