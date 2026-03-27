import React from 'react';
import Modal from '../../modal/index_modal';
import { IoTrashOutline } from 'react-icons/io5';
import { DeleteWrapper, Actions } from './delete-modal.style';

function DeleteModal({ ref, text, subText, action, data, clean }) {
	const handleDelete = () => {
		action?.(data);
		ref?.current?.close();
	};

	return (
		<Modal.Center
			refName={ref}
			width="fit-content"
			maxWidth="420px"
			animation
			onClose={() => clean && clean()}
			onOpen={() => {}}
		>
			<DeleteWrapper>
				<div className="icon">
					<IoTrashOutline />
				</div>

				<h3>{text}</h3>
				<p>{subText}</p>

				<Actions>
					<button className="cancel" onClick={() => ref?.current?.close()}>
						Cancel
					</button>

					<button className="delete" onClick={handleDelete}>
						Delete
					</button>
				</Actions>
			</DeleteWrapper>
		</Modal.Center>
	);
}

export default DeleteModal;
