import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './driver-theme.css';

let activeDriver = null;
const tourQueue = [];
let suppressPersist = false;

console.log(suppressPersist, 'suppressPersist');

export const runTour = ({ tourKey, steps, options = {} }) => {
	if (!tourKey) {
		throw new Error('runTour: "tourKey" is required.');
	}

	if (!Array.isArray(steps) || steps.length === 0) {
		throw new Error('runTour: "steps" must be a non-empty array.');
	}

	const guides = getTourGuides();

	if (guides?.[tourKey]) return;

	// Don't queue the same tour twice
	if (activeDriver || tourQueue.some((tour) => tour.tourKey === tourKey)) {
		return;
	}

	tourQueue.push({
		tourKey,
		steps,
		options,
	});

	runNextTour();
};

const startTour = ({ tourKey, steps, options }) => {
	activeDriver = driver({
		showProgress: true,
		allowClose: true,
		overlayOpacity: 0.65,
		animate: true,
		smoothScroll: true,
		stagePadding: 8,
		nextBtnText: 'Next',
		prevBtnText: 'Back',
		doneBtnText: 'Done',
		...options,

		onDestroyed: () => {
			try {
				if (!suppressPersist) {
					updateTourGuide(tourKey);
				}
				suppressPersist = false;
				options.onDestroyed?.();
			} finally {
				activeDriver = null;
				runNextTour();
			}
		},
	});

	activeDriver.setSteps(steps);
	activeDriver.drive();
};

const runNextTour = () => {
	if (activeDriver) return;

	const next = tourQueue.shift();

	if (!next) return;

	startTour(next);
};

export const getFromLocalStorage = (value) => {
	if (!value || typeof window === 'undefined') {
		return '';
	}
	return localStorage.getItem(value);
};

export const TOUR_STORAGE_KEY = 'app-tour-guides';

export const getTourGuides = () => {
	try {
		const value = getFromLocalStorage(TOUR_STORAGE_KEY);

		return value ? JSON.parse(value) : {};
	} catch {
		return {};
	}
};

export const updateTourGuide = (key, value = true) => {
	const guides = getTourGuides();

	localStorage.setItem(
		TOUR_STORAGE_KEY,
		JSON.stringify({
			...guides,
			[key]: value,
		})
	);
};

export const closeActiveTour = ({ persist = true } = {}) => {
	suppressPersist = !persist;
	activeDriver?.destroy();
	suppressPersist = false;
};
