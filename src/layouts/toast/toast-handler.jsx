import { toast as reactToast } from 'react-toastify';
import CustomToast from './components/custom-toast';

const createToast =
	(type) =>
	(message, options = {}) =>
		reactToast(
			({ closeToast, toastProps, isPaused }) => (
				<CustomToast
					type={type}
					message={message}
					closeToast={closeToast}
					toastId={toastProps.toastId}
					actionText={options.actionText}
					onAction={options.onAction}
					isPaused={isPaused}
				/>
			),
			{
				closeButton: false,
				icon: false,
				toastId: options.toastId,
				...options,
			}
		);

export const toast = {
	success: createToast('success'),
	error: createToast('error'),
	info: createToast('info'),
	warning: createToast('warning'),
	warn: createToast('warning'),
	dismiss: reactToast.dismiss,
};
