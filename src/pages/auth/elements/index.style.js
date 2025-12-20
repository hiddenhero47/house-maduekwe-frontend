import styled from 'styled-components';

export const LoginWrapper = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 1024px;
	font-family: Hanken Grotesk;
	display: grid;
	grid-template-rows: 1fr 13.5%;
	font-family: Outfit;
	background-color: ${({ theme }) => theme?.mainBody?.background};
	padding-inline: 30px;

	@media (max-width: 1000px) {
		padding-inline: 10px;
	}

	#body {
		width: 100%;
		height: 100%;
		padding-top: 43px;
		display: flex;
	}

	#title {
		display: flex;
		align-items: center;

		svg path {
			fill: ${({ theme }) => theme?.intro.logo};
		}

		div {
			font-size: clamp(8px, 5vw, 11px);
			font-family: ZeroG;
			transform: translateX(-8px);
			color: ${({ theme }) => theme?.mainBody.text};

			span {
				color: ${({ theme }) => theme?.intro.logo};
			}
		}
	}

	#footer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;

		@media (max-width: 1000px) {
			flex-direction: column;
		}

		div:nth-child(1) {
			color: ${({ theme }) => theme?.mainBody.sbText};
			width: 43.64%;
			display: flex;

			@media (max-width: 1000px) {
				width: 100%;

				span {
					padding-bottom: 15px;
					border-bottom: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine};
				}
			}
		}

		div:nth-child(2) {
			color: ${({ theme }) => theme?.mainBody.sbText};
			width: 56.36%;
			display: flex;

			@media (max-width: 1000px) {
				width: 100%;

				span {
					padding-top: 15px;
				}
			}
		}
	}
`;

export const LeftBox = styled.div`
	width: 43.64%;
	display: flex;
	flex-direction: column;

	@media (max-width: 1000px) {
		width: 100%;
	}
`;

export const MyForm = styled.form`
	width: clamp(320px, 95%, 500px);
	min-height: 50vh;
	margin-inline: auto;
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 9px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	padding-block: 15px;
	padding-inline: 20px;
	transition: all 0.5s ease-out;

	&:hover {
		box-shadow: ${({ theme }) =>
			theme.mode === 'dark'
				? `
				10px 15px 0 0 rgba(255, 255, 255, 0.03),
				10px 15px 22px 4px rgba(255, 255, 255, 0.045)
			`
				: `
				10px 15px 0 0 rgba(204, 204, 204, 0.45)
			`};
	}
`;

export const RightBox = styled.div`
	width: 56.36%;
	height: 100%;
	border-radius: 10px;
	background-color: #333;

	@media (max-width: 1000px) {
		display: none;
	}
`;
