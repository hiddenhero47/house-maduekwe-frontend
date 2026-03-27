import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: 100%;
	overflow-y: auto;
	padding: 24px;
	padding-bottom: 32px;

	h1 {
		font-size: 1.4rem;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
		letter-spacing: -0.02em;
	}

	.btn {
		align-self: flex-start;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 14px;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 600;
		background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
		color: ${({ theme }) => theme?.mainBody?.text};
		transition: all 0.2s ease;

		svg {
			font-size: 18px;
		}

		&:hover {
			/* background-color: ${({ theme }) => theme?.filterBtn?.hoverBg}; */
			color: ${({ theme }) => theme.intro.logo};
			transform: translateY(-1px);
		}
	}

	#AddBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
		border-radius: 6px;
		background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
		font-size: 22px;
		transition: all 0.2s ease;

		&:hover {
			/* background-color: ${({ theme }) => theme?.filterBtn?.hoverBg}; */
			color: ${({ theme }) => theme.intro.logo};
			transform: scale(1.05);
		}

		@media (max-width: 500px) {
			font-size: 18px;
		}
	}

	#display_body {
		flex-grow: 1;
		flex-basis: 0;
		width: 100%;
		overflow-y: auto;
	}
`;

export const FormNav = styled.nav`
	border-radius: 12px;
	background-color: ${({ theme }) => theme?.mainBody?.background};
	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	padding: 20px 24px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 18px;
	/* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04); */

	p {
		font-size: 0.8rem;
		font-weight: 600;
		color: ${({ theme }) => theme?.mainBody?.sbText};
	}

	form {
		width: 100%;
		display: flex;
		align-items: flex-end;
		gap: 20px;
		flex-wrap: wrap;

		.form_control {
			width: 100%;
			max-width: 390px;
			display: flex;
			flex-direction: column;

			label {
				color: ${({ theme }) => theme?.mainBody?.sbText};
				font-size: 0.75rem;
				font-weight: 600;
				margin-bottom: 6px;
				margin-left: 6px;
			}

			&:focus-within label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}
`;

export const SaveBtn = styled.button`
	padding-block: 6px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.mainBody?.toolkitBg};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.filterBtn?.text};

	&:hover {
		transform: translateY(-1px);
		color: ${({ theme }) => theme.intro.logo};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 0.8rem;
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

export const TableWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const ActionBtn = styled.button`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
	color: ${({ theme }) => theme?.mainBody?.sbText};
	transition: all 0.2s ease;

	svg {
		font-size: 14px;
	}

	&:hover {
		color: ${({ theme }) => theme.intro.logo};
		transform: translateY(-1px);
	}

	&.danger:hover {
		color: #ff4d4f;
	}
`;
