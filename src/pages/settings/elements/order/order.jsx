import React from 'react';
import { AddressWrapper, TableWrapper } from './order.style';
import CustomTable from '../../../../components/table_components/basicTableOne';
import { OrderIcon } from '../../../../components/icon-components/empty';
import { truncate } from '../../../../utilities/basic-functions';
import { BsBoxSeam } from 'react-icons/bs';

function Order() {
	return (
		<AddressWrapper>
			<h3 className="heading font-family: var(--font-sans)">
				<i>
					<BsBoxSeam />
				</i>
				User Address
			</h3>

			<TableWrapper>
				<CustomTable
					fields={[
						{
							Header: () => 'Nos',
							accessor: '__nos',
							Cell: ({ nos }) => <span className="nowrap">{nos}</span>,
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
								<span className="nowrap">
									{Array.isArray(value) ? value.length : 0}
								</span>
							),
						},
						{
							Header: () => 'Total Amount',
							accessor: 'totalAmount',
							Cell: ({ value, row }) => (
								<span className="nowrap font-medium">
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
								<span className="nowrap capitalize">{value}</span>
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
					dataSource={[]}
					isLoading={false}
					useStrip
					emptyIcon={
						<OrderIcon
							width="80px"
							height="80px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ORDERS YET"
					emptySbText="You haven to place an order to see it here."
					refetch={() => {}}
				/>
			</TableWrapper>
		</AddressWrapper>
	);
}

export default Order;
