import React from 'react';
import Modal from '../../../../components/modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import CustomInput from '../../../../components/form-components/input/custom-input';
import SearchSelect from '../../../../components/form-components/select/search-select';
import { ModalWrapper, MyForm, SubmitBtn } from './modal.style';
import ExportFeeServices from '../../../../features/services/custom-hooks/export-fee';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { TbWorld } from 'react-icons/tb';

import {
	getCountryOptions,
	getStatesOptions,
} from '../../../../utilities/city-state-country';

function CreateExportFee({ ref, closeModal }) {
	const { mutate: createExportFee, isPending } = ExportFeeServices.create();

	const initialValues = {
		country: '',
		defaultAmount: '',
		states: [],
	};

	const onSubmit = (values, { resetForm }) => {
		const payload = {
			...values,
			country: values.country?.toUpperCase(),
			states: values.states.filter((item) => item.state && item.amount !== ''),
		};

		createExportFee(payload, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues,
		onSubmit,
	});

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="650px"
			refName={ref}
			onClose={() => {}}
			onOpen={() => {}}
			animation
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Create Export Fee</h3>
						<p>Create shipping/export pricing for a country.</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="section">
						<h4>Country Details</h4>

						<div className="grid-2">
							<div className="form_control">
								<label>Country</label>

								<SearchSelect
									id="country"
									name="country"
									value={values.country}
									onChange={(e) => setFieldValue('states', [])}
									handleChange={handleChange}
									onBlur={handleBlur}
									placeholder="Select country"
									options={getCountryOptions() || []}
									paddingX="14px"
									paddingY="9px"
									useBackground
									isError={touched.country && errors.country}
									errormessage={errors.country}
								/>
							</div>

							<div className="form_control">
								<label>Default Amount</label>

								<CustomInput
									type="number"
									name="defaultAmount"
									value={values.defaultAmount}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="5000"
									paddingX="14px"
									paddingY="9px"
									useBackground
									isError={touched.defaultAmount && errors.defaultAmount}
									errormessage={errors.defaultAmount}
								/>
							</div>
						</div>
					</div>

					<div className="section">
						<div className="state_header">
							<div>
								<h4>State Fees</h4>
								<p>Optional custom pricing for specific states.</p>
							</div>

							<button
								type="button"
								className="add_btn"
								onClick={() =>
									setFieldValue('states', [
										...values.states,
										{
											state: '',
											amount: '',
										},
									])
								}
							>
								<IoIosAddCircle />
								Add State
							</button>
						</div>

						<div className="states_wrapper">
							{values.states?.map((item, index) => (
								<div key={index} className="state_card">
									<div className="grid-2">
										<div className="form_control">
											<label>State</label>

											<SearchSelect
												id={`states.${index}.state`}
												name={`states.${index}.state`}
												value={item.state}
												handleChange={handleChange}
												onBlur={handleBlur}
												placeholder="Select state"
												options={getStatesOptions(values.country) || []}
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label>Amount</label>

											<CustomInput
												type="number"
												name={`states.${index}.amount`}
												value={item.amount}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="2500"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>
									</div>

									<button
										type="button"
										className="remove_btn"
										onClick={() => {
											const updated = values.states.filter(
												(_, i) => i !== index
											);

											setFieldValue('states', updated);
										}}
									>
										<IoIosRemoveCircle />
										Remove
									</button>
								</div>
							))}
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">
							Create Export Fee <TbWorld />
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

export default CreateExportFee;
