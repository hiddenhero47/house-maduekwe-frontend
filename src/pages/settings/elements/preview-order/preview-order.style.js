import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	.countian {
		margin: auto;
		margin-top: 70px;
	}
`;

export const Header = styled.header`
	padding: 1.5rem 1.75rem;
	border-bottom: 1px solid ${({ theme }) => theme?.mainBody?.line};
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	.header_label {
		font-size: 12.5px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
	}

	.header_Value {
		font-size: 13.5px;
		color: ${({ theme }) => theme?.mainBody?.text};
		word-break: break-word;
	}

	@media (min-width: 640px) {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

export const Section = styled.section`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	column-gap: 10px;
	row-gap: 25px;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem 1.75rem;
	border-bottom: 1px solid ${({ theme }) => theme?.mainBody?.cardSbLine};

	.cubicle {
		flex-grow: 1;
		flex-basis: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-width: 100%;
		min-width: 250px;
		gap: 10px;
	}

	.section_title {
		font-size: 16px;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: ${({ theme }) => theme?.mainBody?.sbText};
		text-transform: uppercase;
	}

	.section_label {
		font-size: 13px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
	}

	.section_Value {
		font-size: 14.5px;
		color: ${({ theme }) => theme?.mainBody?.text};
		word-break: break-word;
	}

	@media (max-width: 500px) {
		padding: 1.5rem 5px;
	}
`;

const hexToRgba = (hex, opacity) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const statusStyles = {
	pending: css`
		background: ${({ theme }) => theme.form.background};
		color: ${({ theme }) => theme.form.text};
	`,

	paid: css`
		background: ${({ theme }) => hexToRgba(theme.form.green, 0.15)};
		color: ${({ theme }) => theme.form.green};
	`,

	processing: css`
		background: ${({ theme }) => hexToRgba(theme.form.blue, 0.15)};
		color: ${({ theme }) => theme.form.blue};
	`,

	shipped: css`
		background: ${({ theme }) => hexToRgba(theme.form.yellow, 0.2)};
		color: ${({ theme }) => theme.form.yellow};
	`,

	delivered: css`
		background: ${({ theme }) => hexToRgba(theme.form.green, 0.2)};
		color: ${({ theme }) => theme.form.green};
	`,

	cancelled: css`
		background: ${({ theme }) => hexToRgba(theme.form.error, 0.15)};
		color: ${({ theme }) => theme.form.error};
	`,

	returned: css`
		background: ${({ theme }) => hexToRgba(theme.form.orange, 0.2)};
		color: ${({ theme }) => theme.form.orange};
	`,

	'processing-return': css`
		background: ${({ theme }) => hexToRgba(theme.form.violetL, 0.15)};
		color: ${({ theme }) => theme.form.violetL};
	`,
};

export const StatusPill = styled.span`
	width: fit-content;
	padding: 0.35rem 0.75rem;
	border-radius: 999px;
	font-size: 12.5px;
	font-weight: 600;
	text-transform: capitalize;
	${({ $status }) => statusStyles[$status]};
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

export const SpanStatus = styled.span`
	width: fit-content;
	padding-block: 2px;
	padding-inline: 4px;
	border-radius: 5px;
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

export const ShopItem = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px;
	padding-right: 15px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
	border: 1px solid ${({ theme }) => theme?.mainBody.line};
	cursor: pointer;

	/* Smooth entrance animation */
	animation: fadeInUp 0.25s ease forwards;

	/* Hover effect */
	transition:
		background 0.25s ease,
		transform 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme?.mainBody.toolkitActive};
		transform: translateY(-2px);
	}

	@media (max-width: 500px) {
		padding: 4px;
		padding-right: 10px;
	}

	/* Smooth fade-up animation */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Text area */
	.info {
		display: flex;
		flex-direction: column;
		margin-left: 12px;
		gap: 2px;
		color: ${({ theme }) => theme?.mainBody.text};

		.name {
			font-size: 15px;
			font-weight: 600;

			@media (max-width: 500px) {
				font-size: 14px;
			}
		}

		.price {
			font-size: 13px;
			font-weight: 500;
			color: ${({ theme }) => theme?.mainBody.sbText};

			@media (max-width: 500px) {
				font-size: 12px;
			}
		}
	}

	.nos {
		font-size: 15px;
		font-weight: 400;

		span {
			font-size: 13px;
			font-weight: 400;
			color: ${({ theme }) => theme?.intro.logo};
		}
	}
`;

const darken = (hex, percent = 10) => {
	if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return hex;

	let c = hex.substring(1).split('');
	if (c.length === 3) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	}
	const num = parseInt(c.join(''), 16);
	const amt = Math.round(2.55 * percent);
	const R = (num >> 16) - amt;
	const G = ((num >> 8) & 0x00ff) - amt;
	const B = (num & 0x0000ff) - amt;

	return (
		'#' +
		(
			0x1000000 +
			(Math.max(0, R) << 16) +
			(Math.max(0, G) << 8) +
			Math.max(0, B)
		)
			.toString(16)
			.slice(1)
	);
};

const lighten = (hex, percent = 10) => {
	if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return hex;

	let c = hex.substring(1).split('');
	if (c.length === 3) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	}
	const num = parseInt(c.join(''), 16);
	const amt = Math.round(2.55 * percent);
	const R = (num >> 16) + amt;
	const G = ((num >> 8) & 0x00ff) + amt;
	const B = (num & 0x0000ff) + amt;

	return (
		'#' +
		(
			0x1000000 +
			(Math.max(0, R) << 16) +
			(Math.max(0, G) << 8) +
			Math.max(0, B)
		)
			.toString(16)
			.slice(1)
	);
};

export const Color = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 9999px;
	outline: 1px solid
		${({ theme }) =>
			theme.mode === 'dark'
				? lighten(theme.showcaseBox.line, 20) /* brighten slightly */
				: darken(theme.showcaseBox.line, 10)}; /* darken slightly */
	outline-offset: -2px;
	background-color: ${({ $color }) => $color || 'transparent'};
	${({ theme, $active }) =>
		$active &&
		`
        outline: 1.8px solid ${
					// Use a universal subtle gray from your theme
					theme?.mainBody.sbText
				};
        outline-offset: 1.8px;
    `}
	&:focus-visible {
		outline: 3px solid ${({ theme }) => theme.mainBody.sbText};
		outline-offset: 3px;
	}
	transition:
		outline 0.2s ease,
		outline-offset 0.2s ease;

	@media (max-width: 500px) {
		width: 11px;
		height: 11px;
	}
`;

export const Size = styled.span`
	display: flex;
	font-size: 12px;
	font-family: Inter;
	font-weight: 600;
	color: ${({ theme }) => theme?.mainBody.text};
`;

export const GhostButton = styled.button`
	padding: 0.6rem 1rem;
	border-radius: 10px;
	font-size: 0.8rem;
	background: transparent;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	color: ${({ theme }) => theme?.mainBody?.text};

	&:hover {
		background: ${({ theme }) => theme?.mainBody?.toolkitActive};
	}
`;

export const PrimaryButton = styled.button`
	padding: 0.6rem 1rem;
	border-radius: 10px;
	font-size: 0.8rem;
	background: ${({ theme }) => theme?.basicBtn?.bgActive};
	color: ${({ theme }) => theme?.basicBtn?.textActive};

	&:hover {
		opacity: 0.9;
	}
`;
