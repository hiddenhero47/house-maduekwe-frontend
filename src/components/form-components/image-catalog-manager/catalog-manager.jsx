import React, { useRef, useState } from 'react';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	closestCenter,
} from '@dnd-kit/core';
import {
	SortableContext,
	rectSortingStrategy,
	useSortable,
	arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Modal from '../../modal/index_modal';
import CustomFileInput from '../file/custom-file-input';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import {
	GridWrapper,
	Grid,
	Thumb,
	ThumbIconBtn,
	AddSection,
	UploadBtn,
	EmptyState,
	CapNote,
	ReorderingNote,
	LoadingOverlay,
	TagModalWrapper,
	TagChip,
} from './catalog-manager.style';
import { MdDelete } from 'react-icons/md';
import { TbTagsFilled } from 'react-icons/tb';
import { IoIosCloseCircle } from 'react-icons/io';
import ShopItemServices from '../../../features/services/custom-hooks/shop-items';
import { groupAttributesByType, getAttrKey } from '../../../utilities/basic-functions';
import { MAX_IMAGE_CATALOG, PRODUCT_IMAGE_ACCEPT } from '../../../utilities/app-const';

function SortableImageThumb({ image, index, onDelete, onTag, isBusyThis, disableActions }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: image.id, disabled: disableActions });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Thumb ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<img src={image.url} alt="" />
			<span className="order_badge">{index + 1}</span>
			{image.attrTag?.length > 0 && (
				<span className="tag_badge">{image.attrTag.length} tag(s)</span>
			)}

			<div className="actions">
				<ThumbIconBtn
					type="button"
					title="Tag with attribute"
					disabled={disableActions}
					onPointerDown={(e) => e.stopPropagation()}
					onClick={(e) => {
						e.stopPropagation();
						onTag(image.id);
					}}
				>
					<TbTagsFilled />
				</ThumbIconBtn>
				<ThumbIconBtn
					type="button"
					$danger
					title="Delete image"
					disabled={disableActions}
					onPointerDown={(e) => e.stopPropagation()}
					onClick={(e) => {
						e.stopPropagation();
						onDelete(image.id);
					}}
				>
					<MdDelete />
				</ThumbIconBtn>
			</div>

			{isBusyThis && (
				<LoadingOverlay>
					<BubbleSlide color="var(--mainBody-text)" height="16px" />
				</LoadingOverlay>
			)}
		</Thumb>
	);
}

