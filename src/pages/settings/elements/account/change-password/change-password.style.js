import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ChangePasswordWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
	animation: ${fadeIn} 0.4s ease;

	.form_control {
		width: 100%;
		max-width: 450px;
		min-width: 150px;
		display: flex;
		flex-direction: column;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 0.873rem;
			font-weight: 600;
			margin-bottom: 8px;
			margin-left: 8px;
		}

		&:focus-within {
			label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}

	.Form_error {
		font-size: 12px;
		font-family: Inter;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 10px;

		h3 {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 16px;
			font-weight: 600;
			color: ${({ theme }) => theme.mainBody.text};
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}

	.helper {
		font-size: 12.5px;
        color: ${({ theme }) =>
			theme.mode === 'dark' ? theme?.form?.violetM : theme?.form?.blue};
		margin-bottom: 6px;
	}
`;

export const SaveBtn = styled.button`
	padding-block: 7px;
	padding-inline: 20px;
	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 6px;
	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};

	background: ${({ theme }) => theme.mainBody.toolkitBg};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition:
		background-color 0.2s ease,
		transform 0.15s ease,
		box-shadow 0.15s ease,
		border-color 0.2s ease;

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 14px;
		font-weight: 600;
		font-family: Inter;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	&:hover:not(:disabled) {
		background-color: ${({ theme }) => theme.filterBtn.hoverBg};
		transform: translateY(-1px);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.6;
	}

	@media (max-width: 500px) {
		padding: 6px 15px;

		.content {
			gap: 4px;
			font-size: 12.5px;
		}
	}
`;
