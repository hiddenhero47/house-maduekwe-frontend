import React from 'react';
import PropTypes from 'prop-types';
import ModalLeft from './modals/left_modal';
import ModalBottom from './modals/bottom_modal';
import ModalCenter from './modals/center-modal';

const Modal = ({ children }) => <>{children}</>;

Modal.Left = ({
	refName,
	onClose,
	onOpen,
	width,
	animation,
	children,
	maxWidth,
}) => (
	<ModalLeft
		ref={refName}
		onClose={onClose}
		onOpen={onOpen}
		width={width}
		animation={animation}
		maxWidth={maxWidth}
	>
		{children}
	</ModalLeft>
);
Modal.Left.propTypes = {
	refName: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]),
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	width: PropTypes.string,
	maxWidth: PropTypes.string,
	animation: PropTypes.bool,
	children: PropTypes.node,
};

Modal.Bottom = ({ refName, onClose, onOpen, width, height, animation, children }) => (
	<ModalBottom
		ref={refName}
		onClose={onClose}
		onOpen={onOpen}
		width={width}
		height={height}
		animation={animation}
	>
		{children}
	</ModalBottom>
);
Modal.Bottom.propTypes = {
	refName: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]),
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	height: PropTypes.string,
	width: PropTypes.string,
	animation: PropTypes.bool,
	children: PropTypes.node,
};

Modal.Center = ({
	refName,
	onClose,
	onOpen,
	width,
	children,
	maxWidth,
	mediaQuery,
	queryWidth,
	borderPaddingY,
}) => (
	<ModalCenter
		ref={refName}
		onClose={onClose}
		onOpen={onOpen}
		width={width}
		maxWidth={maxWidth}
		mediaQuery={mediaQuery}
		queryWidth={queryWidth}
		borderPaddingY={borderPaddingY}
	>
		{children}
	</ModalCenter>
);
Modal.Center.propTypes = {
	refName: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]),
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	width: PropTypes.string,
	maxWidth: PropTypes.string,
	children: PropTypes.node,
	mediaQuery: PropTypes.string,
	queryWidth: PropTypes.string,
	borderPaddingY: PropTypes.string,
};

Modal.propTypes = {
	children: PropTypes.node,
};

export default Modal;