function ImageCatalogManager({ itemId, imageCatalog = [], attributes = [] }) {
	const [pendingFiles, setPendingFiles] = useState([]);
	const [uploadKey, setUploadKey] = useState(0);
	const [editingImageId, setEditingImageId] = useState(null);
	const [removingId, setRemovingId] = useState(null);
	const [taggingId, setTaggingId] = useState(null);

	const { mutate: addImages, isPending: isAdding } = ShopItemServices.addImages();
	const { mutate: removeImage } = ShopItemServices.removeImage();
	const { mutate: reorderImages, isPending: isReordering } =
		ShopItemServices.reorderImages();
	const { mutate: tagImage } = ShopItemServices.tagImage();

	// Any in-flight image op disables the rest of the catalog so a second
	// click/drag can't fire before the first one has visibly finished.
	const isBusy = isReordering || !!removingId || !!taggingId;

	const modalRef = useRef(null);
	const openTagModal = (imageId) => {
		setEditingImageId(imageId);
		modalRef.current?.open();
	};
	const closeTagModal = () => modalRef.current?.close();

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const ids = imageCatalog.map((img) => img.id);
		const oldIndex = ids.indexOf(active.id);
		const newIndex = ids.indexOf(over.id);
		const newOrder = arrayMove(ids, oldIndex, newIndex);

		reorderImages({ id: itemId, order: newOrder });
	};

	const handleDelete = (imageId) => {
		if (!window.confirm('Remove this image?')) return;
		setRemovingId(imageId);
		removeImage(
			{ id: itemId, imageId },
			{ onSettled: () => setRemovingId(null) }
		);
	};

	const handleUpload = () => {
		if (!pendingFiles.length) return;
		addImages(
			{ id: itemId, files: pendingFiles },
			{
				onSuccess: () => {
					setPendingFiles([]);
					setUploadKey((k) => k + 1);
				},
			}
		);
	};

	const editingImage = imageCatalog.find((img) => img.id === editingImageId);
	const groupedAttributes = groupAttributesByType(attributes);
	const atCap = imageCatalog.length >= MAX_IMAGE_CATALOG;

	const toggleTag = (attributeId) => {
		if (!editingImage || taggingId) return;
		const current = editingImage.attrTag || [];
		const next = current.includes(attributeId)
			? current.filter((id) => id !== attributeId)
			: [...current, attributeId];

		setTaggingId(editingImage.id);
		tagImage(
			{ id: itemId, imageId: editingImage.id, attrTag: next },
			{ onSettled: () => setTaggingId(null) }
		);
	};

	return (
		<div>
			{imageCatalog.length === 0 ? (
				<EmptyState>No images yet — add some below.</EmptyState>
			) : (
				<>
					{isReordering && (
						<ReorderingNote>
							<BubbleSlide color="var(--mainBody-text)" height="14px" />
							Saving new order…
						</ReorderingNote>
					)}

					<GridWrapper>
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={imageCatalog.map((img) => img.id)}
								strategy={rectSortingStrategy}
							>
								<Grid $dimmed={isBusy}>
									{imageCatalog.map((image, index) => (
										<SortableImageThumb
											key={image.id}
											image={image}
											index={index}
											onDelete={handleDelete}
											onTag={openTagModal}
											isBusyThis={removingId === image.id || taggingId === image.id}
											disableActions={isBusy}
										/>
									))}
								</Grid>
							</SortableContext>
						</DndContext>
					</GridWrapper>
				</>
			)}

			<AddSection>
				<CustomFileInput
					key={uploadKey}
					value={pendingFiles}
					onChange={setPendingFiles}
					accept={PRODUCT_IMAGE_ACCEPT}
					isMultiple
					useBackground
					disabled={atCap}
				/>

				<UploadBtn
					type="button"
					disabled={!pendingFiles.length || isAdding || atCap}
					onClick={handleUpload}
				>
					{isAdding ? 'Uploading…' : `Upload ${pendingFiles.length || ''}`.trim()}
				</UploadBtn>
			</AddSection>

			<CapNote>
				{imageCatalog.length} / {MAX_IMAGE_CATALOG} images
				{atCap ? ' — limit reached, remove one to add more' : ''}
			</CapNote>

			<Modal.Center
				width="fit-content"
				maxWidth="420px"
				onClose={() => {}}
				onOpen={() => {}}
				refName={modalRef}
				animation={true}
			>
				<TagModalWrapper>
					<div className="modal_header">
						<h3>Tag this image</h3>
						<button type="button" className="closeBtn" onClick={closeTagModal}>
							<IoIosCloseCircle />
						</button>
					</div>

					{taggingId === editingImage?.id && (
						<ReorderingNote>
							<BubbleSlide color="var(--mainBody-text)" height="14px" />
							Saving tag…
						</ReorderingNote>
					)}

					{Object.entries(groupedAttributes).length === 0 ? (
						<EmptyState>This product has no attributes to tag yet.</EmptyState>
					) : (
						Object.entries(groupedAttributes).map(([type, attrs]) => (
							<div className="type_group" key={type}>
								<p className="type_label">{type}</p>
								<div>
									{attrs.map((attr) => {
										const attrId = getAttrKey(attr);
										const active = (editingImage?.attrTag || []).includes(attrId);

										return (
											<TagChip
												type="button"
												key={attrId}
												$active={active}
												disabled={!!taggingId}
												onClick={() => toggleTag(attrId)}
											>
												{attr?.Attribute?.name || attr?.Attribute?.value || attrId}
											</TagChip>
										);
									})}
								</div>
							</div>
						))
					)}
				</TagModalWrapper>
			</Modal.Center>
		</div>
	);
}

export default ImageCatalogManager;
