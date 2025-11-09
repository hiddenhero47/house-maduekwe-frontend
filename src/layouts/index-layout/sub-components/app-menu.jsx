import React from 'react';
import { MenuWrapper, MenuHeader, UserSection } from './app-menu.style';
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
import { toggleTheme } from '../../../store/slice/app-theme';

function LeftMenu({ closeMe, openHolding }) {
	const { theme } = useSelector((state) => state.themes);
	const dispatch = useDispatch();

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
				<div id="overview">
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
				<div className="w-full flex items-center justify-between mt-[25px]">
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
              {theme === 'light' ? <MdOutlineToggleOff /> : <MdOutlineToggleOn />}
            </button>
				</div>

				{/* Holdings toggle */}
				<div className="w-full flex items-center justify-between mt-[18px]">
            <div className="flex items-center gap-[8px]">
              <i className="text-[19px] text-[var(--menu-icon)]">
                <FaBasketShopping />
              </i>
              
              <span className="text-[13px] font-medium text-[var(--menu-text)]">
                Show Holdings
              </span>
            </div>

            <button
              onClick={openHolding}
              className="text-[25px] text-[var(--intro-logo)] hover:scale-110 active:scale-95 transition-transform"
            >
              <MdOutlineToggleOn />
            </button>
				</div>
			</UserSection>
		</MenuWrapper>
	);
}

LeftMenu.propTypes = {
	closeMe: PropTypes.func,
	openHolding: PropTypes.func,
};

export default LeftMenu;
