import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 20px;

	#myVideoPlayer {
		width: 100%;
		aspect-ratio: 1.8;
		max-height: calc(100vh - 64px);
		display: flex;
		position: relative;

		@supports not (aspect-ratio: 1.8) {
			width: 90vmin;
			height: 50vmin;
		}
	}

	#accessories {
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 20px;
		margin-bottom: 20px;
		padding: 5px;
		z-index: 2;
		border-radius: 10px;
		background-color: rgb(0, 0, 0, 0.4);

		span {
			color: ${({ theme }) => theme?.intro.sbText};
		}
	}

	#introBox {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: clamp(22.5px, 5vw, 50px);
		aspect-ratio: 1 / 1;
		border: 2px solid ${({ theme }) => theme?.intro.boxBorder};
		border-radius: 5px;
		background: ${({ theme }) => theme?.intro.boxBg};
		box-shadow: 0 0 25px ${({ theme }) => theme?.intro.boxShadow};

		svg path {
			fill: ${({ theme }) => theme?.intro.logo};
		}

		@supports not (aspect-ratio: 1 / 1) {
			width: 20vmin;
			height: 20vmin;
		}
	}
`;

export const IntroSection = styled.section`
	margin-top: 30px;
	margin-inline: auto;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-bottom: 10px;
	border-bottom: 1px solid ${({ theme }) => theme?.mainBody.line};
	gap: 20px;

	@media (min-width: 741px) and (max-width: 1189px) {
		width: 90%;
	}

	@media (min-width: 701px) and (max-width: 740px) {
		width: 90%;
		justify-content: center;
		padding-bottom: 20px;

		div:first-child {
			align-items: center;
		}
	}

	@media (min-width: 531px) and (max-width: 700px) {
		width: 90%;
	}

	@media (max-width: 530px) {
		width: 90%;
		justify-content: center;
		padding-bottom: 20px;
		gap: 10px;

		div:first-child {
			align-items: center;
		}
	}

	p {
		font-family: 'Inter';

		@media (max-width: 700px) {
			font-size: 18px;
		}
	}

	#authBtn {
		width: fit-content;
		font-family: 'Inter';
		font-size: 16px;
		font-weight: 400;
		line-height: 45px;
		position: relative;
		text-transform: uppercase;
		letter-spacing: 0;
		transition: width ease-in-out;
		transition: all 280ms ease-in-out;
		text-align: center;
		color: ${({ theme }) => theme?.intro.logo};

		@media (max-width: 700px) {
			font-size: 10px;
			line-height: 35px;
		}

		&:hover {
			letter-spacing: 3px;
		}

		&:after,
		&:before {
			content: ' ';
			backface-visibility: hidden;
			border: 1px solid ${({ theme }) => theme?.intro.logoGlass};
			bottom: 0px;
			display: block;
			margin: 0 auto;
			margin-left: -8px;
			position: relative;
			transition: all 280ms ease-in-out;
			width: 0;
		}

		&:hover:after,
		&:hover:before {
			backface-visibility: hidden;
			border-color: ${({ theme }) => theme?.intro.logo};
			transition: width 350ms ease-in-out;
			width: calc(100% + 16px);
		}

		&:hover:before {
			bottom: auto;
			top: 0;
		}
	}

	#galleryBtn {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 5px;
		padding-inline: 8px;
		padding-block: 10px;
		border-radius: 5px;
		background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
		border: 1px solid ${({ theme }) => theme?.mainBody.toolkitActive};
		font-family: 'Inter';
		transition: all 350ms ease-in-out;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;

		@media (max-width: 700px) {
			padding-block: 2px;
		}

		span {
			font-size: 16px;
			font-weight: 600;
			transition:
				color 350ms ease-in-out,
				transform 350ms ease-in-out;

			@media (max-width: 700px) {
				font-size: 10px;
			}
		}

		i {
			font-size: 20px;
			display: flex;
			align-items: center;
			transition:
				transform 350ms ease-in-out,
				color 350ms ease-in-out;

			@media (max-width: 700px) {
				font-size: 12px;
			}
		}

		&:hover span:first-child {
			transform: translateX(3px);
			color: ${({ theme }) => theme?.intro.logo};
		}

		&:hover span:last-child {
			transform: translateX(5px);
			color: ${({ theme }) => theme?.intro.logo};
		}

		&:hover i {
			transform: translateX(6px);
			color: ${({ theme }) => theme?.intro.logo};
		}
	}
`;

export const ContainerSection = styled.section`
	width: 97%;
	display: flex;
	flex-wrap: wrap;
	border-radius: 10px;
	margin-inline: auto;

	/* .style_container {
		border: 1px solid ${({ theme }) => theme?.mainBody.line};
		background-color: ${({ theme }) => theme?.mainBody.container};
		border-radius: 10px;
	} */
`;
