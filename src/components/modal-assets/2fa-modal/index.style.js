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