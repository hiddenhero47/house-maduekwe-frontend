import React, { useMemo, useState } from 'react';
import Modal from '../../../../components/modal/index_modal';
import CustomSelect from '../../../../components/form-components/select/custom-select';
import {
	Wrapper,
	Header,
	AddRow,
	Content,
	Empty,
	Row,
	Primary,
	Options,
	Option,
	DeleteBtn,
	Footer,
	Color,
} from './variants-modal.style';
import { attributeType } from '../../../../utilities/app-const';
import { MdDelete } from 'react-icons/md';
import {
	groupAttributesByType,
	buildShopItemFormData,
	generateColorImage,
} from '../../../../utilities/basic-functions';

const getOppositeType = (type) => {
	if (type === attributeType.COLOR) return attributeType.SIZE;
	if (type === attributeType.SIZE) return attributeType.COLOR;
	return null;
};

// normalize id safely
const getId = (attr) =>
	typeof attr?.Attribute === 'object'
		? attr.Attribute?._id
		: attr?.Attribute || attr?._id;

function GroupedVariantsModal({
	modalRef,
	attributes = [],
	groupedVariants = [],
	setFieldValue,
}) {
	const [selectedPrimary, setSelectedPrimary] = useState('');

	// 🔒 Detect locked type (once user starts)
	const lockedType = useMemo(() => {
		if (!groupedVariants.length) return null;

		const first = attributes.find(
			(a) => getId(a) === groupedVariants[0]?.primaryAttribute
		);

		return first?.type || null;
	}, [groupedVariants, attributes]);

	// 🎯 Build select options
	const combinedOptions = useMemo(() => {
		if (!attributes) return [];

		return attributes
			.map((attr) => {
				const id = getId(attr);

				// 🔒 lock type
				if (lockedType && attr.type !== lockedType) return null;

				// 🚫 prevent duplicates
				if (groupedVariants.some((g) => g.primaryAttribute === id)) return null;

				// 🎨 COLOR
				if (attr.type === attributeType.COLOR) {
					return {
						label: attr?.Attribute?.name || attr?.name,
						value: id,
						image: generateColorImage(
							attr?.Attribute?.display || attr?.display || '#000000'
						),
					};
				}

				// 📏 SIZE
				if (attr.type === attributeType.SIZE) {
					return {
						label: `${attr?.Attribute?.name}, ${attr?.Attribute?.display}, ${attr?.Attribute?.value}`,
						value: id,
					};
				}

				return null;
			})
			.filter(Boolean);
	}, [attributes, groupedVariants, lockedType]);

	// 🧠 Create group
	const createGroupedVariant = (primaryAttrId) => {
		const primary = attributes.find((a) => getId(a) === primaryAttrId);
		if (!primary) return null;

		const secondaryType = getOppositeType(primary.type);

		const secondaryAttributes = attributes.filter(
			(a) => a.type === secondaryType
		);

		if (!secondaryAttributes.length) return null;

		return {
			primaryAttribute: primaryAttrId,
			options: secondaryAttributes.map((attr) => ({
				attribute: getId(attr),
				quantity: 0,
			})),
		};
	};

	const handleAdd = () => {
		if (!selectedPrimary) return;

		const newGroup = createGroupedVariant(selectedPrimary);
		if (!newGroup) return;

		setFieldValue('groupedVariants', [...groupedVariants, newGroup]);
		setSelectedPrimary('');
	};

	const removeGroup = (id) => {
		setFieldValue(
			'groupedVariants',
			groupedVariants.filter((g) => g.primaryAttribute !== id)
		);
	};

	const clearAll = () => {
		setFieldValue('groupedVariants', []);
	};

	const updateQuantity = (gIndex, oIndex, value) => {
		const updated = [...groupedVariants];
		updated[gIndex].options[oIndex].quantity = Number(value) || 0;

		setFieldValue('groupedVariants', updated);
	};

	const getAttr = (id) => attributes.find((a) => getId(a) === id);

	const syncGroupedVariants = () => {
		if (!groupedVariants.length) return;

		const updatedGroups = groupedVariants.map((group) => {
			const primary = attributes.find(
				(a) => getId(a) === group.primaryAttribute
			);

			if (!primary) return group;

			const secondaryType = getOppositeType(primary.type);

			const latestSecondary = attributes.filter(
				(a) => a.type === secondaryType
			);

			const existingMap = new Map(
				group.options.map((opt) => [opt.attribute, opt])
			);

			const newOptions = latestSecondary.map((attr) => {
				const id = getId(attr);

				// keep existing quantity
				if (existingMap.has(id)) {
					return existingMap.get(id);
				}

				// add new
				return {
					attribute: id,
					quantity: 0,
				};
			});

			return {
				...group,
				options: newOptions,
			};
		});

		setFieldValue('groupedVariants', updatedGroups);
	};

	const needsRefresh = groupedVariants.some((group) => {
		const primary = attributes.find((a) => getId(a) === group.primaryAttribute);

		if (!primary) return false;

		const secondaryType = getOppositeType(primary.type);

		const latestSecondary = attributes.filter((a) => a.type === secondaryType);

		return latestSecondary.length !== group.options.length;
	});

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="900px"
			onClose={() => {}}
			onOpen={() => {}}
			refName={modalRef}
			animation={true}
		>
			<Wrapper>
				<Header>
					<h3>Grouped Variants</h3>
					<p>Manage stock combinations (Color × Size)</p>
				</Header>

				{/* ➕ ADD SECTION */}
				<AddRow>
					<CustomSelect
						value={selectedPrimary}
						onChange={(val) => setSelectedPrimary(val)}
						options={combinedOptions}
						placeholder={
							lockedType ? `Select ${lockedType}` : 'Select attribute'
						}
						useBackground
						paddingX="10px"
						paddingY="8px"
					/>

					<button onClick={handleAdd} disabled={!selectedPrimary}>
						Add
					</button>
				</AddRow>

				{/* 📦 CONTENT */}
				<Content>
					{groupedVariants.length === 0 && (
						<Empty>No grouped variants yet</Empty>
					)}

					{groupedVariants.map((group, gIndex) => {
						const primary = getAttr(group.primaryAttribute);
						const primaryQty = getAttr(group.primaryAttribute)?.quantity || 0;
						const totalQty = group.options.reduce(
							(sum, opt) => sum + (Number(opt.quantity) || 0),
							0
						);
						const isOver = totalQty > primaryQty;

						return (
							<Row key={group.primaryAttribute}>
								<div className='flex items-center w-full'>
									<Primary>
										{primary?.Attribute?.name || primary?.name}
										<span className="flex gap-[5px]">
											{primary?.type === attributeType.COLOR ? (
												<Color $color={primary?.Attribute?.display} />
											) : (
												primary?.Attribute?.display
											)}
										</span>
									</Primary>
									<div className={`total ${isOver ? 'error' : ''} mr-[20px]`}>
										Total: {totalQty} / {primaryQty}
									</div>

									<DeleteBtn
										onClick={() => removeGroup(group.primaryAttribute)}
									>
										<MdDelete />
									</DeleteBtn>
								</div>

								<Options>
									{group.options.map((opt, oIndex) => {
										const attr = getAttr(opt.attribute);

										return (
											<Option key={opt.attribute}>
												<div className="left">
													{attr?.type === attributeType.COLOR && (
														<Color $color={attr?.Attribute?.display} />
													)}

													<div className="text">
														<span className="name">
															{attr?.Attribute?.name || attr?.name}
														</span>

														{attr?.type === attributeType.SIZE && (
															<span className="meta">
																{attr?.Attribute?.display}
															</span>
														)}
													</div>
												</div>

												<input
													type="number"
													value={opt.quantity}
													onChange={(e) =>
														updateQuantity(gIndex, oIndex, e.target.value)
													}
												/>
											</Option>
										);
									})}
								</Options>
							</Row>
						);
					})}
				</Content>

				{/* 🔥 FOOTER */}
				<Footer>
					<button
						type="button"
						onClick={syncGroupedVariants}
						disabled={!needsRefresh}
					>
						Refresh
					</button>

					<button onClick={clearAll} disabled={!groupedVariants.length}>
						Clear All
					</button>
				</Footer>
			</Wrapper>
		</Modal.Center>
	);
}

export default GroupedVariantsModal;
