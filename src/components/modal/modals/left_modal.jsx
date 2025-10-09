import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';

import { LeftDialog, LeftShell } from '../index_modal.style';

function ModalLeft(
	{ children, onClose, onOpen, width, animation, maxWidth },
	ref
) {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef(null);
	const ModelSellRef = useRef(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				openModal();
			},
			close() {
				closeModal();
			},
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function closeModal() {
		onClose();
		setIsOpen(false);
	}

	function openModal() {
		onOpen();
		setIsOpen(true);
	}

	function handelClose(event) {
		if (event && !event.target.contains(ModelSellRef.current)) {
			return;
		}
		closeModal();
	}

	return (
		<LeftDialog
			open={isOpen}
			onClick={handelClose}
			ref={modalRef}
			onClose={closeModal}
		>
			<LeftShell
			    className='intro-x'
				open={isOpen}
				onClose={closeModal}
				ref={ModelSellRef}
				$isOpen={isOpen}
				width={width}
				$maxWidth={maxWidth}
				$animation={animation}
			>
				{children}
			</LeftShell>
		</LeftDialog>
	);
}

// ModalLeft.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	width: PropTypes.string,
// 	maxWidth: PropTypes.string,
// 	animation: PropTypes.bool,
// };

export default forwardRef(ModalLeft);
