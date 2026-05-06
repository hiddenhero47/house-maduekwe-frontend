import React from 'react';
import Modal from '../../../../components/modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../../../components/form-components/input/custom-input';
import CustomPassword from '../../../../components/form-components/input/custom-password';
import { ModalWrapper, MyForm, SubmitBtn } from './create-admin.style';
import { userCreateValidationSchema } from '../../../../features/validations/user-validation';
import UserServices from '../../../../features/services/custom-hooks/user';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { HiOutlineUserAdd } from 'react-icons/hi';

function CreateAdmin({ ref, closeModal }) {
	const { mutate: createAdmin, isPending } = UserServices.registerAdmin();

	const initialValues = {
		name: '',
		email: '',
		password: '',
	};

	const onSubmit = (values, { resetForm }) => {
		createAdmin(values, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: userCreateValidationSchema,
			onSubmit,
		});

	const { name, email, password } = values;

	return (
		<Modal.Center width="fit-content" maxWidth="500px" refName={ref} animation>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Create Admin</h3>
						<p>Add a new administrator with elevated privileges.</p>

						<div className="admin_tag">Admin Access</div>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="section">
						<div className="form_control intro-y">
							<label>User Name</label>
							<CustomInput
								name="name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.name && errors.name}
								errormessage={errors.name}
								placeholder="Enter admin name"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="form_control intro-y">
							<label>Email Address</label>
							<CustomInput
								type="email"
								name="email"
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.email && errors.email}
								errormessage={errors.email}
								placeholder="admin@example.com"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="form_control intro-y">
							<label>Password</label>
							<CustomPassword
								name="password"
								value={password}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.password && errors.password}
								errormessage={errors.password}
								placeholder="Enter secure password"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">
							<HiOutlineUserAdd />
							Create Admin
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

export default CreateAdmin;
