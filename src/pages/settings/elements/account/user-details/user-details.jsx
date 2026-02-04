import React from 'react';
import {
	UserDetailsWrapper,
	DetailsList,
	DetailsItem,
	SaveBtn,
} from './user-details.style';
import { IoIosArrowForward } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { useFormik } from 'formik';
import PhoneInput from '../../../../../components/form-components/phone-number/phone-number';
import CustomInput from '../../../../../components/form-components/input/custom-input';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function UserDetails() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const initialValues = {
		name: user?.name || '',
		phoneNumber: user?.phoneNumber?.number || '',
	};

	const onSubmit = async (values) => {
		console.log(values);
	};
	const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			// validationSchema: validationSchema,
			onSubmit,
		});

	const { name, phoneNumber } = values;
	return (
		<UserDetailsWrapper>
			<div className="w-full flex justify-end gap-[10px]">
				<button id="btn_dashboard" onClick={() => navigate('/admin')}>
					<RxDashboard />
					<span>Dashboard</span>
					<IoIosArrowForward />
				</button>

				<SaveBtn>
					<div className="content">save</div>
				</SaveBtn>
			</div>

			<form>
				<DetailsList>
					<DetailsItem>
						<span className="list_content">User ID</span>
						<span className="list_content">{user?._id || "Nill"}</span>
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
								phoneNumber={phoneNumber || ''}
								placeholder="Phone Number"
								onChange={handleChange}
								isError={touched.phoneNumber && errors.phoneNumber}
								errormessage={errors.phoneNumber}
								useBackground
								paddingX="7px"
								paddingY="3px"
								country={user?.phoneNumber?.country || 'US'}
							/>
						</span>
					</DetailsItem>

					<DetailsItem>
						<span className="list_content">Email</span>
						<span className="list_content">{user?.email || "Nill"}</span>
					</DetailsItem>
				</DetailsList>
			</form>
		</UserDetailsWrapper>
	);
}

export default UserDetails;
