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
} from './elements/index.style';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ModalSlider from '../../components/sliders/modal-slider/index';
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from 'react-icons/hi2';
import { LuFullscreen } from 'react-icons/lu';
import { items } from '../../dummyData/shopItems';
import Details from "./elements/details";

function Index() {
	const product = items[0];
	const { id } = useParams();

	const [index, setIndex] = useState(0);
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

	const getImagePosition = (image) => {
		if (!image?.width || !image?.height) return 'center';
		const ratio = image.width / image.height;
		// Square-ish (0.8 to 1.25)
		if (ratio > 0.8 && ratio < 1.25) return 'center';
		// Tall or wide rectangle → top gives better visual
		return 'top';
	};

	return (
		<Container>
			<nav aria-label="Breadcrumb" className="w-100px">
				<List role="list">
					<li className=" flex items-center text-[14px]">
						<CrumbLink as={Link} to="/men">
							Men
						</CrumbLink>
						<i className="flex items-center text-[15px] text-[var(--mainBody-sbText)]">
							<IoIosArrowForward />
						</i>
					</li>

					<li className=" flex items-center text-[14px]">
						<CrumbLink as={Link} to="/men/clothing">
							Clothing
						</CrumbLink>
						<i className="flex items-center text-[15px] text-[var(--mainBody-sbText)]">
							<IoIosArrowForward />
						</i>
					</li>

					<li className=" flex items-center text-[14px]">
						<CrumbLink
							className="inactive"
							as={Link}
							to="/men/clothing/basic-tee"
						>
							Basic Tee 6-Pack
						</CrumbLink>
					</li>
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
										$position={getImagePosition(image?.url)}
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
						<div className="aspect-square w-[49%] cubicle">
							<div className="imageHolder rounded-[inherit]">
								<Image
									src={productDisplay[1]?.url}
									alt="Error"
									$position={getImagePosition(productDisplay[1]?.url)}
								/>
							</div>
						</div>

						<div className="aspect-square w-[49%] cubicle">
							<div className="imageHolder rounded-[inherit]">
								<Image
									src={productDisplay[2]?.url}
									alt="Error"
									$position={getImagePosition(productDisplay[2]?.url)}
								/>
							</div>
						</div>
					</SideImage>
				</div>

				<div id="details" className='intro-x'>
					<Details
						product={product}
						attribute={attribute}
						configAttribute={configAttribute}
					/>
				</div>
			</ItemSection>
		</Container>
	);
}

export default Index;
