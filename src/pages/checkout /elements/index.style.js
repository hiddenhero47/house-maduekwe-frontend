import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 32px;
	height: 100%;
	overflow-y: auto;
	padding: 32px clamp(12px, 4%, 48px);

	color: ${({ theme }) => theme.mainBody.text};
	background: ${({ theme }) => theme.mainBody.background};

	.left_side {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 1;
		max-width: 700px;
	}
`;

export const Card = styled.div`
	background: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	border-radius: 8px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const ProviderRow = styled.div`
	display: flex;
	gap: 16px;
	align-items: flex-end;
	flex-wrap: wrap;

	.form_control {
		flex: 1;
		min-width: 250px;
		max-width: 400px;
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
`;

export const PaymentArea = styled.div`
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	padding: 20px;
	background: ${({ theme }) => theme.mode === "dark"
		? "rgba(255,255,255,0.02)"
		: "rgba(0,0,0,0.02)"};

	min-height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const SaveBtn = styled.button`
	padding-block: 8px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.addToCart?.background
			: theme?.addToCart?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.addToCart?.text};

	&:hover {
		transform: translateY(-1px);
		color: ${({ theme }) => theme.addToCart.text};
		background-color: ${({ theme }) => theme.addToCart.hoverBg};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 600;
		font-family: Inter;
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