import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	max-width: 400px;
	margin: auto;
	padding-bottom: 15px;
	padding-top: 5px;

	.Form_error {
		font-size: 10px;
	}

	.header {
		text-align: center;
		margin-bottom: 15px;

		h3 {
			font-size: 1.3rem;
			font-weight: 700;
			color: ${({ theme }) => theme?.mainBody?.text};
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme?.mainBody?.sbText};
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form_control {
		width: 100%;
		display: flex;
		flex-direction: column;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 12px;
			font-weight: 600;
			margin-left: 6px;
			margin-bottom: 4px;
		}

		&:focus-within {
			label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}

	#forgot_password {
		align-self: flex-end;
		font-size: 12.5px;
		color: ${({ theme }) => theme?.intro?.logo};
	}

	.divider {
		display: flex;
		align-items: center;
		margin-block: 13px;

		div {
			flex: 1;
			height: 1px;
			background: ${({ theme }) => theme?.mainBody?.cardLine};
		}

		span {
			padding-inline: 14px;
			font-size: 13px;
			color: ${({ theme }) => theme?.mainBody?.sbText};
		}
	}

	.socials {
		display: flex;
		flex-direction: column;
		gap: 10px;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			padding: 11.5px;
			border-radius: 8px;
			font-weight: 500;
			font-size: 0.9rem;
			transition: all 0.2s ease;
			background-color: ${({ theme }) =>
				theme.mode === 'dark' ? '#d9d9d9' : '#e6e6e6'};
			position: relative;
			overflow: hidden;

			&:hover {
				transform: translateY(-1px);
				background-color: ${({ theme }) =>
					theme.mode === 'dark' ? '#bfbfbf' : '#cccccc'};
			}
		}

		.google_overlay {
			position: absolute;
			inset: 0;
			opacity: 0;

			& > div {
				width: 100% !important;
				height: 100% !important;
			}

			iframe {
				width: 100% !important;
				height: 100% !important;
				cursor: pointer !important;
			}
		}
	}

	.footer_text {
		display: block;
		text-align: center;
		margin-top: 15px;
		font-size: 12.5px;
		color: ${({ theme }) => theme?.mainBody?.sbText};

		a {
			color: ${({ theme }) => theme?.intro?.logo};
			font-weight: 600;
		}
	}
`;

export const SubmitBtn = styled.button`
	padding-block: 13px;
	padding-inline: 12px;
	width: 100%;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.addToCart?.disabledBg
			: theme?.addToCart?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	color: ${({ theme }) => theme?.addToCart?.text};
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: translateY(-1px);
		color: ${({ theme }) => theme.addToCart.text};
		background-color: ${({ theme }) => theme?.addToCart?.bgActive};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 0.8rem;
		font-weight: 600;
		font-family: Inter;

		svg {
			font-size: 20px;
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
