import styled from 'styled-components';

export const ModalWrapper = styled.div`
	width: clamp(320px, 92vw, 470px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

	animation: fadeIn 0.18s ease-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 10px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			letter-spacing: -0.3px;
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 6px;
			max-width: 380px;
			line-height: 1.4;
		}

		.closeBtn {
			font-size: 22px;
			color: ${({ theme }) => theme.mainBody.sbText};
			cursor: pointer;
			transition: 0.2s ease;

			&:hover {
				color: ${({ theme }) => theme.mainBody.text};
				transform: rotate(90deg);
			}
		}
	}
`;

export const MyForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 22px;
	margin-top: 8px;

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 10px;
		border-top: 1px solid ${({ theme }) => theme?.mainBody?.line};

		&:first-child {
			border-top: none;
			padding-top: 0;
		}
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 10px;

		@media (max-width: 480px) {
			grid-template-columns: 1fr;
		}
	}

	.form_control {
		display: flex;
		flex-direction: column;
		gap: 6px;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			font-size: 13px;
			font-weight: 600;
			letter-spacing: 0.2px;
		}

		&:focus-within label {
			color: ${({ theme }) => theme?.mainBody?.text};
		}
	}
`;

export const SubmitBtn = styled.button`
	padding: 14px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.addToCart?.disabledBg
			: theme?.addToCart?.background};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	color: ${({ theme }) => theme?.addToCart?.text};
	transition: all 0.2s ease-in-out;
	font-weight: 600;
	margin-top: 10px;

	&:hover {
		transform: translateY(-1px);
		background-color: ${({ theme }) => theme?.addToCart?.bgActive};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 0.9rem;
	}
`;
