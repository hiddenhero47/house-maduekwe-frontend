import React from 'react';
import { useFormik } from 'formik';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineKey, HiOutlineLockClosed } from 'react-icons/hi';
import CustomInput from '../../components/form-components/input/custom-input';
import CustomPassword from '../../components/form-components/input/custom-password';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import UserServices from '../../features/services/custom-hooks/user';
import { toast } from '../../layouts/toast/toast-handler';
import { PageWrapper, ResetCard, SubmitBtn } from './elements/index.style';

function ResetPassword() {
	const { token } = useParams();

	const { mutate: resetPassword, isPending } = UserServices.resetPassword();

	const initialValues = {
		token: token || '',
		password: '',
		confirmPassword: '',
	};

	const onSubmit = (values) => {
		if (values.password !== values.confirmPassword) {
			return toast.error('Passwords do not match');
		}

		resetPassword({
			token: values.token,
			password: values.password,
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			onSubmit,
		});

	return (
		<PageWrapper>
			<ResetCard>
				<div className="header">
					<h2>Reset Password</h2>

					<p>Enter your reset token and choose a new password.</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form_control">
						<label>Reset Token</label>

						<CustomInput
							name="token"
							value={values.token}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Paste your reset token"
							paddingX="14px"
							paddingY="10px"
							useBackground
							leftIcon={<HiOutlineKey />}
						/>
					</div>

					<div className="form_control">
						<label>New Password</label>

						<CustomPassword
							name="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Enter new password"
							paddingX="14px"
							paddingY="10px"
							useBackground
						/>
					</div>

					<div className="form_control">
						<label>Confirm Password</label>

						<CustomPassword
							name="confirmPassword"
							value={values.confirmPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Confirm new password"
							paddingX="14px"
							paddingY="10px"
							useBackground
						/>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">
							<HiOutlineLockClosed />
							Reset Password
						</div>

						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</form>

				<div className="footer">
					<Link to="/authentication/sign-in">Back to Sign In</Link>
				</div>
			</ResetCard>
		</PageWrapper>
	);
}

export default ResetPassword;
