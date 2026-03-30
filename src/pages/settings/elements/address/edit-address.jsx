import React, { useMemo } from 'react';
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
import { addressValidationSchema } from '../../../../features/validations/address-validation';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../../utilities/city-state-country';
import AddressServices from '../../../../features/services/custom-hooks/addresses';

function EditAddress({ ref, closeModal, address, clear }) {
	// ✅ Memoized initial values (same pattern as category)
	const initialValues = useMemo(
		() => ({
			country: address?.country || '',
			state: address?.state || '',
			city: address?.city || '',
			fullAddress: address?.fullAddress || '',
			description: address?.description || '',
			isDefault: address?.isDefault || false,
		}),
		[address]
	);

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

	const { country, state, city, fullAddress, description, isDefault } = values;

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
