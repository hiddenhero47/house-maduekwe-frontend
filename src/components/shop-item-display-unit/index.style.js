import styled, { keyframes, css } from 'styled-components';

export const ShopItemWrapper = styled.div`
	width: ${(props) =>
		typeof props.width === 'number' ? `${props.width}px` : props.width};
	height: ${(props) =>
		typeof props.height === 'number' ? `${props.height}px` : props.height};
	border: ${({ $useBackground, theme }) =>
		$useBackground ? `1px solid ${theme?.showcaseBox.line}` : ''};

	background-color: ${({ $useBackground, theme }) =>
		$useBackground ? theme?.showcaseBox.container : ''};

	border-radius: ${({ $useBackground }) => ($useBackground ? '10px' : '')};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: ${({ theme }) => theme.showcaseBox.text};
	position: relative;
	overflow: hidden;
	user-select: none;
	transition: transform 0.5s ease;

	${({ $isDragging }) =>
		$isDragging &&
		`
		transform: scale(0.95);
		opacity: 0.9;
		cursor: grabbing;
	`}
`;

const shimmer = keyframes`
	0% {
		background-position: -468px 0;
	}
	100% {
		background-position: 468px 0;
	}
`;

export const SkeletonLoader = styled.div`
	width: 100%;
	height: 100%;
	background: #f6f7f8;
	background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
	background-size: 800px 104px;
	animation: ${shimmer} 1s linear infinite forwards;
	border-radius: 10px;
`;

export const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5px;
	color: ${({ theme }) => theme.mainBody.text};
	font-size: 14px;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

export const CartBtn = styled.button`
	${({ $isLoading }) =>
		$isLoading &&
		css`
			i svg {
				animation: ${bounce} 0.6s ease-in-out infinite;
				transform-origin: center;
			}
		`}
`;

export const ShopItemContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1;
	border-radius: inherit;
	position: relative;
	overflow: hidden;
	container-type: inline-size;

	.display_unit {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-basis: 0;
		border-radius: inherit;
	}

	.display_container_screen {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		padding: 3%;
		padding-bottom: 0px;
		border-radius: inherit;
		cursor: grab;
	}

	/* 👇 Buttons default state (hidden + slightly moved) */
	.add_to_cart,
	.add_to_holding,
	.arrows_left,
	.arrows_right {
		opacity: 0;
		transition: all 0.4s ease;
		pointer-events: none; /* avoid accidental clicks when hidden */
	}

	.add_to_cart,
	.add_to_holding {
		z-index: 5;
		position: absolute;
		top: 0;
		margin-top: calc(3% + 8px);
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
		font-size: 1.4rem;
		left: 0;
		margin-left: calc(3% + 8px);
		transform: translateX(-10px); /* 👈 slide from left */
	}

	.add_to_cart {
		font-size: 1.6rem;
	}

	.arrows_left,
	.arrows_right {
		z-index: 5;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
		font-size: 1.5rem;
	}

	.arrows_left {
		left: 0;
		margin-left: 5%;
		transform: translate(-10px, -50%); /* 👈 slide from left */
	}

	.arrows_right {
		right: 0;
		margin-right: 5%;
		transform: translate(10px, -50%); /* 👉 slide from right */
	}

	/* 👇 On hover, make them appear + slide in smoothly */
	&:hover .add_to_cart,
	&:hover .add_to_holding,
	&:hover .arrows_left,
	&:hover .arrows_right {
		opacity: 1;
		transform: translate(0, -50%);
		pointer-events: auto;
	}

	.add_to_holding.show,
	.add_to_cart.show {
		opacity: 1;
		transform: translate(0, -50%);
		transform: translateX(0);
		pointer-events: auto;
	}

	&:hover .add_to_holding {
		transform: translateX(0);
	}

	&:hover .add_to_cart {
		transform: translateX(0);
	}

	.add_to_holding {
		transition-delay: 0.05s;
	}
	.arrows_left {
		transition-delay: 0.1s;
	}
	.arrows_right {
		transition-delay: 0.15s;
	}

	/* 🪄 Responsive tweaks when width <= 250px */
	@container (max-width: 250px) {
		.add_to_holding {
			font-size: 1.4rem;
		}

		.add_to_cart {
			font-size: 1.4rem;
		}

		.arrows_left,
		.arrows_right {
			font-size: 1.4rem;
		}
	}
