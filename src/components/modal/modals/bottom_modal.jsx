import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
// import PropTypes from 'prop-types';
import { BottomDialog, BottomShell } from "../index_modal.style";

function ModalBottom(
  { children, onClose, onOpen, width, height, animation },
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
    <BottomDialog
      open={isOpen}
      onClick={handelClose}
      ref={modalRef}
      onClose={closeModal}
    >
      <BottomShell
        className="intro-y"
        open={isOpen}
        ref={ModelSellRef}
        $isOpen={isOpen}
        width={width}
        height={height}
        $animation={animation}
      >
        {children}
      </BottomShell>
    </BottomDialog>
  );
}

// ModalBottom.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	height: PropTypes.string,
// 	animation: PropTypes.bool,
// };

export default forwardRef(ModalBottom);
