import React from 'react';
import { IntroWrapper } from './index.style';
import { VectorIcon } from '../../../components/icon-components/index.style';
import AppLogo from '../../../assets/images/app-logo.svg?react';

function Intro() {
	return (
		<IntroWrapper>
			<div id="introContainer">
				<div id="introBox">
					<VectorIcon width={90} height={90} vector={AppLogo} />
				</div>
				<div id="intrText" className="text-[20px]">
					<span class="first">HOUSE</span><span class="second">MADUEKWE</span>
				</div>
			</div>
		</IntroWrapper>
	);
}

export default Intro;
