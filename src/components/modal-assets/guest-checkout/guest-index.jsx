import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useFormik } from 'formik';
import { GuestCheckoutStage, MyForm, SubmitBtn } from './guest-index.style';
import { guestCheckoutValidationSchema } from '../../../features/validations/guest-checkout-validation';
import PhoneInput from '../../form-components/phone-number/phone-number';
import CustomTextarea from '../../form-components/input/custom-textarea';
import SearchSelect from '../../form-components/select/search-select';
import CustomInput from '../../form-components/input/custom-input';
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../utilities/city-state-country';
import { pickNonEmptyValues } from '../../../utilities/basic-functions';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';
import ExportFeeServices from '../../../features/services/custom-hooks/export-fee';
import { CheckoutServices } from '../../../features/services/custom-hooks/orders';
import { CHECKOUT_TYPES } from '../../../utilities/app-const';
import { IoClose } from 'react-icons/io5';

const GuestCheckout = ({ items = [], close, onBack, resetFunc }) => {
	const navigate = useNavigate();

	const { data: acceptedCountries = ['US'], isLoading: isLoadingAccCount } =
		ExportFeeServices.getAcceptedCountries();

	const { mutate: checkoutGuest, isPending: isLoading } =
		CheckoutServices.guestCheckout();

	const [errOrderId, setErrOrderId] = useState(null);

	const initialValues = {
		consigneesName: '',
		email: '',
		phoneNumber: null,
		country: '',
		state: '',
		city: '',
		zipCode: '',
		addressLine2: '',
		fullAddress: '',
	};

	const handleSubmit = (values, { resetForm }) => {
		const payload = items.map((item) => ({
			shopItem: item?.shopItem._id,
			quantity: item?.quantity,
			selectedAttributes: item?.selectedAttributes,
		}));

		const isValidData =
			payload &&
			Array.isArray(payload) &&
			payload.length > 0 &&
			payload.every(
				(item) =>
					item.shopItem &&
					typeof item.quantity === 'number' &&
					item.quantity > 0
			);

		if (!isValidData) return;

		const { consigneesName, email, phoneNumber } = values;
		const address = pickNonEmptyValues(values, [
			'country',
			'state',
			'city',
			'zipCode',
			'fullAddress',
			'addressLine2',
		]);

		const guestData = { consigneesName, email, address, itemList: payload };

		if (phoneNumber) guestData.phoneNumber = phoneNumber;

		checkoutGuest(guestData, {
			onSuccess: (response) => {
				const orderId = response?.order?._id;
				resetForm();
				resetFunc();
				navigate(`/checkout/${orderId}?checkoutType=${CHECKOUT_TYPES.GUEST}`);
			},
			onError: (error) => {
				const err = error?.response?.data;
				if (err?.code === 'GUEST_PENDING_ORDER' || err?.data) {
					setErrOrderId(err?.data._id);
				}
			},
		});
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit: submitForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema: guestCheckoutValidationSchema,
		onSubmit: handleSubmit,
	});

	const {
		consigneesName,
		email,
		phoneNumber,
		country,
		state,
		city,
		zipCode,
		fullAddress,
		addressLine2,
	} = values;

	return (
		<GuestCheckoutStage>
			<div className="modal_header">
				<div>
					<h3>Guest Checkout</h3>

					<p>Provide your delivery information to continue as a guest.</p>
				</div>

				<IoClose className="closeBtn" onClick={() => close()} />
			</div>

			<MyForm onSubmit={submitForm}>
				<div className="section">
					<h4>Personal Information</h4>

					<div className="form_control">
						<label>Consignee's Full Name</label>

						<CustomInput
							id="consigneesName"
							name="consigneesName"
							value={consigneesName}
							onChange={handleChange}
							onBlur={handleBlur}
							isError={touched.consigneesName && errors.consigneesName}
							errormessage={errors.consigneesName}
							placeholder="John Doe"
							paddingX="14px"
							paddingY="9px"
							useBackground
						/>
					</div>

					<div className="form_control">
						<label>Email</label>

						<CustomInput
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={handleChange}
							onBlur={handleBlur}
							isError={touched.email && errors.email}
							errormessage={errors.email}
							placeholder="john@example.com"
							paddingX="14px"
							paddingY="9px"
							useBackground
						/>
					</div>

					<div className="form_control">
						<label>Phone Number</label>

						<PhoneInput
							id="phoneNumber"
							name="phoneNumber"
							phoneNumber={phoneNumber?.number || ''}
							onBlur={handleBlur}
							customChange={(value) =>
								setFieldValue('phoneNumber', {
									number: value?.fullPhoneNumber?.toString(),
									country: value?.country,
								})
							}
							isError={touched.phoneNumber && errors.phoneNumber}
							errormessage={errors.phoneNumber}
							placeholder="8012345678"
							paddingX="14px"
							paddingY="9px"
							useBackground
							country={phoneNumber?.country}
						/>
					</div>
				</div>

				<div className="section">
					<h4>Shipping Address</h4>

					<div className="grid-3">
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
									isLoadingAccCount ? 'Loading countries...' : 'Select country'
								}
								options={getCountryOptions(acceptedCountries)}
								paddingX="14px"
								paddingY="9px"
								useBackground
								disabled={isLoadingAccCount}
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
								options={getStatesOptions(country)}
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					<div className="grid-3">
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
								options={getCitiesOptions(country, state)}
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
								placeholder="Code"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					<div className="form_control">
						<label>Full Address</label>

						<CustomTextarea
							id="fullAddress"
							name="fullAddress"
							value={fullAddress}
							onChange={handleChange}
							onBlur={handleBlur}
							isError={touched.fullAddress && errors.fullAddress}
							errormessage={errors.fullAddress}
							placeholder="Street name, house number, etc."
							paddingX="14px"
							paddingY="9px"
							useBackground
							minHeight="90px"
						/>
					</div>

					<div className="form_control">
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
				</div>

				{errOrderId && (
					<button
						type="button"
						className="pending_order"
						onClick={() => {
							navigate(
								`/guest-order?orderId=${errOrderId}&email=${encodeURIComponent(
									email
								)}`
							);
							close();
						}}
					>
						<div className="pending_order_text">
							<strong>You already have a pending order.</strong>

							<span>Continue where you left off.</span>
						</div>

						<FaArrowRightLong className="arrow" />
					</button>
				)}

				<div className="flex flex-col w-full">
					{onBack && (
						<button type="button" onClick={onBack} className="btn btn_anon">
							<i>
								<FaArrowRightLong />
							</i>
							Back
						</button>
					)}

					<SubmitBtn type="submit" $isLoading={isLoading}>
						<div className="content">Checkout</div>

						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</div>
			</MyForm>
		</GuestCheckoutStage>
	);
};

export default GuestCheckout;
