import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';
import {
	removeFromHoldings,
	clearHoldings,
	resetHolding,
	closeMenu,
	changeStage,
} from '../../../store/slice/holding';
import {
	HoldingWrapper,
	DisplayStage,
	GuestCheckoutStage,
	MyForm,
	Footer,
	ShopItem,
	AddToCartBtn,
	SubmitBtn,
} from './holding.style';
import { attributeType } from '../../../utilities/app-const';
import CartServices from '../../../features/services/custom-hooks/cart';
import { CheckoutServices } from '../../../features/services/custom-hooks/orders';
import ExportFeeServices from '../../../features/services/custom-hooks/export-fee';
import BubbleSlide from '../../../components/loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../toast/toast-handler';
import Modal from '../../../components/modal/index_modal';
import { IoClose } from 'react-icons/io5';
import { guestCheckoutValidationSchema } from '../../../features/validations/guest-checkout-validation';
import { useFormik } from 'formik';
import PhoneInput from '../../../components/form-components/phone-number/phone-number';
import CustomTextarea from '../../../components/form-components/input/custom-textarea';
import SearchSelect from '../../../components/form-components/select/search-select';
import CustomInput from '../../../components/form-components/input/custom-input';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import ReferenceServices from '../../../features/services/custom-hooks/reference';
import {
	pickNonEmptyValues,
	getCurrencySymbol,
} from '../../../utilities/basic-functions';
import { CHECKOUT_TYPES } from '../../../utilities/app-const';

