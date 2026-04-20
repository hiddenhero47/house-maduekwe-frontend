import styled from 'styled-components';

export const Wrapper = styled.div`
	width: clamp(320px, 92vw, 520px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	animation: fadeIn 0.18s ease-out;
	color: ${({ theme }) => theme?.mainBody?.text};

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const Header = styled.div`
	margin-bottom: 16px;

	h3 {
		font-size: 18px;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
	}

	p {
		font-size: 13px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
	}
`;

export const AddRow = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 20px;

	select {
		flex: 1;
		padding: 8px;
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
		background: ${({ theme }) => theme?.mainBody?.card};
		color: ${({ theme }) => theme?.mainBody?.text};
	}

	button {
		padding: 8px 14px;
		background: ${({ theme }) => theme?.mainBody?.toolkitBg};
		border-radius: 6px;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 10px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	border-radius: 8px;

	.total {
		font-size: 12px;
		font-weight: 600;
		margin-left: auto;

		opacity: 0.8;
	}

	.total.error {
		color: red;
		opacity: 1;
	}
`;

export const Primary = styled.div`
	min-width: 100px;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 6px;
`;

export const Options = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	flex: 1;
	width: 100%;
`;

export const Option = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	padding: 8px 10px;
	border-radius: 8px;
	background: ${({ theme }) => theme?.mainBody?.card};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};

	min-width: 128px;

	@media (max-width: 567px) {
		min-width: 110px;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.text {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.name {
		font-size: 13px;
		font-weight: 600;
		margin-bottom: 5px;

		@media (max-width: 567px) {
			font-size: 12px;
		}
	}

	.meta {
		font-size: 11px;
		opacity: 0.6;
	}

	input {
		width: 55px;
		padding: 4px 6px;
		border-radius: 6px;
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
		background: transparent;
		text-align: center;

		@media (max-width: 567px) {
			width: 40px;
			padding: 3px 4px;
			border-radius: 5px;
			font-size: 13px;
			line-height: normal;
		}
	}
`;

export const DeleteBtn = styled.button`
	color: red;
`;

export const Footer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;

	button {
		color: red;
		font-size: 13px;
	}
`;

export const Empty = styled.div`
	font-size: 13px;
	opacity: 0.6;
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
	width: 13px;
	height: 13px;
	border-radius: 9999px;

	outline: 1.5px solid
		${({ theme }) =>
			theme.mode === 'dark'
				? lighten(theme.showcaseBox.line, 20)
				: darken(theme.showcaseBox.line, 10)};
	outline-offset: -2px;

	background-color: ${({ $color }) => $color || 'transparent'};

	@media (max-width: 500px) {
		width: 11px;
		height: 11px;
	}
`;
