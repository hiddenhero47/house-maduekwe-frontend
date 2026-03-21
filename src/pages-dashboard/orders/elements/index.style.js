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

export const TableWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	/* margin-top: 5vh; */
`;

const hexToRgba = (hex, opacity) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const statusColor = (theme, status) => {
	switch (status) {
		case 'paid':
			return theme.form.green;

		case 'processing':
			return theme.form.blue;

		case 'shipped':
			return theme.form.yellow;

		case 'delivered':
			return theme.form.green;

		case 'cancelled':
			return theme.form.error;

		case 'returned':
			return theme.form.purple;

		case 'processing-return':
			return theme.form.violetL;

		default:
			return theme.form.orange || theme.form.orange;
	}
};

export const SpanStatus = styled.span`
	width: fit-content;
	padding-inline: 8px;
	border-radius: 5px;

	${({ theme, $status }) => {
		const color = statusColor(theme, $status);

		return `
			color: ${color};
			border: 1px solid ${color};
			background-color: ${hexToRgba(color, 0.12)};
		`;
	}}
`;
