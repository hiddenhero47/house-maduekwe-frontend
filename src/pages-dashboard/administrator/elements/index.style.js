import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding: 24px;
	padding-bottom: 20px;
	gap: 14px;

	h1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
		letter-spacing: -0.02em;
	}

	#nav_tab {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding: 15px;
		border-radius: 8px;
		gap: 20px;
	}
`;

export const TabNav = styled.nav`
	width: 100%;
	display: flex;

	#NavWrapper {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 24px;
		border-bottom: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine};
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;

export const OptionBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 14px;
	font-size: 13px;
	font-weight: 600;
	border-radius: 6px 6px 0 0;
	position: relative;
	transition: color 0.2s ease;

	color: ${({ $active, theme }) =>
		$active ? theme?.mainBody.text : theme?.mainBody.sbText};

	svg {
		font-size: 18px;
		opacity: ${({ $active }) => ($active ? 1 : 0.7)};
	}

	&::after {
		content: '';
		height: 2px;
		width: ${({ $active }) => ($active ? '100%' : '0%')};
		position: absolute;
		bottom: -1px;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${({ theme, $active }) =>
			$active ? theme?.mainBody.text : theme?.mainBody.kitTextDark};
		border-radius: 9999px;
		transition: width 0.25s ease;
	}

	&:hover {
		color: ${({ theme }) => theme?.mainBody.text};
	}

	&:hover::after {
		width: 100%;
	}
`;

export const Search = styled.div`
	padding-inline: 12px;
	padding-block: 8px;
	display: flex;
	align-items: center;
	width: clamp(200px, 40%, 300px);
	background-color: ${({ theme, $useBackground }) =>
		$useBackground ? theme.form?.background : ''};
	border: ${({ theme, $isError, $useBackground }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	transition: all 0.2s ease-out;
	cursor: pointer;

	@media (max-width: 500px) {
		padding-inline: 10px;
		padding-block: 6px;
		width: unset;
		flex-grow: 1;
		flex-basis: 0;

		i {
			font-size: 18px;
		}
	}

	input {
		flex-grow: 1;
		flex-basis: 0;
		border: 0px solid transparent;
		&:focus {
			border-color: transparent;
			outline: none;
			box-shadow: none;
		}
	}

	&.search_word,
	.search_word {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		color: ${({ theme, $disabled }) =>
			$disabled ? theme.formInput?.placeholder : theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}

		@media (max-width: 500px) {
			font-size: 12px;
		}
	}

	&:focus-within {
		outline: none;
		border: ${({ theme, $useBackground }) => {
			if ($useBackground) return `1px solid ${theme?.form.sbLine}`;
			return '';
		}};
		background-color: ${({ theme, $useBackground }) =>
			$useBackground ? theme.form?.sbBackground : ''};
		color: ${({ theme }) => theme?.form.text};
	}

	&:hover {
		border: ${({ theme, $useBackground }) => {
			if ($useBackground) return `1px solid ${theme?.form.sbLine}`;
			return '';
		}};
	}

	input[type='date']::-webkit-inner-spin-button,
	input[type='date']::-webkit-calendar-picker-indicator {
		display: none;
		-webkit-appearance: none;
	}
`;

export const SearchBtn = styled.button`
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

	/* &:hover {
		background-color: ${({ theme, disabled }) =>
		!disabled ? theme?.filterBtn?.hoverBg : ''};
	} */

	.content {
		display: flex;
		align-items: center;
		gap: 4px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 400;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};

		i {
			font-size: 15px;
		}
	}

	.content:hover {
		color: ${({ theme }) => theme.intro.logo};
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
	margin-top: 20px;
`;

const statusColor = (theme, status) => {
	switch (status) {
		case 'pending':
			return theme.form.yellow;

		case 'initiated':
			return theme.form.blue;

		case 'success':
			return theme.form.green;

		case 'failed':
			return theme.form.error;

		case 'refunded':
			return theme.form.purple;

		default:
			return theme.form.orange;
	}
};

const hexToRgba = (hex, opacity) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const SpanStatus = styled.span`
	width: fit-content;
	/* padding-block: 2px; */
	padding-inline: 5px;
	border-radius: 9999px;
	font-size: 9.5px;
	font-weight: 900;
	text-transform: uppercase;
	letter-spacing: 0.07em;

	${({ theme, $status }) => {
		const color = statusColor(theme, $status);

		return `
			color: ${color};
			border: 1px solid ${color};
			background-color: ${hexToRgba(color, 0.15)};
		`;
	}}
`;
