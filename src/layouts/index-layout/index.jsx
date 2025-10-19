import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import { LayoutWrapper, Navigation } from './index.style';
import Intro from '../app-intros/intro';
import { useLocation } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FaCartShopping } from 'react-icons/fa6';

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);

	if (typeof document !== 'undefined') {
		document.body?.setAttribute('data-theme', theme);
	}

	const location = useLocation();

	const showIntro = location.pathname === '/';

	const [aftermath, setAftermath] = useState(!showIntro);
	const [useIntro, setUseIntro] = useState(showIntro);

	const configAftermath = () => {
		setTimeout(() => {
			setAftermath(true);
		}, 1010);
	};

	const configUseIntro = () => {
		setUseIntro(false);
	};

	console.log(aftermath);

	return (
		<ThemeProvider theme={colors[theme]}>
			<ScrollToTop />
			{useIntro && (
				<header className="w-full h-full absolute">
					<Intro
						onstart={() => configAftermath()}
						onend={() => configUseIntro()}
					/>
				</header>
			)}
			<LayoutWrapper>
				<Navigation $aftermath={aftermath}>
					<div id="containerNav">
						<div id="menuWrapper" className="flex flex-col w-fit gap-[3px] -intro-x">
							<button
								id="myMenu"
								className="flex items-center text-[18px] gap-[5px]"
							>
								<i className="text-[22px]">
									<HiMenuAlt3 />
								</i>
								<span>Menu</span>
							</button>

							<div id="line1" className="h-[1.5px] w-full flex gap-[4px]">
								<div id="grow" />
								<div id="small" />
							</div>
						</div>

						<h3 id="navTitle" className="mx-[auto] text-[30px] intro-y">
							SHOWCASE
						</h3>

						<div id="cartWrapper" className="flex flex-col w-fit gap-[3px] intro-x">
							<button
								id="myCart"
								className="flex items-center text-[18px] gap-[5px]"
							>
								<span>Cart</span>
								<i className="text-[20px]">
									<FaCartShopping />
								</i>
							</button>

							<div id="line2" className="h-[1.5px] w-full flex gap-[4px]">
								<div id="grow" />
								<div id="small" />
							</div>
						</div>
					</div>
				</Navigation>

				<Outlet context={{ aftermath }} />
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default IndexLayout;
