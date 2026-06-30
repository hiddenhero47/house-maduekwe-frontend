import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import { LayoutWrapper, Navigation, CartBtn } from './index.style';
import Intro from '../app-intros/intro';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FaCartShopping } from 'react-icons/fa6';
import Modal from '../../components/modal/index_modal';
import LeftMenu from './sub-components/app-menu';
import ToolBar from './sub-components/holding-tool-bar';
import Holding from './sub-components/holding';
import TwoFaModal from '../../components/modal-assets/2fa-modal/index';
import { startDrag, endDrag, resetDrag } from '../../store/slice/drag-board';
import { openMenu } from '../../store/slice/holding';
import CartServices from '../../features/services/custom-hooks/cart';

// shop-item

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);
	const { holdings, show } = useSelector((state) => state.holdings);
	const { data, dragType, dragEnd } = useSelector((state) => state.dragBoard);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { mutate: addToCart, isPending } = CartServices.add();

	const {
		data: cartCount = {},
		isPending: loading,
		isSuccess,
	} = CartServices.getCount();

	const { count = 0 } = cartCount;

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

	useEffect(() => {
		const isValidData =
			data && typeof data === 'object' && Object.keys(data).length > 0;

		if (dragType === 'shop-item' && dragEnd && isValidData) {
			addToCart({ itemList: [data] });
			dispatch(resetDrag());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		const path = location.pathname;
		if (
			!path.startsWith('/authentication') &&
			!path.startsWith('/reset-password')
		) {
			sessionStorage.setItem('lastRoute', path);
		}
	}, [location.pathname]);

	const isExcluded = () => {
		const list = ['/checkout/:orderId', '/success'];
		if (!list.length) return false;
		return list.some((route) =>
			matchPath({ path: route, end: true }, location.pathname)
		);
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
							<CartBtn
								id="myCart"
								className="flex items-center text-[17px] gap-[5px]"
								onClick={() => navigate('/my-cart')}
								$isLoading={isPending}
								$pulse={loading && isSuccess}
							>
								<span>Cart</span>
								<i className="text-[20px]">
									<FaCartShopping />
								</i>

								{count > 0 && (
									<span className="cart_badge">
										{count > 99 ? '99+' : count}
									</span>
								)}
							</CartBtn>

							<div id="line2" className="h-[1.5px] w-full flex gap-[4px]">
								<div id="grow" />
								<div id="small" />
							</div>
						</div>
					</div>
				</Navigation>

				<Outlet context={{ aftermath }} />

				{!!holdings.length && show && !isExcluded() && (
					<ToolBar
						layoutRef={layoutRef}
						nos={holdings.length}
						openHoldings={() => dispatch(openMenu('display'))}
					/>
				)}
			</LayoutWrapper>

			<Modal.Left
				height="fit-content"
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

			<Holding />

			<TwoFaModal />
		</ThemeProvider>
	);
}

export default IndexLayout;
