import styled from 'styled-components';

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
	padding-block: ${(props) => props.$borderPaddingY || '40px'};
	width: ${(props) => props.width};
	height: 100%;
	overflow-x: hidden;
	visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
	border: 0px solid transparent;
	margin-left: 0;
	transform: ${(props) =>
		props.$animation
			? props.$isOpen
				? 'translate3d(-600px, 0, 0)'
				: 'translate3d(-600px, 0, 0)'
			: 'unset'};
	transition: all 0.6s;
	transition-timing-function: ease;

	/* @media (min-width: 1440px) {
		margin-right: 0;
		margin-left: 0;
		left: 50%;
		margin-left: calc(-1440px / 2);
	} */
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
