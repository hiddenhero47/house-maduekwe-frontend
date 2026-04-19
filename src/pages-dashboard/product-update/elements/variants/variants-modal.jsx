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
} from './variants-modal.style';
import { attributeType } from '../../utilities/app-const';
import { MdDelete } from 'react-icons/md';

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
	const primaryOptions = useMemo(() => {
		if (!attributes) return [];

		return attributes
			.filter((attr) => {
				const id = getId(attr);

				// lock type
				if (lockedType && attr.type !== lockedType) return false;

				// prevent duplicates
				if (groupedVariants.some((g) => g.primaryAttribute === id))
					return false;

				return true;
			})
			.map((attr) => ({
				label: attr?.Attribute?.name || attr?.name,
				value: getId(attr),
			}));
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

	return (
		<Modal.Center ref={modalRef} width="fit-content" maxWidth="900px" animation>
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
						options={primaryOptions}
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

						return (
							<Row key={group.primaryAttribute}>
								<Primary>{primary?.Attribute?.name || primary?.name}</Primary>

								<Options>
									{group.options.map((opt, oIndex) => {
										const attr = getAttr(opt.attribute);

										return (
											<Option key={opt.attribute}>
												<span>{attr?.Attribute?.name || attr?.name}</span>

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

								<DeleteBtn onClick={() => removeGroup(group.primaryAttribute)}>
									<MdDelete />
								</DeleteBtn>
							</Row>
						);
					})}
				</Content>

				{/* 🔥 FOOTER */}
				<Footer>
					<button onClick={clearAll} disabled={!groupedVariants.length}>
						Clear All
					</button>
				</Footer>
			</Wrapper>
		</Modal.Center>
	);
}

export default GroupedVariantsModal;
