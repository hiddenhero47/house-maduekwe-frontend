import React, { useState, useRef } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	CreateBtn,
	TableWrapper,
	ColorBox,
} from './elements/index.style';
import { BiSolidCabinet, BiPackage } from 'react-icons/bi';
import { TbSubtask } from 'react-icons/tb';
import { SiCircleci } from 'react-icons/si';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import CreateAttribute from '../../components/modal-assets/classing-modal/create-attribute';
import CreateCategory from '../../components/modal-assets/classing-modal/create-category';
import CreatePackage from '../../components/modal-assets/classing-modal/create-package';
import { useSearchParams } from 'react-router-dom';
import CategoryServices from '../../features/services/custom-hooks/category';
import AttributeServices from '../../features/services/custom-hooks/attribute';
import PackageServices from '../../features/services/custom-hooks/package';
import { attributeType } from '../../utilities/app-const';
import ToolKit from '../../components/tool-kit/index-tool-kit';
import { OptionItem } from '../../components/tool-kit/index-tool-kit.style';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import DeleteModal from '../../components/modal-assets/delete-modal/delete-modal';
import EditAttribute from '../../components/modal-assets/classing-modal/edit-attribute';
import EditCategory from '../../components/modal-assets/classing-modal/edit-category';
import EditPackage from '../../components/modal-assets/classing-modal/edit-package';

