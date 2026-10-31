import React, { useState, useEffect } from 'react';
import {
	Container,
	IntroSection,
	BannerImage,
	Promotion,
	AppFooter,
	LoaderWrapper,
	Loader,
	VideoWrapper,
} from './elements/index.style';
import { useOutletContext } from 'react-router-dom';
import heroPlaceholderLight from '../../assets/images/hero-placeholder-light.jpg';
import heroPlaceholderDark from '../../assets/images/hero-placeholder-dark.jpg';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ShopItem from '../../components/shop-item-display-unit/index';
import {
	FaInstagram,
	FaXTwitter,
	FaTiktok,
} from 'react-icons/fa6';
import { useTheme } from 'styled-components';
import {
	FooterBgD,
	FooterBgL,
} from '../../components/icon-components/backgrounds';
import { Skeleton } from '../../components/loaders/skeleton/skeleton.style';
import bannerImage from '../../assets/images/brand-name.svg';
import GroupDisplay from './elements/group-display/group-display';
import { useNavigate } from 'react-router-dom';
import MyVideo from './elements/video-display/video';
import ItemGroupServices from '../../features/services/custom-hooks/item-groups';
import InfiniteSlider from '../../components/sliders/infinite-slider';
import skylineView from '../../assets/images/slider/skyline-view.jpg';
import portraitFront from '../../assets/images/slider/portrait-front.jpg';
import pensiveClose from '../../assets/images/slider/pensive-close.jpg';
import rootsPalm from '../../assets/images/slider/roots-palm.jpg';
import coolProfile from '../../assets/images/slider/cool-profile.jpg';
import boxingGym from '../../assets/images/slider/boxing-gym.jpg';
import { SOCIAL_LINKS } from '../../utilities/social-links';

// Each slide can carry its own `link` (e.g. `/collections/roots` or a
// specific product page) once real products/collections exist — leave it
// unset until then and it falls back to the generic /products page below.
const heroSlides = [
	{
		id: 'skyline',
		image: skylineView,
		tag: 'Rooftop Edit',
		heading: 'Elevated\nBy Design',
		text: "Tailored pieces photographed above the city — the same precision you'll find in every stitch.",
		cta: 'Explore Collection',
		align: 'left',
		valign: 'end',
		accent: '#7dd3fc',
		link: null,
	},
	{
		id: 'portrait',
		image: portraitFront,
		tag: 'The Standard',
		heading: 'Make An\nEntrance',
		text: 'Bold silhouettes built for presence. No filler, just fit.',
		cta: 'Shop New Arrivals',
		align: 'center',
		valign: 'center',
		accent: '#e5e5e5',
		link: null,
	},
	{
		id: 'pensive',
		image: pensiveClose,
		tag: 'Studio Portrait',
		heading: 'Detail Is\nThe Statement',
		text: "Every graphic, every seam — considered before it's worn.",
		cta: 'View The Pieces',
		align: 'right',
		valign: 'center',
		accent: '#fbbf24',
		link: null,
	},
	{
		id: 'roots',
		image: rootsPalm,
		tag: 'Roots Capsule',
		heading: "Grown From\nWhere We're From",
		text: 'Heritage prints on breathable cotton, built for warm days and long memory.',
		cta: 'Shop Roots',
		align: 'left',
		valign: 'center',
		accent: '#86efac',
		link: null,
	},
	{
		id: 'cool',
		image: coolProfile,
		tag: 'Off Duty',
		heading: 'Easy.\nUnbothered.',
		text: 'Relaxed fits that still know how to show up.',
		cta: 'Explore Lookbook',
		align: 'right',
		valign: 'end',
		accent: '#5eead4',
		link: null,
	},
	{
		id: 'boxing',
		image: boxingGym,
		tag: 'Built To Move',
		heading: 'Train In It.\nLive In It.',
		text: 'Heavyweight cotton that keeps up, round after round.',
		cta: 'Shop Essentials',
		align: 'left',
		valign: 'end',
		accent: '#fb923c',
		link: null,
	},
];

