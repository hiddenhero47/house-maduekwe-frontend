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
	width: clamp(320px, 92vw, 470px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	color: ${({ theme }) => theme?.mainBody.text};

	/* Animation controlled by $isOpen (Modal.Center passes it) */
	${({ $animation, $isOpen }) =>
		$animation &&
		css`
			animation: ${$isOpen ? centerIn : centerOut} 0.35s ease forwards;
		`}

	@media (max-width: 500px) {
		width: 90vw;
		max-width: 500px;
	}
`;

export const DisplayStage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 30px;
	color: ${({ theme }) => theme?.mainBody.text};

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding-inline: 22px;
		padding-block: 15px;
		border-bottom: 1px solid ${({ theme }) => theme?.mainBody?.line};
		margin-bottom: 25px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			letter-spacing: -0.3px;
		}

		p {
			font-size: 14px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-left: 3px;
			line-height: 1.4;
			word-spacing: 2px;
			font-weight: 700;
		}

		button {
			font-size: 14px;
			margin-top: 6px;
			line-height: 1.4;
			font-weight: 700;
			margin-right: 3px;
		}

		.closeBtn {
			margin-left: auto;
			font-size: 22px;
			color: ${({ theme }) => theme.mainBody.sbText};
			cursor: pointer;
			transition: 0.2s ease;

			&:hover {
				color: ${({ theme }) => theme.mainBody.text};
				transform: rotate(90deg);
			}
		}
	}

	.body_wrapper {
		padding-inline: 19px;
		display: flex;
		flex-direction: column;
	}
`;

export const GuestCheckoutStage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 24px;

	.Form_error {
		font-size: 10px;
	}

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 10px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			letter-spacing: -0.3px;
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 6px;
			max-width: 380px;
			line-height: 1.4;
		}

		.closeBtn {
			font-size: 22px;
			color: ${({ theme }) => theme.mainBody.sbText};
			cursor: pointer;
			transition: 0.2s ease;

			&:hover {
				color: ${({ theme }) => theme.mainBody.text};
				transform: rotate(90deg);
			}
		}
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 18px;
		margin-top: 8px;
		border-top: 1px solid ${({ theme }) => theme.mainBody.line};

		h4 {
			font-size: 15px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			margin-bottom: 2px;
		}
	}

	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;

		@media (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		font-size: 0.87rem;
		font-weight: 600;
		font-family: Inter;
		padding-block: 14px; /* py-3 */
		border-radius: 8px; /* rounded-md */
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.9;
			transform: translateY(-1px);
		}

		svg {
			font-size: 17px;
		}
	}

	.btn_anon {
		color: ${({ theme }) => theme?.mainBody?.text};
		background-color: ${({ theme }) => theme?.mainBody?.container};
		border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	}

	.btn_anon i {
		display: flex;
		transform: rotate(180deg);
	}

	.pending_order {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 14px 16px;
		margin-top: -4px;

		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.form.blue};

		background: ${({ theme }) =>
			theme.mode === 'dark' ? 'rgba(0,136,232,.08)' : 'rgba(0,136,232,.06)'};

		cursor: pointer;
		transition: 0.25s ease;

		&:hover {
			transform: translateY(-1px);
			background: ${({ theme }) =>
				theme.mode === 'dark' ? 'rgba(0,136,232,.13)' : 'rgba(0,136,232,.1)'};
		}

		.pending_order_text {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			text-align: left;
			gap: 3px;

			strong {
				font-size: 14px;
				font-weight: 600;
				color: ${({ theme }) => theme.mainBody.text};
			}

			span {
				font-size: 12px;
				color: ${({ theme }) => theme.mainBody.sbText};
			}
		}

		.arrow {
			font-size: 18px;
			color: ${({ theme }) => theme.form.blue};
			flex-shrink: 0;
			transition: 0.25s ease;
		}

		&:hover .arrow {
			transform: translateX(4px);
		}
	}
`;

export const MyForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 22px;
	margin-top: 8px;

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-top: 10px;
		border-top: 1px solid ${({ theme }) => theme?.mainBody?.line};

		&:first-child {
			border-top: none;
			padding-top: 0;
		}
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 10px;

		@media (max-width: 480px) {
			grid-template-columns: 1fr;
		}
	}

	.form_control {
		display: flex;
		flex-direction: column;
		gap: 6px;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			font-size: 13px;
			font-weight: 600;
			letter-spacing: 0.2px;
		}

		&:focus-within label {
			color: ${({ theme }) => theme?.mainBody?.text};
		}
	}
`;

export const SubmitBtn = styled.button`
	padding: 14px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.addToCart?.disabledBg
			: theme?.addToCart?.background};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	color: ${({ theme }) => theme?.addToCart?.text};
	transition: all 0.2s ease-in-out;
	font-weight: 600;
	margin-top: 10px;

	&:hover {
		transform: translateY(-1px);
		background-color: ${({ theme }) => theme?.addToCart?.bgActive};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 0.87rem;
		font-weight: 600;
		font-family: Inter;

		svg {
			font-size: 17px;
		}
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
			transform: translateY(-1px);
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

export const AddToCartBtn = styled.button`
	width: 100%;
	padding-block: 14px;
	/* padding-inline: 10px; */
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	position: relative;
	background-color: ${({ theme }) => theme?.addToCart.background};
	color: ${({ theme }) => theme?.addToCart.text};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;

	&:hover {
		opacity: 0.9;
		transform: translateY(-1px);
		background-color: ${({ theme }) => theme?.addToCart.hoverBg};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 15px;
		font-weight: 600;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
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
