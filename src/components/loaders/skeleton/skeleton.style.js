import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const getSize = (value) => (typeof value === 'number' ? `${value}px` : value);

export const Skeleton = styled.div`
	width: ${({ width = '100%' }) => getSize(width)};
	height: ${({ height = '16px' }) => getSize(height)};

	border-radius: ${({ $borderRadius = 'inherit' }) => $borderRadius};

	${({ $color1 = '#f6f7f8', $color2 = '#edeef1' }) => css`
		background: linear-gradient(
			90deg,
			${$color1} 25%,
			${$color2} 50%,
			${$color1} 75% 
		);
	`};

	background-size: 200% 100%;
	animation: ${shimmer} 1.5s infinite linear;
`;
