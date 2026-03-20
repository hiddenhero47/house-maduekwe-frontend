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
	background: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	animation: ${fadeIn} 0.18s ease-out;

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
			max-width: 380px;
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
				transform: rotate(90deg);
			}
		}
	}

	.crater_wrapper {
		display: flex;
		gap: 20px;

		@media (max-width: 970px) {
			flex-direction: column;
		}
	}

	.craters {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.form_box {
		display: flex;
		gap: 10px;

		@media (max-width: 468px) {
			flex-wrap: wrap;
		}
	}

	.form_control {
		width: 100%;
		min-width: 150px;
		display: flex;
		flex-direction: column;

		label {
			margin: 0 0 8px 8px;
			font-size: 0.875rem;
			font-weight: 600;
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: 0.15s ease;
		}

		&:focus-within label {
			color: ${({ theme }) => theme?.mainBody?.text};
		}
	}

	.form_note {
		margin: 6px 0 0 8px;
		font-size: 12px;
		color: ${({ theme }) => theme?.mainBody?.sbKitText};
	}

	.section {
		margin-top: 18px;

		h4 {
			margin-bottom: 10px;
			font-size: 14px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	.actions {
		display: flex;
		gap: 10px;
		margin-top: 24px;

		button {
			flex: 1;
			padding: 11px 16px;
			border: none;
			border-radius: 8px;
			font-size: 14px;
			font-weight: 600;
			cursor: pointer;
			transition: 0.18s ease;
		}

		.reset_btn {
			background: ${({ theme }) => theme.filterBtn.background};
			color: ${({ theme }) => theme.filterBtn.text};

			&:hover {
				background: ${({ theme }) => theme.filterBtn.hoverBg};
			}
		}

		.apply_btn {
			background: ${({ theme }) =>
				theme.mode === 'dark' ? '#f1f1f1' : theme.addToCart.background};

			color: ${({ theme }) =>
				theme.mode === 'dark' ? '#0f0f0f' : theme.formBtn.text};

			&:hover {
				background: ${({ theme }) =>
					theme.mode === 'dark' ? '#d9d9d9' : theme.addToCart.hoverBg};
			}
		}
	}
`;