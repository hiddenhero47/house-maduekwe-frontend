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

export const AddressWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	font-family: Outfit;
	margin-top: 25px;
	animation: ${fadeUp} 0.4s ease;

	.heading {
		font-size: 18px;
		font-weight: 400;
		line-height: 27.7px;
		letter-spacing: -0.4710937738418579px;
		text-align: center;
		padding-left: 20px;

		display: flex;
		align-items: center;
		gap: 5px;
	}
`;

export const TableWrapper = styled.div`
	width: 100%;
	margin-top: 40px;
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
