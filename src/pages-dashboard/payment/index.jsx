import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	Search,
	SearchBtn,
} from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import { CiSearch } from 'react-icons/ci';
import { TbCreditCardPay } from 'react-icons/tb';
import { SiTicktick } from 'react-icons/si';
import { HiReceiptRefund } from 'react-icons/hi2';

function Index() {
	const [section, setSection] = useState('all');
	return (
		<Container>
			<h1>Transaction History</h1>

			<div id="nav_tab" className="bg-[var(--mainBody-background)]">
				<Search className="search_word" $useBackground>
					<button className="mr-[8px]">
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
						$active={section === 'all'}
						onClick={() => setSection('all')}
						className="tabs"
					>
						<TbCreditCardPay />
						All
					</OptionBtn>

					<OptionBtn
						$active={section === 'succeeded'}
						onClick={() => setSection('succeeded')}
						className="tabs"
					>
						<SiTicktick />
						Succeeded
					</OptionBtn>

					<OptionBtn
						$active={section === 'refunded'}
						onClick={() => setSection('refunded')}
						className="tabs"
					>
						<HiReceiptRefund />
						Refunded
					</OptionBtn>
				</div>
			</TabNav>

			<TableWrapper>
				<CustomTable
					fields={[
						{
							Header: () => {
								return 'First Name';
							},
							accessor: 'firstName',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => {
								return 'Last Name';
							},
							accessor: 'lastName',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => {
								return 'Email';
							},
							accessor: 'email',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
					]}
					dataSource={[]}
					emptyIcon={
						<NoDataIcon
							width="150px"
							height="150px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ITEMS YET"
					emptySbText="There is no available data to show. Please try something else"
					refetch={() => {}}
					isLoading={false}
					useStrip
				/>
			</TableWrapper>
		</Container>
	);
}

export default Index;
