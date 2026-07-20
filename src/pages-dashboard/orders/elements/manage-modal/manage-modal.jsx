import React, { useRef } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper, ApplyBtn } from './manage-modal.style';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import CustomInput from '../../../../components/form-components/input/custom-input';
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

	const { mutate: cancelOrder, isPending: isCanceling } =
		OrderServices.cancel();

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
		let data = { id, status: values.status };
		if (values.status === ORDER_STATUS.SHIPPED) {
			const shippingDetails = {
				company: values.company,
				trackingNumber: values.trackingNumber,
			};
			data = { ...data, shippingDetails };
		}

		if (values.status === ORDER_STATUS.CANCELLED) {
			return cancelOrder(
				{ id },
				{
					onSuccess: () => {
						resetForm();
						closeModal?.();
					},
				}
			);
		}

		changeStatus(
			{ id, data },
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
			initialValues: { status: '', company: '', trackingNumber: '' },
			// validationSchema: ,
			onSubmit,
		});

	const { status, company, trackingNumber } = values;

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

						{status === ORDER_STATUS.SHIPPED && (
							<div className="section">
								<div className="shipping_box">
									<h4 className="mb-[10px]">Shipping Details</h4>

									<div className="form_control">
										<label className="ml-[10px]">Company Name</label>

										<CustomInput
											id="company"
											name="company"
											value={company}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={touched.company && errors.company}
											errormessage={errors.company}
											placeholder="Shipping company name"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>

									<div className="form_control">
										<label className="ml-[10px]">Tracking Number</label>

										<CustomInput
											id="trackingNumber"
											name="trackingNumber"
											value={trackingNumber}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={touched.trackingNumber && errors.trackingNumber}
											errormessage={errors.trackingNumber}
											placeholder="Shipping tracking number"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>
								</div>
							</div>
						)}

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
