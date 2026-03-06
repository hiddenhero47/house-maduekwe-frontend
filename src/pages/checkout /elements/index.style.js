import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* gap: 32px; */
	height: 100%;
	overflow-y: auto;
	padding: 32px clamp(12px, 4%, 48px);

	color: ${({ theme }) => theme.mainBody.text};
	background: ${({ theme }) => theme.mainBody.background};

	#title_small {
		display: none;
	}

	#title_big {
		display: flex;
	}

	#payment_wrapper {
		padding-right: 5px;
	}

	@media (max-width: 1108px) {
		#title_small {
			display: flex;
		}

		#title_big {
			display: none;
		}

		#payment_wrapper {
			padding-right: 0px;
		}
	}

	#main_body {
		width: 100%;
		display: flex;
		flex-wrap: wrap-reverse;
		column-gap: 20px;
		row-gap: 25px;
		margin-inline: auto;
		align-items: start;

		@media (min-width: 1108px) {
			flex: 1;
		}

		@media (min-width: 901px) and (max-width: 1108px) {
			width: 80%;
		}

		@media (min-width: 750px) and (max-width: 900px) {
			width: 90%;
		}
	}

	.main_box {
		max-width: 100%;
		min-width: 500px;
		flex-grow: 1;
		flex-basis: 0;

		@media (max-width: 500px) {
			min-width: 100%;
		}
	}
`;

export const Card = styled.div`
	height: fit-content;
	background: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	border-radius: 8px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const Summary = styled.div`
	background: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	border-radius: 14px;
	padding: 28px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	transition: all 0.3s ease;

	@media (min-width: 1108px) {
		height: 100%;
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.2px;
	}

	.items_count {
		font-size: 13px;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.breakdown {
		background: ${({ theme }) => theme.mainBody.card};
		border: 1px solid ${({ theme }) => theme.mainBody.cardLine};
		border-radius: 10px;
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;

		.label {
			color: ${({ theme }) => theme.mainBody.sbText};
		}

		.value {
			font-weight: 500;
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	.divider {
		height: 1px;
		background: ${({ theme }) => theme.mainBody.line};
	}

	.total_box {
		background: ${({ theme }) =>
			theme.mode === 'dark'
				? theme.showcaseBox.background
				: theme.mainBody.toolkitBg};
		color: ${({ theme }) => theme.mainBody.text};
		border-radius: 10px;
		padding: 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0.3px;
	}

	.secure_note {
		font-size: 12px;
		color: ${({ theme }) => theme.mainBody.sbText};
		text-align: center;
		margin-top: 6px;
	}
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
	background: ${({ theme }) =>
		theme.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};

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

export const PayNowBtn = styled.button`
	padding-block: 12px;
	padding-inline: 16px;
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
	font-weight: 800;

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
		font-size: 15px;
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
