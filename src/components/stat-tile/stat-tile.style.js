import styled from 'styled-components';

export const Card = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px;
	border-radius: 12px;
	background-color: ${({ theme }) => theme?.mainBody?.card};
	border: 1px solid ${({ theme }) => theme?.mainBody?.cardLine};
	flex: 1 1 200px;
	min-width: 180px;

	.label {
		font-size: 12px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
	}

	.value {
		font-size: 20px;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
	}
`;

export const IconWrap = styled.div`
	width: 40px;
	height: 40px;
	min-width: 40px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	color: ${({ $color }) => $color || '#0088E8'};
	background-color: ${({ $color }) => ($color ? `${$color}1F` : '#0088E81F')};
`;
