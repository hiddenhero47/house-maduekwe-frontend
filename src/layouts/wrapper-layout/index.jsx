import React, { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import { LayoutWrapper } from './index.style';
import TwoFaModal from "../../components/modal-assets/2fa-modal/index";

function WrapperLayout() {
	const { theme } = useSelector((state) => state.themes);
	
	if (typeof document !== 'undefined') {
		document.body?.setAttribute('data-theme', theme);
	}

	const layoutRef = useRef(null);

	return (
		<ThemeProvider theme={{ mode: theme, ...colors[theme] }}>
			<ScrollToTop />
			<LayoutWrapper ref={layoutRef}>
				<Outlet />
				<TwoFaModal />
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default WrapperLayout;
