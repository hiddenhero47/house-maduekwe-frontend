import React, { useState, useRef } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	CreateBtn,
	ToggleSwitch,
} from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import ExportFeeServices from '../../features/services/custom-hooks/export-fee';
import PaymentProviderServices from '../../features/services/custom-hooks/payment-providers';
import { useSearchParams } from 'react-router-dom';
import DeleteModal from '../../components/modal-assets/delete-modal/delete-modal';
import CreateExportFee from './elements/modal/create-export-fee';
import EditExportFee from './elements/modal/edit-export-fee';
import CreateProvider from './elements/modal/create-provider';
import EditProvider from './elements/modal/edit-provider';
import ToolKit from '../../components/tool-kit/index-tool-kit';
import { OptionItem } from '../../components/tool-kit/index-tool-kit.style';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

function Index() {
	const PAGE_SECTIONS = {
		SHIPPING_FEES: 'shippingFees',
		PROVIDER: 'provider',
	};

	const { mutate: deleteShippers, isPending: isDeletingEx } =
		ExportFeeServices.deletePermanent();

	const { mutate: disableShippers, isPending: isDisablingEx } =
		ExportFeeServices.disable();

	const { mutate: deleteProvider, isPending: isDeletingProvider } =
		PaymentProviderServices.deletePermanent();

	const { mutate: disableProvider, isPending: isDisablingProvider } =
		PaymentProviderServices.disable();

	const [section, setSection] = useState(PAGE_SECTIONS.SHIPPING_FEES);

	const [searchParams, setSearchParams] = useSearchParams();

	const shippingFees =
		Number(searchParams.get(PAGE_SECTIONS.SHIPPING_FEES)) || 1;
	const provider = Number(searchParams.get(PAGE_SECTIONS.PROVIDER)) || 1;

	const {
		data: dataShippers,
		isPending: isPendingShip,
		isError: isErrorShip,
		refetch: refetchShip,
	} = ExportFeeServices.get({
		page: shippingFees,
		limit: 10,
	});

	const {
		data: dataGateway,
		isPending: isPendingGate,
		isError: isErrorGate,
		refetch: refetchGate,
	} = PaymentProviderServices.get({
		page: provider,
		limit: 10,
	});

	// const { data: shippers = [], pagination: paginationShip } =
	// 	dataShippers || {};

	// const { data: gateway = [], pagination: paginationGate } = dataGateway || {};

	const flipPageShip = (p) => {
		searchParams.set(PAGE_SECTIONS.SHIPPING_FEES, p);
		setSearchParams(searchParams);
	};

	const flipPageGate = (p) => {
		searchParams.set(PAGE_SECTIONS.PROVIDER, p);
		setSearchParams(searchParams);
	};

	const [editShippers, setEditShippers] = useState(null);
	const [editProvider, setEditProvider] = useState(null);
	const [deleteShippersInfo, setDeleteShippersInfo] = useState(null);
	const [deleteProviderInfo, setDeleteProviderInfo] = useState(null);

	const modalRefShippers = useRef(null);
	const openModal = () => {
		modalRefShippers.current?.open();
	};

	const modalRefProvider = useRef(null);
	const openModalProvider = () => {
		modalRefProvider.current?.open();
	};

	const modalRefShippersDelete = useRef(null);
	const openDeleteShippers = (info) => {
		setDeleteShippersInfo(info);
		modalRefShippersDelete.current?.open();
	};

	const modalRefProviderDelete = useRef(null);
	const openDeleteProvider = (info) => {
		setDeleteProviderInfo(info);
		modalRefProviderDelete.current?.open();
	};

	const modalRefShippersEdit = useRef(null);
	const openShippersEdit = (info) => {
		setEditShippers(info);
		modalRefShippersEdit.current?.open();
	};

	const modalRefProviderEdit = useRef(null);
	const openProviderEdit = (info) => {
		setEditProvider(info);
		modalRefProviderEdit.current?.open();
	};

	const ensureArray = (value) => {
		if (Array.isArray(value)) return value;
		if (value == null) return [];
		return [value];
	};
	return (
		<Container>
			<h1>Application Settings</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={section === PAGE_SECTIONS.SHIPPING_FEES}
						onClick={() => setSection(PAGE_SECTIONS.SHIPPING_FEES)}
						className="tabs"
					>
						<FaShippingFast />
						Shipping Fees
					</OptionBtn>

					<OptionBtn
						$active={section === PAGE_SECTIONS.PROVIDER}
						onClick={() => setSection(PAGE_SECTIONS.PROVIDER)}
						className="tabs"
					>
						<MdOutlinePayment />
						Payment Providers
					</OptionBtn>
				</div>

				<div className="actions">
					<CreateBtn type="button" onClick={openModal}>
						+ New Shipping
					</CreateBtn>
					<CreateBtn type="button" onClick={openModalProvider}>
						+ New Provider
					</CreateBtn>
				</div>
			</TabNav>

			<TableWrapper>
				{section === 'shippingFees' && (
					<CustomTable
						fields={[
							{
								Header: () => 'Country',
								accessor: 'country',
								Cell: ({ value }) => (
									<span className="font-semibold uppercase">{value}</span>
								),
							},
							{
								Header: () => 'Default Fee',
								accessor: 'defaultAmount',
								Cell: ({ value }) => (
									<span className="nowrap">
										₦{Number(value || 0).toLocaleString()}
									</span>
								),
							},
							{
								Header: () => 'States',
								accessor: 'states',
								Cell: ({ value }) => (
									<span className="nowrap">
										{Array.isArray(value) ? value.length : 0} states
									</span>
								),
							},
							{
								Header: () => 'Status',
								accessor: 'isActive',
								Cell: ({ row }) => (
									<ToggleSwitch className="switch">
										<input
											type="checkbox"
											checked={row.original.isActive}
											onChange={() => disableShippers(row.original._id)}
										/>
										<span className="slider" />
									</ToggleSwitch>
								),
							},
							{
								Header: () => '',
								accessor: '_id',
								Cell: ({ row }) => (
									<ToolKit
										icon={<BsThreeDotsVertical className="text-sm" />}
										menuClass={dataShippers.length === 1 ? 'tool_kit' : 'tool_kits'}
										useCoords={dataShippers.length === 1}
										alineRight={dataShippers.length === 1}
									>
										<div className="flex flex-col gap-[2px]">
											<OptionItem
												className="edit"
												onClick={() => openShippersEdit(row.original)}
											>
												<FiEdit2 size={16} />
												<span>Edit</span>
											</OptionItem>

											<OptionItem
												className="delete"
												onClick={() => openDeleteShippers(row.original)}
											>
												<MdOutlineDeleteOutline size={18} />
												<span>Delete</span>
											</OptionItem>
										</div>
									</ToolKit>
								),
							},
						]}
						dataSource={dataShippers || []}
						emptyIcon={
							<NoDataIcon
								width="150px"
								height="150px"
								color="var(--mainBody-sbText)"
							/>
						}
						emptyText="NO ITEMS YET"
						emptySbText="There is no available data to show. Please try something else"
						refetch={() => refetchShip()}
						// currentPage={shippingFees}
						// totalPages={paginationShip?.totalPages}
						// changePage={flipPageShip}
						isLoading={isPendingShip}
					/>
				)}

				{section === 'provider' && (
					<CustomTable
						fields={[
							{
								Header: () => 'Provider',
								accessor: 'provider',
								Cell: ({ value }) => (
									<span className="font-semibold capitalize">{value}</span>
								),
							},
							{
								Header: () => 'Percentage Fee',
								accessor: 'percentageFee',
								Cell: ({ value }) => <span>{Number(value || 0)}%</span>,
							},
							{
								Header: () => 'Flat Fee',
								accessor: 'flatFee',
								Cell: ({ value }) => (
									<span>₦{Number(value || 0).toLocaleString()}</span>
								),
							},
							{
								Header: () => 'Status',
								accessor: 'isActive',
								Cell: ({ row }) => (
									<ToggleSwitch className="switch">
										<input
											type="checkbox"
											checked={row.original.isActive}
											onChange={() => disableProvider(row.original._id)}
										/>
										<span className="slider" />
									</ToggleSwitch>
								),
							},
							{
								Header: () => '',
								accessor: '_id',
								Cell: ({ row }) => (
									<ToolKit
										icon={<BsThreeDotsVertical className="text-sm" />}
										menuClass={dataGateway.length === 1 ? 'tool_kit' : 'tool_kits'}
										useCoords={dataGateway.length === 1}
										alineRight={dataGateway.length === 1}
									>
										<div className="flex flex-col gap-[2px]">
											<OptionItem
												className="edit"
												onClick={() => openProviderEdit(row.original)}
											>
												<FiEdit2 size={16} />
												<span>Edit</span>
											</OptionItem>

											<OptionItem
												className="delete"
												onClick={() => openDeleteProvider(row.original)}
											>
												<MdOutlineDeleteOutline size={18} />
												<span>Delete</span>
											</OptionItem>
										</div>
									</ToolKit>
								),
							},
						]}
						dataSource={dataGateway || []}
						emptyIcon={
							<NoDataIcon
								width="150px"
								height="150px"
								color="var(--mainBody-sbText)"
							/>
						}
						emptyText="NO ITEMS YET"
						emptySbText="There is no available data to show. Please try something else"
						refetch={() => refetchGate()}
						// currentPage={provider}
						// totalPages={paginationGate?.totalPages}
						// changePage={flipPageGate}
						isLoading={isPendingGate}
					/>
				)}
			</TableWrapper>

			<CreateExportFee
				ref={modalRefShippers}
				closeModal={() => modalRefShippers.current.close()}
				openModal={openModal}
			/>

			<CreateProvider
				ref={modalRefProvider}
				closeModal={() => modalRefProvider.current.close()}
				openModal={openModalProvider}
			/>

			<DeleteModal
				ref={modalRefShippersDelete}
				action={(data) => deleteShippers(data?._id)}
				data={deleteShippersInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeleteShippersInfo(null)}
			/>

			<DeleteModal
				ref={modalRefProviderDelete}
				action={(data) => deleteProvider(data?._id)}
				data={deleteProviderInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeleteProviderInfo(null)}
			/>

			<EditExportFee
				ref={modalRefShippersEdit}
				data={editShippers}
				closeModal={() => modalRefShippersEdit.current.close()}
				clear={() => setEditShippers(null)}
			/>

			<EditProvider
				ref={modalRefProviderEdit}
				data={editProvider}
				closeModal={() => modalRefProviderEdit.current.close()}
				clear={() => setEditProvider(null)}
			/>
		</Container>
	);
}

export default Index;
