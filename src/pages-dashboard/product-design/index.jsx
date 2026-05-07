import React, { useMemo } from 'react';
import {
	Container,
	SaveBtn,
	AddBtn,
	FormBody,
	ChipBody,
} from './elements/index.style';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { RiStickyNoteAddFill } from 'react-icons/ri';
import { BsFillSave2Fill } from 'react-icons/bs';
import { useFormik } from 'formik';
import PhoneInput from '../../components/form-components/phone-number/phone-number';
import CustomInput from '../../components/form-components/input/custom-input';
import CustomTextarea from '../../components/form-components/input/custom-textarea';
import CustomSelect from '../../components/form-components/select/custom-select';
import Comboboxes from '../../components/form-components/select/comboboxes';
import SearchSelect from '../../components/form-components/select/search-select';
import CustomFileInput from '../../components/form-components/file/custom-file-input';
import ChipsInput from '../../components/form-components/chips-input/chips-input';
import { ItemStatusType } from '../../utilities/app-const';
import { TbTagsFilled } from 'react-icons/tb';
import { getCountryCurrencyOptions } from '../../utilities/city-state-country';
import CategoryServices from '../../features/services/custom-hooks/category';
import { buildShopItemFormData } from '../../utilities/basic-functions';
import { shopItemValidationSchema } from '../../features/validations/shopItem-validation';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { useNavigate } from 'react-router-dom';

function Index() {
	const navigate = useNavigate();

	const { data: dataCat, isPending: isPendingCat } = CategoryServices.get({
		limit: 100,
	});

	const { mutate: createProduct, isPending } = ShopItemServices.create();

	const initialValues = {
		name: '',
		brand: '',
		status: '',
		description: '',
		price: 0,
		vat: 0,
		currency: 'USD',
		discount: 0,
		category: '',
		categorySearchValue: '',
		subCategory: '',
		quantity: 1,
		placeHolder: {},
		imageCatalog: [],
		attributes: [],
		highlights: [],
		classTags: [],
		imageFiles: [],
	};

	const onSubmit = async (values, { resetForm }) => {
		const formData = buildShopItemFormData(values);
		createProduct(formData, {
			onSuccess: (data) => {
				console.log(data?.data);
				resetForm();
				navigate(`/admin/products/design/${data?.data._id}`);
			},
		});
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
	});

	const {
		name,
		brand,
		status,
		description,
		price,
		vat,
		currency,
		discount,
		category,
		categorySearchValue,
		subCategory,
		quantity,
		placeHolder,
		imageCatalog,
		attributes,
		highlights,
		classTags,
		imageFiles,
	} = values;

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

	return (
		<Container>
			<div className="header">
				<div className="title-area">
					<div className="icon">
						<FiEdit />
					</div>

					<div>
						<h1 id="title1">Create Product</h1>
						<p id="title2">Create & edit product experience for customers</p>
					</div>
				</div>

				<div className="actions">
					<SaveBtn type="submit" onClick={handleSubmit} $isLoading={isPending}>
						<div className="content">
							<BsFillSave2Fill />
							Save
						</div>
						<div className="loader">
							<BubbleSlide color="var(--mainBody-text)" height="20px" />
						</div>
					</SaveBtn>

					<AddBtn type='button' onClick={() => navigate('/admin/products')} disabled={isPending}>
						<span>See Products</span>
						<IoIosArrowForward />
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
											max={5}
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
				</div>
			</form>
		</Container>
	);
}

export default Index;
