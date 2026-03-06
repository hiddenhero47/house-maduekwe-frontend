import styled, { keyframes, css } from 'styled-components';

const chipEnter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const chipExit = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

export const ChipsWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const ChipsContainer = styled.div`
	width: 100%;
	min-height: 45px;
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	border: ${({ theme, $isError, $useBackground }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($useBackground) return `1px solid ${theme.form?.menuBorder}`;
		return '';
	}};
	background-color: ${({ theme, $useBackground }) =>
		$useBackground ? theme.form?.chipBoxBg : 'transparent'};
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	transition: all 0.2s ease-out;

	&:hover {
		border: ${({ theme, $useBackground }) =>
			$useBackground ? `1px solid ${theme?.form.sbLine}` : ''};
	}

	${({ $shake }) =>
		$shake &&
		css`
			animation: ${shakeAnimation} 300ms ease;
		`}
`;

export const Chip = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 4px 9.5px;
	border-radius: 20px;
	background-color: ${({ theme }) => theme?.form.menuActive};
	font-family: Outfit;
	font-size: 13px;
	font-weight: 500;
	color: ${({ theme }) => theme?.form.menuSbText};
	animation: ${chipEnter} 200ms ease forwards;

	${({ $isRemoving }) =>
		$isRemoving &&
		css`
			animation: ${chipExit} 200ms ease forwards;
		`}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		cursor: pointer;
		color: inherit;
		padding: 0;
	}
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;
