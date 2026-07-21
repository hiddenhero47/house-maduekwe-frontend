import {
	groupAttributesByType,
	groupedVariantsChecker,
} from './basic-functions';
import { toast } from '../layouts/toast/toast-handler';

/**
 * Validate product attribute selection and stock
 */
export const validateProductSelection = ({
	product,
	attribute,
	quantity = 1,
}) => {
	const attributeGroup = groupAttributesByType(product?.attributes);

	if (!attribute.currentSize) {
		toast.warning('Size not selected');
		return { ok: false };
	}

	if (!attribute.currentColor && attributeGroup.color.length > 1) {
		toast.warning('Color not selected');
		return { ok: false };
	}

	const selectedColor = attribute.currentColor ?? attributeGroup?.color?.[0];

	const selectedAttributes = [
		...(selectedColor ? [selectedColor] : []),
		...(attribute.currentSize ? [attribute.currentSize] : []),
	];

	const check = groupedVariantsChecker({
		selectedAttributes,
		shopItem: product,
		quantity,
	});

	if (!check.ok) {
		if (check.reason === 'invalid_combination') {
			toast.warning('This combination is not available');
		} else if (check.reason === 'insufficient_stock') {
			toast.warning(`Only ${check.available} left in stock`);
		} else {
			toast.warning('Out of stock');
		}

		return { ok: false };
	}

	return {
		ok: true,
		selectedAttributes,
	};
};

/**
 * Add item to holdings
 */
export const handleHolding = ({
	product,
	attribute,
	quantity = 1,
	dispatch,
	addToHoldingsAction,
	afterSuccess,
}) => {
	const result = validateProductSelection({
		product,
		attribute,
		quantity,
	});

	if (!result.ok) return;

	const selectedItem = {
		shopItem: product,
		quantity,
		selectedAttributes: result.selectedAttributes,
	};

	dispatch(addToHoldingsAction(selectedItem));

	if (afterSuccess) afterSuccess(selectedItem);

	return selectedItem;
};

/**
 * Add item to cart
 */
export const handleCartServer = ({
	product,
	attribute,
	quantity = 1,
	activeUser,
	navigate,
	addToCart,
	dispatch,
	afterSuccess,
	holding, // callback
}) => {
	if (!activeUser) {
		toast.info('User not logged in, moving item to holding');

		setTimeout(() => {
			holding(); // call the component-specific holding logic
		}, 2000);

		return;
	}

	const result = validateProductSelection({
		product,
		attribute,
		quantity,
	});

	if (!result.ok) return;

	const selectedItem = {
		shopItem: product?._id,
		quantity,
		selectedAttributes: result.selectedAttributes,
	};

	if (addToCart) {
		addToCart({ itemList: [selectedItem] });
	}

	if (dispatch && afterSuccess) {
		dispatch(afterSuccess(selectedItem));
	} else if (afterSuccess) {
		afterSuccess(selectedItem);
	}

	return selectedItem;
};
