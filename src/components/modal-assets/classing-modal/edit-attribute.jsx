import React, { useMemo } from 'react';
import Modal from '../../modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../form-components/input/custom-input';
import CustomSelect from '../../form-components/select/custom-select';
import ChipsInput from '../../form-components/chips-input/chips-input';
import {
	ModalWrapper,
	MyForm,
	SubmitBtn,
	DefaultToggle,
	Color,
} from './create-attribute.style';
import { attributeType } from '../../../utilities/app-const';
import { attributeValidationSchema } from '../../../features/validations/attribute-validation';
import AttributeServices from '../../../features/services/custom-hooks/attribute';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { SiCircleci } from 'react-icons/si';

const attributeTypeOptions = [
	{ label: 'Color', value: attributeType.COLOR },
	{ label: 'Size', value: attributeType.SIZE },
	{ label: 'Others', value: attributeType.AUTO },
];

function EditAttribute({ ref, closeModal, attribute, clear }) {
	const { mutate: updateAttribute, isPending } = AttributeServices.update();

	// ✅ prepare initial values safely
	const initialValues = useMemo(
		() => ({
			name: attribute?.name || '',
			value: attribute?.value || '',
			type: attribute?.type || '',
			display: Array.isArray(attribute?.display)
				? ''
				: attribute?.display || '',
			multiDisplay: Array.isArray(attribute?.display) ? attribute?.display : [],
			isMixed: Array.isArray(attribute?.display),
		}),
		[attribute]
	);

	const onSubmit = (values) => {
		const payload = {
			...values,
			display: values.isMixed ? values.multiDisplay : values.display,
		};

		updateAttribute(
			{
				id: attribute?._id,
				data: payload,
			},
			{
				onSuccess: () => {
					closeModal?.();
				},
			}
		);
	};

	const {
		values,
		errors,
		handleBlur,
		touched,
		handleChange,
		handleSubmit,
		setFieldValue,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema: attributeValidationSchema,
		onSubmit,
		enableReinitialize: true,
	});

	const { name, value, type, display, multiDisplay, isMixed } = values;

	const isColor = type === attributeType.COLOR;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			refName={ref}
			animation
			onClose={() => clear && clear()}
			onOpen={() => {}}
		>
			<ModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Edit Attribute</h3>
						<p>Update attribute details and display settings.</p>
					</div>

					<IoClose
						className="closeBtn"
						onClick={closeModal}
						style={{ cursor: 'pointer' }}
					/>
				</div>

				<MyForm onSubmit={handleSubmit}>
					<div className="section">
						{/* NAME */}
						<div className="form_control">
							<label className="ml-[10px]">Name</label>
							<CustomInput
								id="name"
								name="name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.name && errors.name}
								errormessage={errors.name}
								placeholder="e.g. Dark Green"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						{/* TYPE */}
						<div className="form_control">
							<label className="ml-[10px]">Type</label>
							<CustomSelect
								id="type"
								name="type"
								value={type}
								handleChange={handleChange}
								onBlur={handleBlur}
								isError={touched.type && errors.type}
								errormessage={errors.type}
								options={attributeTypeOptions}
								placeholder="Select type"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						{/* VALUE */}
						{type && (
							<>
								{isColor ? (
									<div className="form_control">
										<label className="ml-[10px]">Value</label>
										<div className="grid-2">
											<CustomInput
												type="color"
												id="value"
												name="value"
												value={value || '#000000'}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.value && errors.value}
												paddingX="0"
												paddingY="0"
												useBackground
											/>
											<CustomInput
												type="text"
												id="value"
												name="value"
												value={value}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.value && errors.value}
												placeholder="#000000"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>
									</div>
								) : (
									<div className="form_control">
										<label className="ml-[10px]">Value</label>
										<CustomInput
											id="value"
											name="value"
											value={value}
											onChange={handleChange}
											onBlur={handleBlur}
											isError={touched.value && errors.value}
											errormessage={errors.value}
											placeholder="Enter value"
											paddingX="14px"
											paddingY="9px"
											useBackground
										/>
									</div>
								)}
							</>
						)}

						{/* TOGGLE */}
						<DefaultToggle>
							<div>
								<strong>Use multiple display values</strong>
								<p>Allow multiple display options.</p>
							</div>

							<label className="switch">
								<input
									type="checkbox"
									checked={isMixed}
									onChange={() => setFieldValue('isMixed', !isMixed)}
								/>
								<span className="slider"></span>
							</label>
						</DefaultToggle>

						{/* DISPLAY */}
						{!isMixed ? (
							<div className="form_control">
								<label className="flex items-center gap-[10px] ml-[10px]">
									Single Display{' '}
									{isColor && (
										<span className="flex gap-[5px]">
											<Color $color={display} />
										</span>
									)}
								</label>
								<CustomInput
									id="display"
									name="display"
									value={display}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.display && errors.display}
									errormessage={errors.display}
									placeholder="User-facing label"
									paddingX="14px"
									paddingY="9px"
									useBackground
									disabled={isMixed}
								/>
							</div>
						) : (
							<div className="form_control">
								<label className="flex items-center gap-[10px] ml-[10px]">
									Multiple Display{' '}
									{isColor && (
										<span className="flex gap-[5px]">
											{multiDisplay.map((color, index) => (
												<Color key={index} $color={color} />
											))}
										</span>
									)}
								</label>

								<ChipsInput
									id="multiDisplay"
									name="multiDisplay"
									value={multiDisplay}
									setFieldValue={setFieldValue}
									max={5}
									onBlur={handleBlur}
									isError={touched.multiDisplay && errors.multiDisplay}
									errormessage={errors.multiDisplay}
									placeholder="Add display value"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						)}
					</div>

					{/* SUBMIT */}
					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">
							Update Attribute <SiCircleci />
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

export default EditAttribute;
