import React from 'react';
import { IntroWrapper } from './index.style';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';

function Intro({onstart, onend}) {
	const handleAnimationStart = (e) => {
		// Only trigger when the main wrapper animation starts
		if (e.animationName === 'fadeOutUp') {
			onstart?.();
		}
	};

	const handleAnimationEnd = (e) => {
		// Only trigger when the main wrapper animation ends
		if (e.animationName === 'fadeOutUp') {
			onend?.();
		}
	};

	return (
		<IntroWrapper onAnimationStart={handleAnimationStart} onAnimationEnd={handleAnimationEnd}>
			<svg width="0" height="0">
				<mask id="concave-mask" maskContentUnits="objectBoundingBox">
					<path fill="white" d="M 0 0 L 1 0 L 1 1 A 0.5 0.015 0 0 0 0 1 Z" />
				</mask>
			</svg>
			<div id="introContainer">
				<div id="introBox">
					<VectorIcon width="90%" height="90%" vector={AppLogo} />
				</div>
				<div id="intrText" className="">
					<span className="first">HOUSE</span><span className="second">MADUEKWE</span>
				</div>
			</div>
		</IntroWrapper>
	);
}

export default Intro;
