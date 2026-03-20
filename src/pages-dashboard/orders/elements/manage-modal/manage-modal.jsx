import React, { useRef } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper } from './manage-modal.style';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import CustomSelect from '../../../../components/form-components/select/custom-select';

const ORDER_STATUS = {
	PENDING: 'pending',
	PAID: 'paid',
	PROCESSING: 'processing',
	SHIPPED: 'shipped',
	DELIVERED: 'delivered',
	CANCELLED: 'cancelled',
	RETURNED: 'returned',
	RETURNING: 'processing-return',
	ALL: '',
};

function ManageShopItemsModal({ id }) {
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

	const onSubmit = async (values, { resetForm }) => {};

	const { values, errors, handleBlur, touched, handleChange } = useFormik({
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
							<p>Review and change status from this order.</p>
						</div>

						<IoClose className="closeBtn" onClick={closeModal} />
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<div className="section">
							<div className="form_control">
								<label className="ml-[10px]">Search Products</label>

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

								<p className="form_note">
									Search products by name or keywords.
								</p>
							</div>
						</div>

						<div className="actions">
							<button type="submit" className="apply_btn">
								Apply Changes
							</button>
						</div>
					</form>
				</FilterModalWrapper>
			</Modal.Center>
		</>
	);
}

export default ManageShopItemsModal;
