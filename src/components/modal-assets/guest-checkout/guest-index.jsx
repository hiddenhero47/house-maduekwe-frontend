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
import {
	pickNonEmptyValues,
	getCurrencySymbol,
} from '../../../utilities/basic-functions';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';
import ExportFeeServices from '../../../features/services/custom-hooks/export-fee';
import { CheckoutServices } from '../../../features/services/custom-hooks/orders';
import { CHECKOUT_TYPES } from '../../../utilities/app-const';
import { IoClose } from 'react-icons/io5';
import { toast } from '../../../layouts/toast/toast-handler';

const GuestCheckout = ({ items = [], close, onBack, resetFunc }) => {
	const navigate = useNavigate();

	const { data: acceptedCountries = ['US'], isLoading: isLoadingAccCount } =
		ExportFeeServices.getAcceptedCountries();

	const { mutate: confirmGuest, isPending: isConfirming } =
		CheckoutServices.guestConfirm();
	const { mutate: checkoutGuest, isPending: isLoading } =
		CheckoutServices.guestCheckout();

	const [errOrderId, setErrOrderId] = useState(null);
	const [step, setStep] = useState('details');
	const [excludedItems, setExcludedItems] = useState([]);
	const [reviewData, setReviewData] = useState(null);
	const [reviewPayload, setReviewPayload] = useState(null);
	const [reviewedSnapshot, setReviewedSnapshot] = useState(null);

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

	const buildGuestData = (formValues, currentExcluded) => {
		const payload = items
			.filter((item) => !currentExcluded.includes(item?.shopItem?._id))
			.map((item) => ({
				shopItem: item?.shopItem._id,
				quantity: item?.quantity,
				selectedAttributes: item?.selectedAttributes,
			}));

		const { consigneesName, email, phoneNumber } = formValues;
		const address = pickNonEmptyValues(formValues, [
			'country',
			'state',
			'city',
			'zipCode',
			'fullAddress',
			'addressLine2',
		]);

		const guestData = { consigneesName, email, address, itemList: payload };
		if (phoneNumber) guestData.phoneNumber = phoneNumber;

		return guestData;
	};

	const runReview = (formValues, currentExcluded) => {
		const guestData = buildGuestData(formValues, currentExcluded);

		if (!guestData.itemList.length) {
			toast.warning('No checkout item left after removing unavailable items');
			return;
		}

		confirmGuest(guestData, {
			onSuccess: (response) => {
				if (response?.isPendingOrder) {
					setErrOrderId(response?.pendingOrder?._id);
					return;
				}

				const issues = (response?.stock || []).filter((s) => !s.isAvailable);

				if (issues.length > 0) {
					const badIds = issues
						.map((s) => s.productId?.toString())
						.filter(Boolean);
					const nextExcluded = [...new Set([...currentExcluded, ...badIds])];

					toast.warning(issues[0].message);
					setExcludedItems(nextExcluded);

					if (nextExcluded.length === currentExcluded.length) return;

					runReview(formValues, nextExcluded);
					return;
				}

				setExcludedItems(currentExcluded);
				setReviewData(response);
				setReviewPayload(guestData);
				setReviewedSnapshot(JSON.stringify(formValues));
				setStep('review');
			},
		});
	};

	const handleReviewSubmit = (formValues) => {
		setErrOrderId(null);
		runReview(formValues, excludedItems);
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit: submitForm,
		setFieldValue,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema: guestCheckoutValidationSchema,
		onSubmit: handleReviewSubmit,
	});

	// Reviewed totals go stale the moment a detail changes — back to details.
	useEffect(() => {
		if (
			step === 'review' &&
			reviewedSnapshot &&
			JSON.stringify(values) !== reviewedSnapshot
		) {
			setStep('details');
			setReviewData(null);
			setReviewPayload(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	const handlePlaceOrder = () => {
		if (!reviewPayload) return;

		checkoutGuest(reviewPayload, {
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
					setStep('details');
				}
			},
		});
	};

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

	const currency = reviewData?.payment?.currency;

	return (
		<GuestCheckoutStage>
			<div className="modal_header">
				<div>
					<h3>Guest Checkout</h3>

					<p>
						{step === 'details'
							? 'Provide your delivery information to continue as a guest.'
							: 'Review your order before placing it.'}
					</p>
				</div>

				<IoClose className="closeBtn" onClick={() => close()} />
			</div>

			{step === 'details' ? (
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

						<SubmitBtn type="submit" $isLoading={isConfirming}>
							<div className="content">Review Order</div>

							<div className="loader">
								<BubbleSlide color="var(--addToCart-text)" height="20px" />
							</div>
						</SubmitBtn>
					</div>
				</MyForm>
			) : (
				<div className="section flex flex-col gap-[14px]">
					{excludedItems.length > 0 && (
						<p className="text-[12px] text-[var(--mainBody-sbText)]">
							Some items were removed due to stock issues and are excluded
							from this order.
						</p>
					)}

					<div className="flex flex-col gap-[8px]">
						<div className="flex justify-between text-[14px]">
							<span className="text-[var(--mainBody-sbText)]">Subtotal</span>
							<span>
								{getCurrencySymbol(currency)} {reviewData?.order?.totalAmount}
							</span>
						</div>

						<div className="flex justify-between text-[14px]">
							<span className="text-[var(--mainBody-sbText)]">Tax (VAT)</span>
							<span>
								{getCurrencySymbol(currency)} {reviewData?.order?.totalVat}
							</span>
						</div>

						<div className="flex justify-between text-[14px]">
							<span className="text-[var(--mainBody-sbText)]">Product Tax</span>
							<span>
								{getCurrencySymbol(currency)}{' '}
								{reviewData?.order?.totalProductTax}
							</span>
						</div>

						<div className="flex justify-between text-[14px]">
							<span className="text-[var(--mainBody-sbText)]">Shipping</span>
							<span>
								{getCurrencySymbol(currency)} {reviewData?.order?.shippingFee}
							</span>
						</div>

						<div className="flex justify-between text-[15px] font-semibold pt-[8px] border-t border-t-[var(--mainBody-line)]">
							<span>Total</span>
							<span>
								{getCurrencySymbol(currency)} {reviewData?.payment?.amountToPay}
							</span>
						</div>
					</div>

					<div className="flex flex-col w-full">
						<button
							type="button"
							onClick={() => setStep('details')}
							className="btn btn_anon"
						>
							<i>
								<FaArrowRightLong />
							</i>
							Back to edit
						</button>

						<SubmitBtn
							type="button"
							onClick={handlePlaceOrder}
							$isLoading={isLoading}
						>
							<div className="content">Place Order</div>

							<div className="loader">
								<BubbleSlide color="var(--addToCart-text)" height="20px" />
							</div>
						</SubmitBtn>
					</div>
				</div>
			)}
		</GuestCheckoutStage>
	);
};

export default GuestCheckout;
