import React from 'react';
import Modal from '../../../../components/modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../../../components/form-components/input/custom-input';
import { ModalWrapper, MyForm, SubmitBtn } from './modal.style';
import PaymentProviderServices from '../../../../features/services/custom-hooks/payment-providers';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { MdPayments } from 'react-icons/md';

function CreateProvider({ ref, closeModal }) {
	const initialValues = {
		provider: '',
		percentageFee: '',
		flatFee: '',
	};

	const { mutate: createProvider, isPending } =
		PaymentProviderServices.create();

	const onSubmit = (values, { resetForm }) => {
		createProvider(values, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			onSubmit,
		});

	const { provider, percentageFee, flatFee } = values;

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
						<h3>Create Payment Provider</h3>
						<p>Add a new payment gateway/provider.</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="section">
						<div className="form_control">
							<label>Provider Name</label>

							<CustomInput
								name="provider"
								value={provider}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.provider && errors.provider}
								errormessage={errors.provider}
								placeholder="e.g. paystack"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="grid-2">
							<div className="form_control">
								<label>Percentage Fee</label>

								<CustomInput
									type="number"
									name="percentageFee"
									value={percentageFee}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="1.5"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>

							<div className="form_control">
								<label>Flat Fee</label>

								<CustomInput
									type="number"
									name="flatFee"
									value={flatFee}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="100"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending}>
						<div className="content">
							Create Provider <MdPayments />
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

export default CreateProvider;