`;

export const Controller = styled.div`
	height: clamp(25px, 33%, 80px);
	width: 100%;
	display: flex;
	flex-direction: column;

	@media (min-width: 451px) and (max-width: 500px) {
		height: clamp(25px, 30%, 70px);
	}

	@media (max-width: 450px) {
		height: clamp(25px, 30%, 68px);
	}

	.display_navigator {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 4px;
		gap: 2px;
		padding-inline: clamp(10px, 5%, 19px);

		button {
			flex-grow: 1;
			flex-basis: 0;
			max-width: 40px;
			display: flex;
			padding: 1px;

			span {
				height: 1.5px;
				width: 100%;
				border-radius: 9999px;
				background-color: ${({ theme }) => theme?.mainBody.sbText};
			}
		}

		button.active {
			span {
				background-color: ${({ theme }) => theme?.mainBody.text};
			}
		}
	}

	.attributes_display {
		padding-inline: clamp(10px, 5%, 19px);
		display: flex;
		flex-direction: column;
		flex: 1;

		h3 {
			font-size: 0.8rem;
			font-family: Inter;
			font-weight: 700;
			display: flex;
			white-space: nowrap;
			align-items: center;
			gap: 15px;

			span {
				font-size: 0.7rem;
				margin-left: auto;
			}
		}

		.select_attributes {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			gap: 30px;
		}

		.color,
		.size {
			display: flex;
			align-items: center;
			gap: 5px;
		}
	}

	/* 🪄 Adjust these when container width <= 250px */
	@container (max-width: 250px) {
		.display_navigator button {
			max-width: 25px;
		}

		.attributes_display h3 {
			font-size: 0.72rem;

			span {
				font-size: 0.62rem;
			}
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

export const Color = styled.button`
	width: clamp(9px, 5vw, 16px);
	aspect-ratio: 1 / 1;
	border-radius: 9999px;
	background-color: ${({ $value }) => $value};
	border: 1.5px solid
		${({ theme, $value }) =>
			theme.mode === 'dark' ? lighten($value, 20) : darken($value, 20)};
	border: ${({ theme, $active, $value }) => {
		if ($active) return `1.5px solid ${theme?.mainBody?.sbText}`;
		if (theme.mode === 'dark') return `1.5px solid ${lighten($value, 20)}`;
		return `1.5px solid ${darken($value, 20)}`;
	}};
	transition:
		transform 0.15s ease,
		border-color 0.3s ease;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	span {
		display: ${({ $active }) => ($active ? 'flex' : 'none')};
		color: ${({ $value }) => ($value === '#ffffff' ? '#000' : '#fff')};
		font-size: 10px;
		font-weight: bold;
		position: absolute;
	}

	@supports not (aspect-ratio: 1 / 1) {
		width: 1.33vmin;
		height: 1.33vmin;
	}

	@container (max-width: 250px) {
		width: 13px;
	}
`;

export const Size = styled.button`
	width: clamp(15px, 5vw, 23px);
	padding-inline: 10px;
	aspect-ratio: 1 / 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	font-size: clamp(9px, 0.5vw, 0.6rem);
	font-family: Inter;
	font-weight: 900;
	line-height: 0px;

	color: ${({ $active, theme }) =>
		$active ? theme.mainBody.background : theme.mainBody.sbText};

	border: ${({ theme, $active, $isError }) => {
		if ($isError && $active) return `1.5px solid ${theme?.form.error}`;
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($active) return `1px solid ${theme?.mainBody.text}`;
		return `1px solid ${theme?.mainBody.sbKitText}`;
	}};

	background: ${({ $active, theme }) =>
		$active ? theme.mainBody.text : 'transparent'};

	transition: all 0.2s ease;

	@supports not (aspect-ratio: 1 / 1) {
		width: 2.33vmin;
		height: 2.33vmin;
	}

	@container (max-width: 250px) {
		width: 17px;
		font-size: 0.5rem;
		padding-inline: 9px;
	}
`;

export const Image = styled.img`
	/* object-position: ${({ $position }) => $position || 'center'}; */
	transition: object-position 0.3s ease;
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
