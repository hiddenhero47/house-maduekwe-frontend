import React from 'react';
import Modal from '../../modal/index_modal';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../../form-components/input/custom-input';
import CustomSelect from '../../form-components/select/custom-select';
import { ModalWrapper, MyForm, SubmitBtn } from './create-package.style';
import { packageValidationSchema } from '../../../features/validations/package-validation';
import PackageServices from '../../../features/services/custom-hooks/package';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { BiSolidCabinet } from 'react-icons/bi';
import { WEIGHT_UNITS } from '../../../utilities/app-const';

const weightUnitOptions = WEIGHT_UNITS.map((unit) => ({ label: unit, value: unit }));

function CreatePackage({ ref, openModal, closeModal }) {
	const initialValues = {
		name: '',
		length: '',
		width: '',
		height: '',
		weight: { value: '', unit: 'kg' },
	};

	const { mutate: createPackage, isPending } = PackageServices.create();

	const onSubmit = (values, { resetForm }) => {
		createPackage(values, {
			onSuccess: () => {
				resetForm();
				closeModal?.();
			},
		});
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: packageValidationSchema,
			onSubmit,
		});

	const { name, length, width, height, weight } = values;

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
						<h3>Create Package</h3>
						<p>
							Define a reusable box size — products linked to it ship with
							these dimensions and packaging weight.
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
							<label className="ml-[10px]">Package Name</label>
							<CustomInput
								id="name"
								name="name"
								value={name}
								onChange={handleChange}
								onBlur={handleBlur}
								isError={touched.name && errors.name}
								errormessage={errors.name}
								placeholder="e.g. Standard Box"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="form_control">
							<label className="ml-[10px]">Dimensions (inches)</label>
							<div className="grid-3">
								<CustomInput
									type="number"
									id="length"
									name="length"
									value={length}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.length && errors.length}
									errormessage={errors.length}
									placeholder="Length"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
								<CustomInput
									type="number"
									id="width"
									name="width"
									value={width}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.width && errors.width}
									errormessage={errors.width}
									placeholder="Width"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
								<CustomInput
									type="number"
									id="height"
									name="height"
									value={height}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.height && errors.height}
									errormessage={errors.height}
									placeholder="Height"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>

						<div className="form_control">
							<label className="ml-[10px]">Packaging Weight</label>
							<div className="grid-2">
								<CustomInput
									type="number"
									id="weight.value"
									name="weight.value"
									value={weight?.value}
									onChange={handleChange}
									onBlur={handleBlur}
									isError={touched.weight?.value && errors.weight?.value}
									errormessage={errors.weight?.value}
									placeholder="Box weight"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>

								<CustomSelect
									id="weight.unit"
									name="weight.unit"
									value={weight?.unit}
									handleChange={handleChange}
									onBlur={handleBlur}
									isError={touched.weight?.unit && errors.weight?.unit}
									errormessage={errors.weight?.unit}
									placeholder="Unit"
									paddingX="14px"
									paddingY="9px"
									useBackground
									options={weightUnitOptions}
								/>
							</div>
						</div>
					</div>

					<SubmitBtn type="submit" $isLoading={isPending} disabled={isPending}>
						<div className="content">Create Package <BiSolidCabinet /></div>
						<div className="loader">
							<BubbleSlide color="var(--addToCart-text)" height="20px" />
						</div>
					</SubmitBtn>
				</MyForm>
			</ModalWrapper>
		</Modal.Center>
	);
}

export default CreatePackage;
