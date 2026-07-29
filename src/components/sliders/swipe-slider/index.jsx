import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SliderContainer, Slider, Slide } from './index.style';

const DRAG_THRESHOLD = 80;

const SwipeSlider = ({ children, currentIndex, setCurrentIndex }) => {
	const items = React.Children.toArray(children);
	const itemsCount = items.length;

	const [dragX, setDragX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const startX = useRef(0);

	const handlePointerDown = (e) => {
		startX.current = e.clientX;
		setIsDragging(true);
	};

	const handlePointerMove = (e) => {
		if (!isDragging) return;
		setDragX(e.clientX - startX.current);
	};

	const resetDrag = () => {
		setIsDragging(false);
		setDragX(0);
	};

	const handlePointerUp = (e) => {
		if (!isDragging) return;

		const diff = e.clientX - startX.current;
		if (diff < -DRAG_THRESHOLD && currentIndex < itemsCount - 1) {
			setCurrentIndex(currentIndex + 1);
		} else if (diff > DRAG_THRESHOLD && currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
		resetDrag();
	};

	return (
		<SliderContainer
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerLeave={resetDrag}
		>
			<Slider
				$items={itemsCount}
				$currentIndex={currentIndex}
				$dragX={dragX}
				$isDragging={isDragging}
			>
				{items.map((item, index) => (
					<Slide key={index}>{item}</Slide>
				))}
			</Slider>
		</SliderContainer>
	);
};

SwipeSlider.propTypes = {
	currentIndex: PropTypes.number.isRequired,
	setCurrentIndex: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default SwipeSlider;
