import React from 'react';
import {
	Container,
	IntroSection,
	ContainerSection,
	AppFooter,
} from './elements/index.style';
import { useOutletContext } from 'react-router-dom';
import postImage from '../../assets/images/image.avif';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { items } from '../../dummyData/shopItems';
import ShopItem from '../../components/shop-item-display-unit/index';
import {
	FaInstagram,
	FaXTwitter,
	FaFacebookF,
	FaTiktok,
} from 'react-icons/fa6';
import { useTheme } from 'styled-components';
import {
	FooterBgD,
	FooterBgL,
} from '../../components/icon-components/backgrounds';
import { Skeleton } from '../../components/loaders/skeleton/skeleton.style';

function Index() {
	const { aftermath } = useOutletContext();
	const theme = useTheme();
	return (
		<Container className="Y_scroll_style">
			<div id="myVideoPlayer">
				<div className="w-full h-full">
					<div className="imageHolder">
						<img src={postImage} alt="No Image" />
					</div>
				</div>

				{aftermath && (
					<div id="accessories" className="-intro-x">
						<div id="introBox">
							<VectorIcon width="100%" height="100%" vector={AppLogo} />
						</div>
					</div>
				)}
			</div>

			<IntroSection className="intro-y">
				<div className="flex flex-col gap-[10px]">
					<div className="flex flex-col gap-[5px] text-[24px] font-semibold">
						<p className="text-[var(--mainBody-sbText)]">
							Step Into House Maduekwe
						</p>
						<p className="text-[var(--mainBody-text)]">
							Where Fashion Dreams Unfold.
						</p>
					</div>
					<Link to="/authentication" id="authBtn">
						Step In
					</Link>
				</div>

				<Link to="/products" id="galleryBtn">
					<div>
						<span className="text-[var(--mainBody-sbText)]">
							Explore more option
						</span>{' '}
						<span className="text-[var(--intro-logo)]">in our gallery</span>
					</div>
					<i className="text-[var(--mainBody-sbText)]">
						<IoIosArrowForward />
					</i>
				</Link>
			</IntroSection>

			<ContainerSection className="intro-y mt-[15vh]">
				<ShopItem
					isLoading={false}
					product={items[0]}
					width="350px"
					height="400px"
				/>
			</ContainerSection>

			{/* <Skeleton
				height="300px"
				width="500px"
				$color1="var(--skeleton-background1)"
				$color2="var(--skeleton-background2)"
			/> */}

			<AppFooter>
				<div id="footer_background">
					{theme.mode === 'dark' ? (
						<FooterBgD width="100%" height="100%" />
					) : (
						<FooterBgL width="100%" height="100%" />
					)}
				</div>
				<div id="inner_wrapper">
					<div id="list_info">
						<Link to="/about-us" className="font-sans">
							About
						</Link>

						<a
							href="https://substack.com"
							target="_blank"
							rel="noreferrer"
							className="font-sans"
						>
							Blog
						</a>

						<Link to="/about-us" className="font-sans">
							Terms and Condition
						</Link>

						<Link to="/about-us" className="font-sans">
							Privacy Policy
						</Link>

						<a
							href="mailto:support@housemaduekwe.com"
							target="_blank"
							rel="noreferrer"
							className="font-sans"
						>
							Email Us
						</a>
					</div>

					<div className="flex justify-center items-center gap-[20px] text-[22px] mx-[auto]">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaInstagram />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaXTwitter />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaFacebookF />
						</a>
						<a
							href="https://tiktok.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaTiktok />
						</a>
					</div>

					<p className="font-sans">
						© 2025 House Maduekwe, Inc. All rights reserved.
					</p>
				</div>
			</AppFooter>
		</Container>
	);
}

export default Index;
