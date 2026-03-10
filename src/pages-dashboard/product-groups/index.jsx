import React, { useState } from 'react';
import { Container, FormNav, SaveBtn } from './elements/index.style';
import { VscNewFolder } from 'react-icons/vsc';
import { BsFillSave2Fill } from 'react-icons/bs';
import CustomInput from '../../components/form-components/input/custom-input';
import { IoAddOutline } from 'react-icons/io5';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { FiEdit } from "react-icons/fi";

function Index() {
	const [groupName, setGroupName] = useState('');

	const isEditing = false;

	const data = [
		{
			_id: '6900d4dfa716ddc39de4b1ad',
			groupName: 'Beverages',
			shopItems: ['id1', 'id2', 'id3'],
		},
		{
			_id: '6900d4dfa716ddc39de4b1ad',
			groupName: 'Beverages',
			shopItems: ['id1', 'id2', 'id3'],
		},
		{
			_id: '6900d4dfa716ddc39de4b1ad',
			groupName: 'Beverages',
			shopItems: ['id1', 'id2', 'id3'],
		},
		{
			_id: '6900d4dfa716ddc39de4b1ad',
			groupName: 'Beverages',
			shopItems: ['id1', 'id2', 'id3'],
		},
		{
			_id: '6900d4dfa716ddc39de4b1ad',
			groupName: 'Beverages',
			shopItems: ['id1', 'id2', 'id3'],
		},
	];
	return (
		<Container>
			<h1>Group Products</h1>

			<button className="btn">
				<VscNewFolder /> New Group
			</button>

			<FormNav>
				{isEditing ? <p>ID: 6900d4dfa716ddc39de4b1ad</p> : <p>New Group</p>}

				<form action="">
					<div className="form_control">
						<label htmlFor="">Name</label>
						<CustomInput
							type="text"
							id="name"
							name="name"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							isError={false}
							errormessage=""
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
								0 <button className='text-[var(--intro-logo)] text-[12px]'>manage</button>
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
									<div className='flex items-center gap-[5px]'>Edit <FiEdit /></div>
								</button>
							),
						},
					]}
					dataSource={data || []}
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
