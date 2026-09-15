import React from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	SpanStatus,
} from './elements/index.style';
import { FaBoxOpen } from 'react-icons/fa6';
import { LuPackageCheck } from 'react-icons/lu';
import { GoPackageDependents } from 'react-icons/go';
import { MdOutlineLocalShipping } from 'react-icons/md';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ShipmentServices from '../../features/services/custom-hooks/shipments';
import DateFilter from '../../components/modal-assets/filter-modal/date-filter/date-filter';
import ShipmentModal from './elements/shipment-modal/shipment-modal';
import { SHIPMENT_STATUS } from '../../utilities/app-const';

function Index() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentParam = searchParams.get('currentSection');
	const currentSection = currentParam !== null ? currentParam : '';

	const page = Number(searchParams.get('page')) || 1;
	const startDate = searchParams.get('startDate') || '';
	const endDate = searchParams.get('endDate') || '';

	const { data, isPending, refetch } = ShipmentServices.getAll({
		status: currentSection,
		page,
		limit: 20,
		from: startDate,
		to: endDate,
	});

	const { data: shipments = [], pagination } = data || {};

	const flipPage = (p) => {
		searchParams.set('page', p);
		setSearchParams(searchParams);
	};

	const navigateTo = (value) => {
		const params = new URLSearchParams();
		params.set('currentSection', value);
		params.set('page', 1);
		setSearchParams(params);
	};

	const forward = ({ start, end }) => {
		const params = new URLSearchParams(searchParams);

		if (start && end) {
			params.set('startDate', start);
			params.set('endDate', end);
		} else {
			params.delete('startDate');
			params.delete('endDate');
		}

		params.set('page', 1);
		setSearchParams(params);
	};

	return (
		<Container>
			<h1>Shipments</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={currentSection === SHIPMENT_STATUS.LABEL_CREATED}
						onClick={() => navigateTo(SHIPMENT_STATUS.LABEL_CREATED)}
						className="tabs"
					>
						<FaBoxOpen />
						Label Created
					</OptionBtn>

					<OptionBtn
						$active={currentSection === SHIPMENT_STATUS.IN_TRANSIT}
						onClick={() => navigateTo(SHIPMENT_STATUS.IN_TRANSIT)}
						className="tabs"
					>
						<GoPackageDependents />
						In Transit
					</OptionBtn>

					<OptionBtn
						$active={currentSection === SHIPMENT_STATUS.DELIVERED}
						onClick={() => navigateTo(SHIPMENT_STATUS.DELIVERED)}
						className="tabs"
					>
						<LuPackageCheck />
						Delivered
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ''}
						onClick={() => navigateTo('')}
						className="tabs"
					>
						<MdOutlineLocalShipping />
						All
					</OptionBtn>
				</div>
			</TabNav>

			<div className="w-full flex justify-end">
				<DateFilter forward={(range) => forward(range)} />
			</div>

			<div id="display_body" className="Y_scroll_style">
				<div>
					<TableWrapper>
						<CustomTable
							fields={[
								{
									Header: () => 'Nos',
									accessor: '__nos',
									Cell: ({ nos }) => (
										<span className="nowrap ml-[5px]">{nos}</span>
									),
								},
								{
									Header: () => 'Order ID',
									accessor: 'order',
									Cell: ({ value }) => (
										<span className="nowrap font-medium">{value?._id}</span>
									),
								},
								{
									Header: () => 'Carrier',
									accessor: 'carrier',
									Cell: ({ value }) => (
										<span className="nowrap ml-[10px]">{value || '—'}</span>
									),
								},
								{
									Header: () => 'Tracking Number',
									accessor: 'trackingNumber',
									Cell: ({ value }) => (
										<span className="nowrap ml-[10px]">{value || '—'}</span>
									),
								},
								{
									Header: () => 'Status',
									accessor: 'status',
									Cell: ({ value }) => (
										<SpanStatus $status={value} className="nowrap capitalize">
											{value?.replace(/_/g, ' ')}
										</SpanStatus>
									),
								},
								{
									Header: () => 'Shipped',
									accessor: 'shippedAt',
									Cell: ({ value }) => (
										<span className="nowrap">
											{value ? new Date(value).toLocaleDateString() : '—'}
										</span>
									),
								},
								{
									Header: () => 'Delivered',
									accessor: 'deliveredAt',
									Cell: ({ value }) => (
										<span className="nowrap">
											{value ? new Date(value).toLocaleDateString() : '—'}
										</span>
									),
								},
								{
									Header: () => <span>Edit</span>,
									accessor: 'manage',
									Cell: ({ row }) => (
										<ShipmentModal
											orderId={row.original.order?._id}
											orderStatus={row.original.order?.status}
										/>
									),
								},
							]}
							dataSource={shipments || []}
							emptyIcon={
								<NoDataIcon
									width="150px"
									height="150px"
									color="var(--mainBody-sbText)"
								/>
							}
							emptyText="NO SHIPMENTS YET"
							emptySbText="There is no available data to show. Please try something else"
							refetch={() => refetch()}
							isLoading={isPending}
							currentPage={page}
							totalPages={pagination?.totalPages || 1}
							changePage={flipPage}
							useStrip
							onDoubleCallRow={(data) =>
								navigate(`/admin/orders/${data?.order?._id}`)
							}
						/>
					</TableWrapper>
				</div>
			</div>
		</Container>
	);
}

export default Index;
