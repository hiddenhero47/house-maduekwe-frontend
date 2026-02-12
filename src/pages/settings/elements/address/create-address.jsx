import React from 'react';
import {
	ModalWrapper,
	MyForm,
	SubmitBtn,
	DefaultToggle,
} from './address.style';
import Modal from '../../../../components/modal/index_modal';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useFormik } from 'formik';
import CustomTextarea from '../../../../components/form-components/input/custom-textarea';
import SearchSelect from '../../../../components/form-components/select/search-select';
import { userCreateValidationSchema } from '../../../../features/validations/user-validation';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../../utilities/city-state-country';

function CreateModal({ ref, openModal, closeModal }) {
	const initialValues = {
		country: '',
		state: '',
		city: '',
		fullAddress: '',
		description: '',
		isDefault: false,
	};

	const onSubmit = async (values) => {
		console.log(values);
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
		// validationSchema: userCreateValidationSchema,
		onSubmit,
	});

	const { country, state, city, fullAddress, description, isDefault } = values;
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
							Add a delivery or billing address. You can set one address as your
							default for faster checkout.
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
									placeholder="Select country"
									options={getCountryOptions() || []}
									paddingX="14px"
									paddingY="9px"
									useBackground
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
							<CustomTextarea
								id="description"
								name="description"
								value={description}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="e.g. Office address, Home delivery"
								paddingX="14px"
								paddingY="9px"
								useBackground
								minHeight="70px"
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

					<SubmitBtn type="submit" $isLoading={false} className="mt-[20px]">
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

export default CreateModal;
