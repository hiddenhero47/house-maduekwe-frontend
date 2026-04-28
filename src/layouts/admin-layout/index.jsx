import React, { useState, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import {
	LayoutWrapper,
	MenuSide,
	Wrapper,
	Page,
	MenuModal,
	DashboardNavBar,
} from './index.style';
import Modal from '../../components/modal/index_modal';
import { RiMenuUnfold2Line } from 'react-icons/ri';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FaCloudMoon } from 'react-icons/fa6';
import { toggleTheme } from '../../store/slice/app-theme';
import { VectorIcon } from '../../components/icon-components/index.style';
import profile from '../../assets/images/profile1.svg?react';
import SideMenu from './sub-components/dashboard-menu';
import { RiHome2Fill } from 'react-icons/ri';
import TwoFaModal from '../../components/modal-assets/2fa-modal/index';
import { ensureRole } from '../../store/slice/auth';
import { roleType } from '../../utilities/app-const';

function DashboardLayout() {
	const { theme } = useSelector((state) => state.themes);
	const { user } = useSelector((state) => state.auth);
	const [menuIsActive, setMenuIsActive] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (typeof document !== 'undefined') {
		document.body?.setAttribute('data-theme', theme);
	}

	const layoutRef = useRef(null);
	const MenuRef = useRef(null);

	const mobileQuery = '900px';
	const isMobile = () =>
		window.matchMedia(`(max-width: ${mobileQuery})`).matches;

	// Open the modal
	const openSidebar = () => {
		if (MenuRef.current) {
			MenuRef.current.open();
		}
	};
	// Close the modal
	const closeSidebar = () => {
		if (MenuRef.current) {
			MenuRef.current.close();
		}
	};

	const toggleSidebar = () => {
		if (isMobile()) {
			openSidebar();
			return;
		}
		setMenuIsActive(!menuIsActive);
	};

	(() => {
		dispatch(
			ensureRole(
				[roleType.ADMIN, roleType.SUPER_ADMIN], // ✅ allowed roles must be an array
				() => {},
				() => navigate('/')
			)
		);
	})();

	const showRole = (u) => {
		const { role, email } = u;
		if (!role || !email) return 'unauthorized';
		const roleDisplays = {
			[roleType.ADMIN]: role,
			[roleType.SUPER_ADMIN]: role,
		};
		return roleDisplays[role] ?? 'unauthorized';
	};
	return (
		<ThemeProvider theme={{ mode: theme, ...colors[theme] }}>
			<ScrollToTop />
			<LayoutWrapper ref={layoutRef} $mobileQuery={mobileQuery}>
				<MenuSide
					$isActive={Boolean(menuIsActive)}
					style={{ transitionBehavior: 'allow-discrete' }}
					onAnimationStart={closeSidebar}
					$mobileQuery={mobileQuery}
				>
					<div
						className="-intro-x"
						style={{ transitionBehavior: 'allow-discrete' }}
						onAnimationStart={closeSidebar}
						id="side_menu_container"
					>
						<SideMenu close={() => isMobile() && closeSidebar()} />
					</div>
				</MenuSide>
				<Wrapper $mobileQuery={mobileQuery}>
					<nav>
						<DashboardNavBar>
							<div>
								<button onClick={toggleSidebar}>
									{menuIsActive ? <RiMenuUnfold2Line /> : <RiMenuUnfoldLine />}
								</button>
								<div className="flex items-center h-full intro-x">
									<button id="back_to_home" onClick={() => navigate('/')}>
										<i>
											<RiHome2Fill />
										</i>
									</button>

									<button
										className="theme_logo"
										onClick={() => dispatch(toggleTheme())}
									>
										<i className="text-[19px] text-[var(--menu-icon)] theme_line_up">
											{theme === 'light' ? (
												<FaCloudMoon />
											) : (
												<BsFillCloudSunFill />
											)}
										</i>
									</button>
									<div id="passport">
										{/* <MdPerson2 size="85%" /> */}
										<VectorIcon width="100%" height="100%" vector={profile} />
									</div>
									<div className="flex flex-col ml-[8px] font-sans">
										<span className="text-[13px] text-[var(--mainBody-text)]">
											{user?.name || "Error"}
										</span>
										<span className="text-[11px] text-[var(--mainBody-kitTextDark)]">
											{showRole(user)}
										</span>
									</div>
								</div>
							</div>
						</DashboardNavBar>
					</nav>
					<Page>
						<Outlet />
					</Page>
				</Wrapper>
			</LayoutWrapper>
			<Modal.Left
				height="fit-content"
				width="clamp(260px, 31vw, 280px)"
				minWidth="clamp(270px, 35%, 280px)"
				marginOffset="15px"
				onClose={() => {}}
				onOpen={() => {}}
				refName={MenuRef}
				animation={true}
			>
				<MenuModal>
					<SideMenu close={() => isMobile() && closeSidebar()} />
				</MenuModal>
			</Modal.Left>
			<TwoFaModal />
		</ThemeProvider>
	);
}

export default DashboardLayout;
