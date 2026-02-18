import styled from 'styled-components';

export const ModalWrapper = styled.div`
	width: clamp(320px, 90vw, 420px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px 28px 24px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);

	.modal_header {
		display: flex;
		justify-content: flex-end;

		.closeBtn {
			font-size: 24px;
			color: ${({ theme }) => theme.mainBody.sbText};
			transition: 0.2s;

			&:hover {
				color: ${({ theme }) => theme.intro.logo};
				transform: scale(1.05);
			}
		}
	}

	.icon_wrapper {
		margin: 10px auto 18px;
		width: 65px;
		height: 65px;
		border-radius: 50%;
		background: ${({ theme }) => theme?.mainBody?.sbText}15;
		display: flex;
		align-items: center;
		justify-content: center;

		svg {
			font-size: 30px;
			color: ${({ theme }) => theme?.mainBody?.sbText};
		}
	}

	.text_content {
		text-align: center;
		margin-bottom: 20px;

		h3 {
			font-size: 18px;
			font-weight: 600;
			color: ${({ theme }) => theme.mainBody.text};
			margin-bottom: 6px;
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}

	.otp_wrapper {
		margin: 10px 0 5px;
		display: flex;
		justify-content: center;
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