function Index() {
	const { mutate: deleteCategory, isPending: isDeletingCategory } =
		CategoryServices.delete();
	const { mutate: deleteAttribute, isPending: isDeletingAttribute } =
		AttributeServices.delete();
	const { mutate: deletePackage, isPending: isDeletingPackage } =
		PackageServices.delete();

	const [section, setSection] = useState('categories');

	const [searchParams, setSearchParams] = useSearchParams();

	const pageCat = Number(searchParams.get('pageCat')) || 1;
	const pageAttr = Number(searchParams.get('pageAttr')) || 1;
	const pagePkg = Number(searchParams.get('pagePkg')) || 1;

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

	const {
		data: dataPkg,
		isPending: isPendingPkg,
		isError: isErrorPkg,
		refetch: refetchPkg,
	} = PackageServices.get({
		page: pagePkg,
		limit: 10,
	});

	const { data: category = [], pagination: paginationCat } = dataCat || {};

	const { data: attribute = [], pagination: paginationAttr } = dataAttr || {};

	const { data: pkgs = [], pagination: paginationPkg } = dataPkg || {};

	const flipPageCat = (p) => {
		searchParams.set('pageCat', p);
		setSearchParams(searchParams);
	};

	const flipPageAttr = (p) => {
		searchParams.set('pageAttr', p);
		setSearchParams(searchParams);
	};

	const flipPagePkg = (p) => {
		searchParams.set('pagePkg', p);
		setSearchParams(searchParams);
	};

	const [editCategory, setEditCategory] = useState(null);
	const [editAttribute, setEditAttribute] = useState(null);
	const [editPackage, setEditPackage] = useState(null);
	const [deleteCategoryInfo, setDeleteCategoryInfo] = useState(null);
	const [deleteAttributeInfo, setDeleteAttributeInfo] = useState(null);
	const [deletePackageInfo, setDeletePackageInfo] = useState(null);

	const modalRefAttr = useRef(null);
	const openModal = () => {
		modalRefAttr.current?.open();
	};

	const modalRefCat = useRef(null);
	const openModalCat = () => {
		modalRefCat.current?.open();
	};

	const modalRefCatDelete = useRef(null);
	const openDeleteCat = (info) => {
		setDeleteCategoryInfo(info);
		modalRefCatDelete.current?.open();
	};

	const modalRefAttrDelete = useRef(null);
	const openDeleteAttr = (info) => {
		setDeleteAttributeInfo(info);
		modalRefAttrDelete.current?.open();
	};

	const modalRefCatEdit = useRef(null);
	const openCatEdit = (info) => {
		setEditCategory(info);
		modalRefCatEdit.current?.open();
	};

	const modalRefAttrEdit = useRef(null);
	const openAttrEdit = (info) => {
		setEditAttribute(info);
		modalRefAttrEdit.current?.open();
	};

	const modalRefPkg = useRef(null);
	const openModalPkg = () => {
		modalRefPkg.current?.open();
	};

	const modalRefPkgDelete = useRef(null);
	const openDeletePkg = (info) => {
		setDeletePackageInfo(info);
		modalRefPkgDelete.current?.open();
	};

	const modalRefPkgEdit = useRef(null);
	const openPkgEdit = (info) => {
		setEditPackage(info);
		modalRefPkgEdit.current?.open();
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

					<OptionBtn
						type="button"
						className="tabs"
						$active={section === 'packages'}
						onClick={() => setSection('packages')}
					>
						<BiPackage />
						Packages
					</OptionBtn>
				</div>

				<div className="actions">
					<CreateBtn type="button" onClick={openModalCat}>
						+ New Category
					</CreateBtn>
					<CreateBtn type="button" onClick={openModal}>
						+ New Attribute
					</CreateBtn>
					<CreateBtn type="button" onClick={openModalPkg}>
						+ New Package
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
									{
										Header: () => '',
										accessor: 'type',
										Cell: ({ row }) => (
											<ToolKit
												icon={<BsThreeDotsVertical className="text-sm" />}
												menuClass={
													attribute.length === 1 ? 'tool_kit' : 'tool_kits'
												}
												useCoords={attribute.length === 1 ? true : false}
												alineRight={attribute.length === 1 ? true : false}
											>
												<div className="flex flex-col gap-[2px]">
													<OptionItem
														className="edit"
														onClick={() => openAttrEdit(row.original)}
													>
														<FiEdit2 size={16} />
														<span>Edit</span>
													</OptionItem>

													<OptionItem
														className="delete"
														onClick={() => openDeleteAttr(row.original)}
													>
														<MdOutlineDeleteOutline size={18} />
														<span>Delete</span>
													</OptionItem>
												</div>
											</ToolKit>
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
									{
										Header: () => '',
										accessor: '_id',
										Cell: ({ row }) => (
											<ToolKit
												icon={<BsThreeDotsVertical className="text-sm" />}
												menuClass={
													category.length === 1 ? 'tool_kit' : 'tool_kits'
												}
												useCoords={category.length === 1 ? true : false}
												alineRight={category.length === 1 ? true : false}
											>
												<div className="flex flex-col gap-[2px]">
													<OptionItem
														className="edit"
														onClick={() => openCatEdit(row.original)}
													>
														<FiEdit2 size={16} />
														<span>Edit</span>
													</OptionItem>

													<OptionItem
														className="delete"
														onClick={() => openDeleteCat(row.original)}
													>
														<MdOutlineDeleteOutline size={18} />
														<span>Delete</span>
													</OptionItem>
												</div>
											</ToolKit>
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
								refetch={() => refetchCat()}
								currentPage={pageCat}
								totalPages={paginationCat?.totalPages}
								changePage={flipPageCat}
							/>
						)}

						{section === 'packages' && (
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
										Header: () => 'Dimensions (in)',
										accessor: 'length',
										Cell: ({ row }) => (
											<span className="text-sm ml-[8px]">
												{row?.original?.length}×{row?.original?.width}×
												{row?.original?.height}
											</span>
										),
									},
									{
										Header: () => 'Weight',
										accessor: 'weight',
										Cell: ({ value }) => (
											<span className="text-sm ml-[8px]">
												{value?.value != null
													? `${value.value} ${value.unit}`
													: '—'}
											</span>
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
									{
										Header: () => '',
										accessor: '_id',
										Cell: ({ row }) => (
											<ToolKit
												icon={<BsThreeDotsVertical className="text-sm" />}
												menuClass={
													pkgs.length === 1 ? 'tool_kit' : 'tool_kits'
												}
												useCoords={pkgs.length === 1 ? true : false}
												alineRight={pkgs.length === 1 ? true : false}
											>
												<div className="flex flex-col gap-[2px]">
													<OptionItem
														className="edit"
														onClick={() => openPkgEdit(row.original)}
													>
														<FiEdit2 size={16} />
														<span>Edit</span>
													</OptionItem>

													<OptionItem
														className="delete"
														onClick={() => openDeletePkg(row.original)}
													>
														<MdOutlineDeleteOutline size={18} />
														<span>Delete</span>
													</OptionItem>
												</div>
											</ToolKit>
										),
									},
								]}
								dataSource={pkgs || []}
								useStrip
								isLoading={isPendingPkg}
								emptyIcon={
									<NoDataIcon
										width="150px"
										height="150px"
										color="var(--mainBody-sbText)"
									/>
								}
								emptyText="NO PACKAGES"
								emptySbText="You haven’t created any packages yet."
								refetch={() => refetchPkg()}
								currentPage={pagePkg}
								totalPages={paginationPkg?.totalPages}
								changePage={flipPagePkg}
							/>
						)}
					</TableWrapper>
				</div>
			</div>
			<CreateAttribute
				ref={modalRefAttr}
				closeModal={() => modalRefAttr.current.close()}
				openModal={openModal}
			/>

			<CreateCategory
				ref={modalRefCat}
				closeModal={() => modalRefCat.current.close()}
				openModal={openModalCat}
			/>

			<DeleteModal
				ref={modalRefCatDelete}
				action={(data) => deleteCategory(data?._id)}
				data={deleteCategoryInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeleteCategoryInfo(null)}
			/>

			<DeleteModal
				ref={modalRefAttrDelete}
				action={(data) => deleteAttribute(data?._id)}
				data={deleteAttributeInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeleteAttributeInfo(null)}
			/>

			<EditCategory
				ref={modalRefCatEdit}
				category={editCategory}
				closeModal={() => modalRefCatEdit.current.close()}
				clear={() => setEditCategory(null)}
			/>

			<EditAttribute
				ref={modalRefAttrEdit}
				attribute={editAttribute}
				closeModal={() => modalRefAttrEdit.current.close()}
				clear={() => setEditAttribute(null)}
			/>

			<CreatePackage
				ref={modalRefPkg}
				closeModal={() => modalRefPkg.current.close()}
				openModal={openModalPkg}
			/>

			<DeleteModal
				ref={modalRefPkgDelete}
				action={(data) => deletePackage(data?._id)}
				data={deletePackageInfo}
				text="Are you sure you want to delete this?"
				subText="Make sure it's removed from products first."
				clean={() => setDeletePackageInfo(null)}
			/>

			<EditPackage
				ref={modalRefPkgEdit}
				pkg={editPackage}
				closeModal={() => modalRefPkgEdit.current.close()}
				clear={() => setEditPackage(null)}
			/>
		</Container>
	);
}

export default Index;
