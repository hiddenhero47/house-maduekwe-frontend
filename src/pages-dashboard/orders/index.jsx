import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
} from './elements/index.style';
import { FaBoxesPacking } from 'react-icons/fa6';
import { LuPackageCheck } from 'react-icons/lu';
import { GoPackageDependents } from 'react-icons/go';
import { MdOutlineLocalMall } from 'react-icons/md';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';

function Index() {
	const [section, setSection] = useState('processing');
	return (
		<Container>
			<h1>Customer Orders</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={section === 'processing'}
						onClick={() => setSection('processing')}
						className="tabs"
					>
						<FaBoxesPacking />
						Processing
					</OptionBtn>

					<OptionBtn
						$active={section === 'shipped'}
						onClick={() => setSection('shipped')}
						className="tabs"
					>
						<GoPackageDependents />
						Shipped
					</OptionBtn>

					<OptionBtn
						$active={section === 'delivered'}
						onClick={() => setSection('delivered')}
						className="tabs"
					>
						<LuPackageCheck />
						Delivered
					</OptionBtn>

					<OptionBtn
						$active={section === 'all'}
						onClick={() => setSection('all')}
						className="tabs"
					>
						<MdOutlineLocalMall />
						All
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
