import styled from 'styled-components';

export const ShipmentSettingsWrapper = styled.div`
	width: 100%;
	max-width: 720px;
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	color: ${({ theme }) => theme?.mainBody?.text};

	.countian {
		margin: 60px auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 10px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 6px;
			line-height: 1.4;
			max-width: 480px;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 22px;
		margin-top: 8px;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 18px;
		border-top: 1px solid ${({ theme }) => theme?.mainBody?.line};

		&:first-child {
			border-top: none;
			padding-top: 0;
		}

		h4 {
			font-size: 15px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
		}

		> .hint {
			font-size: 12px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: -8px;
		}
	}

	.toggle_row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;

		label {
			font-size: 14px;
			font-weight: 600;
			color: ${({ theme }) => theme.mainBody.text};
		}

		.hint {
			font-size: 12px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 3px;
			max-width: 420px;
		}
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;

		@media (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}

	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 12px;

		@media (max-width: 650px) {
			grid-template-columns: 1fr 1fr;
		}

		@media (max-width: 500px) {
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

	position: relative;

	transition: all 0.2s ease-in-out;

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

		svg {
			font-size: 18px;
		}
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}
`;
