import React, { useState, useRef } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	CreateBtn,
	TableWrapper,
	ColorBox,
} from './elements/index.style';
import { BiSolidCabinet } from 'react-icons/bi';
import { TbSubtask } from 'react-icons/tb';
import { SiCircleci } from 'react-icons/si';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import CreateAttribute from '../../components/modal-assets/classing-modal/create-attribute';
import CreateCategory from '../../components/modal-assets/classing-modal/create-category';
import { useSearchParams } from 'react-router-dom';
import CategoryServices from '../../features/services/custom-hooks/category';
import AttributeServices from '../../features/services/custom-hooks/attribute';
import { attributeType } from '../../utilities/app-const';

function Index() {
	const [section, setSection] = useState('categories');

	const [searchParams, setSearchParams] = useSearchParams();

	const pageCat = Number(searchParams.get('pageCat')) || 1;
	const pageAttr = Number(searchParams.get('pageAttr')) || 1;

	const {
		data: dataCat,
		isPending: isPendingCat,
		isError: isErrorCat,
		refetch: refetchCat,
	} = CategoryServices.get({
		page: pageCat,
		limit: 10,
	});

	const {
		data: dataAttr,
		isPending: isPendingAttr,
		isError: isErrorAttr,
		refetch: refetchAttr,
	} = AttributeServices.getAll({
		page: pageAttr,
		limit: 10,
	});

	const { data: category = [], pagination: paginationCat } = dataCat || {};

	const { data: attribute = [], pagination: paginationAttr } = dataAttr || {};

	const flipPageCat = (p) => {
		searchParams.set('pageCat', p);
		setSearchParams(searchParams);
	};

	const flipPageAttr = (p) => {
		searchParams.set('pageAttr', p);
		setSearchParams(searchParams);
	};

	const modalRefAttr = useRef(null);
	const openModal = () => {
		if (modalRefAttr.current) {
			modalRefAttr.current.open();
		}
	};
	const closeModal = () => {
		if (modalRefAttr.current) {
			modalRefAttr.current.close();
		}
	};

	const modalRefCat = useRef(null);
	const openModalCat = () => {
		if (modalRefCat.current) {
			modalRefCat.current.open();
		}
	};
	const closeModalCat = () => {
		if (modalRefCat.current) {
			modalRefCat.current.close();
		}
	};

	const ensureArray = (value) => {
		if (Array.isArray(value)) return value;
		if (value == null) return [];
		return [value];
	};
	return (
		<Container>
			<h1>Product Classification</h1>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						type="button"
						className="tabs"
						$active={section === 'categories'}
						onClick={() => setSection('categories')}
					>
						<BiSolidCabinet />
						Categories
					</OptionBtn>

					<OptionBtn
						type="button"
						className="tabs"
						$active={section === 'attributes'}
						onClick={() => setSection('attributes')}
					>
						<SiCircleci />
						Attributes
					</OptionBtn>
				</div>

				<div className="actions">
					<CreateBtn type="button" onClick={openModalCat}>
						+ New Category
					</CreateBtn>
					<CreateBtn type="button" onClick={openModal}>
						+ New Attribute
					</CreateBtn>
				</div>
			</TabNav>

			<div id="display_body" className="Y_scroll_style">
				<div>
					<TableWrapper>
						{section === 'attributes' && (
							<CustomTable
								fields={[
									{
										Header: () => 'No',
										accessor: '_nos',
										Cell: ({ nos }) => (
											<span className="font-semibold opacity-70 ml-[5px]">
												{nos}
											</span>
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
										Header: () => 'Value',
										accessor: 'value',
										Cell: ({ value }) => (
											<span className="text-sm ml-[8px]">
												{Array.isArray(value)
													? value.join(', ')
													: String(value)}
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
									{
										Header: () => 'Display',
										accessor: 'type',
										Cell: ({ value, row }) => (
											<span className="ml-[10px]">
												{value === attributeType.COLOR ? (
													<span>
														{ensureArray(row?.original?.display).map((c, i) => (
															<ColorBox
																className="color_box"
																$color={c}
																key={i}
															/>
														))}
													</span>
												) : (
													<span className="text-xm font-semibold uppercase opacity-70">
														{row?.original?.display}
													</span>
												)}
											</span>
										),
									},
								]}
								dataSource={attribute || []}
								useStrip
								isLoading={isPendingAttr}
								emptyIcon={
									<NoDataIcon
										width="150px"
										height="150px"
										color="var(--mainBody-sbText)"
									/>
								}
								emptyText="NO ATTRIBUTES"
								emptySbText="You haven’t added any attributes yet."
								refetch={() => refetchAttr()}
								currentPage={pageAttr}
								totalPages={paginationAttr?.totalPages}
								changePage={flipPageAttr}
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
								dataSource={category || []}
								useStrip
								isLoading={isPendingCat}
								emptyIcon={
									<NoDataIcon
										width="150px"
										height="150px"
										color="var(--mainBody-sbText)"
									/>
								}
								emptyText="NO CATEGORIES"
								emptySbText="You haven’t created any categories yet."
								refetch={() => refetchCat}
								currentPage={pageCat}
								totalPages={paginationCat?.totalPages}
								changePage={flipPageCat}
							/>
						)}
					</TableWrapper>
				</div>
			</div>
			<CreateAttribute
				ref={modalRefAttr}
				closeModal={closeModal}
				openModal={openModal}
			/>

			<CreateCategory
				ref={modalRefCat}
				closeModal={closeModalCat}
				openModal={openModalCat}
			/>
		</Container>
	);
}

export default Index;
