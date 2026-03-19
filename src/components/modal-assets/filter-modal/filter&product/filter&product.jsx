import React, { useMemo } from 'react';
import Modal from '../../../modal/index_modal';
import { FilterModalWrapper } from './filter&product.style';
import CustomInput from '../../../form-components/input/custom-input';
import SearchSelect from '../../../form-components/select/search-select';
import BubbleSlide from '../../../loaders/bubbles/BubbleSlide';
import CategoryServices from '../../../../features/services/custom-hooks/category';
import AttributeServices from '../../../../features/services/custom-hooks/attribute';
import { attributeType } from '../../../../utilities/app-const';
import {
	groupAttributesByType,
	buildShopItemFormData,
	generateColorImage,
} from '../../../../utilities/basic-functions';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';

function FilterProductDisplay({ ref, filterHandler, reset, closeModal }) {
	const initialValues = {
		search: '',
		category: '',
		subCategory: '',
		categorySearchValue: '',
		colorSearchValue: '',
		sizeSearchValue: '',
		colorAttributes: '',
		sizeAttributes: '',
		classTags: '',
		minPrice: '',
		maxPrice: '',
	};

	const onSubmit = async (values) => {
		const {
			colorSearchValue,
			sizeSearchValue,
			categorySearchValue,
			...others
		} = values;

		if (filterHandler) {
			filterHandler({ ...others });
		}
		closeModal();
	};

	const { values, errors, handleBlur, touched, handleChange } = useFormik({
		initialValues,
		// validationSchema: ,
		onSubmit,
	});

	const {
		search,
		category,
		subCategory,
		categorySearchValue,
		colorSearchValue,
		sizeSearchValue,
		colorAttributes,
		sizeAttributes,
		classTags,
		minPrice,
		maxPrice,
	} = values;

	const { data: dataCat, isPending: isPendingCat } = CategoryServices.get({
		limit: 100,
		search: categorySearchValue,
	});

	const { data: dataColor, isPending: isPendingColor } =
		AttributeServices.getAll({
			limit: 100,
			type: attributeType.COLOR,
			search: colorSearchValue,
		});

	const { data: dataSize, isPending: isPendingSize } = AttributeServices.getAll(
		{
			limit: 100,
			type: attributeType.SIZE,
			search: sizeSearchValue,
		}
	);

	const categoryOptions = useMemo(() => {
		if (!dataCat?.data) return [];

		return dataCat?.data.map((cat) => ({
			label: cat?.name,
			value: cat?._id,
		}));
	}, [dataCat?.data]);

	const colorOptions = useMemo(() => {
		if (!dataColor?.data) return [];

		return dataColor?.data.map((color) => ({
			label: color?.name,
			value: color?._id,
			image: generateColorImage(color?.display || '#000000'),
		}));
	}, [dataColor?.data]);

	const sizeOptions = useMemo(() => {
		if (!dataSize?.data) return [];

		return dataSize?.data.map((size) => ({
			label: `${size?.name},  ${size?.display}, ${size?.value}`,
			value: size?._id,
		}));
	}, [dataSize?.data]);

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="550px"
			onClose={() => {}}
			onOpen={() => {}}
			refName={ref}
			animation
		>
			<FilterModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Filter Products</h3>
						<p>
							Narrow down products using category, attributes, price range, or
							tags. Use multiple filters to quickly find the items you want.
						</p>
					</div>

					<IoClose
						className="closeBtn"
						onClick={closeModal}
						style={{ cursor: 'pointer' }}
					/>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="filter_section">
						<div className="form_control">
							<label className="ml-[10px]">Search Products</label>

							<CustomInput
								name="search"
								id="search"
								value={search}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Search by product name..."
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>

							<p className="form_note">Search products by name or keywords.</p>
						</div>
					</div>

					<div className="filter_section">
						<div className="form_box">
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
					</div>

					<div className="filter_section">
						<div className="form_box">
							<div className="form_control">
								<label className="ml-[10px]">Color</label>

								{isPendingColor ? (
									<BubbleSlide />
								) : (
									<SearchSelect
										options={colorOptions}
										value={colorAttributes}
										name="colorAttributes"
										id="colorAttributes"
										placeholder="Select color"
										handleChange={handleChange}
										paddingX="14px"
										paddingY="9px"
										useBackground
										setSearchString={(val) =>
											handleChange({
												target: {
													name: 'colorSearchValue',
													value: val,
												},
											})
										}
									/>
								)}
							</div>

							<div className="form_control">
								<label className="ml-[10px]">Size</label>

								{isPendingSize ? (
									<BubbleSlide />
								) : (
									<SearchSelect
										options={sizeOptions}
										value={sizeAttributes}
										name="sizeAttributes"
										id="sizeAttributes"
										placeholder="Select size"
										handleChange={handleChange}
										paddingX="14px"
										paddingY="9px"
										useBackground
										setSearchString={(val) =>
											handleChange({
												target: {
													name: 'sizeSearchValue',
													value: val,
												},
											})
										}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="filter_section">
						<div className="form_box">
							<div className="form_control">
								<label className="ml-[10px]">Min Price</label>

								<CustomInput
									type="number"
									name="minPrice"
									id="minPrice"
									value={minPrice}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="0"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>

							<div className="form_control">
								<label className="ml-[10px]">Max Price</label>

								<CustomInput
									type="number"
									name="maxPrice"
									id="maxPrice"
									value={maxPrice}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="1000"
									paddingX="14px"
									paddingY="9px"
									useBackground
								/>
							</div>
						</div>
					</div>

					<div className="filter_section">
						<div className="form_control">
							<label className="ml-[10px]">Tags</label>

							<CustomInput
								name="classTags"
								id="classTags"
								value={classTags}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="sport*summer+premium"
								paddingX="14px"
								paddingY="9px"
								useBackground
							/>

							<p className="form_note">
								Use <b>*</b> for OR groups and <b>+</b> for AND groups. Example:{' '}
								<i>sport+summer*premium</i>
							</p>
						</div>
					</div>

					<div className="filter_actions">
						<button
							type="button"
							className="reset_btn"
							onClick={() => reset && reset()}
						>
							Reset
						</button>

						<button type="submit" className="apply_btn">
							Apply Filter
						</button>
					</div>
				</form>
			</FilterModalWrapper>
		</Modal.Center>
	);
}

export default FilterProductDisplay;
