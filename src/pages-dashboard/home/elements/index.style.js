import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding: 24px;
	padding-bottom: 20px;
	gap: 20px;

	h1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
		letter-spacing: -0.02em;
	}
`;

export const TilesRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 14px;
`;

export const PanelGrid = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 16px;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

export const Panel = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
	height: 100%;
	min-height: 320px;
	padding: 18px;
	border-radius: 14px;
	background-color: ${({ theme }) => theme?.mainBody?.card};
	border: 1px solid ${({ theme }) => theme?.mainBody?.cardLine};

	h2 {
		font-size: 14px;
		font-weight: 600;
		color: ${({ theme }) => theme?.mainBody?.text};
	}

	.chart_body {
		flex: 1;
		min-height: 220px;
		position: relative;
	}
`;

export const PanelHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
`;

export const PeriodTabs = styled.div`
	display: flex;
	gap: 6px;
	padding: 3px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme?.mainBody?.background};
`;

export const PeriodBtn = styled.button`
	padding: 5px 10px;
	font-size: 11px;
	font-weight: 600;
	border-radius: 6px;
	transition: all 0.15s ease;
	color: ${({ theme, $active }) =>
		$active ? theme?.mainBody?.container : theme?.mainBody?.sbText};
	background-color: ${({ theme, $active }) =>
		$active ? theme?.mainBody?.text : 'transparent'};
`;

export const Badge = styled.span`
	font-size: 11px;
	font-weight: 600;
	padding: 4px 10px;
	border-radius: 999px;
	white-space: nowrap;
	color: ${({ theme }) => theme?.form?.orange};
	background-color: ${({ theme }) => `${theme?.form?.orange}1F`};
`;

export const EmptyState = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: ${({ theme }) => theme?.mainBody?.sbText};
	font-size: 12px;
`;
