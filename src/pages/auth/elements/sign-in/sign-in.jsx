import React from 'react';
import { Wrapper, SubmitBtn } from './sign-in.style';
import CustomInput from '../../../../components/form-components/input/custom-input';
import CustomPassword from '../../../../components/form-components/input/custom-password';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import { IoLogoApple } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { FaGoogle } from 'react-icons/fa';

function SignIn() {
	const initialValues = {
		email: '',
		password: '',
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

	const { email, password } = values;
	return (
		<Wrapper>
			<div className="header">
				<h3>Welcome Back</h3>
				<p>Login to your account</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form_control">
					<label>Email Address</label>
					<CustomInput
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

				<Link to="/auth/forgot-password" id="forgot_password">
					Forgot Password?
				</Link>

				<SubmitBtn type="submit">
					<div className="content">
						<HiOutlineLogin />
						Log In
					</div>
					<div className='loader'></div>
				</SubmitBtn>
			</form>

			<div className="divider">
				<div />
				<span>Or continue with</span>
				<div />
			</div>

			<div className="socials">
				<button className="google">
					<FcGoogle />
					Continue with Google
				</button>

				<button className="apple">
					<IoLogoApple />
					Continue with Apple
				</button>
			</div>

			<span className="footer_text">
				Don’t have an account? <Link to="/auth/sign-up">Sign up</Link>
			</span>
		</Wrapper>
	);
}

export default SignIn;
