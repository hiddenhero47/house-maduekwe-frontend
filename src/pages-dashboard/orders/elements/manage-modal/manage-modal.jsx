import React, { useRef } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper, ApplyBtn } from './manage-modal.style';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import { OrderServices } from '../../../../features/services/custom-hooks/orders';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useTheme } from 'styled-components';

const ORDER_STATUS = {
	PENDING: 'pending',
	PAID: 'paid',
	PROCESSING: 'processing',
	SHIPPED: 'shipped',
	DELIVERED: 'delivered',
	CANCELLED: 'cancelled',
	RETURNED: 'returned',
	RETURNING: 'processing-return',
};

function ManageModal({ id }) {
	const theme = useTheme();
	const { mutate: changeStatus, isPending } = OrderServices.updateStatus();

	const modalRef = useRef(null);
	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.open();
		}
	};
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	const onSubmit = async (values, { resetForm }) => {
		changeStatus(
			{ id, status: values.status },
			{
				onSuccess: () => {
					resetForm();
					closeModal?.();
				},
			}
		);
	};

	const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
		useFormik({
			initialValues: { status: '' },
			// validationSchema: ,
			onSubmit,
		});

	const { status } = values;

	const orderStatusOptions = Object.entries(ORDER_STATUS).map(
		([key, value]) => ({
			label:
				key === 'ALL'
					? 'All'
					: key
							.replace(/_/g, ' ')
							.toLowerCase()
							.replace(/\b\w/g, (c) => c.toUpperCase()),
			value,
		})
	);
	return (
		<>
			<button
				className="px-[10px] py-[5px] text-xs font-semibold rounded-md transition-all ml-[10px]"
				style={{
					background: 'var(--mainBody-toolkitBg)',
				}}
				onClick={() => openModal()}
			>
				<div className="flex items-center gap-[5px]">Change Status</div>
			</button>

			<Modal.Center
				width="fit-content"
				maxWidth="500px"
				refName={modalRef}
				onClose={() => {}}
				onOpen={() => {}}
				animation
			>
				<FilterModalWrapper>
					<div className="modal_header">
						<div>
							<h3>Manage Status</h3>
							<p>Review and change status for this order.</p>
						</div>

						<IoClose className="closeBtn" onClick={closeModal} />
					</div>

					<form onSubmit={handleSubmit}>
						<div className="section">
							<div className="form_control">
								<label className="ml-[10px]">Status</label>

								<CustomSelect
									options={orderStatusOptions}
									value={status}
									name="status"
									id="status"
									placeholder="Select Status"
									handleChange={handleChange}
									onBlur={handleBlur}
									isError={touched.status && errors.status}
									errormessage={errors.status}
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>

								<p className="form_note">Change the statue of an order.</p>
							</div>
						</div>

						<div className="actions">
							<ApplyBtn
								type="submit"
								$isLoading={isPending}
								disabled={isPending}
							>
								<span className="content">Apply Changes</span>
								<div className="loader">
									<BubbleSlide
										color={
											theme.mode === 'dark' ? '#0f0f0f' : theme.formBtn.text
										}
										height="20px"
									/>
								</div>
							</ApplyBtn>
						</div>
					</form>
				</FilterModalWrapper>
			</Modal.Center>
		</>
	);
}

export default ManageModal;
