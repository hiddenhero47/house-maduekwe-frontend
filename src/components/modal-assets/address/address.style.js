import styled from 'styled-components';

export const ModalWrapper = styled.div`
	width: clamp(300px, 90vw, 450px);
	height: fit-content;
	min-height: 200px;
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	padding-inline: 25px;
	padding-block: 20px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		h3 {
			font-size: 18px;
			font-weight: 600;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 5px;
			max-width: 320px;
		}

		.closeBtn {
			font-size: 22px;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}
`;

export const MyForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-bottom: 20px;
	margin-top: 10px;

	.Form_error {
		font-size: 10px;
	}

	.section {
		margin-top: 15px;

		h4 {
			font-size: 15px;
			font-weight: 600;
			margin-bottom: 10px;
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	.grid-2 {
		display: flex;
		gap: 10px;
		@media (max-width: 420px) {
			flex-wrap: wrap;
		}
	}

	.form_control {
		width: 100%;
		display: flex;
		flex-direction: column;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 14px;
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
`;

export const DefaultToggle = styled.div`
	margin-top: 20px;
	padding: 12px;
	border-radius: 10px;
	background: ${({ theme }) =>
		theme.mode === 'dark' ? theme.mainBody.toolkitBg : theme.mainBody.card};
	border: 1px solid ${({ theme }) => theme.mainBody.cardLine};
	display: flex;
	justify-content: space-between;
	align-items: center;

	strong {
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 12px;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 42px;
		height: 22px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		inset: 0;
		background-color: ${({ theme }) =>
			theme.mode === 'dark' ? theme.mainBody.card : theme.mainBody.cardSbLine};
		transition: 0.3s;
		border-radius: 30px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		left: 3px;
		top: 3px;
		background-color: white;
		transition: 0.3s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: ${({ theme }) => theme.intro.logo};
	}

	input:checked + .slider:before {
		transform: translateX(20px);
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
		font-size: 0.87rem;
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
