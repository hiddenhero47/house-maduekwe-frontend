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
		display: ${({ $isAdmin }) => ($isAdmin ? 'flex' : 'none')};
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

	#actionWrapper {
		width: clamp(160px, 50%, 220px);
		display: flex;
		margin-right: 24px;
		gap: 10px;
		justify-content: center;
		align-items: center;
		margin-left: ${({ $isAdmin }) => ($isAdmin ? '0' : 'auto')};

		@media (max-width: 500px) {
			margin-left: 0;
		}
	}
`;

export const DetailsList = styled.ul`
	display: flex;
	flex-direction: column;
`;

export const DetailsItem = styled.li`
	display: flex;
	flex-wrap: wrap;
	column-gap: 10px;
	row-gap: 5px;
	align-items: center;
	justify-content: space-between;
	padding: 18px 24px;
	border-bottom: 1px solid var(--mainBody-line);

	& input[type='file'] {
		display: none;
		width: auto;
	}

	.list_content:first-child {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
		min-width: 100px;
	}

	.list_content:last-child {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.text};
		display: flex;
		/* justify-content: flex-end; */
		width: clamp(160px, 50%, 220px);

		@media (max-width: 439px) {
			width: 100%;
		}
	}

	&:last-child {
		border-bottom: none;
	}

	&:has(#avatar) {
		padding: 14px 24px;
	}

	#avatar {
		height: 35px;
		width: 35px;
		border-radius: 3px;
		background-color: ${({theme}) => theme?.basicBtn.bgActive};

		/* svg path {
			fill: ${({theme}) => theme?.basicBtn.textActive};
		} */
	}

	@media (max-width: 439px) {
		padding: 15px 18px;
	}

	.Form_error {
		font-size: 12px;
		font-family: Inter;
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

export const Logout = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 7px;
	font-size: 14px;
	font-weight: 500;
	color: ${({ theme }) => theme.mainBody.sbText};
	background: transparent;

	@media (max-width: 500px) {
		font-size: 12.5px;
		gap: 5px;
	}

	.icon_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 9999px;
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		color: ${({ theme }) => theme.mainBody.text};
		transition:
			background-color 0.25s ease,
			transform 0.25s ease,
			color 0.25s ease;

		@media (max-width: 500px) {
			width: 29px;
			height: 29px;
		}

		svg {
			font-size: 18px;
			transform: translateX(1px);
			transition: transform 0.25s ease;

			@media (max-width: 500px) {
				font-size: 16px;
			}
		}
	}

	&:hover {
		color: ${({ theme }) => theme.mainBody.text};

		.icon_wrapper {
			background: ${({ theme }) => theme.mainBody.toolkitActive};
			transform: translateX(2px);

			svg {
				transform: translateX(3px) rotate(-8deg);
			}
		}
	}
`;

export const ChangeBtn = styled.label`
	width: fit-content;
	padding-block: 4px;
	padding-inline: 8px;
	/* margin-inline: auto; */
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	background: ${({ theme }) => theme.mainBody.toolkitBg};
	position: relative;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${(props) => (props.$isLoading ? 'hidden' : 'visible')};
		color: ${({ theme }) => theme.mainBody.sbText};
		font-size: 14px;
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

	@media (max-width: 500px) {
		padding-block: 3px;
		padding-inline: 7px;

		.content {
			gap: 4px;
			font-size: 13px;
		}
	}

	@media (max-width: 462px) {
		margin-top: 5px;
		width: 100%;
	}
`;
