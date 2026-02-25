import styled from 'styled-components';

export const ModalWrapper = styled.div`
	width: clamp(320px, 92vw, 470px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

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

		h4 {
			font-size: 15px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			letter-spacing: -0.2px;
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

export const DefaultToggle = styled.div`
	padding: 14px;
	border-radius: 12px;
	background: ${({ theme }) =>
		theme.mode === 'dark' ? theme.mainBody.toolkitBg : theme.mainBody.card};
	border: 1px solid ${({ theme }) => theme.mainBody.cardLine};
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;

	strong {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 12px;
		color: ${({ theme }) => theme.mainBody.sbText};
		margin-top: 4px;
		line-height: 1.4;
	}

	.switch {
		position: relative;
		width: 44px;
		height: 24px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		inset: 0;
		background-color: ${({ theme }) =>
			theme.mode === 'dark' ? theme.mainBody.card : theme.mainBody.cardSbLine};
		border-radius: 30px;
		transition: 0.3s;
		cursor: pointer;
	}

	.slider:before {
		content: '';
		position: absolute;
		height: 18px;
		width: 18px;
		left: 3px;
		top: 3px;
		background-color: white;
		border-radius: 50%;
		transition: 0.3s;
	}

	input:checked + .slider {
		background-color: ${({ theme }) => theme.intro.logo};
	}

	input:checked + .slider:before {
		transform: translateX(20px);
	}
`;

export const SubmitBtn = styled.button`
	padding: 14px;
	border-radius: 10px;
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
		font-size: 0.9rem;
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
