import React from 'react';
import { IoClose } from 'react-icons/io5';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { BiSolidInfoSquare } from 'react-icons/bi';
import { HiExclamationTriangle } from 'react-icons/hi2';
import { ToastWrapper, IconHolder, ProgressBar } from './custom-toast.style';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../../utilities/colors';
import { useSelector } from 'react-redux';
import { RxTokens } from 'react-icons/rx';

import AppLogo from '../../../assets/images/app-logo.svg?react';
import { VectorIcon } from '../../../components/icon-components/index.style';

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
				<div className="flex">
					<IconHolder $color={item.color}>
						<VectorIcon width="18px" height="18px" vector={AppLogo} />
					</IconHolder>

					<div className="flex flex-col">
						<div className="content">
							{/* <div className="title font-sans">{item.title}</div> */}
							<div className="title font-sans">Hello</div>

							<div className="message font-sans">{message}</div>
						</div>
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

					{/* <div className="progress_wrapper">
						<ProgressBar
							$color={item.color}
							$duration={duration}
							$paused={isPaused}
						/>
					</div> */}
				</div>

				<button className="close" onClick={closeToast}>
					<IoClose />
				</button>
			</ToastWrapper>
		</ThemeProvider>
	);
}

export default CustomToast;
