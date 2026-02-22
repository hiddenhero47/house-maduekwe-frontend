import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	/* overflow-y: auto; */

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 20px 24px;
		border-radius: 12px;
		background: ${({ theme }) => theme.mainBody.card};
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		margin-bottom: 20px;
	}

	.title-area {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.header .icon {
		width: 42px;
		height: 42px;
		border-radius: 10px;
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.intro.logo};
		font-size: 18px;
	}

	h1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
		line-height: 1.2;
	}

	p {
		font-size: 0.875rem;
		color: ${({ theme }) => theme.mainBody.sbText};
		margin-top: 2px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.form_wrapper {
		flex: 1;
		max-height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		overflow: hidden;
	}

	#form_wrapper {
		width: 100%;
		flex-basis: 0;
		flex-grow: 1;
		overflow: hidden;

		padding-block: 18px;
		border-radius: 10px;
		background-color: ${({ theme }) => theme?.mainBody?.background};
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}

		.actions {
			width: 100%;
			justify-content: flex-end;
		}
	}
`;

export const SaveBtn = styled.button`
	padding-block: 6px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.mainBody?.toolkitBg};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.filterBtn?.text};

	&:hover {
		/* background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.filterBtn?.hoverBg : ''}; */
		transform: translateY(-1px);
		color: ${({ theme }) => theme.intro.logo};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 600;
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

export const AddBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;

	padding: 6px 14px;
	border-radius: 999px;

	font-size: 13px;
	font-weight: 500;

	color: ${({ theme }) => theme.mainBody.sbText};
	background: ${({ theme }) => theme.mainBody.card};

	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	cursor: pointer;

	transition:
		background 0.2s ease,
		color 0.2s ease,
		transform 0.15s ease,
		box-shadow 0.15s ease;

	svg {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
		transition:
			transform 0.2s ease,
			color 0.2s ease;
	}

	svg:first-child {
		font-size: 16px;
	}

	span {
		white-space: nowrap;
	}

	&:hover {
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		color: ${({ theme }) => theme.mainBody.text};
		transform: translateY(-1px);

		svg:last-child {
			transform: translateX(3px);
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
`;

export const FormBody = styled.div`
	width: 100%;
	min-height: 0;
	padding-inline: clamp(10px, 3%, 32px);
	padding-block: 15px;

	#form_body_container {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}

	#right_content,
	#left_content {
		max-width: 100%;
		min-width: 300px;
		flex-grow: 1;
		flex-basis: 0;
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		@media (max-width: 500px) {
			min-width: 100%;
		}
	}

	.form_control {
		width: 100%;
		max-width: 390px;
		display: flex;
		flex-direction: column;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 0.875rem;
			font-weight: 600;
			margin-bottom: 8px;
			margin-left: 8px;
		}

		&:focus-within {
			label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}
`;

export const AttributeBody = styled.div`
	width: 100%;
	min-height: 0;
	padding-inline: clamp(10px, 3%, 32px);

	.main_wrapper {
		border-top: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		padding-block: 20px;
	}

	h3 {
		font-size: 0.98rem;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
		line-height: 1.2;
		display: flex;
		gap: 5px;
		margin-left: 10px;
	}

	.form_control {
		width: 100%;
		max-width: 390px;
		display: flex;
		flex-direction: column;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 0.875rem;
			font-weight: 600;
			margin-bottom: 8px;
			margin-left: 8px;
		}

		&:focus-within {
			label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}
`;

export const AttributeBox = styled.div`
	width: 100%;
	height: fit-content;
	padding: 8px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;

	.attribute_control {
		min-width: 150px;
		display: flex;
		flex-direction: column;
		gap: 5px;

		.form_word {
			font-size: 12px;
		}

		.name {
			font-size: 13px;
			text-transform: capitalize;
		}

		.edit {
			font-size: 12px;
			text-transform: capitalize;
			color: ${({ theme }) => theme.form.blue};
			display: flex;
			gap: 5px;
			align-items: center;
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

export const Color = styled.div`
	width: 10px;
	height: 10px;
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

export const Size = styled.span`
	display: flex;
	font-size: 11.5px;
	font-family: Inter;
	font-weight: 600;
	color: ${({ theme }) => theme?.mainBody.text};
`;

export const PlaceholderCard = styled.div`
	position: relative;

	width: 160px;
	height: 160px;

	border-radius: 10px;
	overflow: hidden;

	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	background: ${({ theme }) => theme.mainBody.cardBg};

	cursor: pointer;
	transition: all 0.2s ease;

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
	}

	&:hover .overlay {
		opacity: 1;
	}
`;

export const Overlay = styled.div`
	position: absolute;
	inset: 0;

	background: rgba(0, 0, 0, 0.55);
	backdrop-filter: blur(2px);

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 13px;
	font-weight: 600;
	color: #fff;

	opacity: 0;
	transition: opacity 0.2s ease;
`;

export const SelectionBar = styled.div`
	position: sticky;
	bottom: 0;

	background: ${({ theme }) => theme.mainBody.cardBg};
	border-top: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};

	padding: 14px 18px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	font-size: 14px;
	font-weight: 600;
`;

export const DangerBtn = styled.button`
	padding: 8px 14px;
	border-radius: 6px;

	border: none;
	background: ${({ theme }) => theme.form.error};
	color: white;

	font-weight: 600;
	cursor: pointer;

	transition: 0.2s ease;

	&:hover {
		opacity: 0.9;
	}
`;
