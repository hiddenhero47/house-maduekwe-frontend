import styled from 'styled-components';

export const AddressWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	font-family: Outfit;

	.heading {
		font-size: 20px;
		font-weight: 400;
		line-height: 27.7px;
		letter-spacing: -0.4710937738418579px;
		text-align: center;
		padding-left: 20px;
	}
`;

export const AddBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 3px;
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

export const TableWrapper = styled.div`
	width: 100%;
	margin-top: 20px;

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