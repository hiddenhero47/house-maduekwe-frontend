import React from 'react';
import { Container, IntroSection, ContainerSection } from './elements/index.style';
import { useOutletContext } from 'react-router-dom';
import postImage from '../../assets/images/image.avif';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

function Index() {
	const { aftermath } = useOutletContext();
	return (
		<Container>
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
					<Link to="/" id="authBtn">
						Step In
					</Link>
				</div>

				<Link to="/" id="galleryBtn">
					<div>
						<span className="text-[var(--mainBody-sbText)]">
							Explore more option
						</span>{' '}
						<span className='text-[var(--intro-logo)]'>in our gallery</span>
					</div>
					<i className="text-[var(--mainBody-sbText)]">
						<IoIosArrowForward />
					</i>
				</Link>
			</IntroSection>

			<ContainerSection className='intro-y mt-[15vh]'>
				<div className='w-[50%] h-[70vh] style_container'></div>
			</ContainerSection>
		</Container>
	);
}

export default Index;