function Holding() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { mutate: addToCart, isPending } = CartServices.add();
	const { mutate: confirmGuest, isPending: isConfirming } =
		CheckoutServices.guestConfirm();
	const { mutate: checkoutGuest, isPending: isLoading } =
		CheckoutServices.guestCheckout();
	const { holdings, isOpen, stage } = useSelector((state) => state.holdings);

	const { user } = useSelector((state) => state.auth);
	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;

	const removeItem = (tempId) => {
		dispatch(removeFromHoldings({ tempId }));
	};

	const selectPlaceholder = (data) => {
		if (!data) return '';

		const colorAttr = data.selectedAttributes?.find(
			(attr) => attr?.Attribute?.type === attributeType.COLOR
		);

		const attrImage = colorAttr?.images?.[0]?.url;
		const placeHolder = data.shopItem?.placeHolder?.url;
		const firstImage = data.shopItem?.imageCatalog?.[0]?.url;
		return attrImage || placeHolder || firstImage || '';
	};

	const cartServer = () => {
		if (!activeUser) {
			toast.info('Please log in to add items to your cart');

			setTimeout(() => {
				navigate('/authentication');
				dispatch(closeMenu());
			}, 1500);

			return;
		}

		const payload = holdings.map((item) => ({
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

		if (isValidData) {
			addToCart(
				{ itemList: [...payload] },
				{
					onSuccess: () => {
						dispatch(clearHoldings());
						close();
					},
				}
			);
		}
	};

	const modalHoldingRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			modalHoldingRef.current?.open();
		}
	}, [isOpen]);

	// Guest checkout section

	const [errOrderId, setErrOrderId] = useState(null);
	const [guestStep, setGuestStep] = useState('details');
	const [excludedItems, setExcludedItems] = useState([]);
	const [reviewData, setReviewData] = useState(null);
	const [reviewPayload, setReviewPayload] = useState(null);
	const [reviewedSnapshot, setReviewedSnapshot] = useState(null);

	const initialValues = {
		consigneesName: { firstName: '', lastName: '' },
		email: '',
		phoneNumber: null,
		country: '',
		state: '',
		city: '',
		zipCode: '',
		stateLine: '',
		addressLine1: '',
	};

	const { data: acceptedCountries = ['US'] } =
		ExportFeeServices.getAcceptedCountries();

	const buildGuestData = (formValues, currentExcluded) => {
		const payload = holdings
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
			'addressLine1',
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
				setGuestStep('review');
			},
		});
	};

	const onSubmit = (values) => {
		setErrOrderId(null);
		runReview(values, excludedItems);
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema: guestCheckoutValidationSchema,
		onSubmit,
	});

	// Reviewed totals go stale the moment a detail changes — back to details.
	useEffect(() => {
		if (
			guestStep === 'review' &&
			reviewedSnapshot &&
			JSON.stringify(values) !== reviewedSnapshot
		) {
			setGuestStep('details');
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
				dispatch(resetHolding());
				modalHoldingRef.current?.close();
				navigate(`/checkout/${orderId}?checkoutType=${CHECKOUT_TYPES.GUEST}`);
			},
			onError: (error) => {
				const err = error?.response?.data;
				if (err?.code === 'GUEST_PENDING_ORDER' || err?.data) {
					setErrOrderId(err?.data._id);
					setGuestStep('details');
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
		addressLine1,
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

	const reviewCurrency = reviewData?.payment?.currency;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => {
				dispatch(closeMenu());
				setErrOrderId(null);
			}}
			onOpen={() => {}}
			refName={modalHoldingRef}
			animation={true}
		>
			<HoldingWrapper $isOpen={isOpen}>
				{stage === 'guest' ? (
					<GuestCheckoutStage>
						<div className="modal_header">
							<div>
								<h3>Guest Checkout</h3>

								<p>
									{guestStep === 'details'
										? 'Provide your delivery information to continue as a guest.'
										: 'Review your order before placing it.'}
								</p>
							</div>

							<IoClose
								className="closeBtn"
								onClick={() => modalHoldingRef.current?.close()}
							/>
						</div>

						{guestStep === 'details' ? (
						<MyForm onSubmit={handleSubmit}>
							<div className="section">
								<h4>Personal Information</h4>

								<div className="form_control">
									<label>Consignee's Name</label>

									<div className="flex gap-[10px]">
										<CustomInput
											id="consigneesName.firstName"
											name="consigneesName.firstName"
											value={consigneesName?.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={
												touched.consigneesName?.firstName &&
												errors.consigneesName?.firstName
											}
											errormessage={errors.consigneesName?.firstName}
											placeholder="First Name"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>

										<CustomInput
											id="consigneesName.lastName"
											name="consigneesName.lastName"
											value={consigneesName?.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={
												touched.consigneesName?.lastName &&
												errors.consigneesName?.lastName
											}
											errormessage={errors.consigneesName?.lastName}
											placeholder="Last Name"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>
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
												isPendingCountries
													? 'Loading countries...'
													: 'Select country'
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
											placeholder="Code"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>
								</div>

								{/* <div className="form_control">
									<label>State Line</label>

									<CustomInput
										id="stateLine"
										name="stateLine"
										value={values.stateLine}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Optional"
										paddingX="14px"
										paddingY="9px"
										useBackground
									/>
								</div> */}

								<div className="form_control">
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
										minHeight="90px"
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
										modalHoldingRef.current?.close();
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
								<button
									type="button"
									onClick={() => dispatch(changeStage('display'))}
									className="btn btn_anon"
								>
									<i>
										<FaArrowRightLong />
									</i>
									Back to Holdings
								</button>

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
										Some items were removed due to stock issues and are
										excluded from this order.
									</p>
								)}

								<div className="flex flex-col gap-[8px]">
									<div className="flex justify-between text-[14px]">
										<span className="text-[var(--mainBody-sbText)]">
											Subtotal
										</span>
										<span>
											{getCurrencySymbol(reviewCurrency)}{' '}
											{reviewData?.order?.totalAmount}
										</span>
									</div>

									<div className="flex justify-between text-[14px]">
										<span className="text-[var(--mainBody-sbText)]">
											Tax (VAT)
										</span>
										<span>
											{getCurrencySymbol(reviewCurrency)}{' '}
											{reviewData?.order?.totalVat}
										</span>
									</div>

									<div className="flex justify-between text-[14px]">
										<span className="text-[var(--mainBody-sbText)]">
											Product Tax
										</span>
										<span>
											{getCurrencySymbol(reviewCurrency)}{' '}
											{reviewData?.order?.totalProductTax}
										</span>
									</div>

									<div className="flex justify-between text-[14px]">
										<span className="text-[var(--mainBody-sbText)]">
											Shipping
										</span>
										<span>
											{getCurrencySymbol(reviewCurrency)}{' '}
											{reviewData?.order?.shippingFee}
										</span>
									</div>

									<div className="flex justify-between text-[15px] font-semibold pt-[8px] border-t border-t-[var(--mainBody-line)]">
										<span>Total</span>
										<span>
											{getCurrencySymbol(reviewCurrency)}{' '}
											{reviewData?.payment?.amountToPay}
										</span>
									</div>
								</div>

								<div className="flex flex-col w-full">
									<button
										type="button"
										onClick={() => setGuestStep('details')}
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
				) : (
					<DisplayStage>
						{/* Header */}
						<div className="modal_header">
							<div className="flex flex-col">
								<h3>Holdings</h3>

								<p>{holdings.length} Items</p>
							</div>

							<div className="flex flex-col">
								<IoClose
									className="closeBtn"
									onClick={() => modalHoldingRef.current?.close()}
									style={{ cursor: 'pointer' }}
								/>

								<button
									onClick={() => dispatch(clearHoldings())}
									className="text-[13px] text-red-500 hover:underline"
								>
									Clear All
								</button>
							</div>
						</div>

						<div className="body_wrapper gap-3">
							{/* Items List */}
							<div className="Y_scroll_style flex flex-col gap-3 min-h-[200px] max-h-[40vh] overflow-y-auto pr-1">
								{holdings.map((item, i) => (
									<ShopItem key={i}>
										<div className="w-[60px] h-[60px] p-[5px] rounded-[8px]">
											<div className="imageHolder rounded-[inherit]">
												<img src={selectPlaceholder(item)} alt="Error" />
											</div>
										</div>

										<div className="info">
											<span className="name">{item?.shopItem?.name}</span>
											<span className="price">
												{item?.shopItem?.price} {item?.shopItem?.currency}
											</span>
										</div>

										<button
											className="remove_btn"
											onClick={() => removeItem(item.tempId)}
										>
											<i>
												<FaTrash />
											</i>
										</button>
									</ShopItem>
								))}
							</div>

							{/* Footer Buttons */}
							<Footer>
								<AddToCartBtn
									$isLoading={isPending}
									type="button"
									onClick={() => cartServer()}
								>
									<div className="content">Move to Cart</div>

									<div className="loader">
										<BubbleSlide color="var(--addToCart-text)" height="20px" />
									</div>
								</AddToCartBtn>

								<button
									type="button"
									onClick={() => dispatch(changeStage('guest'))}
									className="btn btn_anon"
									disabled={holdings.length <= 0}
								>
									Guest Checkout{' '}
									<i>
										<FaArrowRightLong />
									</i>
								</button>
							</Footer>
						</div>
					</DisplayStage>
				)}
			</HoldingWrapper>
		</Modal.Center>
	);
}

export default Holding;
