import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px) scale(0.98);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
`;

const glow = keyframes`
	from {
		box-shadow: 0 0 0 rgba(0,0,0,0);
	}
	to {
		box-shadow: 0 6px 20px rgba(0,0,0,0.08);
	}
`;

export const ModalWrapper = styled.div`
	width: clamp(320px, 92vw, 480px);
	background: ${({ theme }) => theme.mainBody.container};
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	padding: 26px;
	border: 1px solid ${({ theme }) => theme.mainBody.line};

	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	animation: ${fadeIn} 0.2s ease-out;

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 12px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			letter-spacing: -0.3px;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			margin-top: 6px;
			max-width: 360px;
			font-size: 13px;
			line-height: 1.4;
			color: ${({ theme }) => theme.mainBody.sbText};
		}

		.closeBtn {
			font-size: 22px;
			cursor: pointer;
			color: ${({ theme }) => theme.mainBody.sbText};
			transition: 0.2s ease;

			&:hover {
				color: ${({ theme }) => theme.mainBody.text};
				transform: rotate(90deg) scale(1.1);
			}
		}
	}

	/* 🔥 subtle admin badge feel */
	.admin_tag {
		margin-top: 8px;
		font-size: 11px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 999px;
		width: fit-content;

		color: ${({ theme }) => theme.intro.logo};
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	}
`;

export const MyForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 6px;

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 12px;
		border-top: 1px solid ${({ theme }) => theme.mainBody.line};

		&:first-child {
			border-top: none;
			padding-top: 0;
		}
	}

	.form_control {
		display: flex;
		flex-direction: column;
		gap: 6px;

		label {
			font-size: 12.5px;
			font-weight: 600;
			margin-left: 6px;
			color: ${({ theme }) => theme.mainBody.sbText};
			transition: 0.15s ease;
		}

		&:focus-within label {
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	/* 🔥 nice spacing rhythm */
	.form_control + .form_control {
		margin-top: 2px;
	}
`;

export const SubmitBtn = styled.button`
	padding: 13px;
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	background: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme.addToCart.disabledBg
			: theme.addToCart.background};

	color: ${({ theme }) => theme.addToCart.text};

	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	position: relative;

	font-weight: 600;
	margin-top: 8px;

	transition:
		transform 0.15s ease,
		box-shadow 0.15s ease,
		background 0.2s ease;

	&:hover:not(:disabled) {
		transform: translateY(-1px);
		background: ${({ theme }) => theme.addToCart.bgActive};
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
		box-shadow: none;
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-family: Inter;

		svg {
			font-size: 18px;
		}
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
		inset: 0;
		align-items: center;
		justify-content: center;
	}
`;
