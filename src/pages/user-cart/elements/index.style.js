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
		margin-bottom: ${({ $isPendingOrder }) => ($isPendingOrder ? '0' : '')};
		@media (max-width: 500px) {
			font-size: 26px;
			margin-bottom: ${({ $isPendingOrder }) =>
				$isPendingOrder ? '0' : '30px'};
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
		/* margin-top: 30px; */
		flex-direction: column;
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

	.pending_order_notice {
		position: relative;
		width: 50%;
		min-height: fit-content;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		margin-block: 10px;
		border-radius: 14px;
		border: 1px solid ${({ theme }) => theme?.intro?.boxBorder};
		background: ${({ theme }) => theme?.intro?.boxBg};
		backdrop-filter: blur(10px);
		overflow: hidden;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			border-color 0.25s ease;

		@media (max-width: 947px) {
			width: 100%;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;

			background: linear-gradient(
				120deg,
				transparent 0%,
				rgba(255, 255, 255, 0.03) 45%,
				transparent 100%
			);

			opacity: 0;
			transition: opacity 0.25s ease;
		}

		&:hover {
			transform: translateY(-2px);

			box-shadow: ${({ theme }) =>
				theme.mode === 'dark'
					? '0 10px 25px rgba(0,0,0,0.35)'
					: '0 10px 25px rgba(0,0,0,0.08)'};

			border-color: ${({ theme }) => theme?.intro?.logo};

			&::before {
				opacity: 1;
			}

			.action {
				transform: translateX(3px);
			}
		}

		.info {
			position: relative;
			z-index: 2;

			display: flex;
			flex-direction: column;
			gap: 4px;

			p {
				font-size: 15px;
				font-weight: 600;
				color: ${({ theme }) => theme?.mainBody?.text};
			}

			span {
				font-size: 13px;
				line-height: 1.45;
				color: ${({ theme }) => theme?.mainBody?.sbText};
			}
		}

		.action {
			position: relative;
			z-index: 2;

			display: flex;
			align-items: center;
			gap: 6px;

			font-size: 13px;
			font-weight: 700;

			color: ${({ theme }) => theme?.intro?.logo};

			white-space: nowrap;

			transition: transform 0.25s ease;

			i {
				font-style: normal;
				font-size: 16px;
			}
		}

		@media (max-width: 540px) {
			flex-direction: column;
			align-items: flex-start;

			.action {
				margin-top: 4px;
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
	position: relative;
	/* border: ${({ theme, $unavailable }) => {
		if ($unavailable) return `1px solid ${theme?.intro?.boxBorder}`;
		return '';
	}}; */

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

export const ItemLoader = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.35);
	display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
	border-radius: 8px;
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

export const AddressSelect = styled.div`
	width: 80%;
	max-width: 615px;
	padding: 24px;
	border-radius: 5px;
	margin-inline: auto;
	margin-bottom: 20px;
	background-color: ${({ theme }) => theme?.mainBody.container};
	border: 1px solid ${({ theme }) => theme?.mainBody.line};
	position: relative;

	@media (max-width: 800px) {
		width: 100%;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 14px;

		span {
			font-size: 14px;
		}
	}

	.address_list {
		display: flex;
		flex-direction: column;
		gap: 12px;

		max-height: 220px;
		overflow-y: auto;

		/* smooth scrollbar */
		scroll-behavior: smooth;
	}

	.empty_state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 120px;
		color: ${({ theme }) => theme?.mainBody.sbText};
		font-size: 14px;
	}

	.loading_overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: inherit;
		backdrop-filter: blur(2px);
		z-index: 3;
	}
`;

export const AddressBox = styled.div`
	position: relative;
	padding-inline: 14px;
	padding-block: 12px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.25s ease;

	background: ${({ theme }) =>
		theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};

	border: 1px solid
		${({ theme, $isSelected }) =>
			$isSelected ? theme?.intro?.logo : theme?.mainBody.line};

	/* Left Accent */
	border-left: 4px solid
		${({ theme, $isSelected }) =>
			$isSelected ? theme?.intro?.logo : 'transparent'};

	&:hover {
		/* transform: translateY(-2px); */
		box-shadow: 0 4px 14px
			${({ theme }) =>
				theme.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)'};
	}

	/* Paper Fold Effect */
	${({ $isSelected, theme }) =>
		$isSelected &&
		`
		&::after {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			width: 0;
			height: 0;
			border-top: 24px solid ${theme.intro.logo};
			border-left: 24px solid transparent;
			border-top-right-radius: 6px;
		}
	`}

	.full_address {
		font-size: 14px;
		margin-bottom: 6px;
		color: ${({ theme }) => theme?.mainBody.text};
		line-height: 1.4;
	}

	.meta {
		display: flex;
		gap: 15px;
		font-size: 13px;
		color: ${({ theme }) => theme?.mainBody.sbText};
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

export const CheckoutBtn = styled.button`
	width: 100%;
	padding-block: 14px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.addToCart?.background
			: theme?.addToCart?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.addToCart?.text};
	transition:
		background 0.25s ease,
		transform 0.2s ease,
		opacity 0.2s ease;

	&:active {
		transform: scale(0.97);
	}

	&:hover {
		transform: translateY(-1px);
		opacity: 0.92;
		color: ${({ theme }) => theme.addToCart.text};
		background-color: ${({ theme }) => theme.addToCart.hoverBg};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 8px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-weight: 600;
		font-size: 15px;
		font-family: Inter;
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

export const Unavailable = styled.div`
	position: absolute;
	z-index: 3;
	top: 0;
	left: 20px;
	display: ${({ $unavailable }) => ($unavailable ? 'flex' : 'none')};

	&:hover {
		.icon {
			transform: scale(1.1);
		}
	}

	/* --- ICON --- */
	.icon {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 9999px;
		background: ${({ theme }) => theme.intro.logo};
		color: white;
		font-size: 20px;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		transition: transform 0.25s ease;

		&:hover {
			transform: scale(1.1);
		}
	}

	/* --- CONTENT PANEL --- */
	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(10px, -50%) scale(0.85);
		/* margin-left: 5px; */
		opacity: 0;
		pointer-events: none;
		transform-origin: left center;
		background: ${({ theme }) =>
			theme.mode === 'dark' ? 'rgba(30,30,30,0.85)' : 'rgba(255,255,255,0.85)'};
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 10px 12px;
		width: 220px;
		border: 1px solid ${({ theme }) => theme.mainBody.line};
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.2),
			0 0 0 1px rgba(255, 255, 255, 0.05);
		transition:
			transform 0.25s ease,
			opacity 0.2s ease;
	}

	.content::before {
		content: '';
		position: absolute;
		left: -6px;
		top: 50%;
		transform: translateY(-50%);
		width: 10px;
		height: 10px;
		background: inherit;
		border-left: 1px solid ${({ theme }) => theme.mainBody.line};
		border-bottom: 1px solid ${({ theme }) => theme.mainBody.line};
		transform: translateY(-50%) rotate(45deg);
	}

	/* --- EXPAND --- */
	.icon:hover + .content,
	.content:hover {
		opacity: 1;
		transform: translate(10px, -50%) scale(1);
		pointer-events: auto;
	}

	/* --- TEXT --- */
	h3 {
		font-size: 13px;
		font-weight: 600;
		margin-bottom: 4px;
		color: ${({ theme }) => theme.intro.logo};
	}

	p {
		font-size: 12px;
		line-height: 1.4;
		margin-bottom: 4px;
		color: ${({ theme }) => theme.mainBody.text};
	}

	span {
		font-size: 11px;
		color: ${({ theme }) => theme.mainBody.sbText};
	}
`;
