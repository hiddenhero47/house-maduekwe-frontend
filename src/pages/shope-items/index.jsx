import React, { useState } from 'react';
import { Container, FilterBtn, NewArrivalsBtn } from './elements/index.style';
import {
	ProductHeaderBgD,
	ProductHeaderBgL,
} from '../../components/icon-components/backgrounds';
import { useTheme } from 'styled-components';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useParams, useMatch, useNavigate } from 'react-router-dom';

function Index() {
	const theme = useTheme();
	const navigate = useNavigate();

	const { category, minPrice, maxPrice, attributes, page, keyWord } =
		useParams();
	const isProducts = useMatch('/products');
	const isNewArrivals = useMatch('/products/new-arrivals');

	const limit = 10;

	const resetFilter = () => {};

	return (
		<Container className="Y_scroll_style">
			<section className="w-full h-[50vh] mt-[30px] rounded-[8px] relative">
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
							navigate(isNewArrivals ? '/products' : '/products/new-arrivals');
							resetFilter();
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

			<h3 className="mx-[auto] my-[20px] text-[24px] font-thin intro-y">
				{isNewArrivals ? 'NEW ARRIVALS' : 'BEST SELLERS'}
			</h3>

			<section className="w-full flex flex-col">
				<div className="flex w-full justify-end p-[10px] bottom_line items-center">
					<p className="text-[15px] mr-[15px]">Price: Low - High</p>
					<FilterBtn>
						<div className="content">Filter</div>
						<div className="loader"></div>
					</FilterBtn>
				</div>

				<div></div>
			</section>
		</Container>
	);
}

export default Index;
