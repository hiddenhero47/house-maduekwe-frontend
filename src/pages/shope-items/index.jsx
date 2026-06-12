import React, { useRef, useMemo } from 'react';
import { Container, FilterBtn, NewArrivalsBtn } from './elements/index.style';
import {
	ProductHeaderBgD,
	ProductHeaderBgL,
} from '../../components/icon-components/backgrounds';
import { useTheme } from 'styled-components';
import { FaArrowRightLong } from 'react-icons/fa6';
import {
	useParams,
	useMatch,
	useNavigate,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import MasonryLayout from './elements/masonry-layout';
import BasicPg from '../../components/table_components/pagination/basicPg';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import FilterProductDisplay from '../../components/modal-assets/filter-modal/filter&product/filter&product';
import BubbleSlide from '../../components/loaders/bubbles/BubbleSlide';
import { getPeriod } from '../../utilities/basic-functions';

function Index() {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();

	const category = searchParams.get('category') || '';
	const minPrice = searchParams.get('minPrice') || '';
	const maxPrice = searchParams.get('maxPrice') || '';
	const rawAttributes = searchParams.get('attributes') || '';
	const classTags = searchParams.get('classTags') || '';
	const search = searchParams.get('search') || '';
	const page = Number(searchParams.get('page')) || 1;

	const isProducts = useMatch('/products');
	const isNewArrivals = useMatch('/products/new-arrivals');

	const formattedAttributes = useMemo(() => {
		if (!rawAttributes) return '';
		const ids = rawAttributes.split(',');
		return JSON.stringify(
			ids.map((id) => ({
				Attribute: id,
			}))
		);
	}, [rawAttributes]);

	const period = useMemo(() => {
		if (isNewArrivals) return getPeriod('this-week');
		return null;
	}, [isNewArrivals]);

	const { data, isPending } = ShopItemServices.get({
		page,
		limit: 100,
		category,
		attributes: formattedAttributes,
		classTags,
		minPrice,
		maxPrice,
		search,
		startDate: period?.start || '',
		endDate: period?.end || '',
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

	const closeModal = () => {
		modalRef.current?.close();
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
		<Container className="Y_scroll_style">
			<section
				id="headerBox"
				className="w-full mt-[15px] rounded-[8px] relative"
			>
				{theme.mode === 'dark' ? (
					<ProductHeaderBgD width="100%" height="100%" />
				) : (
					<ProductHeaderBgL width="100%" height="100%" />
				)}

				<div className="absolute w-full h-full rounded-[inherit] flex flex-col top-0">
					<h1
						id="header"
						className="mx-[auto] mt-[13vh] pb-[8px] mb-[15px] intro-y"
					>
						PURE CLASS
					</h1>

					<p id="subHeader" className="mx-[auto] mb-[10vh] mt-[10px] intro-y">
						WHERE POWER MEETS CULTURE & STYLE
					</p>

					<NewArrivalsBtn
						className="intro-y"
						onClick={() => {
							navigate({
								pathname: isNewArrivals
									? '/products'
									: '/products/new-arrivals',
								search: '',
							});
						}}
					>
						<div className="content">
							{isNewArrivals ? 'VIEW BEST SELLERS' : 'VIEW NEW ARRIVALS'}
							<i>
								<FaArrowRightLong />
							</i>
						</div>
						<div className="loader"></div>
					</NewArrivalsBtn>
				</div>
			</section>

			<h3 className="mx-[auto] my-[20px] text-[clamp(18px,4vw,24px)] font-thin">
				{isNewArrivals ? 'NEW ARRIVALS' : 'BEST SELLERS'}
			</h3>

			<section className="w-full flex flex-col">
				<div className="flex w-full justify-end p-[10px] bottom_line items-center">
					<p className="text-[clamp(12px,3vw,15px)] mr-[15px]">
						Price: Low - High
					</p>
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

				<div className="flex justify-start mx-[auto] mt-[20px] w-[90%]">
					<BasicPg
						currentPage={page || 1}
						totalPages={pagination?.totalPages}
						changePage={flipPage}
					/>
				</div>

				<div className="w-full flex justify-center mt-[2vh]">
					<MasonryLayout data={products} isLoading={isPending} />
				</div>
			</section>

			<FilterProductDisplay
				ref={modalRef}
				filterHandler={handleFilter}
				reset={resetFilter}
				closeModal={closeModal}
			/>
		</Container>
	);
}

export default Index;
