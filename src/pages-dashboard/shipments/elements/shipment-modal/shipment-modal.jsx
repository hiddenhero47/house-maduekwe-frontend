import React, { useRef, useState } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper, ApplyBtn } from './shipment-modal.style';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import CustomInput from '../../../../components/form-components/input/custom-input';
import ShipmentServices from '../../../../features/services/custom-hooks/shipments';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useTheme } from 'styled-components';
import { SHIPMENT_STATUS } from '../../../../utilities/app-const';

const SHIPPABLE_ORDER_STATUSES = ['paid', 'processing', 'shipped', 'delivered'];

function ShipmentModal({ orderId, orderStatus }) {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const { data: shipment, isPending: isLoadingShipment, error } =
		ShipmentServices.getForOrder(orderId, { enabled: isOpen });

	const hasShipment = !!shipment && !error;
	const notFound = error?.response?.status === 404;

	const { mutate: createShipment, isPending: isCreating } =
		ShipmentServices.create();
	const { mutate: updateStatus, isPending: isUpdating } =
		ShipmentServices.updateStatus();

	const modalRef = useRef(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	const onSubmit = (values, { resetForm }) => {
		if (hasShipment) {
			updateStatus(
				{ orderId, data: { status: values.status } },
				{ onSuccess: () => closeModal?.() }
			);
			return;
		}

		createShipment(
			{
				orderId,
				data: {
					carrier: values.carrier,
					trackingNumber: values.trackingNumber,
					...(values.trackingUrl ? { trackingUrl: values.trackingUrl } : {}),
				},
			},
			{
				onSuccess: () => {
					resetForm();
					closeModal?.();
				},
			}
		);
	};

	const validate = (vals) => {
		const validationErrors = {};

		if (hasShipment) {
			if (!vals.status) validationErrors.status = 'Status is required';
		} else {
			if (!vals.carrier?.trim())
				validationErrors.carrier = 'Carrier is required';
			if (!vals.trackingNumber?.trim())
				validationErrors.trackingNumber = 'Tracking number is required';
		}

		return validationErrors;
	};

	const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
		useFormik({
			initialValues: { carrier: '', trackingNumber: '', trackingUrl: '', status: '' },
			enableReinitialize: true,
			validate,
			onSubmit,
		});

	const { carrier, trackingNumber, trackingUrl, status } = values;

	const statusOptions = Object.entries(SHIPMENT_STATUS).map(([key, value]) => ({
		label: key
			.replace(/_/g, ' ')
			.toLowerCase()
			.replace(/\b\w/g, (c) => c.toUpperCase()),
		value,
	}));

	const isBusy = isCreating || isUpdating;
	const canOpen = SHIPPABLE_ORDER_STATUSES.includes(orderStatus);

	return (
		<>
			<button
				className="px-[10px] py-[5px] text-xs font-semibold rounded-md transition-all ml-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
				style={{ background: 'var(--mainBody-toolkitBg)' }}
				onClick={() => openModal()}
				disabled={!canOpen}
			>
				<div className="flex items-center gap-[5px]">Manage Shipment</div>
			</button>

			<Modal.Center
				width="fit-content"
				maxWidth="500px"
				refName={modalRef}
				onClose={() => setIsOpen(false)}
				onOpen={() => setIsOpen(true)}
				animation
			>
				<FilterModalWrapper>
					<div className="modal_header">
						<div>
							<h3>Manage Shipment</h3>
							<p>
								{hasShipment
									? 'Update the shipment status for this order.'
									: 'Create a shipment for this paid/processing order.'}
							</p>
						</div>

						<IoClose className="closeBtn" onClick={closeModal} />
					</div>

					{isLoadingShipment ? (
						<div className="section">
							<BubbleSlide color={theme.mainBody.text} height="20px" />
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							{hasShipment ? (
								<>
									<div className="section shipping_box">
										<div className="readonly_row">
											<span>Carrier</span>
											<span>{shipment.carrier || '—'}</span>
										</div>
										<div className="readonly_row">
											<span>Tracking Number</span>
											<span>{shipment.trackingNumber || '—'}</span>
										</div>
										{shipment.trackingUrl && (
											<div className="readonly_row">
												<span>Tracking URL</span>
												<span>{shipment.trackingUrl}</span>
											</div>
										)}
									</div>

									<div className="section">
										<div className="form_control">
											<label className="ml-[10px]">Status</label>

											<CustomSelect
												options={statusOptions}
												value={status}
												name="status"
												id="status"
												placeholder="Select shipment status"
												handleChange={handleChange}
												onBlur={handleBlur}
												isError={touched.status && errors.status}
												errormessage={errors.status}
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>
									</div>
								</>
							) : notFound ? (
								<div className="section">
									<div className="form_control">
										<label className="ml-[10px]">Carrier</label>

										<CustomInput
											id="carrier"
											name="carrier"
											value={carrier}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={touched.carrier && errors.carrier}
											errormessage={errors.carrier}
											placeholder="e.g. DHL"
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

									<div className="form_control">
										<label className="ml-[10px]">Tracking URL (optional)</label>

										<CustomInput
											id="trackingUrl"
											name="trackingUrl"
											value={trackingUrl}
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="https://..."
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>
								</div>
							) : (
								<div className="section">
									<p className="form_note">
										Couldn't load shipment info for this order. Close and try again.
									</p>
								</div>
							)}

							{(hasShipment || notFound) && (
								<div className="actions">
									<ApplyBtn type="submit" $isLoading={isBusy} disabled={isBusy}>
										<span className="content">
											{hasShipment ? 'Update Status' : 'Create Shipment'}
										</span>
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
							)}
						</form>
					)}
				</FilterModalWrapper>
			</Modal.Center>
		</>
	);
}

export default ShipmentModal;
