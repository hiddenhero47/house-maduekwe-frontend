import React from 'react';
import { useFormik } from 'formik';
import { ChangePasswordWrapper, SaveBtn } from './change-password.style';
import CustomPassword from '../../../../../components/form-components/input/custom-password';
import UserServices from '../../../../../features/services/custom-hooks/user';
import { userPasswordValidationSchema } from '../../../../../features/validations/user-validation';
import BubbleSlide from '../../../../../components/loaders/bubbles/BubbleSlide';
import { FiLock } from 'react-icons/fi';
import { toast } from '../../../../../layouts/toast/toast-handler';

function ChangePassword() {
	const { mutate: update, isPending } = UserServices.updateProfile();

	const initialValues = {
		oldPassword: '',
		password: '',
	};

	const onSubmit = (values, { resetForm }) => {
		update(values, {
			onSuccess: () => {
				resetForm();
				toast.success('Password updated successfully');
			},
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: userPasswordValidationSchema,
			onSubmit,
		});

	return (
		<ChangePasswordWrapper>
			{/* Header */}
			<div className="header">
				<h3>
					<FiLock />
					Change Password
				</h3>
				<p>Update your password to keep your account secure</p>
			</div>

			<form onSubmit={handleSubmit}>
				{/* Old Password */}
				<div className="form_control">
					<label>Current Password</label>
					<CustomPassword
						name="oldPassword"
						value={values.oldPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						isError={touched.oldPassword && errors.oldPassword}
						errormessage={errors.oldPassword}
						placeholder="Enter current password"
						paddingX="14px"
						paddingY="10px"
						useBackground
					/>
				</div>

				{/* New Password */}
				<div className="form_control mt-[10px]">
					<label>New Password</label>
					<CustomPassword
						name="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						isError={touched.password && errors.password}
						errormessage={errors.password}
						placeholder="Enter new password"
						paddingX="14px"
						paddingY="10px"
						useBackground
					/>
				</div>

				{/* Helper text */}
				<p className="helper mt-[20px]">
					Password must be at least 8 characters, include uppercase, lowercase,
					and a number.
				</p>

				{/* Submit */}
				<SaveBtn
					type="submit"
					$isLoading={isPending}
					disabled={isPending || !values.oldPassword || !values.password}
				>
					<div className="content">
						<FiLock />
						Update Password
					</div>

					<div className="loader">
						<BubbleSlide color="var(--mainBody-text)" height="18px" />
					</div>
				</SaveBtn>
			</form>
		</ChangePasswordWrapper>
	);
}

export default ChangePassword;
