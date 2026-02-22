import React, { useRef, useState } from 'react';
import Modal from '../../modal/index_modal';
import {
	Wrapper,
	OpenBtn,
	Display,
	ModalGrid,
	ImageItem,
} from './selector.style';
import { IoIosCloseCircle } from 'react-icons/io';
import { TbShirtFilled } from 'react-icons/tb';
import { IoShirtSharp } from 'react-icons/io5';

function ImageSelector({
	options = [],
	value,
	onChange,
	setFieldValue,
	onBlur,
	name,
	id,
	disabled = false,
	isMultiple = false,
	component,
	isRemoval = false,
}) {
	const [preview, setPreview] = useState(null);
	const [imageData, setImageData] = useState(null);

	const modalRef = useRef(null);
	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.open();
		}
	};
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	const onForward = (selectedValue) => {
		const result = isMultiple
			? [...(imageData || []), selectedValue]
			: selectedValue;

		if (onChange) onChange(result);

		if (setFieldValue) {
			setFieldValue(name || id, result);
		}

		if (onBlur) onBlur(name ?? id);

		setImageData(isMultiple ? result : selectedValue);
	};

	const isSelected = (item) => {
		if (!imageData) return false;

		// Multi-select case
		if (Array.isArray(imageData)) {
			return imageData.some((img) => img.url === item.url);
		}

		// Single select case
		return imageData?.url === item.url;
	};

	return (
		<>
			<OpenBtn
				disabled={disabled || !options || options.length === 0}
				onClick={openModal}
			>
				{component}
			</OpenBtn>

			<Modal.Center
				width="fit-content"
				maxWidth="1000px"
				onClose={() => {}}
				onOpen={() => {}}
				refName={modalRef}
				animation={true}
			>
				<Wrapper id={id} name={name}>
					<div className="modal_header">
						<div className="title">
							<TbShirtFilled />
							<div>
								<h3>Select image</h3>
								<p>Click to preview • Double click to select</p>
							</div>
						</div>

						<button className="closeBtn" onClick={closeModal}>
							<IoIosCloseCircle />
						</button>
					</div>

					<div className="flex flex-wrap items-center gap-[20px]">
						<Display>
							{!preview ? (
								<div className="flex flex-col items-center justify-center gap-2 opacity-50 text-center">
									<IoShirtSharp size={28} />

									<p className="text-[11px] font-medium">No image selected</p>
								</div>
							) : (
								<div className="imageHolder rounded-[inherit]">
									<img
										src={preview.url}
										alt="Error"
										onLoad={(e) => {
											const img = e.currentTarget;
											const ratio = img.naturalWidth / img.naturalHeight;
											const position = ratio < 0.66 ? 'top' : 'center';
											img.style.objectPosition = position;
										}}
									/>
								</div>
							)}
						</Display>

						<ModalGrid>
							{options.map((item, index) => (
								<ImageItem
									key={index}
									$toBeRemoved={isRemoval && isSelected(item)}
									$isSelected={isSelected(item)}
									onClick={() => setPreview(item)}
									onDoubleClick={() => onForward(item)}
								>
									<div className="imageHolder rounded-[inherit]">
										<img src={item.url} alt="Error" />
									</div>
								</ImageItem>
							))}
						</ModalGrid>
					</div>
				</Wrapper>
			</Modal.Center>
		</>
	);
}

export default ImageSelector;
