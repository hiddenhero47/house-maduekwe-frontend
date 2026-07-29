import styled from 'styled-components';

export const SliderContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.5s ease;
	border-radius: inherit;
	touch-action: pan-y;
`;

export const Slider = styled.div`
	display: inline-flex;
	width: ${({ $items }) => `calc(100% * ${$items})`};
	height: 100%;
	transform: ${({ $currentIndex, $dragX, $items }) =>
		`translateX(calc(${-$currentIndex * (100 / $items)}% + ${$dragX}px))`};
	transition: ${({ $isDragging }) =>
		$isDragging ? 'none' : 'transform .35s ease'};
	border-radius: inherit;
`;

export const Slide = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	position: relative;
	border-radius: inherit;
`;
