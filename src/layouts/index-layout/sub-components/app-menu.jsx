import React from 'react';
import {
	MenuWrapper,
	MenuHeader,
	UserSection,
	MenuSection,
	SocialSection,
} from './app-menu.style';
import PropTypes from 'prop-types';
import { VectorIcon } from '../../../components/icon-components/index.style';
import AppLogo from '../../../assets/images/app-logo.svg?react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FaCloudMoon } from 'react-icons/fa6';
import { MdOutlineToggleOff } from 'react-icons/md';
import { MdOutlineToggleOn } from 'react-icons/md';
import { FaBasketShopping } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { FaShirt } from 'react-icons/fa6';
import { FaArchive } from 'react-icons/fa';
import { BiSolidInfoSquare } from 'react-icons/bi';
import { FaCartShopping } from 'react-icons/fa6';
import { toggleTheme } from '../../../store/slice/app-theme';
import { toggleHoldings } from '../../../store/slice/holding';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { TbHomeFilled } from "react-icons/tb";


function LeftMenu({ closeMe, openHolding }) {
	const { theme } = useSelector((state) => state.themes);
	const { holdings, show } = useSelector((state) => state.holdings);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<MenuWrapper>
			<MenuHeader>
				<div id="title">
					<i>
						<VectorIcon width="50px" height="50px" vector={AppLogo} />
					</i>
					<div>
						House <span>Maduekwe</span>
					</div>
				</div>
				<button id="closeLeftMenuBtn" onClick={closeMe}>
					<IoIosArrowBack />
				</button>
			</MenuHeader>

			<UserSection>
				<div id="overview" onClick={() => {navigate("/settings"); closeMe();}}>
					<div id="avatar">
						<div className="imageHolder"></div>
					</div>

					<div id="client">
						<span>admin</span>
						<span>charles</span>
					</div>

					<span className="ml-auto text-[18px] text-[var(--mainBody-sbText)] my-auto">
						<IoIosArrowForward />
					</span>
				</div>

				{/* Theme toggle */}
				<div className="w-[95%] flex items-center justify-between mt-[25px]">
					<div className="flex items-center gap-[8px]">
						<i className="text-[20px] text-[var(--menu-icon)] theme_line_up">
							{theme === 'light' ? <BsFillCloudSunFill /> : <FaCloudMoon />}
						</i>

						<span className="text-[13px] font-medium text-[var(--menu-text)]">
							{theme === 'light' ? 'Light Theme' : 'Dark Theme'}
						</span>
					</div>

					<button
						onClick={() => dispatch(toggleTheme())}
						className="text-[25px] text-[var(--intro-logo)] hover:scale-110 active:scale-95 transition-transform"
					>
						{theme === 'light' ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
					</button>
				</div>

				{/* Holdings toggle */}
				<div className="w-[95%] flex items-center justify-between mt-[18px]">
					<div className="flex items-center gap-[8px]">
						<i className="text-[19px] text-[var(--menu-icon)]">
							<FaBasketShopping />
						</i>

						<span className="text-[13px] font-medium text-[var(--menu-text)]">
							Show Holdings
						</span>
					</div>

					<button
						onClick={() => dispatch(toggleHoldings())}
						className="text-[25px] text-[var(--intro-logo)] hover:scale-110 active:scale-95 transition-transform"
					>
						{show ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
					</button>
				</div>
			</UserSection>

			<MenuSection>
				<h3>MENU</h3>

				<ul className="Y_scroll_style">
					<li>
						<Link
							to="/products"
							onClick={() => closeMe()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<FaShirt />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)]">
									Fashion Gallery
								</span>
							</div>
						</Link>
					</li>

					<li>
						<Link
							to="/products/new-arrivals"
							onClick={() => closeMe()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<FaArchive />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)]">
									New Arrival
								</span>
							</div>
						</Link>
					</li>

					<li>
						<Link
							to="/about-us"
							onClick={() => closeMe()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<BiSolidInfoSquare />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)]">
									About House Maduekwe
								</span>
							</div>
						</Link>
					</li>

					<li>
						<Link
							to="/my-cart"
							onClick={() => closeMe()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<FaCartShopping />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)]">
									User Cart
								</span>
							</div>
						</Link>
					</li>

					<li>
						<Link
							to="/"
							onClick={() => closeMe()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<TbHomeFilled />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)]">
									Showcase
								</span>
							</div>
						</Link>
					</li>
				</ul>
			</MenuSection>

			<SocialSection>
				<div className="social_wrapper">
					<a href="https://instagram.com" target="_blank" rel="noreferrer">
						<FaInstagram />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noreferrer">
						<FaXTwitter />
					</a>
					<a href="https://facebook.com" target="_blank" rel="noreferrer">
						<FaFacebookF />
					</a>
				</div>

				<div className="footer_text">© 2025 House Maduekwe</div>
			</SocialSection>
		</MenuWrapper>
	);
}

LeftMenu.propTypes = {
	closeMe: PropTypes.func,
	openHolding: PropTypes.func,
};

export default LeftMenu;
