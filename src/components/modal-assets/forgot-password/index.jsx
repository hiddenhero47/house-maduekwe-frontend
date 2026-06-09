// forgot-password-modal.jsx

import React, { useEffect, useState } from 'react';
import Modal from '../../modal/index_modal';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../form-components/input/custom-input';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import UserServices from '../../../features/services/custom-hooks/user';

import { ModalWrapper, MyForm, SubmitBtn } from './index.style';

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
});

function ForgotPasswordModal({ ref, closeModal }) {
	const [cooldown, setCooldown] = useState(0);
	const [emailSent, setEmailSent] = useState(false);

	const { mutate: requestReset, isPending } = UserServices.requestReset();

	useEffect(() => {
		if (!cooldown) return;

		const timer = setInterval(() => {
			setCooldown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [cooldown]);

	const onSubmit = ({ email }) => {
		requestReset(email, {
			onSuccess: () => {
				setEmailSent(true);
				setCooldown(60);
			},
		});
	};

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: '',
			},
			validationSchema,
			onSubmit,
		});

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			refName={ref}
			onClose={() => {}}
			onOpen={() => {}}
			animation
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Reset Password</h3>

						<p>
							Enter the email associated with your account. We'll send a
							password reset link.
						</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="form_control">
						<label>Email Address</label>

						<CustomInput
							type="email"
							name="email"
							value={values.email}
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

					{emailSent && (
						<div className="success_message">
							If an account exists for this email, a reset link has been sent.
							<br />
							Reset link sent to <strong>{values.email}</strong>
						</div>
					)}

					<SubmitBtn
						type="submit"
						$isLoading={isPending}
						disabled={isPending || cooldown > 0}
					>
						<div className="content">
							{cooldown > 0
								? `Resend in ${cooldown}s`
								: emailSent
									? 'Resend Email'
									: 'Send Reset Link'}
						</div>

						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</MyForm>
			</ModalWrapper>
		</Modal.Center>
	);
}

export default ForgotPasswordModal;
