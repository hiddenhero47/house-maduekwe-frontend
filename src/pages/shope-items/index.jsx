import React, { useState } from 'react';
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
} from 'react-router-dom';
import MasonryLayout from './elements/masonry-layout';
import BasicPg from '../../components/table_components/pagination/basicPg';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';

function Index() {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const { category, minPrice, maxPrice, attributes, keyWord } = useParams();
	const page = Number(new URLSearchParams(location.search).get('page')) || 1;

	const isProducts = useMatch('/products');
	const isNewArrivals = useMatch('/products/new-arrivals');

	const { data, isPending } = ShopItemServices.get({
		page: page,
		limit: 100,
		category: category || '',
		attributes: attributes || '',
		classTags: keyWord || '',
		minPrice: minPrice || '',
		maxPrice: maxPrice || '',
	});

	const { data: products = [], pagination } = data || {};

	const resetFilter = () => {
		navigate({
			pathname: location.pathname,
			search: '',
		});
	};

	const flipPage = (p) => {
		const params = new URLSearchParams(location.search);
		params.set('page', p);

		navigate({
			pathname: location.pathname,
			search: params.toString(),
		});
	};
	return (
		<Container className="Y_scroll_style">
			<section id='headerBox' className="w-full mt-[30px] rounded-[8px] relative">
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
					<p className="text-[clamp(12px,3vw,15px)] mr-[15px]">Price: Low - High</p>
					<FilterBtn>
						<div className="content">Filter</div>
						<div className="loader"></div>
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
					<MasonryLayout data={products} />
				</div>
			</section>
		</Container>
	);
}

export default Index;
