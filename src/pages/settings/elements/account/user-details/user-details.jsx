import React from 'react';
import {
	UserDetailsWrapper,
	DetailsList,
	DetailsItem,
	SaveBtn,
	Logout,
	ChangeBtn,
} from './user-details.style';
import { IoIosArrowForward } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { useFormik } from 'formik';
import PhoneInput from '../../../../../components/form-components/phone-number/phone-number';
import CustomInput from '../../../../../components/form-components/input/custom-input';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TbLogout } from 'react-icons/tb';
import { roleType } from '../../../../../utilities/app-const';
import { logout } from '../../../../../store/slice/auth';
import { userUpdateValidationSchema } from '../../../../../features/validations/user-validation';
import { VectorIcon } from '../../../../../components/icon-components/index.style';
import profile from '../../../../../assets/images/profile3.svg?react';
import UserServices from '../../../../../features/services/custom-hooks/user';
import BubbleSlide from '../../../../../components/loaders/bubbles/BubbleSlide';
import { convertFileToBase64 } from '../../../../../utilities/basic-functions';

function UserDetails() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const initialValues = {
		name: user?.name || '',
		phoneNumber: {
			number: user?.phoneNumber?.number || '',
			country: user?.phoneNumber?.country || 'US',
		},
		image: null,
	};

	const { mutate: update, isLoading } = UserServices.updateProfile();

	const onSubmit = async (values) => {
		try {
			const { image, ...others } = values;

			let base64Image;

			if (image) {
				base64Image = await convertFileToBase64(image);
			}

			update({
				...others,
				base64: base64Image,
			});
		} catch (error) {
			console.error('Failed to convert image to base64', error);
		}
	};
	const {
		values,
		errors,
		handleBlur,
		touched,
		handleChange,
		setFieldValue,
		handleSubmit,
	} = useFormik({
		initialValues,
		validationSchema: userUpdateValidationSchema,
		onSubmit,
	});

	const { name, phoneNumber, image } = values;

	const logoutUser = async () => {
		await navigate('/');
		dispatch(logout());
		localStorage.clear();
	};

	const onChangeFile = (e) => {
		const file = e.currentTarget.files[0];
		if (!file) return;

		setFieldValue('image', file);
	};

	const getImageURL = (img) => {
		if (img) return URL.createObjectURL(img);
		if (user?.avatar?.url) return user.avatar?.url;
		return null;
	};

	return (
		<UserDetailsWrapper
			$isAdmin={
				user?.role === roleType.ADMIN || user?.role === roleType.SUPER_ADMIN
			}
		>
			<div className="w-full flex items-center flex-wrap gap-[8px] justify-between">
				<button id="btn_dashboard" onClick={() => navigate('/admin')}>
					<RxDashboard />
					<span>Dashboard</span>
					<IoIosArrowForward />
				</button>

				<div id="actionWrapper">
					<SaveBtn
						$isLoading={isLoading}
						type="button"
						onClick={() => handleSubmit()}
					>
						<div className="content">SAVE</div>
						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SaveBtn>

					<Logout onClick={logoutUser}>
						<i className="icon_wrapper">
							<TbLogout />
						</i>
						logout
					</Logout>
				</div>
			</div>

			<form>
				<DetailsList>
					<DetailsItem>
						<span className="list_content">User ID</span>
						<span className="list_content">{user?._id || 'Nill'}</span>
					</DetailsItem>

					<DetailsItem>
						<span className="list_content">Username</span>
						<span className="list_content">
							<CustomInput
								type="text"
								id="name"
								name="name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.name && errors.name}
								errorMessage={errors.name}
								placeholder="Enter A User Name"
								useBackground
								paddingX="7px"
								paddingY="3px"
							/>
						</span>
					</DetailsItem>

					<DetailsItem>
						<span className="list_content">Phone Number</span>
						<span className="list_content">
							<PhoneInput
								name="phoneNumber"
								id="phoneNumber"
								onBlur={handleBlur}
								phoneNumber={phoneNumber.number || ''}
								placeholder="Phone Number"
								// onChange={handleChange}
								customChange={(value) =>
									setFieldValue('phoneNumber', {
										number: value?.fullPhoneNumber?.toString(),
										country: value?.country,
									})
								}
								isError={touched.phoneNumber && errors.phoneNumber}
								errormessage={errors.phoneNumber}
								useBackground
								paddingX="7px"
								paddingY="3px"
								country={phoneNumber.country}
							/>
						</span>
					</DetailsItem>

					<DetailsItem>
						<span className="list_content">Email</span>
						<span className="list_content">{user?.email || 'Nill'}</span>
					</DetailsItem>

					<DetailsItem>
						<span className="list_content flex items-center gap-[5px]">
							<div id="avatar">
								<div className="imageHolder rounded-[inherit]">
									{getImageURL(image) ? (
										<img
											className="rounded-[inherit]"
											src={getImageURL(image)}
											alt=""
										/>
									) : (
										<VectorIcon width="100%" height="100%" vector={profile} />
									)}
								</div>
							</div>
							profile image
						</span>
						<span className="list_content flex flex-col">
							<ChangeBtn htmlFor="uploader-button">
								<span className="content">Change</span>
							</ChangeBtn>

							<input
								type="file"
								name="image"
								id="uploader-button"
								multiple={false}
								accept="image/png, image/jpeg"
								onChange={onChangeFile}
							/>

							{touched.image && errors.image && (
								<p className="ml-[3px] text-[var(--form-error)] Form_error">
									{errors.image}
								</p>
							)}
						</span>
					</DetailsItem>
				</DetailsList>
			</form>
		</UserDetailsWrapper>
	);
}

export default UserDetails;
