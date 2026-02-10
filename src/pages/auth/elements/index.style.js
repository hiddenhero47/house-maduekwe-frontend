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
		padding-top: 40px;
		display: flex;

		@media (max-width: 1000px) {
			padding-top: 25px;
		}
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
			margin-top: 15px;
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

	background-image: ${({ theme }) =>
		theme.mode === 'dark'
			? `
		/* ultra-soft light noise on dark */
		radial-gradient(circle at 33% 41%,
			rgba(255, 255, 255, 0.015) 0%,
			rgba(255, 255, 255, 0.015) 50%,
			rgba(0, 0, 0, 0.01) 50%,
			rgba(0, 0, 0, 0.01) 100%
		),
		radial-gradient(circle at 76% 49%,
			rgba(255, 255, 255, 0.012) 0%,
			rgba(255, 255, 255, 0.012) 50%,
			rgba(0, 0, 0, 0.01) 50%,
			rgba(0, 0, 0, 0.01) 100%
		),
		radial-gradient(circle at 41% 99%,
			rgba(255, 255, 255, 0.01) 0%,
			rgba(255, 255, 255, 0.01) 50%,
			rgba(0, 0, 0, 0.008) 50%,
			rgba(0, 0, 0, 0.008) 100%
		),
		radial-gradient(circle at 66% 27%,
			rgba(255, 255, 255, 0.015) 0%,
			rgba(255, 255, 255, 0.015) 50%,
			rgba(0, 0, 0, 0.01) 50%,
			rgba(0, 0, 0, 0.01) 100%
		),
		linear-gradient(
			180deg,
			${theme.mainBody.container},
			${theme.mainBody.background}
		)
	`
			: `
		/* ultra-soft dark noise on light */
		radial-gradient(circle at 33% 41%,
			rgba(0, 0, 0, 0.015) 0%,
			rgba(0, 0, 0, 0.015) 50%,
			rgba(255, 255, 255, 0.01) 50%,
			rgba(255, 255, 255, 0.01) 100%
		),
		radial-gradient(circle at 76% 49%,
			rgba(0, 0, 0, 0.012) 0%,
			rgba(0, 0, 0, 0.012) 50%,
			rgba(255, 255, 255, 0.01) 50%,
			rgba(255, 255, 255, 0.01) 100%
		),
		radial-gradient(circle at 41% 99%,
			rgba(0, 0, 0, 0.01) 0%,
			rgba(0, 0, 0, 0.01) 50%,
			rgba(255, 255, 255, 0.008) 50%,
			rgba(255, 255, 255, 0.008) 100%
		),
		radial-gradient(circle at 66% 27%,
			rgba(0, 0, 0, 0.015) 0%,
			rgba(0, 0, 0, 0.015) 50%,
			rgba(255, 255, 255, 0.01) 50%,
			rgba(255, 255, 255, 0.01) 100%
		),
		linear-gradient(
			180deg,
			${theme.mainBody.container},
			${theme.mainBody.background}
		)
	`};
`;

export const LeftBox = styled.div`
	width: 43.64%;
	display: flex;
	flex-direction: column;

	@media (max-width: 1000px) {
		width: 100%;
	}
`;

export const MyForm = styled.div`
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
	background-color: ${({ theme }) => theme?.mainBody?.card};

	@media (max-width: 1000px) {
		display: none;
	}
`;
