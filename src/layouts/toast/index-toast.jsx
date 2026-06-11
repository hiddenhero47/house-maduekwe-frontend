import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function AppToast() {
	const { theme } = useSelector((state) => state.themes);
	return (
		<>
			<ToastContainer
				theme={theme === 'light' ? 'light' : 'dark'}
				closeButton={false}
				icon={false}
				hideProgressBar
				toastClassName="custom-toast-wrapper"
				bodyClassName="custom-toast-body"
			/>
		</>
	);
}

export default AppToast;
