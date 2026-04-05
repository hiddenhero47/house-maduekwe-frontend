import React from 'react';
import Modal from '../../modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../form-components/input/custom-input';
import { ModalWrapper, MyForm, SubmitBtn } from './create-category.style';
import { categoryValidationSchema } from '../../../features/validations/category-validation';
import CategoryServices from '../../../features/services/custom-hooks/category';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { BiSolidCabinet } from 'react-icons/bi';

function CreateCategory({ ref, openModal, closeModal }) {
	const initialValues = {
		name: '',
	};

	const { mutate: createCategory, isPending } = CategoryServices.create();

	const onSubmit = (values, { resetForm }) => {
		createCategory(values, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: categoryValidationSchema,
			onSubmit,
		});

	const { name } = values;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => {}}
			onOpen={() => {}}
			refName={ref}
			animation
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Create Category</h3>
						<p>
							Categories help organize your products for better filtering and
							structure.
						</p>
					</div>

					<IoClose
						className="closeBtn"
						onClick={closeModal}
						style={{ cursor: 'pointer' }}
					/>
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="section">
						<div className="form_control">
							<label className="ml-[10px]">Category Name</label>
							<CustomInput
								id="name"
								name="name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.name && errors.name}
								errormessage={errors.name}
								placeholder="e.g. Sneakers"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">Create Category <BiSolidCabinet /></div>
						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</MyForm>
			</ModalWrapper>
		</Modal.Center>
	);
}

export default CreateCategory;
