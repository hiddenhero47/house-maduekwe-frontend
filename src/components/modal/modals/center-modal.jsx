import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';

import { CenterDialog, CenterShell } from '../index_modal.style';

function ModalCenter(
	{
		children,
		onClose,
		onOpen,
		width,
		maxWidth,
		mediaQuery,
		queryWidth,
		borderPaddingY,
	},
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
		// (() => {
		// 	modalRef.current.close();
		// })();
	}

	function openModal() {
		onOpen();
		setIsOpen(true);
		// (() => {
		// 	modalRef.current.showModal();
		// })();
	}

	function handelClose(event) {
		if (event && !event.target.contains(ModelSellRef.current)) {
			return;
		}
		closeModal();
	}

	return (
		<CenterDialog
			open={isOpen}
			onClick={handelClose}
			ref={modalRef}
			onClose={closeModal}
		>
			<CenterShell
				open={isOpen}
				ref={ModelSellRef}
				$isOpen={isOpen}
				width={width}
				$maxWidth={maxWidth}
				$mediaQuery={mediaQuery}
				$queryWidth={queryWidth}
				$borderPaddingY={borderPaddingY}
			>
				{children}
			</CenterShell>
		</CenterDialog>
	);
}

// ModalCenter.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	width: PropTypes.string,
// 	maxWidth: PropTypes.string,
// };

export default forwardRef(ModalCenter);
