import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';

import { LeftDialog, LeftShell } from '../index_modal.style';

function ModalLeft(
	{
		children,
		onClose,
		onOpen,
		width,
		height,
		animation,
		marginOffset,
		minWidth,
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
				open={isOpen}
				onClose={closeModal}
				ref={ModelSellRef}
				$isOpen={isOpen}
				width={width}
				height={height}
				$animation={animation}
				$marginOffset={marginOffset}
				$minWidth={minWidth}
			>
				{children}
			</LeftShell>
		</LeftDialog>
	);
}

export default forwardRef(ModalLeft);
