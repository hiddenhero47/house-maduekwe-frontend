import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-block: 24px;
`;

export const List = styled.ol`
	display: flex;
	align-items: center;
	gap: 8px;
	padding-inline: clamp(10px, 2%, 32px);
	margin-inline: auto;
	max-width: 1440px;
`;

export const CrumbLink = styled.span`
	margin-right: 6px;
	font-size: 14px;
	font-weight: 500;
	color: ${({ theme }) => theme?.mainBody.text};
	text-decoration: none;

	&:hover {
		opacity: 0.8;
	}

	&.inactive {
		color: ${({ theme }) => theme?.mainBody.sbText};
	}
`;

export const ItemSection = styled.section`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding-inline: clamp(10px, 2%, 32px);
	gap: 10px;
	margin-top: 20px;

	#details,
	#imageDisplay {
		max-width: 100%;
		min-width: 450px;
		/* min-height: 30vh; */
		flex-grow: 1;
		flex-basis: 0;

		@media (max-width: 500px) {
			min-width: 100%;
		}
	}
`;

export const SideImage = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 15px;

	.cubicle {
		background-color: ${({ theme }) => theme?.mainBody?.container};
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
		border-radius: 8px;
	}
`;

export const SliderWrapper = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	/* height: clamp(400px, 55vh, 500px); */
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	border-radius: 8px;
	position: relative;
	display: flex;

	/* 🔥 Fade-in controls */
	#fullScale,
	#arrowsLeft,
	#arrowsRight {
		opacity: 0;
		transition:
			opacity 0.35s ease,
			transform 0.35s ease;
		pointer-events: none;
	}

	#fullScale {
		z-index: 5;
		position: absolute;
		top: 0;
		margin-top: calc(3% + 8px);
		right: 0;
		margin-right: calc(3% + 8px);
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
		font-size: 1.9rem;
		transform: translateX(10px); /* 👈 slide from left */
	}

	#arrowsLeft,
	#arrowsRight {
		z-index: 5;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
		font-size: 1.8rem;
	}

	#arrowsLeft {
		left: 0;
		margin-left: 3%;
		transform: translate(-10px, -50%); /* 👈 slide from left */
	}

	#arrowsRight {
		right: 0;
		margin-right: 3%;
		transform: translate(10px, -50%); /* 👉 slide from right */
	}

	/* 👇 On hover, make them appear + slide in smoothly */
	&:hover #fullScale,
	&:hover #arrowsLeft,
	&:hover #arrowsRight {
		opacity: 1;
		transform: translate(0, -50%);
		pointer-events: auto;
	}

	&:hover #fullScale {
		transform: translateX(0);
	}

	#fullScale {
		transition-delay: 0.05s;
	}
	#arrowsLeft {
		transition-delay: 0.1s;
	}
	#arrowsRight {
		transition-delay: 0.15s;
	}

	#imageNavigation {
		position: absolute;
		bottom: 0;
		width: 100%;
		border-radius: 8px;
		padding: 6px;
		display: flex;
		gap: 4px;
		overflow-x: auto;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;

		&::-webkit-scrollbar {
			height: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(166, 171, 183, 0.5);
			border-radius: 20px;
		}

		button {
			aspect-ratio: 1 / 1;
			flex: 0 0 auto;
			max-width: 8%;
			border-radius: 4px;
			opacity: 0.91;
			transition:
				opacity 0.2s ease,
				border 0.2s ease;

			&.active {
				opacity: 1;
				border: 2px solid ${({ theme }) => theme.mainBody.active};
			}

			&:hover {
				opacity: 1;
			}
		}
	}
`;

export const Image = styled.img`
	object-position: ${({ $position }) => $position || 'center'};
	transition: object-position 0.3s ease;
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

export const ColorCircle = styled.button`
	width: 32px;
	height: 32px;
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
        outline: 2px solid ${
					// Use a universal subtle gray from your theme
					theme?.mainBody.sbText
				};
        outline-offset: 2px;
    `}
	&:focus-visible {
		outline: 3px solid ${({ theme }) => theme.mainBody.sbText};
		outline-offset: 3px;
	}
	transition:
		outline 0.2s ease,
		outline-offset 0.2s ease;
`;

export const SizeButton = styled.button`
	padding: 12px;
	border-radius: 8px;
	font-size: 14px;
	text-transform: uppercase;
	border: 1px solid ${(p) => (p.$active ? '#2563eb' : '#d1d5db')};
	background-color: ${(p) => (p.$active ? '#2563eb' : 'white')};
	color: ${(p) => (p.$active ? 'white' : '#111')};
	transition: 0.15s ease;

	&:hover {
		background-color: ${(p) => (p.$active ? '#1e4db7' : '#f3f4f6')};
	}
`;

export const AddToCartBtn = styled.button`
	width: 100%;
	margin-top: 2rem; /* mt-8 */
	padding: 0.75rem 0; /* py-3 */
	border-radius: 0.375rem; /* rounded-md */
	font-weight: 500;

	background-color: #000000;
	color: white;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #1a1a1a;
	}

	/* 🌙 Dark mode override */
	[data-theme='dark'] & {
		background-color: #383838;
		color: #e4e4e4;

		&:hover {
			background-color: #4d4d4d;
		}
	}
`;
