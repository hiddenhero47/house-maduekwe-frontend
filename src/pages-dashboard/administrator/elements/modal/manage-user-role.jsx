import React, { useRef } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper, ApplyBtn } from './manage-user-role.style';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import BubbleSlide from '../../../../components/loaders/bubbles/BubbleSlide';
import { useTheme } from 'styled-components';
import UserServices from '../../../../features/services/custom-hooks/user';
import { roleType } from '../../../../utilities/app-const';

const ROLE_OPTIONS = [
	{ label: 'User', value: roleType.BASIC },
	{ label: 'Admin', value: roleType.ADMIN },
];

function ManageUserRole({ id, currentRole }) {
	const theme = useTheme();
	const { mutate: changeRole, isPending } = UserServices.changeUserRole();

	const modalRef = useRef(null);

	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	const validationSchema = Yup.object({
		role: Yup.string().required('Role is required'),
	});

	const onSubmit = (values, { resetForm }) => {
		changeRole(
			{ id, role: values.role },
			{
				onSuccess: () => {
					resetForm();
					closeModal?.();
				},
			}
		);
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues: { role: currentRole || '' },
			validationSchema,
			onSubmit,
			enableReinitialize: true,
		});

	const { role } = values;

	return (
		<>
			<button
				className="px-[10px] py-[5px] text-xs font-semibold rounded-md transition-all ml-[10px]"
				style={{ background: 'var(--mainBody-toolkitBg)' }}
				onClick={openModal}
			>
				Change Role
			</button>

			<Modal.Center
				width="fit-content"
				maxWidth="480px"
				refName={modalRef}
				animation
				onOpen={() => {}}
				onClose={() => {}}
			>
				<FilterModalWrapper>
					<div className="modal_header">
						<div>
							<h3>Manage Role</h3>
							<p>Update user access level and permissions.</p>
						</div>

						<IoClose className="closeBtn" onClick={closeModal} />
					</div>

					<form onSubmit={handleSubmit}>
						<div className="section">
							<div className="role_box">
								<h4>Select Role</h4>

								<div className="form_control">
									<label className="ml-[10px]">User Role</label>

									<CustomSelect
										options={ROLE_OPTIONS}
										value={role}
										name="role"
										id="role"
										placeholder="Select Role"
										handleChange={handleChange}
										onBlur={handleBlur}
										isError={touched.role && errors.role}
										errormessage={errors.role}
										paddingX="14px"
										paddingY="9px"
										useBackground
									/>
								</div>
							</div>
						</div>

						<p className="form_note">
							{role === 'admin'
								? 'Admin has elevated privileges'
								: 'Standard user access'}
						</p>

						<div className="actions">
							<ApplyBtn
								type="submit"
								$isLoading={isPending}
								disabled={isPending || !role}
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

export default ManageUserRole;
