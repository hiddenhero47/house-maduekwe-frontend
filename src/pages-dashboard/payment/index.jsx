import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	Search,
	SearchBtn,
	SpanStatus,
} from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { CiSearch } from 'react-icons/ci';
import { TbCreditCardPay } from 'react-icons/tb';
import { SiTicktick } from 'react-icons/si';
import { HiReceiptRefund } from 'react-icons/hi2';
import DateFilter from '../../components/modal-assets/filter-modal/date-filter/date-filter';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PaymentServices from '../../features/services/custom-hooks/payments';

function Index() {
	const PAYMENT_STATUS = {
		PENDING: 'pending',
		INITIATED: 'initiated',
		SUCCESS: 'success',
		FAILED: 'failed',
		REFUNDED: 'refunded',
		ALL: '',
	};

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const section = searchParams.get('status') || PAYMENT_STATUS.ALL;
	const page = Number(searchParams.get('page')) || 1;
	const paymentId = searchParams.get('paymentId') || '';
	const startDate = searchParams.get('startDate') || '';
	const endDate = searchParams.get('endDate') || '';

	const [searchValue, setSearchValue] = useState(paymentId);

	const { data, isPending, refetch } = PaymentServices.getAll({
		status: section === 'all' ? '' : section,
		paymentId,
		page,
		limit: 20,
		startDate,
		endDate,
	});

	const { data: payments = [], pagination } = data || {};

	const changeSection = (value) => {
		const params = new URLSearchParams(searchParams);

		params.set('status', value);
		params.set('page', 1);

		setSearchParams(params);
	};

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams);

		if (searchValue) {
			params.set('paymentId', searchValue);
		} else {
			params.delete('paymentId');
		}

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

	const flipPage = (p) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', p);
		setSearchParams(params);
	};

	return (
		<Container>
			<h1>Transaction History</h1>

			<div id="nav_tab" className="bg-[var(--mainBody-background)]">
				<Search className="search_word" $useBackground>
					<button type="button" className="mr-[8px]" onClick={handleSearch}>
						<i className="text-[20px]">
							<CiSearch />
						</i>
					</button>
					<input
						className="search_word"
						type="text"
						name="MySearch"
						id="MySearch"
						placeholder="Search By ID"
						autoComplete="true"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSearch();
						}}
					/>
				</Search>

				<div className="flex gap-[10px] items-center">
					<SearchBtn>
						<div className="content">Filter</div>
						<div className="loader"></div>
					</SearchBtn>
				</div>
			</div>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={section === PAYMENT_STATUS.ALL}
						onClick={() => changeSection(PAYMENT_STATUS.ALL)}
						className="tabs"
					>
						<TbCreditCardPay />
						All
					</OptionBtn>

					<OptionBtn
						$active={section === PAYMENT_STATUS.SUCCESS}
						onClick={() => changeSection(PAYMENT_STATUS.SUCCESS)}
						className="tabs"
					>
						<SiTicktick />
						Succeeded
					</OptionBtn>

					<OptionBtn
						$active={section === PAYMENT_STATUS.REFUNDED}
						onClick={() => changeSection(PAYMENT_STATUS.REFUNDED)}
						className="tabs"
					>
						<HiReceiptRefund />
						Refunded
					</OptionBtn>
				</div>
			</TabNav>

			<div className="w-full flex justify-end">
				<DateFilter forward={forward} />
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
							Header: () => 'Payment ID',
							accessor: '_id',
							Cell: ({ value }) => (
								<span className="nowrap font-medium">{value}</span>
							),
						},

						{
							Header: () => 'User Email',
							accessor: 'userEmail',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'Amount',
							accessor: 'amountToPay',
							Cell: ({ value, row }) => (
								<span className="nowrap font-medium">
									{row?.original?.currency
										? `${row.original.currency} ${value.toLocaleString()}`
										: value.toLocaleString()}
								</span>
							),
						},
						{
							Header: () => 'Fee',
							accessor: 'transactionFee',
							Cell: ({ value }) => (
								<span className="nowrap">{value?.toLocaleString?.() || 0}</span>
							),
						},
						{
							Header: () => 'Provider',
							accessor: 'provider',
							Cell: ({ value }) => (
								<span className="nowrap capitalize">{value || '-'}</span>
							),
						},
						{
							Header: () => 'Reference',
							accessor: 'reference',
							Cell: ({ value }) => (
								<span className="nowrap">{value || '-'}</span>
							),
						},
						{
							Header: () => 'Status',
							accessor: 'status',
							Cell: ({ value }) => (
								<SpanStatus $status={value} className="nowrap">
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
					dataSource={payments || []}
					emptyIcon={
						<NoDataIcon
							width="150px"
							height="150px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ITEMS YET"
					emptySbText="There is no available data to show. Please try something else"
					refetch={refetch}
					isLoading={isPending}
					currentPage={page}
					totalPages={pagination?.totalPages || 1}
					changePage={flipPage}
					useStrip
					onDoubleCallRow={(data) =>
						navigate(`/admin/orders?paymentId=${data?._id}&currentSection=`)
					}
				/>
			</TableWrapper>
		</Container>
	);
}

export default Index;
