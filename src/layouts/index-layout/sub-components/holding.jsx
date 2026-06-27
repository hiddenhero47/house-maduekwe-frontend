import React, { useRef, useEffect } from 'react';
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
import {
	getCountryOptions,
	getStatesOptions,
	getCitiesOptions,
} from '../../../utilities/city-state-country';
import { pickNonEmptyValues } from '../../../utilities/basic-functions';

function Holding() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { mutate: addToCart, isPending } = CartServices.add();
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

	const initialValues = {
		consigneesName: '',
		email: '',
		phoneNumber: null,
		country: '',
		state: '',
		city: '',
		zipCode: '',
		stateLine: '',
		fullAddress: '',
	};

	const onSubmit = (values, { resetForm }) => {
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

		if (!isValidData) return;

		const { consigneesName, email, phoneNumber } = values;
		const address = pickNonEmptyValues(values, [
			'country',
			'state',
			'city',
			'zipCode',
			'fullAddress',
		]);

		const guestData = { consigneesName, email, address, itemList: payload };

		if (phoneNumber) guestData.phoneNumber = phoneNumber;

		checkoutGuest(guestData, {
			onSuccess: (response) => {
				const orderId = response?.order?._id;
				resetForm();
				dispatch(resetHolding());
				modalHoldingRef.current?.close();
				navigate(`/checkout/${orderId}`);
			},
		});
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
		validationSchema: guestCheckoutValidationSchema,
		onSubmit,
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
	} = values;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => dispatch(closeMenu())}
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

								<p>Provide your delivery information to continue as a guest.</p>
							</div>

							<IoClose
								className="closeBtn"
								onClick={() => modalHoldingRef.current?.close()}
							/>
						</div>

						<MyForm onSubmit={handleSubmit}>
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
											placeholder="Select country"
											options={getCountryOptions()}
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
											options={getStatesOptions(values.country)}
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
											options={getCitiesOptions(values.country, values.state)}
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
									<label>Full Address</label>

									<CustomTextarea
										id="fullAddress"
										name="fullAddress"
										value={fullAddress}
										onChange={handleChange}
										onBlur={handleBlur}
										isError={touched.fullAddress && errors.fullAddress}
										errormessage={errors.fullAddress}
										placeholder="Street name, house number, apartment, etc."
										paddingX="14px"
										paddingY="9px"
										useBackground
										minHeight="90px"
									/>
								</div>
							</div>

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

								<SubmitBtn type="submit">
									<div className="content">Checkout</div>
								</SubmitBtn>
							</div>
						</MyForm>
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
