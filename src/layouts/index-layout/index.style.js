import styled from 'styled-components';

export const LayoutWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 66px 1fr;
`;

export const Navigation = styled.nav`
	width: 100%;
	height: 66px;
	position: relative;

	#containerNav {
		width: 100%;
		height: 64px;
		padding-inline: clamp(10px, 2vw, 20px);
		position: fixed;
		border-bottom: 1.9px solid ${({ theme }) => theme?.mainBody.line};
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme?.mainBody.text};
		background-color: ${({ theme }) => theme?.mainBody.background};
		z-index: 50;
	}

	#navTitle,#menuWrapper,#cartWrapper {
		animation-duration: 0.5s;
		display: ${(props) => !props.$aftermath && "none"};
	}

	#navTitle {
		font-family: 'Exo_2Bold', sans-serif;
		font-weight: 900;
		color: ${({ theme }) => theme?.mainBody.text};
	}

	button {
		color: ${({ theme }) => theme?.mainBody.text};
		position: relative;
		z-index: 2;
	}

	/* ===================== */
	/* 🔹 Shared Line Styles */
	/* ===================== */
	#line1,
	#line2 {
		position: relative;
		height: 1.5px;
		width: 100%;
		display: flex;
		gap: 4px;
		overflow: hidden;

		div {
			background: ${({ theme }) => theme?.mainBody.text};
			border-radius: 9999px;
			transform: scaleX(0);
			opacity: 0;
			transition: all 0.45s cubic-bezier(0.65, 0, 0.35, 1);
		}

		#grow {
			flex-grow: 1;
			transform-origin: left;
		}

		#small {
			width: 15%;
			transform-origin: right;
		}
	}

	/* ===================== */
	/* 🔹 Hover Animations */
	/* ===================== */

	#menuWrapper:hover #line1 div,
	#cartWrapper:hover #line2 div {
		transform: scaleX(1);
		opacity: 1;
	}

	/* Subtle stagger for elegance */
	#menuWrapper:hover #line1 #growth {
		transition-delay: 0.05s;
	}

	#cartWrapper:hover #line2 #growth {
		transition-delay: 0.05s;
	}
`;
