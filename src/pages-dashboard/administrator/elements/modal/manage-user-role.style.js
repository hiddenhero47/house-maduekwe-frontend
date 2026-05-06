import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(6px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const floatFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const FilterModalWrapper = styled.div`
	width: clamp(320px, 90vw, 480px);
	background: ${({ theme }) => theme.mainBody.container};
	border-radius: 14px;
	padding: 26px;
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	animation: ${fadeIn} 0.18s ease-out;
	color: ${({ theme }) => theme.mainBody?.text};

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

	.section {
		margin-top: 18px;
	}

	.form_control {
		display: flex;
		flex-direction: column;
	}

	.form_note {
		margin: 6px 0 0 8px;
		font-size: 12px;
		color: ${({ theme }) => theme?.mainBody?.sbKitText};
	}

	.role_box {
		padding: 14px;
		border-radius: 10px;
		border: 1px dashed ${({ theme }) => theme.mainBody.line};
		background: ${({ theme }) => theme.mainBody.toolkitBg};

		animation: ${floatFade} 0.25s ease;

		h4 {
			margin-bottom: 10px;
			font-size: 14px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	.actions {
		margin-top: 24px;
		display: flex;
	}
`;

export const ApplyBtn = styled.button`
	padding: 8px 16px;
	border-radius: 6px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	background: ${({ theme }) =>
		theme.mode === 'dark' ? '#f1f1f1' : theme.addToCart.background};

	color: ${({ theme }) =>
		theme.mode === 'dark' ? '#0f0f0f' : theme.formBtn.text};

	position: relative;
	cursor: pointer;

	.content {
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
	}
`;
