import React, { useState } from 'react';
import Modal from '../../../modal/index_modal';
import { FilterModalWrapper, GroupItem } from './filter&group.style';
import CustomInput from '../../../form-components/input/custom-input';
import LoaderNoData from './loader-no-data';
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import ItemGroupServices from '../../../../features/services/custom-hooks/item-groups';

function SelectItemGroupModal({ ref, closeModal, onApply }) {
	const [filters, setFilters] = useState({});
	const [selectedGroup, setSelectedGroup] = useState(null);

	const { values, handleChange } = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: (vals) => {
			setFilters(vals);
		},
	});

	const { data, isPending } = ItemGroupServices.get({
		limit: 20,
		...filters,
	});

	const groups = data?.data || [];

	const selectGroup = (group) => {
		setSelectedGroup((prev) => (prev?._id === group._id ? null : group));
	};

	const isSelected = (id) => selectedGroup?._id === id;

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			refName={ref}
			onClose={() => {}}
			onOpen={() => setSelectedGroup(null)}
			animation
		>
			<FilterModalWrapper>
				{/* HEADER */}
				<div className="modal_header">
					<div>
						<h3>Select Item Groups</h3>
						<p>Search and select the groups you want to use.</p>
					</div>

					<IoClose className="closeBtn" onClick={closeModal} />
				</div>

				<div className="crater_wrapper"></div>

				{/* SEARCH */}
				<form
					className="craters"
					onSubmit={(e) => {
						e.preventDefault();
						setFilters(values);
					}}
				>
					<div className="form_control">
						<label>Search</label>

						<CustomInput
							name="search"
							value={values.search}
							onChange={handleChange}
							placeholder="Search groups..."
							paddingX="14px"
							paddingY="9px"
							useBackground
						/>
					</div>

					<div className="filter_actions">
						<button type="submit" className="apply_btn">
							Search
						</button>
					</div>
				</form>

				{/* GROUP LIST */}
				<div className="filter_section">
					<h4>Item Groups</h4>

					{isPending || groups.length < 1 ? (
						<LoaderNoData isLoading={isPending} data={groups} />
					) : (
						<div className="Y_scroll_style flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
							{groups.map((group) => (
								<GroupItem
									key={group._id}
									onClick={() => selectGroup(group)}
									className={isSelected(group._id) ? 'selected' : ''}
								>
									<div className="info">
										<span className="name">{group.groupName}</span>

										<span className="count">
											{group.shopItems?.length || 0} items
										</span>
									</div>

									<input
										type="checkbox"
										checked={isSelected(group._id)}
										readOnly
									/>
								</GroupItem>
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
						onClick={() => {
							onApply(selectedGroup);
							closeModal();
						}}
					>
						Add a Groups
					</button>
				</div>
			</FilterModalWrapper>
		</Modal.Center>
	);
}

export default SelectItemGroupModal;
