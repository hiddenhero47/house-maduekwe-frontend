import { useState, useEffect } from 'react';

export const getElementDimensionsRef = (ref) => {
	const { current } = ref;

	if (current) {
		const { offsetWidth: width, offsetHeight: height } = current;
		return { width, height };
	}

	return { width: 0, height: 0 };
};

export function useElementDimensions(ref) {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	const updateDimensions = () => {
		if (ref.current) {
			const { offsetWidth: width, offsetHeight: height } = ref.current;
			setDimensions({ width, height });
		}
	};

	useEffect(() => {
		updateDimensions();

		window.addEventListener('resize', updateDimensions);

		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	}, [ref]);

	return dimensions;
}
