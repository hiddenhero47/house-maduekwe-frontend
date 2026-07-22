import styled from 'styled-components';

export const Container = styled.div`
	height: 100%;
	overflow-y: auto;
	padding-inline: clamp(12px, 3vw, 32px);
	padding-bottom: 40px;
	color: ${({ theme }) => theme.mainBody.text};
`;

export const Hero = styled.div`
	padding-block: clamp(32px, 6vw, 56px);
	text-align: center;
	border-bottom: 1px solid ${({ theme }) => theme.mainBody.line};

	h1 {
		font-size: clamp(32px, 5vw, 48px);
		font-weight: 700;
		margin-bottom: 12px;
		font-family: Audiowide, sans-serif;
	}

	p {
		font-size: 16px;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 620px;
		margin-inline: auto;
		line-height: 1.6;
	}
`;

export const LastUpdated = styled.p`
	margin-top: 12px;
	font-size: 14px !important;
	color: ${({ theme }) => theme.mainBody.sbText} !important;
`;

export const Content = styled.div`
	max-width: 860px;
	margin-inline: auto;
	padding-top: 32px;
	display: flex;
	flex-direction: column;
	gap: 28px;
`;

export const Section = styled.section`
	background: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	border-radius: 14px;
	padding: clamp(20px, 3vw, 28px);

	h2 {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 14px;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 15px;
		line-height: 1.8;
		color: ${({ theme }) => theme.mainBody.sbText};
		margin-bottom: 12px;
	}

	ul {
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	li {
		font-size: 15px;
		line-height: 1.7;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.contact-box {
		margin-top: 16px;
		padding: 18px;
		border-radius: 12px;
		background: ${({ theme }) => theme.mainBody.card};
		border: 1px solid ${({ theme }) => theme.mainBody.cardLine};

		strong {
			display: block;
			margin-bottom: 8px;
			font-size: 16px;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			margin-bottom: 4px;
		}
	}
`;
