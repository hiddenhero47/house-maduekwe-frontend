import styled from 'styled-components';

export const GuestCheckoutStage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 24px;

	.Form_error {
		font-size: 10px;
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

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 18px;
		margin-top: 8px;
		border-top: 1px solid ${({ theme }) => theme.mainBody.line};

		h4 {
			font-size: 15px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			margin-bottom: 2px;
		}
	}

	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;

		@media (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		font-size: 0.87rem;
		font-weight: 600;
		font-family: Inter;
		padding-block: 14px; /* py-3 */
		border-radius: 8px; /* rounded-md */
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
			transform: translateY(-1px);
		}

		svg {
			font-size: 17px;
		}
	}

	.btn_anon {
		color: ${({ theme }) => theme?.mainBody?.text};
		background-color: ${({ theme }) => theme?.mainBody?.container};
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	}

	.btn_anon i {
		display: flex;
		transform: rotate(180deg);
	}

	.pending_order {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 14px 16px;
		margin-top: -4px;

		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.form.blue};

		background: ${({ theme }) =>
			theme.mode === 'dark' ? 'rgba(0,136,232,.08)' : 'rgba(0,136,232,.06)'};

		cursor: pointer;
		transition: 0.25s ease;

		&:hover {
			transform: translateY(-1px);
			background: ${({ theme }) =>
				theme.mode === 'dark' ? 'rgba(0,136,232,.13)' : 'rgba(0,136,232,.1)'};
		}

		.pending_order_text {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			text-align: left;
			gap: 3px;

			strong {
				font-size: 14px;
				font-weight: 600;
				color: ${({ theme }) => theme.mainBody.text};
			}

			span {
				font-size: 12px;
				color: ${({ theme }) => theme.mainBody.sbText};
			}
		}

		.arrow {
			font-size: 18px;
			color: ${({ theme }) => theme.form.blue};
			flex-shrink: 0;
			transition: 0.25s ease;
		}

		&:hover .arrow {
			transform: translateX(4px);
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
	border-radius: 8px;
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
		font-size: 0.87rem;
		font-weight: 600;
		font-family: Inter;

		svg {
			font-size: 17px;
		}
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (max-width: 500px) {
		padding-inline: 7px;
		.content {
			gap: 4px;
			font-size: 12px;
		}
	}
`;
