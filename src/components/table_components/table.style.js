import styled, { keyframes } from 'styled-components';

export const BTTableGrid = styled.div`
	width: 100%;
	height: auto;
	overflow: hidden;
	display: grid;
	grid-template-rows: 1fr 50px;
`;

export const BTWrapperOne = styled.div`
	width: 100%;
	height: fit-content;
	max-height: 100%;
	border-radius: 8px;
	overflow: hidden;
	overflow-x: auto;

	thead {
		border-bottom: ${({ $headerBg, theme }) => {
			if ($headerBg) return `1px solid ${theme?.mainBody.line}`;
			return '';
		}};

		background-color: ${({ $headerBg, theme }) => {
			if ($headerBg) return theme?.mainBody.toolkitBg;
			return '';
		}};
	}

	tbody {
		background-color: ${({ $headerBg, theme }) => {
			if ($headerBg) return theme?.mainBody.background;
			return '';
		}};

		tr {
			border-bottom: ${({ $bodyBg, theme }) => {
				if ($bodyBg) return `1px solid ${theme?.mainBody.cardLine}`;
				return '';
			}};
		}

		tr:nth-child(even) {
			background-color: ${({ $useStrip, theme }) => {
				if ($useStrip)
					return theme.mode === 'dark'
						? theme?.mainBody.card
						: theme?.showcaseBox.container;
				return '';
			}};
		}
	}

	tbody tr:last-child {
		border-bottom: unset;
	}

	th {
		padding-inline: ${({ $paddingHeaderX }) => $paddingHeaderX};
		padding-block: ${({ $paddingHeaderY }) => $paddingHeaderY};
		font-weight: 600;
		font-size: 0.876rem;
	}

	th:first-child {
		padding-left: ${({ $paddingHeaderX }) => ` calc(${$paddingHeaderX} * 2)`};
		padding-right: ${({ $paddingHeaderX }) => $paddingHeaderX};
		padding-block: ${({ $paddingHeaderY }) => $paddingHeaderY};
	}

	th:last-child {
		padding-left: ${({ $paddingHeaderX }) => $paddingHeaderX};
		padding-right: ${({ $paddingHeaderX }) => ` calc(${$paddingHeaderX} * 2)`};
		padding-block: ${({ $paddingHeaderY }) => $paddingHeaderY};
	}

	tbody tr {
		td {
			padding-inline: ${({ $paddingCellX }) => $paddingCellX};
			padding-block: ${({ $paddingCellY }) => $paddingCellY};
			font-weight: 300;
			font-size: 0.84rem;
		}

		td:first-child {
			padding-left: ${({ $paddingCellX }) => ` calc(${$paddingCellX} * 2)`};
			padding-right: ${({ $paddingCellX }) => $paddingCellX};
			padding-block: ${({ $paddingCellY }) => $paddingCellY};
		}

		td:last-child {
			padding-left: ${({ $paddingCellX }) => $paddingCellX};
			padding-right: ${({ $paddingCellX }) => ` calc(${$paddingCellX} * 2)`};
			padding-block: ${({ $paddingCellY }) => $paddingCellY};
		}
	}

	td:has(.last) {
		padding-right: 6px;
	}

	tr {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 600;
		line-height: 22.68px;
		text-align: left;
	}

	.nowrap {
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
`;

export const LoaderWrapper = styled.div`
	width: 100%;
	min-height: 300px;
	position: relative;

	.countian {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
	}
`;

const floatFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const NoData = styled.div`
	width: 100%;
	position: relative;
	display: flex;

	.countian {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-inline: auto;
		margin-top: 30px;
		animation: ${floatFade} 0.35s ease;
	}

	i {
		opacity: 0.65;
		margin-bottom: 4px;
	}

	h3 {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: ${({ theme }) => theme.mainBody.text};
		margin-top: 6px;
	}

	span {
		font-size: 13px;
		line-height: 1.6;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 360px;
	}
`;

export const RetryBtn = styled.button`
    margin-top: 10px;
	padding-block: 5px;
	padding-inline: 10px;
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
		font-size: 13px;
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
			font-size: 11px;
		}
	}
`;
