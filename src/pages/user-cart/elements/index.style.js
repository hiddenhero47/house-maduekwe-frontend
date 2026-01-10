import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 20px;
	padding-inline: clamp(10px, 2%, 32px);
	color: ${({ theme }) => theme.mainBody.text};
	letter-spacing: -0.2px;

	& h1:first-of-type {
		@media (max-width: 500px) {
			font-size: 26px;
			margin-bottom: 30px;
		}
	}

	#cartItems,
	#cartSummary {
		max-width: 100%;
		min-width: 450px;
		min-height: 30vh;
		flex-grow: 1;
		flex-basis: 0;
		display: flex;

		@media (max-width: 500px) {
			min-width: 100%;
		}
	}

	.line_top {
		border-top: 1px solid ${({ theme }) => theme?.mainBody.line};
	}

	#cartSummary {
		margin-top: 30px;
	}

	#cartItems {
		border-top: 1px solid ${({ theme }) => theme?.mainBody.line};
		margin-bottom: 40px;

		ul {
			width: clamp(500px, 100%, 750px);
			margin-inline: auto;
			padding-inline: 4px;

			@media (max-width: 500px) {
				width: 100%;
			}
		}
	}
`;

export const Item = styled.div`
	display: flex;
	width: 100%;
	align-content: center;
	/* gap: clamp(12px, 3vw, 32px); */

	transition: background 0.2s ease;
	padding-block: 5px;
	padding: 10px;
	border-radius: 8px;

	&:hover {
		background-color: ${({ theme }) =>
			theme.mode === 'dark'
				? 'rgb(46, 46, 46, 0.5)'
				: 'rgb(232, 232, 232, 0.5)'};
	}

	.image_button {
		width: clamp(100px, 30%, 200px);
		aspect-ratio: 1 / 1;
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.25s ease;

		&:hover {
			transform: scale(1.03);
		}

		div {
			border-radius: inherit;
		}
	}

	h3 {
		font-size: 17px;
		font-weight: 600;
		margin-bottom: 3px;
		color: ${({ theme }) => theme.mainBody.text};
		letter-spacing: -0.3px;

		@media (max-width: 500px) {
			font-size: 16px;
		}
	}

	p {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
		margin-block: 2px;

		@media (max-width: 500px) {
			font-size: 13px;
		}
	}

	button {
		@media (max-width: 500px) {
			font-size: 14px;
		}
	}
`;

export const SummaryContainer = styled.div`
	width: 80%;
	max-width: 615px;
	max-height: fit-content;
	padding: 28px;
	border-radius: 5px;
	margin-inline: auto;
	background-color: ${({ theme }) => theme?.mainBody.container};

	@media (max-width: 800px) {
		width: 100%;
	}

	.note_sc {
		@media (max-width: 500px) {
			padding-top: 8px;
			margin-bottom: 8px;

			p {
				font-size: 14px;
			}
		}
	}

	.total_sc {
		@media (max-width: 500px) {
			padding-top: 9px;
			margin-bottom: 9px;

			p {
				font-size: 15px;
			}
		}
	}
`;

export const ToggleBtn = styled.button`
	font-size: 25px;
	color: ${({ theme, $isExcluded }) =>
		$isExcluded ? theme?.mainBody?.kitTextDark : theme?.intro?.logo};
	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const Footer = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;

	/* Enable container queries */
	container-type: inline-size;
	container-name: footer;

	.btn {
		width: 100%;
		padding-block: 14px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-weight: 600;
		font-size: 15px;
		transition:
			background 0.25s ease,
			transform 0.2s ease,
			opacity 0.2s ease;

		&:hover {
			transform: translateY(-1px);
			opacity: 0.92;
		}

		&:active {
			transform: scale(0.97);
		}
	}

	.btn_continue {
		color: var(--mainBody-text);
		background-color: var(--mainBody-container);
		border: 1px solid var(--mainBody-line);
		padding-block: 12px;
	}

	.btn_checkout {
		background-color: ${({ theme }) => theme?.addToCart.background};
		color: ${({ theme }) => theme?.addToCart.text};

		&:hover {
			background-color: ${({ theme }) => theme?.addToCart.hoverBg};
		}
	}

	/* Container queries */
	@container footer (max-width: 400px) {
		.btn {
			font-size: 14px;
			padding-block: 12px;
		}
	}

	@container footer (max-width: 300px) {
		.btn {
			font-size: 13px;
			padding-block: 10px;
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

export const ColorCircle = styled.div`
	width: 15px;
	height: 15px;
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
