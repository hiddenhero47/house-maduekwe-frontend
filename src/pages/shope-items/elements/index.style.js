import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-x: hidden;
	padding-bottom: 20px;
	padding-inline: clamp(10px, 2%, 32px);
	color: ${({ theme }) => theme.mainBody.text};

	& > * {
		flex-shrink: 0;
	}

	& > section svg {
		border-radius: inherit;
	}

	.bottom_line {
		border-bottom: 1px solid ${({ theme }) => theme.mainBody.line};
	}

	#header {
		font-size: 30px;
		font-weight: 800;
		letter-spacing: 12px;
		font-family: ZeroG;
		border-bottom: 1.5px solid ${({ theme }) => theme.mainBody.line};
	}

	#subHeader {
		font-size: 13px;
		font-weight: 500;
		line-height: 8px;
		letter-spacing: 8px;
		font-family: Inter;
	}
`;

export const FilterBtn = styled.button`
	padding-block: 6px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.filterBtn?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.filterBtn?.hoverBg : ''};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 14.5px;
		font-weight: 600;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};
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

export const NewArrivalsBtn = styled.button`
	padding-block: 13px;
	padding-inline: 18px;
	margin-inline: auto;
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.basicBtn?.bgActive
			: theme?.basicBtn?.bgActive};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.basicBtn?.textActive};

	&:hover {
		background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.basicBtn?.background : ''};
		color: ${({ theme }) => theme?.basicBtn?.text};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 2px;

		i {
			display: inline-flex;
			font-size: 14px;
			transform: translateX(0);
			transition:
				transform 0.25s ease,
				opacity 0.25s ease;
		}
	}

	/* 👇 Arrow animation */
	&:hover .content i {
		transform: translateX(6px);
		opacity: 0.85;
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
			font-size: 10px;

			i {
				font-size: 12px;
			}
		}
	}
`;
