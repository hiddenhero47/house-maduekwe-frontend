import React, { useState, useMemo, useRef } from 'react';
import {
	Container,
	Search,
	FilterBtn,
	MasonryGrid,
	GridItem,
	Image,
	TableWrapper,
	EmptyState,
	ActionBtn,
} from './elements/index.style';
import { CiSearch } from 'react-icons/ci';
import { CiGrid42 } from 'react-icons/ci';
import { LuTableOfContents } from 'react-icons/lu';
import {
	useParams,
	useMatch,
	useNavigate,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import BasicPg from '../../components/table_components/pagination/basicPg';
import { FaSquareOdnoklassniki } from 'react-icons/fa6';
import { getRandomInt } from '../../utilities/basic-functions';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import FilterProductDisplay from '../../components/modal-assets/filter-modal/filter&product/filter&product';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { Skeleton } from '../../components/loaders/skeleton/skeleton.style';
import { EmptyCartIcon } from '../../components/icon-components/empty-cart-icon';
import DeleteModal from '../../components/modal-assets/delete-modal/delete-modal';
import { FaTrash } from 'react-icons/fa';

function Index() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const [display, setDisplay] = useState('grid');
	const [deleteInfo, setDeleteInfo] = useState(null);

	const category = searchParams.get('category') || '';
	const minPrice = searchParams.get('minPrice') || '';
	const maxPrice = searchParams.get('maxPrice') || '';
	const rawAttributes = searchParams.get('attributes') || '';
	const classTags = searchParams.get('classTags') || '';
	const search = searchParams.get('search') || '';
	const page = Number(searchParams.get('page')) || 1;

	const formattedAttributes = useMemo(() => {
		if (!rawAttributes) return '';
		const ids = rawAttributes.split(',');
		return JSON.stringify(
			ids.map((id) => ({
				Attribute: id,
			}))
		);
	}, [rawAttributes]);

	const { mutate: deleteProduct, isPending: isDeleting } =
		ShopItemServices.delete();

	const { data, isPending } = ShopItemServices.get({
		page,
		limit: 100,
		category,
		attributes: formattedAttributes,
		classTags,
		minPrice,
		maxPrice,
		search,
	});

	const { data: products = [], pagination } = data || {};

	const resetFilter = () => {
		setSearchParams({ page: 1 });
	};

	const flipPage = (p) => {
		const params = Object.fromEntries([...searchParams]);
		params.page = p;
		setSearchParams(params);
	};

	const modalRef = useRef(null);
	const openModal = () => {
		modalRef.current?.open();
	};

	const modalRefDelete = useRef(null);
	const openDelete = (info) => {
		setDeleteInfo(info);
		modalRefDelete.current?.open();
	};

	const handleFilter = (filters) => {
		const params = new URLSearchParams(searchParams);

		if (filters.search) params.set('search', filters.search);
		else params.delete('search');

		if (filters.category) params.set('category', filters.category);
		else params.delete('category');

		if (filters.subCategory) params.set('subCategory', filters.subCategory);
		else params.delete('subCategory');

		if (filters.minPrice) params.set('minPrice', filters.minPrice);
		else params.delete('minPrice');

		if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
		else params.delete('maxPrice');

		if (filters.classTags) params.set('classTags', filters.classTags);
		else params.delete('classTags');

		// ✅ attributes (FIXED)
		const attrIds = [];
		if (filters.colorAttributes) {
			attrIds.push(filters.colorAttributes);
		}
		if (filters.sizeAttributes) {
			attrIds.push(filters.sizeAttributes);
		}
		if (attrIds.length > 0) {
			params.set('attributes', attrIds.join(',')); // ✅ CLEAN
		} else {
			params.delete('attributes');
		}
		// ✅ reset page
		params.set('page', 1);

		setSearchParams(params);
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

					<FilterBtn onClick={openModal} $isLoading={isPending}>
						<div className="content">
							<i>
								<HiOutlineAdjustmentsHorizontal />
							</i>
							Filter
						</div>
						<div className="loader">
							<BubbleSlide color="var(--filterBtn-text)" height="20px" />
						</div>
					</FilterBtn>
				</div>
			</div>

			<div className="flex items-center mt-[20px] mx-[auto] pb-[20px] border-b border-b-[var(--mainBody-line)] w-[98%]">
				<BasicPg
					currentPage={page || 1}
					totalPages={pagination?.totalPages}
					changePage={flipPage}
				/>
			</div>

			<div id="display_body" className="Y_scroll_style scroll_style">
				{display === 'grid' && (
					<div>
						{isPending && (
							<MasonryGrid>
								{Array.from({ length: 6 }).map((_, i) => (
									<GridItem key={i}>
										<Skeleton
											height="100%"
											width="100%"
											$color1="var(--skeleton-background1)"
											$color2="var(--skeleton-background2)"
										/>
									</GridItem>
								))}
							</MasonryGrid>
						)}

						{Array.isArray(products) && products.length === 0 && !isPending && (
							<EmptyState>
								<div className="content">
									<i>
										<EmptyCartIcon width="100%" height="100%" />
									</i>

									<h3>No Products Found</h3>

									<p>
										There is no available data to show. Please try something
										else.
									</p>
								</div>
							</EmptyState>
						)}

						{!isPending && products.length >= 1 && (
							<MasonryGrid>
								{(products || []).map((item, index) => (
									<GridItem key={index} className="grid_item">
										<div
											className="holder"
											onDoubleClick={() =>
												navigate(`/admin/products/design/${item?._id}`)
											}
										>
											<div className="imageHolder rounded-[inherit]">
												<Image
													src={
														item?.placeHolder?.url || item?.imageCatalog[0]?.url
													}
													alt="Error"
													onLoad={(e) => {
														const img = e.currentTarget;
														const ratio = img.naturalWidth / img.naturalHeight;
														const position = ratio < 0.66 ? 'top' : 'center';
														img.style.objectPosition = position;
													}}
												/>
											</div>

											<div className="details flex flex-col">
												<h3>{item?.name}</h3>
												<span>{item?._id}</span>
											</div>

											<div className="delete">
												<ActionBtn
													title="Delete group"
													className="danger"
													onClick={() => {
														openDelete(item);
													}}
												>
													<FaTrash />
												</ActionBtn>
											</div>
										</div>
									</GridItem>
								))}
							</MasonryGrid>
						)}
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
									{
										Header: () => 'Action',
										accessor: '_id',
										Cell: ({ value, row }) => (
											<div className="flex items-center gap-[10px] ml-[20px]">
												<ActionBtn
													title="Delete group"
													className="danger"
													onClick={(e) => {
														e.stopPropagation();
														const group = row.original;
														openDelete(group);
													}}
												>
													<FaTrash />
												</ActionBtn>
											</div>
										),
									},
								]}
								dataSource={products || []}
								isLoading={isPending}
								useStrip
								emptyIcon={
									<NoDataIcon
										width="150px"
										height="150px"
										color="var(--mainBody-sbText)"
									/>
								}
								emptyText="No Products Found"
								emptySbText="There is no available data to show. Please try something else"
								onDoubleCallRow={(item) =>
									navigate(`/admin/products/design/${item?._id}`)
								}
							/>
						</TableWrapper>
					</div>
				)}
			</div>

			<FilterProductDisplay
				ref={modalRef}
				filterHandler={handleFilter}
				reset={resetFilter}
				closeModal={() => modalRef.current?.close()}
			/>

			<DeleteModal
				ref={modalRefDelete}
				action={(data) => deleteProduct(data?._id)}
				data={deleteInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeleteInfo(null)}
			/>
		</Container>
	);
}

export default Index;
