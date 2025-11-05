import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { SliderContainer, Slider, Slide } from './index.style';

const ModalSlider = ({ children, currentIndex, actions }) => {
	const sliderRef = useRef(null);

	const items = React.Children.toArray(children);
	const itemsCount = items.length;

	return (
		<SliderContainer ref={sliderRef}>
			<Slider
				translate={-currentIndex * (100 / itemsCount)}
				$items={itemsCount}
			>
				{items.map((item, index) => (
					<Slide key={index}>{item}</Slide>
				))}
			</Slider>
		</SliderContainer>
	);
};

ModalSlider.propTypes = {
	currentIndex: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired,
	actions: PropTypes.objectOf(PropTypes.func),
};

ModalSlider.defaultProps = {
	actions: {},
};

export default ModalSlider;
