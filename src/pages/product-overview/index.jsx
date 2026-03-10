import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	List,
	CrumbLink,
	ItemSection,
	SliderWrapper,
	SideImage,
	Image,
	AlsoLike,
} from './elements/index.style';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ModalSlider from '../../components/sliders/modal-slider/index';
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from 'react-icons/hi2';
import { LuFullscreen } from 'react-icons/lu';
import { items } from '../../dummyData/shopItems';
import Details from './elements/details';
import ShopItem from '../../components/shop-item-display-unit/index';
import ShopItemServices from '../../features/services/custom-hooks/shop-items';

function Index() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data, isPending } = ShopItemServices.getOne(id);
	const { data: product = {} } = data || {};
	const { data: related, isPending: isLoadingRelated } =
		ShopItemServices.getRelated(id, 4);

	const [index, setIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [attribute, configAttribute] = useState({
		currentDisplay: null,
		currentSize: null,
		currentColor: null,
	});

	const productDisplay = useMemo(() => {
		if (!product) return [];

		if (Array.isArray(attribute.currentDisplay)) {
			return attribute.currentDisplay;
		}

		const catalog = product.imageCatalog || [];
		const placeHolder = product.placeHolder;
		return [
			...catalog.filter((img) => img === placeHolder),
			...catalog.filter((img) => img !== placeHolder),
		];
	}, [attribute.currentDisplay, product]);

	// ↔️ Slide navigation
	const slideOn = (value) => {
		const newIndex = value + index;
		if (newIndex >= 0 && newIndex < productDisplay.length) setIndex(newIndex);
	};

	const sideImages = useMemo(() => {
		const data = product?.imageCatalog || [];
		const shuffled = [...data].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 2);
	}, [product]);

	const alsoLikeData = Array(4).fill({ ...items[0] });

	return (
		<Container className="Y_scroll_style">
			<nav aria-label="Breadcrumb" className="w-100px">
				<List role="list">
					{product?.category && (
						<li className=" flex items-center text-[14px]">
							<CrumbLink type='button' onClick={() => navigate('/products')}>
								{product?.category?.name}
							</CrumbLink>
							<i className="flex items-center text-[15px] text-[var(--mainBody-sbText)]">
								<IoIosArrowForward />
							</i>
						</li>
					)}

					{product?.subCategory && (
						<li className=" flex items-center text-[14px]">
							<CrumbLink type='button' onClick={() => navigate('/products')}>
								{product?.subCategory}
							</CrumbLink>
							<i className="flex items-center text-[15px] text-[var(--mainBody-sbText)]">
								<IoIosArrowForward />
							</i>
						</li>
					)}

					{product?.name && (
						<li className=" flex items-center text-[14px]">
							<CrumbLink type='button' className="inactive" onClick={() => navigate('/products')}>
								{product?.name}
							</CrumbLink>
						</li>
					)}
				</List>
			</nav>

			<ItemSection>
				<div id="imageDisplay" className="flex flex-col items-center -intro-x">
					<SliderWrapper>
						<button id="fullScale">
							<i>
								<LuFullscreen />
							</i>
						</button>

						<button onClick={() => slideOn(-1)} id="arrowsLeft">
							<i>
								<HiMiniArrowSmallLeft />
							</i>
						</button>

						<button onClick={() => slideOn(1)} id="arrowsRight">
							<i>
								<HiMiniArrowSmallRight />
							</i>
						</button>

						<ModalSlider currentIndex={index}>
							{productDisplay.map((image, i) => (
								<div key={i} className="imageHolder">
									<Image
										src={image?.url}
										alt="Error"
										onLoad={(e) => {
											const img = e.currentTarget;
											const ratio = img.naturalWidth / img.naturalHeight;
											const position = ratio < 0.8 ? 'top' : 'center';
											img.style.objectPosition = position;
										}}
									/>
								</div>
							))}
						</ModalSlider>

						<div id="imageNavigation">
							{productDisplay.map((image, i) => (
								<button
									key={i}
									className={`thumb ${i === index ? 'active imageHolder' : 'imageHolder'}`}
									onClick={() => slideOn(i - index)}
								>
									<img src={image?.url} alt="Error" />
								</button>
							))}
						</div>
					</SliderWrapper>

					<SideImage>
						{/* If fewer than 1 → hide all */}
						{sideImages.length >= 1 && (
							<div className="aspect-square w-[49%] cubicle">
								<div className="imageHolder rounded-[inherit]">
									<Image
										src={sideImages[0]?.url}
										alt="Error"
										onLoad={(e) => {
											const img = e.currentTarget;
											const ratio = img.naturalWidth / img.naturalHeight;
											const position = ratio < 0.8 ? 'top' : 'center';
											img.style.objectPosition = position;
										}}
									/>
								</div>
							</div>
						)}

						{/* Only show this if 2 images exist */}
						{sideImages.length >= 2 && (
							<div className="aspect-square w-[49%] cubicle">
								<div className="imageHolder rounded-[inherit]">
									<Image
										src={sideImages[1]?.url}
										alt="Error"
										onLoad={(e) => {
											const img = e.currentTarget;
											const ratio = img.naturalWidth / img.naturalHeight;
											const position = ratio < 0.8 ? 'top' : 'center';
											img.style.objectPosition = position;
										}}
									/>
								</div>
							</div>
						)}
					</SideImage>
				</div>

				<div id="details" className="intro-x">
					<Details
						product={product}
						attribute={attribute}
						configAttribute={configAttribute}
						setIndex={setIndex}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
				</div>
			</ItemSection>

			<AlsoLike>
				<h3 id="mightLikeTitle" className="text-[var(--mainBody-text)]">
					you might also like
				</h3>

				<div id="alsoLike">
					{alsoLikeData.map((x, i) => (
						<div key={i} className="cubicle">
							<ShopItem
								isLoading={false}
								product={x}
								width="100%"
								height="100%"
							/>
						</div>
					))}
				</div>
			</AlsoLike>
		</Container>
	);
}

export default Index;
