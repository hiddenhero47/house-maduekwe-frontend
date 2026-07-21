import React from 'react';
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
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../utilities/city-state-country';
import AddressServices from '../../../features/services/custom-hooks/addresses';
import ExportFeeServices from '../../../features/services/custom-hooks/export-fee';

function CreateAddress({ ref, openModal, closeModal }) {
	const initialValues = {
		country: '',
		state: '',
		city: '',
		zipCode: '',
		stateLine: '',
		fullAddress: '',
		description: '',
		isDefault: false,
	};

	const { data: acceptedCountries = ['US'], isLoading } =
		ExportFeeServices.getAcceptedCountries();

	const { mutate: createAddress, isPending } = AddressServices.create();

	const onSubmit = (values, { resetForm }) => {
		createAddress(values, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const {
		values,
		errors,
		handleBlur,
		touched,
		handleChange,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema: addressValidationSchema,
		onSubmit,
	});

	const {
		country,
		state,
		city,
		fullAddress,
		description,
		isDefault,
		zipCode,
		stateLine,
	} = values;
	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => {}}
			onOpen={() => {}}
			refName={ref}
			animation={true}
		>
			<ModalWrapper>
				{/* Header */}
				<div className="modal_header">
					<div>
						<h3>Add New Address</h3>
						<p>
							Add a delivery address. You can set one address as your default
							for faster checkout.
						</p>
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
										isLoading ? 'Loading countries...' : 'Select country'
									}
									options={getCountryOptions(acceptedCountries) || []}
									paddingX="14px"
									paddingY="9px"
									useBackground
									disabled={isLoading}
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
									options={getStatesOptions(country) || []}
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
									options={getCitiesOptions(country, state) || []}
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

						<div className="form_control">
							<label>State Line</label>
							<CustomInput
								id="stateLine"
								name="stateLine"
								value={stateLine}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.stateLine && errors.stateLine}
								errormessage={errors.stateLine}
								placeholder="State Line (e.g. Mason-Dixon line)"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					{/* ADDRESS SECTION */}
					<div className="section">
						<h4>Address Information</h4>

						<div className="form_control mb-[5px]">
							<label>Full Address</label>
							<CustomTextarea
								id="fullAddress"
								name="fullAddress"
								value={fullAddress}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Street name, house number, apartment, etc."
								paddingX="14px"
								paddingY="9px"
								useBackground
								minHeight="70px"
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

					{/* DEFAULT TOGGLE */}
					<DefaultToggle>
						<div>
							<strong>Set as Default Address</strong>
							<p>This address will be selected automatically at checkout.</p>
						</div>

						<label className="switch">
							<input
								type="checkbox"
								id="isDefault"
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

export default CreateAddress;
