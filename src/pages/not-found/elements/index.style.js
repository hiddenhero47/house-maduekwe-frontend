import styled from 'styled-components';

export const Container = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: clamp(20px, 4vw, 40px);
	overflow-y: auto;
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

export const Content = styled.div`
	width: min(600px, 100%);
	padding: clamp(30px, 4vw, 50px);
	border-radius: 22px;

	background: ${({ theme }) => theme.mainBody.card};
	border: 1px solid ${({ theme }) => theme.mainBody.line};

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	box-shadow: 0 25px 70px rgba(0, 0, 0, 0.08);

	@media (max-width: 600px) {
		padding: 30px 20px;
	}
`;

export const IconWrapper = styled.div`
	width: 110px;
	height: 110px;

	border-radius: 50%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: ${({ theme }) => theme.form.orange};
	color: white;

	font-size: 62px;

	margin-bottom: 22px;

	box-shadow: 0 15px 35px rgba(255, 164, 22, 0.3);
`;

export const ErrorCode = styled.h1`
	font-size: clamp(58px, 9vw, 90px);
	font-weight: 800;
	line-height: 1;
	color: ${({ theme }) => theme.mainBody.text};

	margin: 0;
`;

export const Title = styled.h2`
	margin-top: 14px;

	font-size: clamp(24px, 3vw, 34px);
	font-weight: 700;

	color: ${({ theme }) => theme.mainBody.text};
`;

export const Description = styled.p`
	max-width: 470px;

	margin-top: 16px;

	font-size: 15px;
	line-height: 1.8;

	color: ${({ theme }) => theme.mainBody.sbText};
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: 14px;

	margin-top: 35px;

	@media (max-width: 500px) {
		width: 100%;
		flex-direction: column;
	}
`;

const Button = styled.button`
	height: 48px;

	padding: 0 24px;

	border-radius: 999px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	font-size: 14px;
	font-weight: 600;

	cursor: pointer;

	transition: all 0.25s ease;

	svg {
		font-size: 18px;
	}

	@media (max-width: 500px) {
		width: 100%;
	}
`;

export const PrimaryBtn = styled(Button)`
	border: none;

	background: ${({ theme }) => theme.basicBtn.bgActive};
	color: ${({ theme }) => theme.basicBtn.textActive};

	&:hover {
		transform: translateY(-2px);
	}
`;

export const SecondaryBtn = styled(Button)`
	background: transparent;

	border: 1px solid ${({ theme }) => theme.mainBody.line};

	color: ${({ theme }) => theme.mainBody.text};

	&:hover {
		background: ${({ theme }) => theme.basicBtn.background};
	}
`;
