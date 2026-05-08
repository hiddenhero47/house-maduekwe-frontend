import React, { useState, useEffect } from 'react';
import {
	Container,
	IntroSection,
	BannerImage,
	Promotion,
	AppFooter,
	LoaderWrapper,
	Loader,
} from './elements/index.style';
import { useOutletContext } from 'react-router-dom';
import postImage from '../../assets/images/image.avif';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
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
import bannerImage from '../../assets/images/brand-name.svg';
import GroupDisplay from './elements/group-display/group-display';
import { useNavigate } from 'react-router-dom';
import MyVideo from './elements/video-display/video';
import { preloadVideo } from '../../utilities/basic-functions';
import ItemGroupServices from '../../features/services/custom-hooks/item-groups';

function Index() {
	const { aftermath } = useOutletContext();
	const theme = useTheme();
	const navigate = useNavigate();
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [isVideoReadyB, setIsVideoReadyB] = useState(false);

	const { data, isPending } = ItemGroupServices.get({
		limit: 4,
		page: 1,
	});

	const { data: itemGroups = [], pagination } = data || {};

	const videoOne = 'https://vjs.zencdn.net/v/oceans.mp4';
	const videoTwo = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';

	useEffect(() => {
		Promise.all([preloadVideo(videoOne), preloadVideo(videoTwo)]).then(() => {
			setIsVideoReady(true);
			setIsVideoReadyB(true);
		});
	}, []);

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
					{isVideoReady && (
						<MyVideo
							videoSrc={videoOne}
							isPreloaded
							autoPlay
							onStartNoSound
							autoReplay
							scrubberDisplay={false}
							timeDisplay={false}
							useMuteOnly
						/>
					)}

					{!isVideoReady && (
						<div className="imageHolder">
							<img src={postImage} alt="No Image" />
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

			<Promotion onClick={() => navigate('/products/')}>
				<div className="w-full h-full relative rounded-[inherit]">
					{/* <div className="imageHolder rounded-[inherit]">
						<img src={postImage} alt="No Image" />
					</div> */}
					<MyVideo
						videoSrc={videoTwo}
						isPreloaded
						autoPlay
						onStartNoSound
						autoReplay
						scrubberDisplay={false}
						timeDisplay={false}
						useMuteOnly
						isLoading={!isVideoReadyB}
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
