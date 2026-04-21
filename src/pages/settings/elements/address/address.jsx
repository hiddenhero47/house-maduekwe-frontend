import React, { useRef, useState } from 'react';
import { AddressWrapper, TableWrapper, AddBtn } from './address.style';
import { IoIosAdd } from 'react-icons/io';
import CustomTable from '../../../../components/table_components/basicTableOne';
import { AddressIcon } from '../../../../components/icon-components/empty';
import { truncate } from '../../../../utilities/basic-functions';
import CreateModal from './create-address';
import AddressServices from '../../../../features/services/custom-hooks/addresses';
import { getCountryByCode } from '../../../../utilities/city-state-country';
import ToolKit from '../../../../components/tool-kit/index-tool-kit';
import { OptionItem } from '../../../../components/tool-kit/index-tool-kit.style';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import DeleteModal from '../../../../components/modal-assets/delete-modal/delete-modal';
import EditAddress from './edit-address';

function Address() {
	const { data, isPending, isError, refetch } = AddressServices.getAll();
	const { mutate: deleteAddress, isPending: isDeleting } =
		AddressServices.delete();

	const modalRef = useRef(null);
	const openModal = () => {
		modalRef.current?.open();
	};
	const closeModal = () => {
		modalRef.current?.close();
	};

	const [editInfo, setEditInfo] = useState(null);
	const [deleteInfo, setDeleteInfo] = useState(null);

	const modalRefEdit = useRef(null);
	const openEditModal = (info) => {
		setEditInfo(info);
		modalRefEdit.current?.open();
	};

	const modalRefDelete = useRef(null);
	const openDeleteModal = (info) => {
		setDeleteInfo(info);
		modalRefDelete.current?.open();
	};

	return (
		<AddressWrapper>
			<div className="flex justify-between items-center mt-[25px]">
				<h3 className="heading -intro-x font-family: var(--font-sans);">
					User Address
				</h3>
				<span className="intro-x">
					<AddBtn type="button" onClick={openModal}>
						<IoIosAdd size={20} />
						New Address
					</AddBtn>
				</span>
			</div>

			<TableWrapper>
				<CustomTable
					fields={[
						{
							Header: () => 'Nos',
							accessor: '__nos',
							Cell: ({ nos }) => <span className="nowrap">{nos}</span>,
						},
						{
							Header: () => 'Country',
							accessor: 'country',
							Cell: ({ value }) => (
								<span className="nowrap">{getCountryByCode(value)?.name}</span>
							),
						},
						{
							Header: () => 'State',
							accessor: 'state',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'City',
							accessor: 'city',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'Zip Code',
							accessor: 'zipCode',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'State Line',
							accessor: 'stateLine',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'Full Address',
							accessor: 'fullAddress',
							Cell: ({ value }) => (
								<span className="nowrap" title={value}>
									{truncate({ str: value, len: 35 })}
								</span>
							),
						},
						{
							Header: () => '',
							accessor: '_id',
							Cell: ({ row }) => (
								<ToolKit
									icon={<BsThreeDotsVertical className="text-sm" />}
									menuClass={data.length === 1 ? 'tool_kit' : 'tool_kits'}
									useCoords={data.length === 1 ? true : false}
									alineRight={data.length === 1 ? true : false}
								>
									<div className="flex flex-col gap-[2px]">
										<OptionItem
											className="edit"
											onClick={() => openEditModal(row.original)}
										>
											<FiEdit2 size={16} />
											<span>Edit</span>
										</OptionItem>

										<OptionItem
											className="delete"
											onClick={() => openDeleteModal(row.original)}
										>
											<MdOutlineDeleteOutline size={18} />
											<span>Delete</span>
										</OptionItem>
									</div>
								</ToolKit>
							),
						},
					]}
					dataSource={data || []}
					emptyIcon={
						<AddressIcon
							width="80px"
							height="80px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ADDRESSES YET"
					emptySbText="Add an address to see one here."
					addData={() => openModal()}
					isLoading={isPending}
					useStrip
				/>
			</TableWrapper>

			<CreateModal
				ref={modalRef}
				openModal={openModal}
				closeModal={closeModal}
			/>

			<EditAddress
				ref={modalRefEdit}
				openModal={openModal}
				closeModal={() => modalRefEdit.current?.close()}
				address={editInfo}
				clean={() => setEditInfo(null)}
			/>

			<DeleteModal
				ref={modalRefDelete}
				action={(data) => deleteAddress(data?._id)}
				data={deleteInfo}
				text="Are you sure you want to delete this?"
				subText="This action can not be undone"
				clean={() => setDeleteInfo(null)}
			/>
		</AddressWrapper>
	);
}

export default Address;
