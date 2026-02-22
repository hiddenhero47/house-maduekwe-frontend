import React, { useState } from 'react';
import {
	Container,
	Search,
	FilterBtn,
	MasonryGrid,
	GridItem,
	Image,
	TableWrapper,
} from './elements/index.style';
import { CiSearch } from 'react-icons/ci';
import { CiGrid42 } from 'react-icons/ci';
import { LuTableOfContents } from 'react-icons/lu';
import {
	useParams,
	useMatch,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import BasicPg from '../../components/table_components/pagination/basicPg';
import { FaSquareOdnoklassniki } from 'react-icons/fa6';
import { items } from '../../dummyData/shopItems';
import { getRandomInt } from '../../utilities/basic-functions';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';

function Index() {
	const [display, setDisplay] = useState('grid');
	const navigate = useNavigate();
	const location = useLocation();
	const { category, minPrice, maxPrice, attributes, keyWord } = useParams();
	const page = Number(new URLSearchParams(location.search).get('page')) || 1;

	const flipPage = (p) => {
		const params = new URLSearchParams(location.search);
		params.set('page', p);

		navigate({
			pathname: location.pathname,
			search: params.toString(),
		});
	};

	const data = Array(12).fill(items[0]);

	const getImagePosition = (image) => {
		if (!image?.width || !image?.height) return 'center';
		const ratio = image.width / image.height;
		// Square-ish (0.8 to 1.25)
		if (ratio > 0.8 && ratio < 1.25) return 'center';
		// Tall or wide rectangle → top gives better visual
		return 'top';
	};

	return (
		<Container>
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
					<button
						id="set_grid"
						onClick={() => setDisplay('grid')}
						data-active={display === 'grid'}
					>
						<CiGrid42 />
					</button>

					<button
						id="set_table"
						onClick={() => setDisplay('table')}
						data-active={display === 'table'}
					>
						<LuTableOfContents />
					</button>

					<FilterBtn>
						<div className="content">Filter</div>
						<div className="loader"></div>
					</FilterBtn>
				</div>
			</div>

			<div className="flex items-center mt-[20px] mx-[auto] pb-[20px] border-b border-b-[var(--mainBody-line)] w-[98%]">
				<BasicPg currentPage={page || 1} totalPages={5} changePage={flipPage} />
			</div>

			<div id="display_body" className="Y_scroll_style scroll_style">
				{display === 'grid' && (
					<div>
						<MasonryGrid>
							{data.map((item, index) => {
								const image =
									item?.placeHolder?.url ||
									item.imageCatalog[getRandomInt(0, 5)]?.url;

								return (
									<GridItem key={index} className="grid_item">
										<button
											onDoubleClick={() =>
												navigate(`/admin/products/design/${item?._id}`)
											}
										>
											<div className="imageHolder rounded-[inherit]">
												<Image
													src={image}
													alt="Error"
													$position={getImagePosition(image)}
												/>
											</div>

											<div className="details flex flex-col">
												<h3>{item?.name}</h3>
												<span>{item?._id}</span>
											</div>
										</button>
									</GridItem>
								);
							})}
						</MasonryGrid>
					</div>
				)}

				{display === 'table' && (
					<div>
						<TableWrapper>
							<CustomTable
								fields={[
									{
										Header: () => 'Nos',
										accessor: '_id', // accessor can be anything, we won’t use value
										Cell: ({ nos }) => (
											<span className="nowrap ml-[10px]">{nos}</span>
										),
									},
									{
										Header: () => 'Name',
										accessor: 'name',
										Cell: ({ value }) => (
											<span className="nowrap">{value}</span>
										),
									},
									{
										Header: () => 'ID',
										accessor: '_id',
										Cell: ({ value }) => (
											<span className="nowrap text-[13px] opacity-80">
												{value}
											</span>
										),
									},
									{
										Header: () => 'Brand',
										accessor: 'brand',
										Cell: ({ value }) => (
											<span className="nowrap">{value}</span>
										),
									},
									{
										Header: () => 'Category',
										accessor: 'category',
										Cell: ({ value }) => (
											<span className="nowrap ml-[10px]">
												{value?.name || '-'}
											</span>
										),
									},
									{
										Header: () => 'Sub Category',
										accessor: 'subCategory',
										Cell: ({ value }) => (
											<span className="nowrap ml-[10px]">{value}</span>
										),
									},
									{
										Header: () => 'Status',
										accessor: 'status',
										Cell: ({ value }) => (
											<span
												className={`nowrap ${
													value === 'available'
														? 'text-green-500'
														: 'text-red-500'
												}`}
											>
												{value}
											</span>
										),
									},
									{
										Header: () => 'Price',
										accessor: 'price',
										Cell: ({ value, row }) => (
											<span className="nowrap font-medium">
												{row.original.currency} {value}
											</span>
										),
									},
								]}
								dataSource={data || []}
								isLoading={false}
								useStrip
								emptyIcon={
									<NoDataIcon
										width="150px"
										height="150px"
										color="var(--mainBody-sbText)"
									/>
								}
								emptyText="NO ITEMS YET"
								emptySbText="There is no available data to show. Please try something else"
								onDoubleCallRow={(item) =>
									navigate(`/admin/products/design/edit?id=${item?._id}`)
								}
							/>
						</TableWrapper>
					</div>
				)}
			</div>
		</Container>
	);
}

export default Index;
