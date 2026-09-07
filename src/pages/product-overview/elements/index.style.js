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

export const CrumbLink = styled.button`
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
		position: relative;
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
	/* object-position: ${({ $position }) => $position || 'center'}; */
	transition: object-position 0.3s ease;
`;

export const AlsoLike = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 7vh;
	margin-bottom: 3vh;
	padding-inline: clamp(10px, 2%, 32px);

	#mightLikeTitle {
		text-transform: uppercase;
		font-size: 19px;
		margin-bottom: 25px;
	}

	#alsoLike {
		width: 100%;
		min-height: 15vh;

		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(250px, 280px));
		grid-auto-flow: dense;
		justify-content: center;

		overflow-x: auto;
		scroll-behavior: smooth;
		&::-webkit-scrollbar {
			height: 0;
		}
		scrollbar-width: none;

		@media (min-width: 920px) and (max-width: 1232px) {
			display: flex;
			justify-content: unset;
		}

		@media (max-width: 607px) {
			display: flex;
			justify-content: unset;
		}

		.cubicle {
			aspect-ratio: 3 / 4;
			flex-shrink: 0;

			@media (min-width: 920px) and (max-width: 1232px) {
				width: clamp(250px, 24%, 290px);
			}

			@media (min-width: 608px) and (max-width: 919px) {
				aspect-ratio: 3 / 3.8;
			}

			@media (max-width: 607px) {
				width: clamp(250px, 24%, 280px);
				aspect-ratio: 3 / 3.8;
			}
		}
	}
`;

export const DetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-inline: 15%;
	margin-top: 30px;

	@media (min-width: 948px) and (max-width: 1190px) {
		margin-inline: 8%;
	}

	@media (min-width: 791px) and (max-width: 947px) {
		margin-inline: 13%;
	}

	@media (min-width: 701px) and (max-width: 790px) {
		margin-inline: 8%;
	}

	@media (min-width: 451px) and (max-width: 700px) {
		margin-inline: 5%;
	}

	@media (max-width: 450px) {
		margin-inline: 10px;
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
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	span {
		display: ${({ $active }) => ($active ? 'flex' : 'none')};
		color: ${({ $color }) => ($color === '#ffffff' ? '#000' : lighten($color, 20))};
		font-weight: bold;
		position: absolute;
	}
`;

export const SizeButton = styled.button`
	/* padding: 5px; */
	border-radius: 8px;
	font-size: 18px;
	text-transform: uppercase;
	width: clamp(50px, 23%, 150px);
	height: 45px;

	display: flex;
	align-items: center;
	justify-content: center;
	border: ${({ theme, $active, $isError }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($active) return `1px solid ${theme?.mainBody.text}`;
		return `1px solid ${theme?.mainBody.line}`;
	}};

	background-color: ${({ theme, $active }) =>
		$active ? theme?.mainBody.toolkitBg : theme?.mainBody.container};
	color: ${({ theme, $active }) =>
		$active ? theme?.mainBody.text : theme?.mainBody.sbText};

	transition: 0.15s ease;

	&:hover {
		background-color: ${({ theme }) => theme?.mainBody.toolkitActive};
	}
`;

export const AddToCartBtn = styled.button`
	width: 100%;
	padding-block: 13px;
	padding-inline: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	position: relative;

	background-color: ${({ theme }) => theme?.addToCart?.background};
	color: ${({ theme }) => theme?.addToCart?.text};

	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	transition: all 0.2s ease-in-out;

	&:hover {
		transform: translateY(-1px);
		background-color: ${({ theme }) => theme?.addToCart?.hoverBg};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
		font-family: Inter;

		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (max-width: 500px) {
		padding-inline: 8px;

		.content {
			gap: 4px;
			font-size: 13px;
		}
	}
`;

export const HoldBtn = styled.button`
	margin-bottom: 0.75rem; /* mb-3 */
	margin-right: auto;
	font-size: 0.875rem; /* text-sm */
	color: ${({ theme }) => theme.mainBody.sbText};
	display: flex;
	align-items: center;
	font-family: Inter;

	@media (min-width: 361px) and (max-width: 500px) {
		font-size: 0.78rem;
	}

	@media (max-width: 360px) {
		font-size: 0.69rem;
	}

	/* Smooth hover animation */
	transition: all 0.25s ease;

	i {
		display: flex;
		align-items: center;
		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
	}

	i:first-child {
		font-size: 1.125rem;
		margin-right: 0.25rem;

		@media (max-width: 360px) {
			font-size: 0.93rem;
		}
	}

	i:last-child {
		font-size: 1rem;
		margin-left: 0.25rem;

		@media (max-width: 360px) {
			font-size: 0.83rem;
		}
	}

	/* HOVER EFFECT */
	&:hover {
		color: ${({ theme }) => theme.mainBody.text};
		transform: translateX(2px);
		opacity: 0.85;

		i:last-child {
			transform: translateX(3px); /* arrow moves right */
		}
	}

	/* ACTIVE/CLICK EFFECT */
	&:active {
		transform: scale(0.97);
		opacity: 0.75;
	}
`;

export const QuantityTag = styled.p`
	margin-bottom: 0.75rem; /* mb-3 */
	margin-right: auto;
	font-size: 0.875rem; /* text-sm */
	color: ${({ theme }) => theme.mainBody.sbText};
	display: flex;
	align-items: center;
	font-family: Inter;

	@media (min-width: 361px) and (max-width: 500px) {
		font-size: 0.78rem;
	}

	@media (max-width: 360px) {
		font-size: 0.69rem;
	}

	/* Smooth hover animation */
	transition: all 0.25s ease;

	i {
		display: flex;
		align-items: center;
		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
	}

	i:first-child {
		font-size: 1.125rem;
		margin-right: 0.25rem;

		@media (max-width: 360px) {
			font-size: 0.93rem;
		}
	}

	i:last-child {
		font-size: 1rem;
		margin-left: 0.25rem;

		@media (max-width: 360px) {
			font-size: 0.83rem;
		}
	}
`;

export const Increment = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 4px 6px;
	border-radius: 9999px;
	background-color: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.line};
	margin-bottom: 10px;

	.qty-value {
		min-width: 28px;
		text-align: center;
		font-size: 13px;
		font-weight: 600;
		color: ${({ theme }) => theme.mainBody.text};
		user-select: none;
	}

	.qty-btn {
		width: 20px;
		height: 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: ${({ theme }) => theme.mainBody.toolkitBg};
		color: ${({ theme }) => theme.mainBody.sbText};
		border: 1px solid ${({ theme }) => theme.mainBody.line};

		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			transform 0.15s ease,
			box-shadow 0.15s ease;

		svg {
			font-size: 15px;
		}

		&:hover {
			background-color: ${({ theme }) => theme.mainBody.toolkitActive};
			color: ${({ theme }) => theme.mainBody.text};
		}

		&:active {
			transform: scale(0.92);
			box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.15);
		}
	}
`;

export const SoldOut = styled.div`
	position: absolute;
	inset: 0;
	display: ${({ $isSoldOut }) => ($isSoldOut ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.55);
	backdrop-filter: blur(2px);
	z-index: 6;
	border-radius: inherit;

	span {
		color: white;
		font-weight: 700;
		font-size: clamp(12px, 1.2vw, 16px);
		padding: 6px 12px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		letter-spacing: 0.5px;
	}
`;
