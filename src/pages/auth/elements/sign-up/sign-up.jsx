import React from 'react';
import { Wrapper, SubmitBtn } from './sign-up.style';
import CustomInput from '../../../../components/form-components/input/custom-input';
import CustomPassword from '../../../../components/form-components/input/custom-password';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { IoLogoApple } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { FaGoogle } from 'react-icons/fa';
import { userCreateValidationSchema } from '../../../../features/validations/user-validation';
import UserServices from '../../../../features/services/custom-hooks/user';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useSelector, useDispatch } from 'react-redux';
import { handleOpen } from '../../../../store/slice/2fa-handler';
import { setTwoFaRetry } from '../../../../components/modal-assets/2fa-modal/retry-manager';
import { GoogleLogin } from '@react-oauth/google';
import AppleSignin from 'react-apple-signin-auth';
import { toast } from 'react-toastify';

function SignUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		mutate: registerUser,
		isPending,
		isSuccess,
		isError,
		error,
		data,
	} = UserServices.register();

	const {
		mutate: googleLogin,
		mutateAsync: lazyGoogleLogin,
		isPending: googleLoginPending,
		isSuccess: googleLoginSuccess,
		isError: googleLoginError,
		error: googleLoginErrorData,
		data: googleLoginData,
	} = UserServices.googleLogin();

	const {
		mutate: appleLogin,
		mutateAsync: lazyAppleLogin,
		isPending: appleLoginPending,
		isSuccess: appleLoginSuccess,
		isError: appleLoginError,
		error: appleLoginErrorData,
		data: appleLoginData,
	} = UserServices.appleLogin();

	const initialValues = {
		email: '',
		password: '',
		name: 'New User',
	};

	const onSubmit = async (values) => {
		await registerUser(values);
	};

	const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: userCreateValidationSchema,
			onSubmit,
		});

	const { email, password, name } = values;

	const loginWithGoogle = async (credentialResponse) => {
		googleLogin(
			{
				idToken: credentialResponse.credential,
			},
			{
				onError: (error, variables) => {
					if (error?.is2FARequired) {
						setTwoFaRetry((otp) =>
							lazyGoogleLogin({
								...variables,
								token: otp,
							})
						);

						dispatch(handleOpen(true));
					}
				},
			}
		);
	};

	const loginWithApple = async (response) => {
		appleLogin({
			identityToken: response.authorization.id_token,
		});
	};

	return (
		<Wrapper>
			<div className="header">
				<h3>Create your account</h3>
				<p>Sign up to access exclusive features</p>
			</div>
			<form onSubmit={handleSubmit}>
				{/* <div className="form_control">
					<label>User Name</label>
					<CustomInput
						autoComplete="on"
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						onBlur={handleBlur}
						isError={touched.name && errors.name}
						errormessage={errors.name}
						placeholder="Enter a User Name"
						paddingX="14px"
						paddingY="10px"
						useBackground
					/>
				</div> */}

				<div className="form_control">
					<label>Email Address</label>
					<CustomInput
						autoComplete="on"
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
						onBlur={handleBlur}
						isError={touched.email && errors.email}
						errormessage={errors.email}
						placeholder="you@example.com"
						paddingX="14px"
						paddingY="10px"
						useBackground
					/>
				</div>

				<div className="form_control">
					<label>Password</label>
					<CustomPassword
						name="password"
						value={password}
						onChange={handleChange}
						onBlur={handleBlur}
						isError={touched.password && errors.password}
						errormessage={errors.password}
						placeholder="Enter Password"
						paddingX="14px"
						paddingY="10px"
						useBackground
					/>
				</div>

				<SubmitBtn
					$isLoading={isPending}
					disabled={isPending}
					type="submit"
					className="mt-[5px]"
				>
					<div className="content">
						<HiOutlineLogin />
						Sign up
					</div>
					<div className="loader">
						<BubbleSlide color="var(--addToCart-text)" height="20px" />
					</div>
				</SubmitBtn>
			</form>

			<div className="divider">
				<div />
				<span>Or continue with</span>
				<div />
			</div>

			<div className="socials">
				<button type="button" className="google">
					<FcGoogle />
					Continue with Google
					<div className="google_overlay">
						<GoogleLogin
							onSuccess={(credentialResponse) =>
								loginWithGoogle(credentialResponse)
							}
							onError={() => {
								toast.error('Google Login Failed');
							}}
						/>
					</div>
				</button>

				<AppleSignin
					authOptions={{
						clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
						scope: 'email name',
						redirectURI: window.location.origin,
						responseType: 'code id_token',
						responseMode: 'fragment',
					}}
					onSuccess={(response) => loginWithApple(response)}
					onError={(err) => toast.error('Apple Login Failed')}
					render={(props) => (
						<button className="apple" {...props}>
							<IoLogoApple />
							Continue with Apple
						</button>
					)}
				/>
			</div>

			<span className="footer_text">
				Already have an account? <Link to="/authentication">Log in</Link>
			</span>
		</Wrapper>
	);
}

export default SignUp;
