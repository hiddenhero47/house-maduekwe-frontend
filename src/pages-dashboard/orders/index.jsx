import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	SpanStatus,
} from './elements/index.style';
import { FaBoxesPacking } from 'react-icons/fa6';
import { LuPackageCheck } from 'react-icons/lu';
import { GoPackageDependents } from 'react-icons/go';
import { MdOutlineLocalMall } from 'react-icons/md';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { OrderServices } from '../../features/services/custom-hooks/orders';
import { TbPigMoney } from 'react-icons/tb';
import ManageModal from './elements/manage-modal/manage-modal';
import DateFilter from '../../components/modal-assets/filter-modal/date-filter/date-filter';

function Index() {
	const ORDER_STATUS = {
		PENDING: 'pending',
		PAID: 'paid',
		PROCESSING: 'processing',
		SHIPPED: 'shipped',
		DELIVERED: 'delivered',
		CANCELLED: 'cancelled',
		RETURNED: 'returned',
		RETURNING: 'processing-return',
		ALL: '',
	};

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentFromUrl =
		searchParams.get('currentSection') || ORDER_STATUS.PAID;

	const page = Number(searchParams.get('page')) || 1;
	const paymentId = searchParams.get('paymentId') || '';
	const startDate = searchParams.get('startDate') || '';
	const endDate = searchParams.get('endDate') || '';

	const [currentSection, setCurrentSection] = useState(currentFromUrl);

	const { data, isPending, isError, refetch } = OrderServices.getAll({
		status: currentSection,
		paymentId: paymentId,
		page: page,
		limit: 20,
		startDate,
		endDate,
	});

	const { data: orders = [], pagination } = data || {};

	const flipPage = (p) => {
		searchParams.set('page', p);
		setSearchParams(searchParams);
	};

	const navigateTo = (value) => {
		setCurrentSection(value);

		const params = new URLSearchParams();
		params.set('currentSection', value);

		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
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

		params.set('page', 1); // reset page on filter

		setSearchParams(params);
	};

	return (
		<Container>
			<h1>Customer Orders</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={currentSection === ORDER_STATUS.PAID}
						onClick={() => navigateTo(ORDER_STATUS.PAID)}
						className="tabs"
					>
						<TbPigMoney />
						Paid
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ORDER_STATUS.PROCESSING}
						onClick={() => navigateTo(ORDER_STATUS.PROCESSING)}
						className="tabs"
					>
						<FaBoxesPacking />
						Processing
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ORDER_STATUS.SHIPPED}
						onClick={() => navigateTo(ORDER_STATUS.SHIPPED)}
						className="tabs"
					>
						<GoPackageDependents />
						Shipped
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ORDER_STATUS.DELIVERED}
						onClick={() => navigateTo(ORDER_STATUS.DELIVERED)}
						className="tabs"
					>
						<LuPackageCheck />
						Delivered
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ORDER_STATUS.ALL}
						onClick={() => navigateTo(ORDER_STATUS.ALL)}
						className="tabs"
					>
						<MdOutlineLocalMall />
						All
					</OptionBtn>
				</div>
			</TabNav>

			<div className="w-full flex justify-end">
				<DateFilter forward={(range) => forward(range)} />
			</div>

			<TableWrapper>
				<CustomTable
					fields={[
						{
							Header: () => 'Nos',
							accessor: '__nos',
							Cell: ({ nos }) => <span className="nowrap ml-[5px]">{nos}</span>,
						},
						{
							Header: () => 'Order ID',
							accessor: '_id',
							Cell: ({ value }) => (
								<span className="nowrap font-medium">{value}</span>
							),
						},
						{
							Header: () => 'Items',
							accessor: 'items',
							Cell: ({ value }) => (
								<span className="nowrap ml-[10px]">
									{Array.isArray(value) ? value.length : 0}
								</span>
							),
						},
						{
							Header: () => 'Total Amount',
							accessor: 'totalAmount',
							Cell: ({ value, row }) => (
								<span className="nowrap font-medium ml-[10px]">
									{row?.original?.currency
										? `${row.original.currency} ${value.toLocaleString()}`
										: value.toLocaleString()}
								</span>
							),
						},
						{
							Header: () => 'Status',
							accessor: 'status',
							Cell: ({ value }) => (
								<SpanStatus $status={value} className="nowrap capitalize">
									{value}
								</SpanStatus>
							),
						},
						{
							Header: () => 'Date',
							accessor: 'createdAt',
							Cell: ({ value }) => (
								<span className="nowrap">
									{new Date(value).toLocaleDateString()}
								</span>
							),
						},
						{
							Header: () => <span>Manage Status</span>,
							accessor: 'manage',
							Cell: ({ row }) => <ManageModal id={row.original._id} />,
						},
					]}
					dataSource={orders || []}
					emptyIcon={
						<NoDataIcon
							width="150px"
							height="150px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ITEMS YET"
					emptySbText="There is no available data to show. Please try something else"
					refetch={() => refetch()}
					isLoading={isPending}
					currentPage={page}
					totalPages={pagination?.totalPages || 1}
					changePage={flipPage}
					useStrip
					onDoubleCallRow={(data) => navigate(`/admin/orders/${data?._id}`)}
				/>
			</TableWrapper>
		</Container>
	);
}

export default Index;
