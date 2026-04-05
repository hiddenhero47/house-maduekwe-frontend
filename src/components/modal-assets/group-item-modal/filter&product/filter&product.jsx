import React, { useMemo, useState } from 'react';
import Modal from '../../../modal/index_modal';
import { FilterModalWrapper, ProductItem } from './filter&product.style';
import CustomInput from '../../../form-components/input/custom-input';
import SearchSelect from '../../../form-components/select/search-select';
import BubbleSlide from '../../../loaders/bubbles/BubbleSlide';
import CategoryServices from '../../../../features/services/custom-hooks/category';
import ShopItemServices from '../../../../features/services/custom-hooks/shop-items';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import LoaderNoData from './loader-no-data';

function SelectShopItemsModal({ ref, closeModal, onApply }) {
	const [filters, setFilters] = useState({});
	const [selectedItems, setSelectedItems] = useState([]);

	const initialValues = {
		search: '',
		category: '',
		subCategory: '',
		categorySearchValue: '',
		classTags: '',
	};

	const { values, handleChange, handleBlur } = useFormik({
		initialValues,
		onSubmit: (vals) => {
			const { categorySearchValue, ...others } = vals;
			setFilters(others);
		},
	});

	const { search, category, subCategory, categorySearchValue, classTags } =
		values;

	// Fetch categories
	const { data: dataCat, isPending: isPendingCat } = CategoryServices.get({
		limit: 100,
		search: categorySearchValue,
	});

	const categoryOptions = useMemo(() => {
		if (!dataCat?.data) return [];

		return dataCat.data.map((cat) => ({
			label: cat.name,
			value: cat._id,
		}));
	}, [dataCat?.data]);

	// Fetch shop items
	const { data, isPending } = ShopItemServices.get({
		limit: 20,
		...filters,
	});

	const items = data?.data || [];

	const toggleItem = (item) => {
		setSelectedItems((prev) => {
			const exists = prev.find((p) => p._id === item._id);

			if (exists) {
				return prev.filter((p) => p._id !== item._id);
			}

			return [...prev, item];
		});
	};

	const isSelected = (id) => selectedItems.some((item) => item._id === id);

	const selectPlaceholder = (data) => {
		if (!data) return '';

		const placeHolder = data?.placeHolder?.url;

		const firstImage = data?.imageCatalog?.[0]?.url;

		return placeHolder || firstImage || '';
	};

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="100vw"
			refName={ref}
			onClose={() => {}}
			onOpen={() => setSelectedItems([])}
			animation
		>
			<FilterModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Select Products</h3>
						<p>
							Search and filter products, then select the items you want to add
							to this group.
						</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<div className="crater_wrapper">
					<form
						className="craters"
						onSubmit={(e) => {
							e.preventDefault();
							const { categorySearchValue, ...others } = values;
							setFilters(others);
						}}
					>
						{/* SEARCH */}
						<div className="form_control">
							<label className="ml-[10px]">Search</label>

							<CustomInput
								name="search"
								value={search}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Search products..."
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						{/* CATEGORY */}
						<div className="form_box my-[10px]">
							<div className="form_control">
								<label className="ml-[10px]">Category</label>

								{isPendingCat ? (
									<BubbleSlide />
								) : (
									<SearchSelect
										options={categoryOptions}
										value={category}
										name="category"
										id="category"
										placeholder="Select category"
										handleChange={handleChange}
										paddingX="14px"
										paddingY="9px"
										useBackground
										setSearchString={(val) =>
											handleChange({
												target: {
													name: 'categorySearchValue',
													value: val,
												},
											})
										}
									/>
								)}
							</div>

							<div className="form_control">
								<label className="ml-[10px]">Sub Category</label>

								<CustomInput
									name="subCategory"
									id="subCategory"
									value={subCategory}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Example: sneakers"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>

						{/* TAGS */}
						<div className="form_control">
							<label className="ml-[10px]">Tags</label>

							<CustomInput
								name="classTags"
								value={classTags}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="sport*summer"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>
						</div>

						<div className="filter_actions">
							<button type="submit" className="apply_btn">
								Search
							</button>
						</div>
					</form>

					<div className="craters">
						{/* PRODUCTS */}
						<div className="filter_section">
							<h4>Products</h4>

							{isPending || items.length < 1 ? (
								<LoaderNoData isLoading={isPending} data={items} />
							) : (
								<div className="Y_scroll_style flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
									{items.map((item) => (
										<ProductItem
											key={item._id}
											onClick={() => toggleItem(item)}
											className={isSelected(item._id) ? 'selected' : ''}
										>
											<div className="imageBox">
												<div className="imageHolder">
													<img src={selectPlaceholder(item)} alt={item.name} />
												</div>
											</div>

											<div className="info">
												<span className="name">{item.name}</span>
												<span className="price">
													{item.price} {item.currency}
												</span>
											</div>

											<input
												type="checkbox"
												checked={isSelected(item._id)}
												readOnly
											/>
										</ProductItem>
									))}
								</div>
							)}
						</div>

						{/* ACTIONS */}
						<div className="filter_actions">
							<button className="reset_btn" onClick={closeModal} type="button">
								Cancel
							</button>

							<button
								className="apply_btn"
								type="button"
								onClick={() => {
									onApply(selectedItems);
									closeModal();
								}}
							>
								Add {selectedItems.length} Products
							</button>
						</div>
					</div>
				</div>
			</FilterModalWrapper>
		</Modal.Center>
	);
}

export default SelectShopItemsModal;
