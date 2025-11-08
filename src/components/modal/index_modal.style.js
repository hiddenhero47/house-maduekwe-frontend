import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0.7;
  }
`;

export const LeftDialog = styled.dialog`
	width: 100%;
	height: 100%;
	margin: auto;
	position: fixed;
	z-index: 500;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	overflow-y: auto;
	animation: ${({ open }) => (open ? fadeIn : fadeOut)} 0.35s ease forwards;

	&[open] {
		display: flex;
	}

	&::-webkit-scrollbar {
		width: 0px;
		height: 3px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgb(166, 171, 183, 0.7);
		border-radius: 40px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
`;

export const LeftShell = styled.div`
	background-color: transparent;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	overflow-x: hidden;
	visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
	border: 0px solid transparent;
	margin-left: ${(props) => `calc(0px + ${props.$marginOffset || "0px"})`};
	margin-block: auto;
	border: 0 solid transparent;

	/* animate when $animation is enabled */
	${({ $animation, $isOpen }) =>
		$animation &&
		css`
			animation: ${$isOpen ? slideIn : slideOut} 0.5s ease forwards;
			visibility: ${$isOpen ? 'visible' : 'hidden'};
		`}
`;

export const CenterDialog = styled.dialog`
	width: 100%;
	height: 100%;
	margin: auto;
	position: fixed;
	z-index: 500;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	overflow-y: auto;

	&[open] {
		display: flex;
	}

	&::-webkit-scrollbar {
		width: 0px;
		height: 3px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgb(166, 171, 183, 0.7);
		border-radius: 40px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
`;

export const CenterShell = styled.div`
	background-color: transparent;
	padding-block: ${(props) => props.$borderPaddingY || '40px'};
	width: ${(props) => props.width};
	max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : 'unset')};
	overflow-x: hidden;
	visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
	border: 0px solid transparent;
	margin: auto;
	/* margin-top: 15vh; */

	@media (max-width: ${(props) => props.$mediaQuery || '500px'}) {
		width: ${(props) => (props.$queryWidth ? props.$queryWidth : props.width)};
	}
`;

export const BottomDialog = styled.dialog`
	width: 100%;
	height: 100%;
	margin: auto;
	position: fixed;
	z-index: 500;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	overflow-y: auto;

	&[open] {
		display: flex;
	}

	&::-webkit-scrollbar {
		width: 0px;
		height: 3px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgb(166, 171, 183, 0.7);
		border-radius: 40px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
`;

export const BottomShell = styled.div`
	background-color: transparent;
	padding-block: ${(props) => props.$borderPaddingY || '40px'};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	overflow-x: hidden;
	visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
	border: 0px solid transparent;
	margin: auto;
	/* margin-top: 70vh; */
	margin-bottom: 6vh;

	/* transform: ${(props) =>
		props.$animation
			? props.$isOpen
				? 'translate3d(0, 0, 0)'
				: 'translate3d(0, 600px, 0)'
			: 'unset'};
	transition: transform 0.6s;
	transition-timing-function: ease; */
`;
