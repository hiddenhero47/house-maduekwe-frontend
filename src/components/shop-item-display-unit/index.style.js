import styled, { keyframes } from 'styled-components';

export const ShopItemWrapper = styled.div`
	width: ${(props) =>
		typeof props.width === 'number' ? `${props.width}px` : props.width};
	height: ${(props) =>
		typeof props.height === 'number' ? `${props.height}px` : props.height};
	border: ${({ $useBackground, theme }) =>
		$useBackground ? `1px solid ${theme?.mainBody.line}` : ''};

	background-color: ${({ $useBackground, theme }) =>
		$useBackground ? theme?.mainBody.container : ''};

	border-radius: ${({ $useBackground }) => ($useBackground ? '10px' : '')};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: ${({ theme }) => theme.mainBody.text};
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

export const ShopItemContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1;
	border-radius: inherit;

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

	#addToHolding,
	#addToCart {
		z-index: 5;
		position: absolute;
		top: 0;
		margin-top: calc(3% + 5px);
		color: ${({theme}) => theme?.mainBody.kitTextDark};
		font-size: 1.4rem;
	}

	#arrowsLeft,
	#arrowsRight {
		z-index: 5;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		color: ${({theme}) => theme?.mainBody.kitTextDark};
		font-size: 1.5rem;
	}

	#addToHolding,
	#arrowsLeft {
		left: 0;
		margin-left: 5%;
	}

	#addToHolding {
		margin-left: calc(3% + 5px);
	}

	#addToCart,
	#arrowsRight {
		right: 0;
		margin-right: 5%;
	}

	#addToCart {
		margin-right: calc(3% + 5px);
	}
`;

export const Controller = styled.div`
	height: clamp(25px, 33%, 80px);
	width: 100%;

	.display_navigator {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 4px;
		gap: 2px;

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

		h3 {
			font-size: 0.8rem;
			font-family: Inter;
			font-weight: 700;
			margin-top: 4px;
			display: flex;
			align-items: center;

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
			margin-top: 15px;
		}

		.color,
		.size {
			display: flex;
			align-items: center;
			gap: 5px;
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
		"#" +
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
	width: clamp(9px, 5vw, 10px);
	aspect-ratio: 1 / 1;
	border-radius: 9999px;
	background-color: ${({ $value }) => $value};
	border: 1px solid
		${({ theme, $value, $active }) =>
			$active ? theme?.mainBody.text : darken($value, 10)};

	@supports not (aspect-ratio: 1 / 1) {
		width: 1.33vmin;
		height: 1.33vmin;
	}
`;

export const Size = styled.button`
	width: clamp(15px, 5vw, 22px);
	aspect-ratio: 1 / 1;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	font-size: clamp(9px, 0.5vw,0.6rem);
	font-family: Inter;
	font-weight: 600;
	line-height: 0px;
	color: ${({theme}) => theme?.mainBody.sbText};
	border: 1px solid
		${({ theme, $active }) =>
			$active ? theme?.mainBody.text : theme?.mainBody.sbKitText};

	@supports not (aspect-ratio: 1 / 1) {
		width: 2.33vmin;
		height: 2.33vmin;
	}
`;
