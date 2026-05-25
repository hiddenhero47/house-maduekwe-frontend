import React, { useMemo, useRef } from 'react';
import {
	Container,
	SaveBtn,
	AddBtn,
	FormBody,
	AttributeBody,
	AttributeBox,
	Color,
	Size,
	PlaceholderCard,
	Overlay,
	ChipBody,
} from './elements/index.style';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { RiStickyNoteAddFill } from 'react-icons/ri';
import { BsFillSave2Fill } from 'react-icons/bs';
import { useFormik } from 'formik';
import CustomInput from '../../components/form-components/input/custom-input';
import CustomTextarea from '../../components/form-components/input/custom-textarea';
import CustomSelect from '../../components/form-components/select/custom-select';
import Comboboxes from '../../components/form-components/select/comboboxes';
import SearchSelect from '../../components/form-components/select/search-select';
import CustomFileInput from '../../components/form-components/file/custom-file-input';
import ImageSelector from '../../components/form-components/image-selector/selector';
import ChipsInput from '../../components/form-components/chips-input/chips-input';
import { ItemStatusType } from '../../utilities/app-const';
import { FaRuler } from 'react-icons/fa6';
import { FaBrush } from 'react-icons/fa';
import { FaImages } from 'react-icons/fa6';
import { attributeType } from '../../utilities/app-const';
import {
	groupAttributesByType,
	buildShopItemFormData,
	generateColorImage,
} from '../../utilities/basic-functions';
import { BiSolidCategory } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TbTagsFilled } from 'react-icons/tb';
import { getCountryCurrencyOptions } from '../../utilities/city-state-country';
import CategoryServices from '../../features/services/custom-hooks/category';
import AttributeServices from '../../features/services/custom-hooks/attribute';
import { shopItemValidationSchema } from '../../features/validations/shopItem-validation';
import { useParams } from 'react-router-dom';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { FaTshirt } from 'react-icons/fa';
import { RiFileCloseFill } from 'react-icons/ri';
import GroupedVariantsModal from './elements/variants/variants-modal';
import { PiGitBranchBold } from 'react-icons/pi';
import { AiOutlineDollar } from 'react-icons/ai';
import SelectItemGroupModal from '../../components/modal-assets/group-item-modal/filter&group/filter&group';
import ItemGroupServices from '../../features/services/custom-hooks/item-groups';

const logFormData = (formData) => {
	const obj = {};

	for (let [key, value] of formData.entries()) {
		obj[key] = value;
	}

	console.log(JSON.parse(obj.data));
};

