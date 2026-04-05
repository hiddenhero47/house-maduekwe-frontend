import styled from 'styled-components';

export const DeleteWrapper = styled.div`
	width: clamp(300px, 90vw, 400px);
	background: ${({ theme }) => theme.mainBody.container};
	border-radius: 16px;
	padding: 28px;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 14px;
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);

	.icon {
		width: 54px;
		height: 54px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;

		background: rgba(255, 0, 0, 0.08);

		svg {
			font-size: 24px;
			color: #ff4d4f;
		}
	}

	h3 {
		font-size: 18px;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 13px;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 320px;
		line-height: 1.4;
	}
`;

export const Actions = styled.div`
	display: flex;
	width: 100%;
	gap: 10px;
	margin-top: 10px;

	button {
		flex: 1;
		padding: 12px;
		border-radius: 10px;
		font-weight: 600;
		font-size: 13px;
		transition: 0.2s ease;
	}

	.cancel {
		background: ${({ theme }) => theme.basicBtn.background};
		color: ${({ theme }) => theme.basicBtn.text};

		&:hover {
			background: ${({ theme }) => theme.basicBtn.bgActive};
			color: ${({ theme }) => theme.basicBtn.textActive};
		}
	}

	.delete {
		background: #ff4d4f;
		color: #fff;

		&:hover {
			background: #d9363e;
		}
	}
`;
