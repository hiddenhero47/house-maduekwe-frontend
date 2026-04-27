import { toast } from 'react-toastify';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import moment from 'moment';

export const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export function numberToWords(number) {
	const units = [
		'Zero',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
	];

	const teens = [
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen',
	];

	const tens = [
		'',
		'',
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty',
		'Sixty',
		'Seventy',
		'Eighty',
		'Ninety',
	];

	if (number === 0) {
		return 'Zero';
	}

	if (number < 10) {
		return units[number];
	}

	if (number >= 11 && number <= 19) {
		return teens[number - 11];
	}

	const numArray = number.toString().split('').map(Number);
	const numWords = [];

	if (numArray[0] > 0) {
		numWords.push(units[numArray[0]] + ' Hundred');
	}

	if (numArray[1] > 1) {
		numWords.push(tens[numArray[1]]);
		if (numArray[2] > 0) {
			const unitWord = units[numArray[2]];
			numWords.push(unitWord);
		}
	} else if (numArray[1] === 1) {
		numWords.push(teens[numArray[2] - 1]);
	} else if (numArray[2] > 0) {
		const unitWord = units[numArray[2]];
		numWords.push(unitWord);
	}

	return numWords.join(' ');
}

export const convertFileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64String = reader.result;
			resolve(base64String);
		};
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

export function getFirstLetters(inputString) {
	const words = inputString?.split(' ');

	if (!words || words.length === 0 || !inputString) {
		return 'N/A'; // No words in the input string
	}

	if (words.length === 1) {
		const word = words[0];
		if (word.length === 1) {
			return word.repeat(2); // If it's a single letter, return it repeated
		}
		return word.slice(0, 2); // If it's a single word, return the first two letters
	}

	const firstWord = words[0];
	const secondWord = words[1];

	return `${firstWord.charAt(0)}${secondWord.charAt(0)}`;
}

export function addCommas(number) {
	if (isNaN(number)) {
		return number.toString();
	}
	const numStr = number.toString();
	const [integerPart, decimalPart] = numStr.split('.');
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	if (decimalPart !== undefined) {
		return `${formattedInteger}.${decimalPart}`;
	}

	return formattedInteger;
}

export function truncateHex({ hexString, len = 0 }) {
	if (hexString && hexString?.length > len && len > 5) {
		const prefixLength = Math.ceil((len - 5) / 2);
		const suffixLength = len - prefixLength - 3; // 3 for the ellipsis

		const prefix = hexString?.substring(0, prefixLength);
		const suffix = hexString?.substring(hexString.length - suffixLength);

		return prefix + '...' + suffix;
	}
	return hexString ?? '';
}

export function truncate({ str, len }) {
	if (str.length > len && str.length > 0) {
		let new_str = str + '';
		new_str = str.substr(0, len);
		new_str = str.substr(0, new_str.lastIndexOf(''));
		new_str = new_str.length > 0 ? new_str : str.substr(0, len);
		return new_str + '...';
	}
	return str;
}

export const copyTextToClipboard = async (text) => {
	if ('clipboard' in navigator) {
		try {
			await navigator.clipboard.writeText(text);
			toast.success('copied');
			return true;
		} catch (error) {
			console.error('Failed to copy text to clipboard:', error);
			toast.error('Failed to copy');
			return false;
		}
	} else {
		try {
			const success = document.execCommand('copy', true, text);
			if (!success) {
				console.error('Failed to copy text to clipboard.');
			}
			toast.success('copied');
			return success;
		} catch (error) {
			console.error('Failed to copy text to clipboard:', error);
			toast.error('Failed to copy');
			return false;
		}
	}
};

export function formatPhoneNumber(phoneNumber) {
	const parsedNumber =
		phoneNumber && parsePhoneNumberFromString(phoneNumber?.toString());
	if (parsedNumber) {
		return parsedNumber.formatInternational();
	}
	return phoneNumber; // Return the original if parsing fails
}

export function getPeriod(period) {
	const today = moment();

	let startDate;
	let endDate = today.clone().endOf('day');

	switch (period) {
		case 'this-week':
			startDate = today.clone().subtract(7, 'days').startOf('day');
			break;
		case 'this-month':
			startDate = today.clone().subtract(1, 'months').startOf('day');
			break;
		case 'this-year':
			startDate = today.clone().subtract(1, 'years').startOf('day');
			break;
		case 'old':
			startDate = today.clone().subtract(10, 'years').startOf('day');
			break;
		default:
			startDate = today.clone().startOf('day');
			break;
	}

	return {
		start: startDate.format('YYYY-MM-DD'),
		end: endDate.format('YYYY-MM-DD'),
	};
}

export const getFromLocalStorage = (value) => {
	if (!value || typeof window === 'undefined') {
		return '';
	}
	return localStorage.getItem(value);
};

