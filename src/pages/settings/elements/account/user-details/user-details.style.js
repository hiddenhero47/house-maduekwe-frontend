import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const UserDetailsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
	animation: ${fadeUp} 0.4s ease;

	#btn_dashboard {
		display: flex;
		align-items: center;
		gap: 8px;

		padding: 6px 14px;
		border-radius: 999px;

		font-size: 13px;
		font-weight: 500;

		color: ${({ theme }) => theme.mainBody.sbText};
		background: ${({ theme }) => theme.mainBody.card};

		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		cursor: pointer;

		transition:
			background 0.2s ease,
			color 0.2s ease,
			transform 0.15s ease,
			box-shadow 0.15s ease;

		svg {
			font-size: 14px;
			color: ${({ theme }) => theme.mainBody.sbText};
			transition:
				transform 0.2s ease,
				color 0.2s ease;
		}

		span {
			white-space: nowrap;
		}

		&:hover {
			background: ${({ theme }) => theme.mainBody.toolkitBg};
			color: ${({ theme }) => theme.mainBody.text};
			transform: translateY(-1px);
			/* box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08); */

			svg:last-child {
				transform: translateX(3px);
				color: ${({ theme }) => theme.mainBody.text};
			}
		}

		&:active {
			transform: translateY(0);
			box-shadow: none;
		}
	}
`;

export const DetailsList = styled.ul`
	display: flex;
	flex-direction: column;
`;

export const DetailsItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18px 24px;
	border-bottom: 1px solid var(--mainBody-line);

	.list_content:first-child {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.list_content:last-child {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.text};
		display: flex;
		/* justify-content: flex-end; */
		width: clamp(160px, 50%, 220px);
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const SaveBtn = styled.button`
	padding-block: 7px;
	padding-inline: 16px;
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
		padding: 6px 10px;

		.content {
			gap: 4px;
			font-size: 12.5px;
		}
	}
`;
