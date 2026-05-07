import React, { useMemo } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../../../components/form-components/input/custom-input';
import { ModalWrapper, MyForm, SubmitBtn } from './modal.style';
import PaymentProviderServices from '../../../../features/services/custom-hooks/payment-providers';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { MdPayments } from 'react-icons/md';

function EditProvider({ ref, closeModal, data, clear }) {
	const { mutate: updateProvider, isPending } =
		PaymentProviderServices.update();

	const initialValues = useMemo(
		() => ({
			provider: data?.provider || '',
			percentageFee: data?.percentageFee || '',
			flatFee: data?.flatFee || '',
		}),
		[data]
	);

	const onSubmit = (values) => {
		updateProvider(
			{
				id: data?._id,
				data: values,
			},
			{
				onSuccess: () => {
					closeModal?.();
					clear?.();
				},
			}
		);
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			enableReinitialize: true,
			onSubmit,
		});

        const { provider, percentageFee, flatFee } = values;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			refName={ref}
			onClose={() => clear()}
			onOpen={() => {}}
			animation
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Edit Payment Provider</h3>
						<p>Update payment provider information.</p>
					</div>

					<IoClose
						className="closeBtn"
						onClick={() => {
							closeModal?.();
							clear?.();
						}}
					/>
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
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending}>
						<div className="content">
							Update Provider <MdPayments />
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

export default EditProvider;