function Index() {
	const { id } = useParams();
	const { data, isPending, isSuccess } = ShopItemServices.getOne(id);
	const product = data?.data ?? null;

	const { mutate: updateGroup, isPending: isUpdatingGroup } =
		ItemGroupServices.update();

	const { data: dataCat, isPending: isPendingCat } = CategoryServices.get({
		limit: 100,
	});

	const { mutate: updataProduct, isPending: isLoading } =
		ShopItemServices.update();

	const initialValues = useMemo(
		() => ({
			name: product?.name || '',
			brand: product?.brand || '',
			status: product?.status || '',
			description: product?.description || '',
			price: product?.price || 0,
			vat: product?.vat || 0,
			currency: product?.currency || 'USD',
			currencySearchValue: '',
			discount: product?.discount || 0,
			category: product?.category?._id || '',
			categorySearchValue: product?.category?.name || '',
			subCategory: product?.subCategory || '',
			quantity: product?.quantity || 1,
			placeHolder: product?.placeHolder || {},
			imageCatalog: product?.imageCatalog || [],
			attributes: product?.attributes || [],
			groupedVariants: product?.groupedVariants || [],
			classTags: product?.classTags || [],
			highlights: product?.highlights || [],
			removeImages: [],
			imageFiles: [],
			colorSearchValue: '',
			sizeSearchValue: '',
		}),
		[product]
	);

	const onSubmit = async (values) => {
		const formData = buildShopItemFormData(values);
		logFormData(formData);
		updataProduct(
			{ data: formData, id: id },
			{
				onSuccess: (data) => {},
			}
		);
	};

	const {
		values,
		errors,
		handleBlur,
		touched,
		handleChange,
		setFieldValue,
		handleSubmit,
	} = useFormik({
		initialValues,
		validationSchema: shopItemValidationSchema,
		onSubmit,
		enableReinitialize: true,
	});

	const {
		name,
		brand,
		status,
		description,
		price,
		vat,
		currency,
		currencySearchValue,
		discount,
		category,
		categorySearchValue,
		subCategory,
		quantity,
		placeHolder,
		imageCatalog,
		attributes,
		groupedVariants,
		classTags,
		highlights,
		removeImages,
		imageFiles,
		colorSearchValue,
		sizeSearchValue,
	} = values;

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

	const statusOptions = Object.values(ItemStatusType).map((value) => ({
		label: value,
		value: value,
	}));

	const currencyOptions = getCountryCurrencyOptions([
		'US',
		'CN',
		'JP',
		'DE',
		'IN',
		'NG',
	]);

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

	const getAttributeId = (attr) =>
		typeof attr?.Attribute === 'object' ? attr.Attribute?._id : attr?.Attribute;

	const onAttrChange = ({ AttributeId, key, value }) => {
		const updated = attributes.map((attr) =>
			getAttributeId(attr) === AttributeId ? { ...attr, [key]: value } : attr
		);

		setFieldValue('attributes', updated);
	};

	const getAttrValue = ({ AttributeId, key }) => {
		const attribute = attributes.find((a) => {
			const id =
				typeof a.Attribute === 'object' ? a.Attribute._id : a.Attribute;

			return id === AttributeId;
		});

		return attribute ? attribute[key] : undefined;
	};

	const addAttributes = ({ type, AttributeId }) => {
		if (!AttributeId) return;

		// Prevent duplicates
		const exists = attributes.some(
			(attr) => getAttributeId(attr) === AttributeId
		);
		if (exists) return;

		// Pick correct source safely
		const source =
			type === attributeType.COLOR
				? dataColor?.data || []
				: dataSize?.data || [];

		const Attribute = source.find((item) => item?._id === AttributeId);
		if (!Attribute) return; // extra safety

		const newAttribute = {
			Attribute,
			type: Attribute?.type || type,
			isDefault: false,
			quantity: 1,
			additionalAmount: '',
			images: [],
		};

		setFieldValue('attributes', [...attributes, newAttribute]);
	};

	const removeAttr = (AttributeId) => {
		setFieldValue(
			'attributes',
			attributes.filter((attr) => getAttributeId(attr) !== AttributeId)
		);
	};

	const modalRef = useRef(null);
	const openModal = () => {
		modalRef.current?.open();
	};

	const groupModalRef = useRef(null);
	const openGroupModal = () => {
		groupModalRef.current?.open();
	};

	const addItemToGroup = (group) => {
		const payload = { shopItems: [id] };
		updateGroup({ id: group._id, data: payload });
	};

	return (
		<Container>
			<div className="header">
				<div className="title-area">
					<div className="icon">
						<FiEdit />
					</div>

					<div>
						<h1 id="#title1">Create Product</h1>
						<p id="#title2">Create & edit product experience for customers</p>
					</div>
				</div>

				<div className="actions">
					<SaveBtn type="submit" onClick={handleSubmit} $isLoading={isLoading}>
						<div className="content">
							<BsFillSave2Fill />
							Save
						</div>
						<div className="loader">
							<BubbleSlide color="var(--mainBody-text)" height="20px" />
						</div>
					</SaveBtn>

					<AddBtn
						type="button"
						onClick={openGroupModal}
						$isLoading={isUpdatingGroup}
					>
						<div className="content">
							<RiStickyNoteAddFill />
							<span>Add to Group</span>
							<IoIosArrowForward />
						</div>
						<div className="loader">
							<BubbleSlide color="var(--mainBody-text)" height="20px" />
						</div>
					</AddBtn>
				</div>
			</div>

			<form id="form_wrapper">
				<div className="Y_scroll_style w-full h-full overflow-y-auto">
					<div className="w-full pb-[20px]">
						<FormBody className="Y_scroll_style">
							<div className="w-full h-full overflow-y-auto overflow-x-hidden Y_scroll_style">
								<div id="form_body_container">
									<div id="left_content" className="gap-[40px]">
										<div className="form_control">
											<label htmlFor="">Name</label>
											<CustomInput
												type="text"
												id="name"
												name="name"
												value={name}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.name && errors.name}
												errormessage={errors.name}
												placeholder="Product Name"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Brand</label>
											<CustomInput
												type="text"
												id="brand"
												name="brand"
												value={brand}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.brand && errors.brand}
												errormessage={errors.brand}
												placeholder="Product Brand"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Status</label>
											<CustomSelect
												id="status"
												name="status"
												value={status}
												handleChange={handleChange}
												onBlur={handleBlur}
												isError={touched.status && errors.status}
												errormessage={errors.status}
												placeholder="Product Status"
												paddingX="14px"
												paddingY="9px"
												scrollToTop
												useBackground
												options={statusOptions || []}
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Category</label>
											<Comboboxes
												id="category"
												name="category"
												value={category}
												handleChange={handleChange}
												onBlur={handleBlur}
												isError={touched.category && errors.category}
												errormessage={errors.status}
												placeholder="Product Category"
												paddingX="14px"
												paddingY="9px"
												scrollToTop
												useBackground
												options={categoryOptions || []}
												searchValue={categorySearchValue}
												onSearch={handleChange}
												searchId="categorySearchValue"
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Sub Category</label>
											<CustomInput
												type="text"
												id="subCategory"
												name="subCategory"
												value={subCategory}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.subCategory && errors.subCategory}
												errormessage={errors.subCategory}
												placeholder="Product Sub-Category"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Description</label>
											<CustomTextarea
												type="text"
												id="description"
												name="description"
												value={description}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.description && errors.description}
												errormessage={errors.description}
												placeholder="Product Description"
												paddingX="14px"
												paddingY="9px"
												useBackground
												maxHeight="100px"
												minHeight="100px"
											/>
										</div>
									</div>

									<div id="right_content" className="gap-[40px]">
										<div className="form_control">
											<label htmlFor="">Price</label>
											<CustomInput
												type="number"
												id="price"
												name="price"
												value={price}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.price && errors.price}
												errormessage={errors.price}
												placeholder="Product price"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Product Tax</label>
											<CustomInput
												type="number"
												id="vat"
												name="vat"
												value={vat}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.vat && errors.vat}
												errormessage={errors.vat}
												placeholder="Value Added Tax"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Currency</label>
											<SearchSelect
												id="currency"
												name="currency"
												value={currency}
												handleChange={handleChange}
												onBlur={handleBlur}
												isError={touched.currency && errors.currency}
												errormessage={errors.currency}
												placeholder="Used Currency"
												paddingX="14px"
												paddingY="9px"
												scrollToTop
												useBackground
												options={currencyOptions || []}
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Discount</label>
											<CustomInput
												type="number"
												id="discount"
												name="discount"
												value={discount}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.discount && errors.discount}
												errormessage={errors.discount}
												placeholder="Product Discount"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<label htmlFor="">Quantity</label>
											<CustomInput
												type="number"
												id="quantity"
												name="quantity"
												value={quantity}
												onChange={handleChange}
												onBlur={handleBlur}
												isError={touched.quantity && errors.quantity}
												errormessage={errors.quantity}
												placeholder="Product Quantity"
												paddingX="14px"
												paddingY="9px"
												useBackground
											/>
										</div>

										<div className="form_control">
											<CustomFileInput
												id="imageFiles"
												name="imageFiles"
												value={imageFiles}
												setFieldValue={setFieldValue}
												onBlur={handleBlur}
												isError={touched.imageFiles && errors.imageFiles}
												errormessage={errors.imageFiles}
												accept="image/png, image/jpeg"
												width="100%"
												isMultiple
												useBackground
											/>
										</div>
									</div>
								</div>
							</div>
						</FormBody>
					</div>

					<div className="w-full pb-[20px]">
						<ChipBody>
							<div className="main_wrapper">
								<h3>
									PRODUCT TAGS <TbTagsFilled />
								</h3>

								<div className="grid">
									<div className="field">
										<label>Features</label>
										<ChipsInput
											id="highlights"
											name="highlights"
											value={highlights}
											setFieldValue={setFieldValue}
											max={10}
											onBlur={handleBlur}
											isError={touched.highlights && errors.highlights}
											errormessage={errors.highlights}
											placeholder="Highlight and press Enter"
											paddingX="14px"
											paddingY="8px"
											useBackground
										/>
									</div>

									<div className="field">
										<label>Search Tags</label>
										<ChipsInput
											id="classTags"
											name="classTags"
											value={classTags}
											setFieldValue={setFieldValue}
											max={10}
											onBlur={handleBlur}
											isError={touched.classTags && errors.classTags}
											errormessage={errors.classTags}
											placeholder="Add a tag and press Enter"
											paddingX="14px"
											paddingY="8px"
											useBackground
										/>
									</div>
								</div>
							</div>
						</ChipBody>
					</div>

					<div className="w-full pb-[30px]">
						<AttributeBody>
							<div className="main_wrapper">
								<h3 className="mb-[18px]">
									PRODUCT MEDIA <FaImages />
								</h3>

								<div className="flex flex-wrap gap-[30px] items-start">
									{/* Placeholder Card */}
									<div>
										<p className="text-[12px] font-semibold mb-[8px] opacity-70 ml-[8px]">
											Placeholder Image
										</p>

										<ImageSelector
											id="placeHolder"
											name="placeHolder"
											setFieldValue={setFieldValue}
											onBlur={handleBlur}
											options={imageCatalog}
											value={placeHolder}
										>
											<PlaceholderCard>
												{placeHolder?.url ? (
													<div className="imageHolder rounded-[inherit]">
														<img src={placeHolder.url} alt="Placeholder" />
													</div>
												) : (
													<span className="text-[12px] opacity-50">
														No Placeholder
													</span>
												)}

												<Overlay className="overlay">
													Change Placeholder
												</Overlay>
											</PlaceholderCard>
										</ImageSelector>
									</div>

									{/* Manage Catalog */}
									<div className="mt-[auto] mb-[30px]">
										<p className="text-[12px] font-semibold mb-[8px] opacity-70">
											Image Catalog
										</p>

										<ImageSelector
											id="removeImages"
											name="removeImages"
											setFieldValue={setFieldValue}
											onBlur={handleBlur}
											options={imageCatalog}
											value={removeImages}
											isMultiple
											isRemoval
										>
											<AddBtn type="button">
												Manage Images
												<IoIosArrowForward />
											</AddBtn>
										</ImageSelector>

										<p className="text-[11px] mt-[8px] opacity-50">
											{removeImages?.length || 0} images selected
										</p>
									</div>
								</div>
							</div>
						</AttributeBody>
					</div>

					<div className="w-full pb-[20px]">
						<AttributeBody>
							<div className="main_wrapper">
								<h3 className="mb-[15px]">
									SIZE <FaRuler />
								</h3>

								<div className="form_control mb-[20px]">
									<SearchSelect
										id="attributes"
										name="attributes"
										value={''}
										onChange={(value) =>
											addAttributes({
												type: attributeType.SIZE,
												AttributeId: value,
											})
										}
										onBlur={handleBlur}
										isError={touched.attributes && errors.attributes}
										errormessage={errors.attributes}
										placeholder="Select a size attribute"
										paddingX="14px"
										paddingY="9px"
										scrollToTop
										useBackground
										options={sizeOptions || []}
										setSearchString={(val) =>
											handleChange({
												target: {
													name: 'sizeSearchValue',
													value: val,
												},
											})
										}
									/>
								</div>

								<AttributeBox>
									{(
										groupAttributesByType(attributes)[attributeType.SIZE] || []
									).map((att, index) => (
										<div className="attribute_control" key={index}>
											<Size className="ml-[5px] [word-spacing:7px]">
												{att?.Attribute?.display}-{att?.Attribute?.name}
											</Size>
											<div className="w-full flex items-center gap-[2px]">
												<i>
													<AiOutlineDollar size="16.5px" />
												</i>
												<CustomInput
													type="number"
													id={att?.Attribute?._id}
													name={att?.Attribute?._id}
													value={getAttrValue({
														AttributeId: att?.Attribute?._id,
														key: 'additionalAmount',
													})}
													onChange={(e) =>
														onAttrChange({
															AttributeId: att?.Attribute?._id,
															key: 'additionalAmount',
															value: e.target.value,
														})
													}
													onBlur={handleBlur}
													isError={false}
													errormessage={errors.attributes}
													placeholder="Additional Amount"
													paddingX="10px"
													paddingY="4px"
													useBackground
												/>
											</div>
											<div className="w-full flex items-center gap-[2px]">
												<i>
													<FaTshirt size="14px" />
												</i>
												<CustomInput
													type="number"
													id={att?.Attribute?._id}
													name={att?.Attribute?._id}
													value={getAttrValue({
														AttributeId: att?.Attribute?._id,
														key: 'quantity',
													})}
													onChange={(e) =>
														onAttrChange({
															AttributeId: att?.Attribute?._id,
															key: 'quantity',
															value: e.target.value,
														})
													}
													onBlur={handleBlur}
													isError={false}
													errormessage={errors.attributes}
													placeholder="quantity"
													paddingX="10px"
													paddingY="4px"
													useBackground
												/>
											</div>
											<div className="flex ml-[20px] gap-[10%] mt-[3px]">
												<button
													type="button"
													className="delete"
													onClick={() => removeAttr(att?.Attribute?._id)}
												>
													<MdDelete />
												</button>
											</div>
										</div>
									))}
								</AttributeBox>
							</div>

							<div className="main_wrapper">
								<h3 className="mb-[15px]">
									COLOR <FaBrush />
								</h3>

								<div className="form_control mb-[20px]">
									<SearchSelect
										id="attributes"
										name="attributes"
										value={''}
										onChange={(value) =>
											addAttributes({
												type: attributeType.COLOR,
												AttributeId: value,
											})
										}
										onBlur={handleBlur}
										isError={touched.attributes && errors.attributes}
										errormessage={errors.attributes}
										placeholder="Select a color attribute"
										paddingX="14px"
										paddingY="9px"
										scrollToTop
										useBackground
										options={colorOptions || []}
										setSearchString={(val) =>
											handleChange({
												target: {
													name: 'colorSearchValue',
													value: val,
												},
											})
										}
									/>
								</div>

								<AttributeBox>
									{(
										groupAttributesByType(attributes)[attributeType.COLOR] || []
									).map((att, index) => (
										<div className="attribute_control" key={index}>
											<div className="ml-[5px] mb-[5px] flex gap-[10px] items-center">
												<Color
													$color={att?.Attribute?.display}
													$active={true}
												/>
												<span className="name">{att?.Attribute?.name}</span>
											</div>
											<div className="w-full flex items-center gap-[2px]">
												<i>
													<AiOutlineDollar size="16.5px" />
												</i>
												<CustomInput
													type="number"
													id={att?.Attribute?._id}
													name="additionalAmount"
													value={getAttrValue({
														AttributeId: att?.Attribute?._id,
														key: 'additionalAmount',
													})}
													onChange={(e) =>
														onAttrChange({
															AttributeId: att?.Attribute?._id,
															key: 'additionalAmount',
															value: e.target.value,
														})
													}
													onBlur={handleBlur}
													isError={false}
													errormessage={errors.attributes}
													placeholder="Additional Amount"
													paddingX="10px"
													paddingY="4px"
													useBackground
												/>
											</div>
											<div className="w-full flex items-center gap-[2px]">
												<i>
													<FaTshirt size="14px" />
												</i>
												<CustomInput
													type="number"
													id={att?.Attribute?._id}
													name="additionalAmount"
													value={getAttrValue({
														AttributeId: att?.Attribute?._id,
														key: 'quantity',
													})}
													onChange={(e) =>
														onAttrChange({
															AttributeId: att?.Attribute?._id,
															key: 'quantity',
															value: e.target.value,
														})
													}
													onBlur={handleBlur}
													isError={false}
													errormessage={errors.attributes}
													placeholder="quantity"
													paddingX="10px"
													paddingY="4px"
													useBackground
												/>
											</div>
											<div className="flex ml-[20px] gap-[10%] mt-[3px]">
												<button
													type="button"
													className="delete"
													onClick={() => removeAttr(att?.Attribute?._id)}
												>
													<MdDelete />
												</button>
												<ImageSelector
													options={imageCatalog}
													onChange={(value) =>
														onAttrChange({
															AttributeId: att?.Attribute?._id,
															key: 'images',
															value,
														})
													}
													value={getAttrValue({
														AttributeId: att?.Attribute?._id,
														key: 'images',
													})}
													isMultiple
												>
													<button type="button" className="edit">
														<BiSolidCategory />
													</button>
												</ImageSelector>
											</div>
										</div>
									))}
								</AttributeBox>
							</div>
						</AttributeBody>
					</div>

					<div className="w-full pb-[20px]">
						<AttributeBody>
							<div className="main_wrapper">
								<h3 className="mb-[18px]">
									GROUPED VARIANT <PiGitBranchBold />
								</h3>
								<AddBtn type="button" onClick={openModal}>
									Add to Group
								</AddBtn>
							</div>
						</AttributeBody>
					</div>
				</div>
				<GroupedVariantsModal
					modalRef={modalRef}
					attributes={attributes}
					groupedVariants={groupedVariants || []}
					setFieldValue={setFieldValue}
				/>

				<SelectItemGroupModal
					ref={groupModalRef}
					closeModal={groupModalRef.current?.close}
					onApply={addItemToGroup}
				/>
			</form>
		</Container>
	);
}

export default Index;
