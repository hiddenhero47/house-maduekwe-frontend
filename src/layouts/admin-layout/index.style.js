import styled from 'styled-components';

export const LayoutWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	gap: 1%;
	background-color: ${({ theme }) => theme?.mainBody?.background};
	color: ${({ theme }) => theme?.mainBody?.text};

	@media (max-width: ${({ $mobileQuery }) => $mobileQuery}) {
		gap: 0px;
	}
`;

export const MenuSide = styled.aside`
	width: ${(props) => (props.$isActive ? 'clamp(260px, 28vw, 280px)' : '0px')};
	padding-block: ${(props) => (props.$isActive ? '15px' : '0px')};
	padding-left: ${(props) => (props.$isActive ? '15px' : '0px')};
	transition: all 0.2s;
	transition-timing-function: ease-in-out;

	#side_menu_container {
		width: ${({ $isActive }) => ($isActive ? '100%' : '0px')};
		height: 100%;
		border-radius: 15px;
		background-color: ${({ theme }) => theme?.mainBody?.container};
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
		display: ${(props) => (props.$isActive ? 'flex' : 'none')};
		transition: all 0.2s;
		transition-timing-function: ease-in-out;

		* {
			display: ${({ $isActive }) => ($isActive ? '' : 'none')};
		}

		@media (max-width: ${({ $mobileQuery }) => $mobileQuery}) {
			display: none;
			* {
				display: none;
			}
		}
	}

	@media (max-width: ${({ $mobileQuery }) => $mobileQuery}) {
		width: 0px;
		padding: 0px;
	}
`;

export const MenuModal = styled.aside`
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	display: flex;
`;

export const Wrapper = styled.div`
	flex-grow: 1;
	flex-basis: 0;
	height: 100vh;
	padding-top: 15px;
	padding-right: 25px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	transition: all 0.4s;
	transition-timing-function: ease-in-out;

	@media (max-width: ${({ $mobileQuery }) => $mobileQuery}) {
		padding-inline: clamp(10px, 2vw, 15px);
	}

	& > nav {
		width: 100%;
		min-height: 50px;
		border-radius: 15px;
		background-color: ${({ theme }) => theme?.mainBody?.container};
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	}
`;

export const Page = styled.div`
	width: 100%;
	flex-grow: 1;
	flex-basis: 0;
	border-radius: 15px 15px 0px 0px;
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	padding-top: 15px;
	padding-inline: clamp(15px, 3%, 30px);
`;

export const DashboardNavBar = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	& > div {
		width: 100%;
		height: 100%;
		padding-inline: 25px;
		padding-block: 10px;
		display: flex;
		align-items: center;
	}

	/* top row (controls) */
	& > div:first-child {
		justify-content: space-between;
		/* border-bottom: 1px solid ${({ theme }) => theme.mainBody.cardSbLine}; */
	}

	/* menu toggle */
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		color: ${({ theme }) => theme.menu.icon};
		cursor: pointer;
		transition:
			transform 0.2s ease,
			color 0.2s ease;

		&:hover {
			color: ${({ theme }) => theme.intro.logo};
		}
	}

	#back_to_home {
		border-radius: 9999px;
		background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
		padding: 5px;
		margin-right: 15px;
		font-size: 18px;

		&:hover {
			color: ${({ theme }) => theme.intro.logo};
		}
	}

	#toggleBtn {
		color: ${({ theme }) => theme.mainBody.sbText};
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: ${({ theme }) => theme.intro.logo};
		}
	}

	.theme_logo {
		border-radius: 9999px;
		background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
		padding: 5px;
		margin-right: 15px;

		&:hover, i:hover {
			color: ${({ theme }) => theme.intro.logo};
		}
	}

	.theme_line_up {
		opacity: 0.85;

		svg {
			transform: translateY(-2.5px);
		}
	}

	/* profile */
	#passport {
		height: 85%;
		aspect-ratio: 1 / 1;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		transition: all 0.25s ease;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	span {
		/* letter-spacing: 0.3px; */
		line-height: 16px;
		font-weight: 400;
	}
`;
