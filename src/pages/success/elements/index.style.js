import styled, { keyframes } from 'styled-components';

const pop = keyframes`
	0% {
		transform: scale(0.6);
		opacity: 0;
	}

	60% {
		transform: scale(1.12);
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
`;

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	overflow-y: auto;
	padding-inline: clamp(20px, 4vw, 40px);
	color: ${({ theme }) => theme.mainBody.text};
	background-image: ${({ theme }) => `
    linear-gradient(
			14deg,
			rgba(91, 91, 91, 0.05) 0%,
			rgba(91, 91, 91, 0.05) 25%,
			rgba(242, 242, 242, 0.05) 25%,
			rgba(242, 242, 242, 0.05) 50%,
			rgba(100, 100, 100, 0.05) 50%,
			rgba(100, 100, 100, 0.05) 75%,
			rgba(249, 249, 249, 0.05) 75%,
			rgba(249, 249, 249, 0.05) 100%
		),
		linear-gradient(
			12deg,
			rgba(44, 44, 44, 0.05) 0%,
			rgba(44, 44, 44, 0.05) 25%,
			rgba(41, 41, 41, 0.05) 25%,
			rgba(41, 41, 41, 0.05) 50%,
			rgba(139, 139, 139, 0.05) 50%,
			rgba(139, 139, 139, 0.05) 75%,
			rgba(250, 250, 250, 0.05) 75%,
			rgba(250, 250, 250, 0.05) 100%
		),
		linear-gradient(
			144deg,
			rgba(111, 111, 111, 0.05) 0%,
			rgba(111, 111, 111, 0.05) 25%,
			rgba(205, 205, 205, 0.05) 25%,
			rgba(205, 205, 205, 0.05) 50%,
			rgba(184, 184, 184, 0.05) 50%,
			rgba(184, 184, 184, 0.05) 75%,
			rgba(152, 152, 152, 0.05) 75%,
			rgba(152, 152, 152, 0.05) 100%
		),
		linear-gradient(
			90deg,
			${theme?.mainBody?.container},
			${theme?.mainBody?.background}
		)
    `};
`;

export const Card = styled.div`
	height: 100%;
	width: min(560px, 100%);

	#main_body {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: ${({ theme }) => theme.mainBody.container};
		border: 1px solid ${({ theme }) => theme.mainBody.line};
		border-radius: 22px;
		padding: 45px;
		box-shadow: ${({ theme }) =>
			theme.mode === 'dark'
				? '0 30px 70px rgba(0,0,0,.45)'
				: '0 25px 60px rgba(0,0,0,.08)'};

		@media (min-width: 501) and (max-width: 600px) {
			padding: 28px 22px;
			border-radius: 18px;
		}

        @media (max-width: 500px) {
			padding: 28px 22px;
			border-radius: 18px;
            padding-top: 34px;
		}
	}
`;

export const IconHolder = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 9999px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgb(6, 223, 115, 0.05);
	border: 2px solid rgb(6, 223, 115, 0.5);
	margin-bottom: 25px;
	animation: ${pop} 0.5s ease;

	svg {
		font-size: 60px;
		color: #06df73;
	}

	@media (max-width: 500px) {
		width: 85px;
		height: 85px;

		svg {
			font-size: 50px;
		}
	}
`;

export const Title = styled.h1`
	font-size: clamp(28px, 5vw, 36px);
	font-weight: 700;
	text-align: center;
	margin-bottom: 12px;

	@media (max-width: 500px) {
		font-size: clamp(23px, 5vw, 36px);
	}
`;

export const SubTitle = styled.p`
	font-size: 15px;
	color: ${({ theme }) => theme.mainBody.sbText};
	line-height: 1.8;
	text-align: center;
	max-width: 430px;

	@media (max-width: 500px) {
		font-size: 13px;
		line-height: 1.5;
	}
`;

export const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: ${({ theme }) => theme.mainBody.line};
	margin: 35px 0;
`;

export const Details = styled.div`
	width: 100%;

	h3 {
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 18px;
	}
`;

export const DetailRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	padding: 14px 0;
	border-bottom: 1px solid ${({ theme }) => theme.mainBody.line};
	gap: 5px;

	span {
		color: ${({ theme }) => theme.mainBody.sbText};
		font-size: 14px;
	}

	strong {
		font-size: 15px;
		font-weight: 600;
		color: ${({ theme }) => theme.mainBody.text};
		word-break: break-word;
		/* text-align: right; */
	}

	@media (max-width: 450px) {
		flex-direction: column;
		/* align-items: flex-start; */

		strong {
			/* margin-left: 20px; */
		}
	}
`;

export const OrderBadge = styled.span`
	padding: 7px 14px;
	border-radius: 999px;
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.mainBody.text};
	background: ${({ theme, $guest }) =>
		$guest ? theme.mainBody.toolkitBg : 'rgb(185, 51, 26, 0.05)'};
	border: 1px solid
		${({ theme, $guest }) =>
			$guest ? theme.mainBody.line : 'rgb(185, 51, 26, 0.5)'};

	@media (max-width: 450px) {
		/* margin-left: 20px; */
	}
`;

export const EmailNotice = styled.div`
	width: 100%;
	display: flex;
	gap: 18px;
	margin-top: 35px;
	padding: 18px;
	border-radius: 14px;
	background: rgb(0, 136, 232, 0.05);
	border: 1px solid rgb(0, 136, 232, 0.5);

	.icon {
		flex-shrink: 0;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		background: ${({ theme }) => theme.mainBody.container};

		svg {
			font-size: 26px;
			color: #0088e8;
		}
	}

	.content {
		h4 {
			font-size: 15px;
			font-weight: 600;
			margin-bottom: 8px;
		}

		p {
			font-size: 14px;
			line-height: 1.6;
			color: ${({ theme }) => theme.mainBody.text};
		}

		span {
			display: block;
			margin-top: 8px;
			font-size: 13px;
			line-height: 1.6;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}

	@media (max-width: 500px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 8px;
		padding-top: 10px;
		padding-bottom: 20px;

		.content {
			h4 {
				font-size: 14px;
				margin-bottom: 7px;
			}

			p {
				font-size: 13px;
				line-height: 1.4;
				color: ${({ theme }) => theme.mainBody.text};
			}

			span {
				margin-top: 7px;
				font-size: 12px;
				line-height: 1.4;
			}
		}
	}
`;

export const ButtonGroup = styled.div`
	width: 100%;
	display: flex;
	gap: 14px;

	margin-top: 35px;

	@media (max-width: 550px) {
		flex-direction: column;
	}
`;

export const PrimaryBtn = styled.button`
	flex: 1;
	padding-block: 15px;
	padding-inline: 8px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	background: ${({ theme }) => theme.addToCart.background};
	color: ${({ theme }) => theme.addToCart.text};
	font-size: 14px;
	font-weight: 600;
	transition: 0.25s;

	i {
		display: flex;
		transition: 0.25s;
	}

	&:hover {
		background: ${({ theme }) => theme.addToCart.hoverBg};

		i {
			transform: translateX(5px);
		}
	}
`;

export const SecondaryBtn = styled.button`
	flex: 1;
	padding-block: 15px;
	padding-inline: 8px;
	border-radius: 10px;
	background: transparent;
	color: ${({ theme }) => theme.mainBody.text};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	font-size: 14px;
	font-weight: 600;
	transition: 0.25s;

	&:hover {
		background: ${({ theme }) => theme.mainBody.toolkitBg};
	}
`;
