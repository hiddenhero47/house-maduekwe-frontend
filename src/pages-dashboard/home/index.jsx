import React, { useState, useRef } from 'react';
import { Container } from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import FilterProductDisplay from "../../components/modal-assets/filter-modal/filter&product/filter&product";
import SelectShopItemsModal from "../../components/modal-assets/group-item-modal/filter&product/filter&product";
import SelectItemGroupModal from "../../components/modal-assets/group-item-modal/filter&group/filter&group";

function Index() {
	const data = [
		{
			firstName: 'Okonkwo',
			lastName: 'Charles',
			email: 'okonkwo@gmail.com',
		},

		{
			firstName: 'Okonkwo',
			lastName: 'Victor',
			email: 'victor@gmail.com',
		},

		{
			firstName: 'Maduekwe',
			lastName: 'Chinadu',
			email: 'maduekwe@gmail.com',
		},
	];
	return (
		<Container className="text-mainBody-yellow">
			<p>Index home</p>

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
				dataSource={data || []}
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
		</Container>
	);
}

export default Index;
