import React, { useState } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	CreateBtn,
	TableWrapper,
} from './elements/index.style';
import { BiSolidCabinet } from 'react-icons/bi';
import { TbSubtask } from 'react-icons/tb';
import { SiCircleci } from 'react-icons/si';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';

const data1 = [
	{
		_id: '66c8f1a92f4a3e9d7b21c001',
		name: 'Fashion Clothing',
		createdAt: '2024-08-22T10:15:30.000Z',
		updatedAt: '2024-08-22T10:15:30.000Z',
	},
];

const data2 = [
	{
		_id: '66c8f2e12f4a3e9d7b21c101',
		name: 'Size',
		value: 42,
		type: 'size',
		display: 'Medium',
		createdAt: '2024-08-22T11:05:10.000Z',
	},
	{
		_id: '66c8f2e12f4a3e9d7b21c101',
		name: 'Size',
		value: 42,
		type: 'size',
		display: 'Medium',
		createdAt: '2024-08-22T11:05:10.000Z',
	},
	{
		_id: '66c8f2e12f4a3e9d7b21c101',
		name: 'Size',
		value: 42,
		type: 'size',
		display: 'Medium',
		createdAt: '2024-08-22T11:05:10.000Z',
	},
	{
		_id: '66c8f2e12f4a3e9d7b21c101',
		name: 'Size',
		value: 42,
		type: 'size',
		display: 'Medium',
		createdAt: '2024-08-22T11:05:10.000Z',
	},
];

function Index() {
	const [section, setSection] = useState('categories');
	return (
		<Container>
			<h1>Product Classification</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						className="tabs"
						$active={section === 'categories'}
						onClick={() => setSection('categories')}
					>
						<BiSolidCabinet />
						Categories
					</OptionBtn>

					<OptionBtn
						className="tabs"
						$active={section === 'attributes'}
						onClick={() => setSection('attributes')}
					>
						<SiCircleci />
						Attributes
					</OptionBtn>
				</div>

				<div className="actions">
					<CreateBtn>+ New Category</CreateBtn>
					<CreateBtn>+ New Attribute</CreateBtn>
				</div>
			</TabNav>

			<TableWrapper>
				{section === 'attributes' && (
					<CustomTable
						fields={[
							{
								Header: () => 'No',
								accessor: '_nos',
								Cell: ({ nos }) => (
									<span className="font-semibold opacity-70 ml-[5px]">{nos}</span>
								),
							},
							{
								Header: () => 'Name',
								accessor: 'name',
								Cell: ({ value }) => (
									<span className="font-semibold ml-[8px]">{value}</span>
								),
							},
							{
								Header: () => 'Value',
								accessor: 'value',
								Cell: ({ value }) => (
									<span className="text-sm ml-[8px]">
										{Array.isArray(value) ? value.join(', ') : String(value)}
									</span>
								),
							},
							{
								Header: () => 'Type',
								accessor: 'type',
								Cell: ({ value }) => (
									<span className="text-xs font-semibold uppercase opacity-70 ml-[8px]">
										{value}
									</span>
								),
							},
						]}
						dataSource={data2 || []}
						useStrip
						isLoading={false}
						emptyText="NO ATTRIBUTES"
						emptySbText="You haven’t added any attributes yet."
					/>
				)}

				{section === 'categories' && (
					<CustomTable
						fields={[
							{
								Header: () => 'No',
								accessor: '_nos',
								Cell: ({ nos }) => (
									<span className="font-semibold opacity-70">{nos}</span>
								),
							},
							{
								Header: () => 'Name',
								accessor: 'name',
								Cell: ({ value }) => (
									<span className="font-semibold">{value}</span>
								),
							},
							{
								Header: () => 'ID',
								accessor: '_id',
								Cell: ({ value }) => (
									<span className="text-xs opacity-60">{value}</span>
								),
							},
							{
								Header: () => 'Date',
								accessor: 'createdAt',
								Cell: ({ value }) => (
									<span className="text-xs opacity-70">
										{new Date(value).toLocaleDateString()}
									</span>
								),
							},
						]}
						dataSource={data1 || []}
						useStrip
						isLoading={false}
						emptyText="NO CATEGORIES"
						emptySbText="You haven’t created any categories yet."
					/>
				)}
			</TableWrapper>
		</Container>
	);
}

export default Index;
