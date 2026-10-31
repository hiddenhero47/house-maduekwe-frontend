// Single source of truth for the public social links used across the
// footer, auth page, and both sidebars — set the real handles once via
// VITE_SOCIAL_* in .env instead of editing each place that links out.
export const SOCIAL_LINKS = {
	instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com',
	x: import.meta.env.VITE_SOCIAL_X || 'https://twitter.com',
	tiktok: import.meta.env.VITE_SOCIAL_TIKTOK || 'https://tiktok.com',
};
