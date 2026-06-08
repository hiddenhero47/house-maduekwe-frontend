import styled from 'styled-components';

export const PageWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;

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

export const ResetCard = styled.div`
	width: 100%;
	max-width: 480px;

	background: ${({ theme }) => theme.mainBody.container};

	border: 1px solid ${({ theme }) => theme.mainBody.line};

	border-radius: 18px;

	padding: 32px;

	backdrop-filter: blur(12px);

	box-shadow: ${({ theme }) =>
		theme.mode === 'dark'
			? '0 20px 60px rgba(0,0,0,.45)'
			: '0 20px 60px rgba(0,0,0,.08)'};

	.header {
		text-align: center;
		margin-bottom: 24px;

		h2 {
			font-size: 28px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			margin-top: 8px;
			font-size: 14px;
			line-height: 1.6;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.form_control {
		display: flex;
		flex-direction: column;

		label {
			font-size: 13px;
			font-weight: 600;
			margin-bottom: 6px;
			margin-left: 6px;
			color: ${({ theme }) => theme.mainBody.sbText};
		}

		&:focus-within label {
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	.footer {
		margin-top: 20px;
		text-align: center;

		a {
			font-size: 13px;
			font-weight: 600;
			color: ${({ theme }) => theme.intro.logo};
		}
	}
`;

export const SubmitBtn = styled.button`
	margin-top: 10px;
	width: 100%;
	padding: 13px;
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	background: ${({ theme }) => theme.addToCart.background};

	color: ${({ theme }) => theme.addToCart.text};

	transition: 0.2s ease;

	&:hover {
		transform: translateY(-1px);
		background: ${({ theme }) => theme.addToCart.bgActive};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 8px;

		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};

		position: absolute;
	}
`;
