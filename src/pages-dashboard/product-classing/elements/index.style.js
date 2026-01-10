import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding: 24px;
	padding-bottom: 32px;
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

	.tabs {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.actions {
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
		font-size: 16px;
		opacity: ${({ $active }) => ($active ? 1 : 0.7)};
	}

	&::after {
		content: '';
		height: 2px;
		width: ${({ $active }) => ($active ? '100%' : '0%')};
		position: absolute;
		bottom: -1px;
		/* left: 0; */
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

export const TableWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 5vh;
`;
