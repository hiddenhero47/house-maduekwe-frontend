import styled, { keyframes, css } from 'styled-components';

export const ToolBarWrapper = styled.button`
	position: fixed;
	aspect-ratio: 1 / 1;
	max-width: 50px;
	z-index: 5;
	padding: 14px;
	border: none;
	border-radius: 9999px;
	background-color: ${({ theme }) => theme?.intro?.logo};
	color: #fff;
	/* cursor: grab; */
	user-select: none;
	font-size: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	transform: ${({ $dragging }) => ($dragging ? 'scale(1.05)' : 'scale(1)')};
	transition: transform 0.25s ease;

	right: ${({ $x }) => ($x === null ? '20px' : 'unset')};
	left: ${({ $x }) => ($x !== null ? `${$x}px` : 'unset')};
	top: ${({ $y }) => ($y !== null ? `${$y}px` : '50%')};
	transform: ${({ $y }) =>
		$y !== null ? 'translateY(0)' : 'translateY(calc(-50% + 20px))'};

	&:hover {
		transform: scale(1.05)
			${({ $y }) => ($y !== null ? '' : 'translateY(calc(-50% + 20px))')};
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
	}

	&:active {
		cursor: grabbing;
		transform: scale(0.97);
	}

	.icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.badge {
			position: absolute;
			top: -6px;
			right: -6px;
			min-width: 17px;
			height: 17px;
			background: #ff4b4b;
			color: white;
			font-size: 10px;
			font-weight: 600;
			font-family: Inter, sans-serif;
			border-radius: 9999px;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 0 6px rgba(255, 75, 75, 0.6);
			animation: pulse 2s infinite;
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			box-shadow: 0 0 6px rgba(255, 75, 75, 0.6);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 10px rgba(255, 75, 75, 0.8);
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 6px rgba(255, 75, 75, 0.6);
		}
	}

	@supports not (aspect-ratio: 1 / 1) {
		width: 5.5556vmin;
		height: 5.5556vmin;
	}
`;

const centerIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const centerOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.92);
  }
`;

export const HoldingWrapper = styled.div`
	width: clamp(300px, 35vw, 500px);
	padding: 12px;
	padding-bottom: 30px;
	border-radius: 14px;
	background-color: ${({ theme }) => theme?.mainBody.container};
	border: ${({ theme }) => theme?.mainBody.line};
	color: ${({ theme }) => theme?.mainBody.text};

	/* Animation controlled by $isOpen (Modal.Center passes it) */
	${({ $animation, $isOpen }) =>
		$animation &&
		css`
			animation: ${$isOpen ? centerIn : centerOut} 0.35s ease forwards;
		`}
`;

export const Footer = styled.div`
	margin-top: 12px; /* mt-3 */
	display: flex;
	flex-direction: column;
	gap: 8px; /* gap-2 */

	.btn {
		width: 100%;
		padding-block: 12px; /* py-3 */
		border-radius: 8px; /* rounded-md */
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px; /* gap-2 */
		font-weight: 600; /* font-semibold */
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
		}
	}

	.btn_anon {
		color: var(--mainBody-text);
		background-color: var(--mainBody-container);
		border: 1px solid var(--mainBody-line);
	}

	.btn_move {
		background-color: ${({ theme }) => theme?.addToCart.background};
		color: ${({ theme }) => theme?.addToCart.text};

		&:hover {
			background-color: ${({ theme }) => theme?.addToCart.hoverBg};
		}
	}
`;

export const ShopItem = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 12px;

	background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
	border: 1px solid ${({ theme }) => theme?.mainBody.line};

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

	/* Add click feedback */
	&:active {
		transform: scale(0.98);
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
		}

		.price {
			font-size: 13px;
			font-weight: 500;
			color: ${({ theme }) => theme?.mainBody.sbText};
		}
	}

	/* Trash button */
	.remove_btn {
		margin-left: auto;
		padding: 6px;
		color: #d9534f;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
			transform: scale(1.1);
		}
	}
`;
