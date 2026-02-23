import React, { useState } from 'react';
import { Container } from './elements/index.style';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import ImageSelector from '../../components/form-components/image-selector/selector';
import { items } from '../../dummyData/shopItems';
import ChipsInput from '../../components/form-components/chips-input/chips-input';

function Index() {
	const [tag, setTags] = useState([]);
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

	const ImageCatalog = items[0].imageCatalog;
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

			<ImageSelector component={<span>open</span>} options={ImageCatalog} />

			<div className='w-[350px] flex flex-col mt-[50px]'>
				<ChipsInput
				id="tag"
				name="tag"
				value={tag}
				onChange={(v) => setTags(v)}
				max={10}
				// onBlur={handleBlur}
				isError={true}
				errormessage="error"
				placeholder="Add tag and press Enter"
				paddingX="14px"
				paddingY="9px"
				useBackground
			/>
			</div>
		</Container>
	);
}

export default Index;