function Index() {
	const { aftermath } = useOutletContext();
	const theme = useTheme();
	const navigate = useNavigate();
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [isVideoReadyB, setIsVideoReadyB] = useState(false);
	const [heroVideoIndex, setHeroVideoIndex] = useState(0);

	const { data, isPending } = ItemGroupServices.get({
		limit: 4,
		page: 1,
	});

	const { data: itemGroups = [], pagination } = data || {};

	// const videoOne = 'https://res.cloudinary.com/ctguffdy/video/upload/v1784499287/VIDEO-ONE_tnrmxn.mp4';
	const videoOne =
		'https://res.cloudinary.com/ctguffdy/video/upload/sp_auto/v1784499287/VIDEO-ONE_tnrmxn.m3u8';
	const videoTwo =
		'https://res.cloudinary.com/ctguffdy/video/upload/sp_auto:maxres_720p/v1793286634/VIDEO-TWO_algvd0.m3u8';

	// Hero plays through these one after another, looping back to the start —
	// add videoThree here once it exists, nothing else needs to change.
	const heroVideos = [videoOne, videoTwo];
	const handleHeroVideoEnded = () =>
		setHeroVideoIndex((i) => (i + 1) % heroVideos.length);

	const normalizeItems = (items) => {
		const count = items.length;

		let target;

		if (count <= 2) target = 2;
		else if (count <= 5) target = count <= 3 ? 2 : 5;
		else target = count <= 7 ? 5 : 8;

		let result = [...items];

		// trim
		if (result.length > target) {
			return result.slice(0, target);
		}

		// duplicate smartly using imageCatalog
		while (result.length < target) {
			const base = result[result.length % items.length];
			const nextImage =
				base.imageCatalog?.length > 0
					? base.imageCatalog[0] // take a new image
					: base.image; // fallback

			base.imageCatalog = base.imageCatalog?.slice(1); // remove used image from catalog
			result.push({
				...base,
				image: nextImage,
			});
		}

		return result;
	};

	const formatItemGroups = (itemGroups = []) => {
		if (!Array.isArray(itemGroups)) return [];

		const cleanedGroups = itemGroups
			.map((group) => {
				if (!group?.shopItems?.length) return null;

				const items = group.shopItems
					.map((item) => {
						if (!item) return null;

						// pick primary image
						const primaryImage = item?.placeHolder?.url
							? {
									url: item.placeHolder.url,
								}
							: item?.imageCatalog?.[0];

						if (!primaryImage?.url) return null;

						// remove selected image from catalog
						const filteredCatalog = (item.imageCatalog || []).filter(
							(img) => img.url !== primaryImage.url
						);

						return {
							_id: item._id,
							name: item.name,
							price: item.price,
							image: primaryImage,
							imageCatalog: filteredCatalog,
						};
					})
					.filter(Boolean);

				if (!items.length) return null;

				return {
					groupName: group.groupName,
					shopItems: normalizeItems(items),
				};
			})
			.filter(Boolean);

		return cleanedGroups.slice(0, 2);
	};

	return (
		<Container className="Y_scroll_style">
			<div id="myVideoPlayer">
				<div className="w-full h-full relative">
					<VideoWrapper $isLoading={!isVideoReady}>
						<MyVideo
							videoSrc={heroVideos[heroVideoIndex]}
							isPreloaded
							autoPlay
							onStartNoSound
							autoReplay={false}
							scrubberDisplay={false}
							timeDisplay={false}
							useMuteOnly
							loadingCallBack={setIsVideoReady}
							onEnded={handleHeroVideoEnded}
						/>
					</VideoWrapper>

					{!isVideoReady && (
						<div className="imageHolder">
							<img
								src={theme.mode === 'dark' ? heroPlaceholderDark : heroPlaceholderLight}
								alt="No Image"
							/>
						</div>
					)}

					{aftermath && (
						<BannerImage id="banner_image" $bannerImage={bannerImage}>
							<div className="banner_grid">
								{[...Array(6)].map((_, i) => (
									<div key={i} className={`tile t${i + 1}`} />
								))}
							</div>
						</BannerImage>
					)}
				</div>

				{aftermath && (
					<div id="accessories" className="-intro-x">
						<div id="introBox">
							<VectorIcon width="80%" height="80%" vector={AppLogo} />
						</div>
					</div>
				)}
			</div>

			<IntroSection>
				<div className="floating_square" />

				<div className="background_shape_1" />

				<div className="intro_content">
					<span className="eyebrow">ATELIER EST. MMXII</span>

					<h1>
						Crafted Elegance.
						<br />
						Tailored Identity.
					</h1>

					<p>
						Discover fashion that blends artistry, craftsmanship, and modern
						sophistication.
					</p>
				</div>

				<div className="intro_actions">
					<Link to="/products" id="galleryBtn">
						Explore Collection
					</Link>

					<Link to="/authentication" id="authBtn">
						Sign In
					</Link>
				</div>
			</IntroSection>

			{isPending ? (
				<LoaderWrapper className="mt-[10vh]">
					<Loader>
						<Skeleton
							height="100%"
							width="100%"
							$color1="var(--skeleton-background1)"
							$color2="var(--skeleton-background2)"
							$borderRadius="10px"
						/>
					</Loader>

					<Loader>
						<Skeleton
							height="100%"
							width="100%"
							$color1="var(--skeleton-background1)"
							$color2="var(--skeleton-background2)"
							$borderRadius="10px"
						/>
					</Loader>
				</LoaderWrapper>
			) : (
				formatItemGroups(itemGroups).map((group, index) => (
					<GroupDisplay
						key={index}
						index={index}
						group={group}
						className="mt-[70px]"
					/>
				))
			)}

			<div className="promotion_header">
				<span>Featured Collection</span>

				<h2>The Art Of Modern Tailoring</h2>
			</div>

			<Promotion>
				<div className="promo_video">
					<div className="w-full h-full relative rounded-[inherit]">
						<VideoWrapper $isLoading={!isVideoReadyB}>
							<MyVideo
								videoSrc={videoOne}
								isPreloaded
								autoPlay
								onStartNoSound
								autoReplay
								scrubberDisplay={false}
								timeDisplay={false}
								useMuteOnly
								loadingCallBack={setIsVideoReadyB}
							/>
						</VideoWrapper>

						{!isVideoReadyB && (
							<Skeleton
								height="100%"
								width="100%"
								className="video_loader"
								$color1="var(--skeleton-background1)"
								$color2="var(--skeleton-background2)"
							/>
						)}
					</div>
				</div>

				<div className="promo_hero">
					<InfiniteSlider
						slides={heroSlides}
						onSlideClick={(slide) => navigate(slide.link || '/products')}
					/>
				</div>
			</Promotion>

			<AppFooter>
				<div id="footer_background">
					{theme.mode === 'dark' ? (
						<FooterBgD width="100%" height="100%" />
					) : (
						<FooterBgL width="100%" height="100%" />
					)}
				</div>
				<div id="inner_wrapper">
					<img src={bannerImage} alt="House Maduekwe" className="footer_mark" />

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

						<Link to="/terms-and-conditions" className="font-sans">
							Terms and Condition
						</Link>

						<Link to="/privacy-policy" className="font-sans">
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

					<div className="footer_divider" />

					<div className="footer_socials flex justify-center items-center gap-[14px] mx-[auto]">
						<a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
							<FaInstagram />
						</a>
						<a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">
							<FaXTwitter />
						</a>
						<a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer">
							<FaTiktok />
						</a>
					</div>

					<p className="font-sans">
						© 2026 <span className="brand_name">House Maduekwe</span>, Inc. All
						rights reserved.
					</p>
				</div>
			</AppFooter>
		</Container>
	);
}

export default Index;
