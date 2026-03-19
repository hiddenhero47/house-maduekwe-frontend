import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/modal/index_modal';
import { FilterModalWrapper, ProductItem } from './manage-modal.style';
import { IoClose } from 'react-icons/io5';
import LoaderNoData from './loader-no-data';

function ManageShopItemsModal({ ref, closeModal, onApply, items = [] }) {
	const [selectedItems, setSelectedItems] = useState(items);

	const toggleItem = (item) => {
		setSelectedItems((prev) => {
			const exists = prev.find((p) => p._id === item._id);

			if (exists) {
				return prev.filter((p) => p._id !== item._id);
			}

			return [...prev, item];
		});
	};

	const isSelected = (id) => selectedItems.some((item) => item._id === id);

	const selectPlaceholder = (data) => {
		if (!data) return '';

		return data?.placeHolder?.url || data?.imageCatalog?.[0]?.url || '';
	};

	const handleSave = () => {
		onApply(selectedItems);
		closeModal();
	};

	useEffect(() => {
		setSelectedItems(items);
	}, [items]);

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			refName={ref}
			onClose={() => {}}
			onOpen={() => {}}
			animation
		>
			<FilterModalWrapper>
				<div className="modal_header">
					<div>
						<h3>Manage Products</h3>
						<p>Review and remove products from this group.</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<div className="craters">
					<div className="filter_section">
						<h4>Selected Products</h4>

						{items.length < 1 ? (
							<LoaderNoData isLoading={false} data={[]} />
						) : (
							<div className="Y_scroll_style flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
								{items.map((item) => (
									<ProductItem
										key={item._id}
										onClick={() => toggleItem(item)}
										className={isSelected(item._id) ? 'selected' : ''}
									>
										<div className="imageBox">
											<div className="imageHolder">
												<img src={selectPlaceholder(item)} alt={item.name} />
											</div>
										</div>

										<div className="info">
											<span className="name">{item.name}</span>
											<span className="price">
												{item.price} {item.currency}
											</span>
										</div>

										<input
											type="checkbox"
											checked={isSelected(item._id)}
											readOnly
										/>
									</ProductItem>
								))}
							</div>
						)}
					</div>

					{/* ACTIONS */}
					<div className="filter_actions">
						<button className="reset_btn" onClick={closeModal} type="button">
							Cancel
						</button>

						<button
							className="apply_btn"
							type="button"
							onClick={() => handleSave()}
						>
							Save Changes ({selectedItems.length})
						</button>
					</div>
				</div>
			</FilterModalWrapper>
		</Modal.Center>
	);
}

export default ManageShopItemsModal;
