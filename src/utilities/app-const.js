export const attributeType = {
	COLOR: 'color',
	SIZE: 'size',
	AUTO: 'auto',
};

export const ItemStatusType = {
	UNAVAILABLE: 'unavailable',
	SOLD_OUT: 'sold-out',
	AVAILABLE: 'available',
};

export const roleType = {
	SUPER_ADMIN: 'superAdmin',
	ADMIN: 'admin',
	BASIC: 'basic',
};

export const ORDER_STATUS = {
	PENDING: 'pending',
	PAID: 'paid',
	PROCESSING: 'processing',
	SHIPPED: 'shipped',
	DELIVERED: 'delivered',
	CANCELLED: 'cancelled',
	RETURNED: 'returned',
	RETURNING: 'processing-return',
};

export const CHECKOUT_TYPES = {
	USER: 'user-checkout',
	GUEST: 'guest-checkout',
};

export const WEIGHT_UNITS = ['kg', 'g', 'lb', 'oz'];

export const SHIPPING_PROVIDERS = {
	INTERNAL: 'internal',
	SHOPIFY: 'shopify',
	DHL: 'dhl',
	FEDEX: 'fedex',
};

// Only providers actually registered on the backend — mirrors
// server-src/models/shippingSettingsModel.js's ENABLED_SHIPPING_PROVIDERS.
export const ENABLED_SHIPPING_PROVIDERS = [SHIPPING_PROVIDERS.INTERNAL];

export const SHIPMENT_STATUS = {
	PENDING: 'pending',
	LABEL_CREATED: 'label_created',
	PICKED_UP: 'picked_up',
	IN_TRANSIT: 'in_transit',
	OUT_FOR_DELIVERY: 'out_for_delivery',
	DELIVERED: 'delivered',
	FAILED: 'failed',
	CANCELLED: 'cancelled',
};
