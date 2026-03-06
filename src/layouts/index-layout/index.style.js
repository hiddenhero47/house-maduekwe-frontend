import styled, {keyframes, css} from 'styled-components';

export const LayoutWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 64px 1fr;
`;

export const Navigation = styled.nav`
	width: 100%;
	height: 64px;
	position: relative;

	#containerNav {
		width: 100%;
		height: 64px;
		padding-inline: clamp(10px, 2vw, 20px);
		position: fixed;
		border-bottom: 1.5px solid ${({ theme }) => theme?.mainBody.line};
		display: flex;
		align-items: center;
		color: ${({ theme }) => theme?.mainBody.text};
		background-color: ${({ theme }) => theme?.mainBody.container};
		z-index: 50;
	}

	#navTitle,
	#menuWrapper,
	#cartWrapper {
		animation-duration: 0.5s;
		display: ${(props) => !props.$aftermath && 'none'};
	}

	#navTitle {
		font-family: 'Audiowide', sans-serif;
		font-weight: 600;
		font-size: clamp(19px, 2vw, 23px);
		color: ${({ theme }) => theme?.mainBody.text};

		@media (max-width: 500px) {
			font-size: clamp(16px, 1.5vw, 23px);
		}
	}

	button {
		color: ${({ theme }) => theme?.mainBody.text};
		position: relative;
		z-index: 2;
		font-weight: lighter;

		@media (max-width: 500px) {
			font-size: 14px;

			i {
				font-size: 16px;
			}
		}
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

export const ToolBar = styled.button`
	position: fixed;
	aspect-ratio: 1 / 1;
	max-width: 50px;
	z-index: 5;
	margin: 20px;
	right: ${({ $transitionX }) => $transitionX || '0px'};
	top: ${({ $transitionY }) => $transitionY || '50%'};
	transform: ${({ $transitionY }) =>
		$transitionY ? 'translateY(0)' : 'translateY(calc(-50% + 20px))'};
	font-size: 20px;
	padding: 14px;
	background-color: ${({theme}) => theme?.intro.logo};
	color: #ffff;
	border-radius: 9999px;

	@supports not (aspect-ratio: 1 / 1) {
		width: 5.5556vmin;
		height: 5.5556vmin;
	}
`;

const shake = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

export const CartBtn = styled.button`
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      i svg {
        animation: ${bounce} 0.6s ease-in-out infinite;
        transform-origin: center;
      }
    `}
`;
