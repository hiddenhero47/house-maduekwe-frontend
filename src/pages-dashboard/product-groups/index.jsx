import React, { useState } from 'react';
import { Container, FormNav, SaveBtn } from './elements/index.style';
import { VscNewFolder } from 'react-icons/vsc';
import { BsFillSave2Fill } from 'react-icons/bs';
import CustomInput from '../../components/form-components/input/custom-input';
import { IoAddOutline } from 'react-icons/io5';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { FiEdit } from 'react-icons/fi';
import { useFormik } from 'formik';
import ItemGroupServices from '../../features/services/custom-hooks/item-groups';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Index() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const { mutate: createGroup, isPending: isCreating } =
		ItemGroupServices.create();

	const { mutate: updateGroup, isPending: isUpdating } =
		ItemGroupServices.update();

	const page = Number(searchParams.get('page')) || 1;

	const { data, isPending } = ItemGroupServices.get({
		limit: 12,
		page: page,
	});

	const { data: itemGroups = [], pagination } = data || {};

	const initialValues = {
		id: '',
		groupName: '',
		shopItems: [],
		isEditing: false,
	};

	const onSubmit = (values, { resetForm }) => {
		const { id, isEditing, ...others } = values;
		const data = { others };

		if (isEditing && id) {
			updateGroup({ id, data });
		} else {
			createGroup(data);
		}
	};

	const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
		useFormik({
			initialValues,
			// validationSchema: validationSchema,
			onSubmit,
		});

	const { groupName, shopItems, id, isEditing } = values;

	return (
		<Container>
			<h1>Group Products</h1>

			<button className="btn">
				<VscNewFolder /> New Group
			</button>

			<FormNav>
				{isEditing ? <p>ID: {id}</p> : <p>New Group</p>}

				<form action="">
					<div className="form_control">
						<label htmlFor="">Name</label>
						<CustomInput
							type="text"
							id="groupName"
							name="groupName"
							value={groupName}
							onChange={handleChange}
							onBlur={handleBlur}
							isError={touched.groupName && errors.groupName}
							errormessage={errors.groupName}
							placeholder="Group Name"
							paddingX="14px"
							paddingY="9px"
							useBackground
						/>
					</div>

					<div className="flex items-center ml-[20px]">
						<button id="AddBtn">
							<IoAddOutline />
						</button>

						<p className="flex flex-col ml-[15px]">
							<span className="text-[12px] font-semibold opacity-70">
								Add product
							</span>
							<span className="text-[14px] font-bold flex items-center gap-[10px]">
								0{' '}
								<button className="text-[var(--intro-logo)] text-[12px]">
									manage
								</button>
							</span>
						</p>
					</div>

					<SaveBtn className="ml-[auto]">
						<div className="content">
							<BsFillSave2Fill />
							Save
						</div>
					</SaveBtn>
				</form>
			</FormNav>

			<div>
				<CustomTable
					fields={[
						{
							Header: () => <span>No</span>,
							accessor: '_nos',
							Cell: ({ nos }) => (
								<span className="font-semibold opacity-70 ml-[5px]">{nos}</span>
							),
						},
						{
							Header: () => <span>Group Name</span>,
							accessor: 'groupName',
							Cell: ({ value }) => (
								<span className="font-semibold ml-[5px]">{value}</span>
							),
						},
						{
							Header: () => <span className="ml-[10px]">ID</span>,
							accessor: '_id',
							Cell: ({ value }) => (
								<span className="text-xs opacity-60">{value}</span>
							),
						},
						{
							Header: () => <span>Items</span>,
							accessor: 'shopItems',
							Cell: ({ value }) => (
								<span className="font-semibold ml-[10px]">
									{Array.isArray(value) ? value.length : 0}
								</span>
							),
						},
						{
							Header: () => <span>Manage Group</span>,
							accessor: 'manage',
							Cell: ({ row }) => (
								<button
									className="px-[10px] py-[5px] text-xs font-semibold rounded-md transition-all ml-[10px]"
									style={{
										background: 'var(--mainBody-toolkitBg)',
									}}
									onClick={(e) => {
										e.stopPropagation(); // 🔥 prevents row click
										console.log('Manage items for:', row.original);
									}}
								>
									<div className="flex items-center gap-[5px]">
										Edit <FiEdit />
									</div>
								</button>
							),
						},
					]}
					dataSource={itemGroups || []}
					useStrip
					isLoading={false}
					emptyIcon={
						<NoDataIcon
							width="150px"
							height="150px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO GROUPS YET"
					emptySbText="You haven’t created any product groups yet."
					refetch={() => {}}
				/>
			</div>
		</Container>
	);
}

export default Index;
