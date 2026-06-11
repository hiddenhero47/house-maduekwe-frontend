import React from 'react';
import { IoClose } from 'react-icons/io5';
import {
	HiCheckCircle,
	HiExclamationCircle,
	HiInformationCircle,
} from 'react-icons/hi';
import { BiSolidInfoSquare } from "react-icons/bi";
import { HiExclamationTriangle } from 'react-icons/hi2';
import { ToastWrapper, IconHolder, ProgressBar } from './custom-toast.style';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../../utilities/colors';
import { useSelector } from 'react-redux';

const config = {
	success: {
		title: 'Success',
		color: '#16a34a',
		icon: <HiCheckCircle />,
	},
	error: {
		title: 'Error',
		color: '#dc2626',
		icon: <HiExclamationCircle />,
	},
	info: {
		title: 'Info',
		color: '#2563eb',
		icon: <BiSolidInfoSquare />,
	},
	warning: {
		title: 'Warning',
		color: '#d97706',
		icon: <HiExclamationTriangle />,
	},
};

function CustomToast({
	type,
	message,
	closeToast,
	toastId,
	actionText,
	onAction,
	toastProps,
	isPaused,
}) {
	const item = config[type];
	const { theme } = useSelector((state) => state.themes);
	const duration = toastProps?.autoClose || 5000;

	return (
		<ThemeProvider theme={{ mode: theme, ...colors[theme] }}>
			<ToastWrapper $color={item.color}>
				<div className="flex items-center">
					<IconHolder $color={item.color}>{item.icon}</IconHolder>

					<div className="content">
						<div className="title">{item.title} message</div>

						<div className="message font-sans">{message}</div>
					</div>

					{actionText && onAction && (
						<button
							className="action"
							onClick={() => {
								onAction();
								closeToast?.();
							}}
						>
							{actionText}
						</button>
					)}

					<div className="progress_wrapper">
						<ProgressBar
							$color={item.color}
							$duration={duration}
							$paused={isPaused}
						/>
					</div>
				</div>

				<button className="close" onClick={closeToast}>
					<IoClose />
				</button>
			</ToastWrapper>
		</ThemeProvider>
	);
}

export default CustomToast;
