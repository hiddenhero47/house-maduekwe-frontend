import React from 'react';
import { AddressWrapper, TableWrapper, AddBtn } from './address.style';
import { IoIosAdd } from 'react-icons/io';
import CustomTable from '../../../../components/table_components/basicTableOne';
import { AddressIcon } from '../../../../components/icon-components/empty';
import { truncate } from '../../../../utilities/basic-functions';

function Address() {
	return (
		<AddressWrapper>
			<div className="flex justify-between items-center mt-[25px]">
				<h3 className="heading -intro-x font-family: var(--font-sans);">User Address</h3>
				<span className="intro-x">
					<AddBtn type="button">
						<IoIosAdd size={20}/>
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
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
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
							Header: () => 'Full Address',
							accessor: 'fullAddress',
							Cell: ({ value }) => (
								<span className="nowrap" title={value}>
									{truncate({ str: value, len: 35 })}
								</span>
							),
						},
					]}
					dataSource={[]}
					emptyIcon={
						<AddressIcon
							width="80px"
							height="80px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ADDRESSES YET"
					emptySbText="Add an address to see one here."
					addData={() => {}}
					isLoading={false}
					useStrip
				/>
			</TableWrapper>
		</AddressWrapper>
	);
}

export default Address;
