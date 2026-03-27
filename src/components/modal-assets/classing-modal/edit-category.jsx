import React, { useMemo } from 'react';
import Modal from '../../modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../form-components/input/custom-input';
import { ModalWrapper, MyForm, SubmitBtn } from './create-category.style';
import { categoryValidationSchema } from '../../../features/validations/category-validation';
import CategoryServices from '../../../features/services/custom-hooks/category';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { BiSolidCabinet } from 'react-icons/bi';

function EditCategory({ ref, closeModal, category, clear }) {
	const initialValues = useMemo(
		() => ({
			name: category?.name || '',
		}),
		[category]
	);

	const { mutate: updateCategory, isPending } = CategoryServices.update();

	const onSubmit = (values) => {
		updateCategory(
			{ id: category._id, data: values },
			{
				onSuccess: () => {
					closeModal?.();
				},
			}
		);
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: categoryValidationSchema,
			onSubmit,
			enableReinitialize: true, // keeps consistency (optional here but good habit)
		});

	const { name } = values;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => clear && clear()}
			onOpen={() => {}}
			refName={ref}
			animation
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Edit Category</h3>
						<p>Update your category details.</p>
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
						<div className="content">
							Update Category <BiSolidCabinet />
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

export default EditCategory;
