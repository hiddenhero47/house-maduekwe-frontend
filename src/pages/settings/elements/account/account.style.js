import styled from 'styled-components';

export const SecurityWrapper = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	gap: 20px;
	margin-top: 25px;

	@media (max-width: 1030px) {
		flex-direction: column;
	}

	.borderLine {
		border: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine};
	}

	#accountBody {
		flex: 1;
		min-height: 400px;
		border-radius: 12px;
		padding-inline: 20px;
		padding-top: 21px;
		padding-bottom: 10px;

		@media (max-width: 430px) {
			padding-block: 8px;
		}
	}

	.slow {
		transition: all 0.2s;
		transition-timing-function: ease-in-out;
	}
`;

export const AccountNav = styled.nav`
	width: 18%;
	min-width: 200px;
	display: flex;
	flex-direction: column;
	border-radius: 8px;

	#accountNavWrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 8px;
		height: 93%;
		gap: 5px;
		border: 1px solid ${({ theme }) => theme?.mainBody.cardSbLine};
	}

	@media (max-width: 1030px) {
		min-height: 30px;
		width: 100%;
		flex-direction: row;

		#accountNavWrapper {
			flex-direction: row;
			column-gap: 5%;
			row-gap: 10%;
			flex-wrap: wrap;
			align-items: center;

			@media (min-width: 458px) and (max-width: 1030px) {
				border: unset;
				border-radius: unset;
				column-gap: 7%;
			}

			@media (max-width: 457px) {
				column-gap: 5px;
				height: auto;
				min-height: fit-content;
				padding: 5px;
			}

			@media (max-width: 311px) {
				justify-content: center;
			}
		}
	}
`;

export const OptionBtn = styled.button`
	width: 100%;

	background-color: ${({ $active, theme }) =>
		$active ? theme?.mainBody.toolkitBg : 'transparent'};
	color: ${({ $active, theme }) =>
		$active ? theme?.mainBody.text : theme?.mainBody.sbText};

	font-size: 14px;
	font-weight: 600;
	line-height: 20.16px;
	letter-spacing: -0.30000001192092896px;
	padding-block: 10px;
	padding-inline: 20px;
	text-align: start;
	border-radius: 2px;

	@media (max-width: 1030px) {
		padding-block: 8px;
		padding-inline: 18px;
		border-radius: 4px;
	}

	@media (min-width: 458px) and (max-width: 1030px) {
		background-color: unset;
		position: relative;
		border-radius: 0px;

		&::after {
			content: '';
			height: 1.5px;
			width: ${({ $active }) => ($active ? '90%' : '0px')};
			border-radius: 99999px;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			transition: 0.4s;
			background-color: ${({ theme, $active }) =>
				$active ? theme?.mainBody.text : theme?.mainBody.sbText};
		}

		&:hover::after {
			width: 90%;
		}
	}

	@media (min-width: 318px) and (max-width: 1030px) {
		width: fit-content;
	}

	@media (min-width: 312px) and (max-width: 700px) {
		font-size: 12.5px;
	}

	@media (max-width: 311px) {
		font-size: 12px;
	}

	span {
		@media (min-width: 1031px) {
			margin-left: ${(props) => (props.$active ? '18px' : '')};
		}
	}
`;
