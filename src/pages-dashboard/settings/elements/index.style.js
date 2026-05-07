import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding: 24px;
	padding-bottom: 20px;
	gap: 14px;

	h1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
		letter-spacing: -0.02em;
	}
`;

export const TabNav = styled.nav`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	row-gap: 15px;
	justify-content: space-between;
	padding: 16px 20px;
	border-radius: 12px;
	background: ${({ theme }) => theme.mainBody.card};
	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};

	#NavWrapper {
		/* width: 100%; */
		display: flex;
		align-items: center;
		gap: 24px;
		/* border-bottom: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine}; */
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;

export const OptionBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 8px 14px;
	font-size: 13px;
	font-weight: 600;
	border-radius: 6px 6px 0 0;
	position: relative;
	transition: color 0.2s ease;

	color: ${({ $active, theme }) =>
		$active ? theme?.mainBody.text : theme?.mainBody.sbText};

	svg {
		font-size: 18px;
		opacity: ${({ $active }) => ($active ? 1 : 0.7)};
	}

	&::after {
		content: '';
		height: 2px;
		width: ${({ $active }) => ($active ? '100%' : '0%')};
		position: absolute;
		bottom: -1px;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${({ theme, $active }) =>
			$active ? theme?.mainBody.text : theme?.mainBody.kitTextDark};
		border-radius: 9999px;
		transition: width 0.25s ease;
	}

	&:hover {
		color: ${({ theme }) => theme?.mainBody.text};
	}

	&:hover::after {
		width: 100%;
	}
`;

export const TableWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 5vh;

	.tool_kit {
		margin-top: 5px;
	}

	.tool_kits {
		right: 0;
		left: auto;
		top: 50%;
		bottom: auto;
		transform: translateY(-50%) translateY(12px) scale(0.96);
		margin-right: 20px;
	}

	tr:last-child .tool_kits {
		top: auto;
		bottom: 0;
		margin-bottom: -5px;
		transform: translateY(0) scale(0.96);
	}

	.tool_kits[open] {
		transform: translateY(-50%) scale(1) !important;
	}

	tr:last-child .tool_kits[open] {
		transform: translateY(0) scale(1) !important;
	}
`;

export const CreateBtn = styled.button`
	padding: 6px 12px;
	font-size: 12px;
	font-weight: 600;
	border-radius: 6px;
	color: ${({ theme }) => theme?.mainBody.text};
	background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
	border: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine};
	transition: all 0.2s ease;

	&:hover {
		color: ${({ theme }) => theme?.intro.logo};
		transform: translateY(-1px);
	}
`;
export const ToggleSwitch = styled.label`
	position: relative;
	display: inline-block;
	width: 42px;
	height: 22px;

	input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		inset: 0;
		background-color: ${({ theme }) => theme.mainBody.cardLine};
		transition: 0.2s;
		border-radius: 30px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: ${({ theme }) => theme.addToCart.background};
	}

	input:checked + .slider:before {
		transform: translateX(20px);
	}
`;