export const getCurrencySymbol = (currencyCode = 'USD') => {
	try {
		const formatter = new Intl.NumberFormat('en', {
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		return (
			formatter.formatToParts(1).find((part) => part.type === 'currency')
				?.value || currencyCode
		);
	} catch (err) {
		return currencyCode;
	}
};

export const groupAttributesByType = (attributes = []) => {
	if (!attributes) return [];
	return attributes.reduce((acc, item) => {
		const type = item?.Attribute?.type ?? item?.type;

		if (!type) return acc;

		if (!acc[type]) {
			acc[type] = [];
		}

		acc[type].push(item);

		return acc;
	}, {});
};

export const generateColorImage = (colors, width = 40, height = 40) => {
	if (!colors) return '';

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) return '';

	canvas.width = width;
	canvas.height = height;

	const colorArray = Array.isArray(colors) ? colors : [colors];

	if (colorArray.length > 1) {
		// diagonal gradient
		const gradient = ctx.createLinearGradient(0, 0, width, height);

		colorArray.forEach((color, index) => {
			gradient.addColorStop(index / (colorArray.length - 1), color);
		});

		ctx.fillStyle = gradient;
	} else {
		ctx.fillStyle = colorArray[0];
	}

	ctx.fillRect(0, 0, width, height);

	return canvas.toDataURL('image/png');
};

export const buildShopItemFormData = (values) => {
	const {
		imageFiles,
		imageCatalog, // discard
		categorySearchValue, // discard
		colorSearchValue, // discard
		sizeSearchValue, // discard
		attributes,
		...others
	} = values;

	const formData = new FormData();

	// ✅ Format attributes
	const formattedAttributes = Array.isArray(attributes)
		? attributes.map((attr) => ({
				...attr,
				Attribute:
					typeof attr.Attribute === 'object'
						? attr.Attribute._id
						: attr.Attribute,
			}))
		: [];

	// ✅ Build clean payload
	const payload = {
		...others,
		attributes: formattedAttributes,
	};

	const cleanedPayload = Object.fromEntries(
		Object.entries(payload).filter(
			([_, value]) => value !== undefined && value !== null
		)
	);

	// 🔥 IMPORTANT: Send everything as ONE JSON string
	formData.append('data', JSON.stringify(cleanedPayload));

	// ✅ Append images separately
	if (Array.isArray(imageFiles) && imageFiles.length > 0) {
		imageFiles.forEach((file) => {
			formData.append('imageCatalog', file);
		});
	}

	return formData;
};

export const preloadVideo = (src) => {
	return new Promise((resolve, reject) => {
		const video = document.createElement('video');

		video.src = src;
		video.preload = 'auto';

		video.oncanplaythrough = () => resolve(true);
		video.onerror = reject;

		video.load();
	});
};

export const getAttrKey = (a) => {
	if (!a?.Attribute) return null;

	return typeof a.Attribute === 'object'
		? a.Attribute._id?.toString()
		: a.Attribute?.toString();
};

export const groupedVariantsChecker = ({
	selectedAttributes,
	quantity,
	shopItem,
}) => {
	if (!shopItem?.groupedVariants?.length) return { ok: true };

	if (!selectedAttributes?.length) return { ok: false };

	const selectedIds = selectedAttributes.map(getAttrKey).filter(Boolean);

	const primarySet = new Set(
		shopItem.groupedVariants.map((g) =>
			g.primaryAttribute?.toString()
		)
	);

	const primary = selectedIds.find((id) => primarySet.has(id));
	if (!primary) return { ok: false };

	const group = shopItem.groupedVariants.find(
		(g) => g.primaryAttribute?.toString() === primary
	);

	const option = group?.options?.find((opt) =>
		selectedIds.includes(opt.attribute?.toString())
	);

	if (!option) return { ok: false, reason: 'invalid_combination' };

	if (option.quantity < quantity) {
		return {
			ok: false,
			reason: 'insufficient_stock',
			available: option.quantity,
		};
	}

	return { ok: true };
};

export const attributesError = ({
	currentAttr,
	otherAttr,
	shopItem,
	quantity,
}) => {
	const grouped = shopItem?.groupedVariants || [];

	// 🟢 1. No grouped variants → fallback Only one selected → check its own quantity
	if (grouped.length === 0 || !otherAttr) {
		const attr = shopItem?.attributes?.find(
			(a) => getAttrKey(a) === getAttrKey(currentAttr)
		);

		return attr ? attr.quantity >= quantity : true;
	}

	// 🟢 2. Both selected → find relationship
	const currentId = getAttrKey(currentAttr);
	const otherId = getAttrKey(otherAttr);

	// try: other is primary
	const group = grouped.find((g) => g.primaryAttribute?.toString() === otherId);

	if (group) {
		const option = group.options.find(
			(opt) => opt.attribute?.toString() === currentId
		);

		return option ? option.quantity >= quantity : false;
	}

	// try: current is primary
	const reverseGroup = grouped.find(
		(g) => g.primaryAttribute?.toString() === currentId
	);

	if (reverseGroup) {
		const option = reverseGroup.options.find(
			(opt) => opt.attribute?.toString() === otherId
		);

		return option ? option.quantity >= quantity : false;
	}

	// 🟡 fallback safety
	return true;
};
