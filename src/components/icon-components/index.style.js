import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CustomSVG = styled.svg`
	width: ${(props) =>
		typeof props.width === 'number' ? `${props.width}px` : props.width};
	height: ${(props) =>
		typeof props.height === 'number' ? `${props.height}px` : props.height};
	color: ${(props) => props.color};
	pointer-events: none;
`;

export const VectorIcon = ({ width, height, className, vector }) => (
	<CustomSVG
		as={vector}
		width={width}
		height={height}
		className={className}
	/>
);

VectorIcon.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	vector: PropTypes.elementType.isRequired,
};
