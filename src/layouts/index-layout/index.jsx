import React, { useState, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import { LayoutWrapper, Navigation } from './index.style';
import Intro from '../app-intros/intro';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FaCartShopping } from 'react-icons/fa6';
import Modal from '../../components/modal/index_modal';
import LeftMenu from './sub-components/app-menu';
import ToolBar from './sub-components/holding-tool-bar';
import Holding from "./sub-components/holding";
import TwoFaModal from "../../components/modal-assets/2fa-modal/index";

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);
	const { holdings, show } = useSelector((state) => state.holdings);
	const navigate = useNavigate();

	if (typeof document !== 'undefined') {
		document.body?.setAttribute('data-theme', theme);
	}

	const location = useLocation();

	const showIntro = location.pathname === '/';

	const [aftermath, setAftermath] = useState(!showIntro);
	const [useIntro, setUseIntro] = useState(showIntro);
	const layoutRef = useRef(null);
	const leftMenuRef = useRef(null);
	const modalHoldingRef = useRef(null);

	const configAftermath = () => {
		setTimeout(() => {
			setAftermath(true);
		}, 1010);
	};

	const configUseIntro = () => {
		setUseIntro(false);
	};

	// Open the side menu
	const openModal = () => {
		if (leftMenuRef.current) {
			leftMenuRef.current.open();
		}
	};

	// Close the side menu
	const closeModal = () => {
		if (leftMenuRef.current) {
			leftMenuRef.current.close();
		}
	};

	// Open the modal
	const openHolding = () => {
		console.log('cccc');

		if (modalHoldingRef.current) {
			modalHoldingRef.current.open();
		}
	};

	// Close the modal
	const closeHolding = () => {
		if (modalHoldingRef.current) {
			modalHoldingRef.current.close();
		}
	};

	return (
		<ThemeProvider theme={{ mode: theme, ...colors[theme] }}>
			<ScrollToTop />
			{useIntro && (
				<header className="w-full h-full absolute">
					<Intro
						onstart={() => configAftermath()}
						onend={() => configUseIntro()}
					/>
				</header>
			)}
			<LayoutWrapper ref={layoutRef}>
				<Navigation $aftermath={aftermath}>
					<div id="containerNav">
						<div
							id="menuWrapper"
							className="flex flex-col w-fit gap-[3px] -intro-x"
						>
							<button
								id="myMenu"
								className="flex items-center text-[17px] gap-[5px]"
								onClick={() => openModal()}
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

						<h3 id="navTitle" className="mx-[auto] intro-y">
							HOUSE MADUEKWE
						</h3>

						<div
							id="cartWrapper"
							className="flex flex-col w-fit gap-[3px] intro-x"
						>
							<button
								id="myCart"
								className="flex items-center text-[17px] gap-[5px]"
								onClick={() => navigate('/my-cart')}
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

				{!!holdings.length && show && (
					<ToolBar
						layoutRef={layoutRef}
						nos={holdings.length}
						openHoldings={openHolding}
					/>
				)}
			</LayoutWrapper>

			<Modal.Left
				height="97vh"
				width="clamp(270px, 31vw, 280px)"
				minWidth="clamp(270px, 35%, 280px)"
				marginOffset="clamp(3px, 2%, 15px)"
				onClose={() => {}}
				onOpen={() => {}}
				refName={leftMenuRef}
				animation={true}
			>
				<LeftMenu closeMe={closeModal} />
			</Modal.Left>

			<Modal.Center
				width="fit-content"
				maxWidth="500px"
				onClose={() => {}}
				onOpen={() => {}}
				refName={modalHoldingRef}
				animation={true}
			>
				<Holding close={closeHolding}/>
			</Modal.Center>

			<TwoFaModal />
		</ThemeProvider>
	);
}

export default IndexLayout;
