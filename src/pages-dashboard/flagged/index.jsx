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

function Index() {
	const [section, setSection] = useState('flagged');
	return (
		<Container>
			<h1>Flagged Orders</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={section === 'flagged'}
						onClick={() => setSection('flagged')}
						className="tabs"
					>
						<TbFlagQuestion />
						Flagged
					</OptionBtn>

					<OptionBtn
						$active={section === 'closed'}
						onClick={() => setSection('closed')}
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
