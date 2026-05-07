import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
} from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { TbFlagQuestion } from 'react-icons/tb';
import { LuGitPullRequestClosed } from 'react-icons/lu';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { OrderServices } from '../../features/services/custom-hooks/orders';

function Index() {
	const ORDER_STATUS = {
		CANCELLED: 'cancelled',
		FLAGGED: "flagged",
	};

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentParam = searchParams.get('currentSection');

	const currentSection =
		currentParam !== null ? currentParam : ORDER_STATUS.FLAGGED;

	const page = Number(searchParams.get('page')) || 1;
	const paymentId = searchParams.get('paymentId') || '';
	const startDate = searchParams.get('startDate') || '';
	const endDate = searchParams.get('endDate') || '';

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
		const params = new URLSearchParams();
		params.set('currentSection', value);
		params.set('page', 1);
		params.delete('paymentId');
		setSearchParams(params);
		// navigate(`${location.pathname}?${params.toString()}`, { replace: true });
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
			<h1>Flagged Orders</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={currentSection === ORDER_STATUS.FLAGGED}
						onClick={() => navigateTo(ORDER_STATUS.FLAGGED)}
						className="tabs"
					>
						<TbFlagQuestion />
						Flagged
					</OptionBtn>

					<OptionBtn
						$active={currentSection === ORDER_STATUS.CANCELLED}
						onClick={() => navigateTo(ORDER_STATUS.CANCELLED)}
						className="tabs"
					>
						<LuGitPullRequestClosed />
						Closed
					</OptionBtn>
				</div>
			</TabNav>

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
