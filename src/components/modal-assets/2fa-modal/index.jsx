import React, { useRef, useEffect, useState } from 'react';
import Modal from '../../modal/index_modal';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import OTPInput from '../../form-components/OTP/OTP-input';
import { ModalWrapper, SubmitBtn } from './index.style';
import { useSelector, useDispatch } from 'react-redux';
import { reset2FaHandler } from '../../../store/slice/2fa-handler';
import { IoLockClosedOutline } from 'react-icons/io5';
import { IoLockOpenOutline } from 'react-icons/io5';
import { executeTwoFaRetry } from './retry-manager';

function TwoFaModal() {
	const dispatch = useDispatch();
	const { isOpen } = useSelector((state) => state.twoFaHandler);

	const [isLoading, setIsLoading] = useState(false);

	const [otp, setOtp] = useState('');

	const modalRef = useRef(null);
	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.open();
		}
	};
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	useEffect(() => {
		if (isOpen) {
			openModal();
		}
	}, [isOpen]);

	const nextFunc = async () => {
		if (otp.length < 6 || isLoading) return;

		try {
			setIsLoading(true);
			await executeTwoFaRetry(otp);

			setOtp('');
			closeModal();
			dispatch(reset2FaHandler());
		} catch (err) {
			console.log(err);
			// If invalid token, modal stays open
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => dispatch(reset2FaHandler())}
			onOpen={() => {}}
			refName={modalRef}
			animation={true}
		>
			<ModalWrapper>
				<div className="modal_header">
					<button
						className="closeBtn"
						onClick={() => {
							closeModal();
							dispatch(reset2FaHandler());
						}}
					>
						<IoIosCloseCircle />
					</button>
				</div>

				<div className="icon_wrapper">
					<IoLockClosedOutline />
				</div>

				<div className="text_content">
					<h3>Two-Factor Authentication</h3>
					<p>Enter the 6-digit code from your authenticator app</p>
				</div>

				<div className="otp_wrapper">
					<OTPInput
						onChange={(value) => setOtp(value)}
						field={6}
						id="AuthOTP"
						size="45px"
						fontSize="22px"
						paddingY="5px"
						gap="10px"
						useBackground
					/>
				</div>

				<SubmitBtn
					type="button"
					$isLoading={isLoading}
					className="mt-[20px]"
					onClick={nextFunc}
					disabled={otp.length < 6 || isLoading}
				>
					<div className="content">
						<IoLockOpenOutline />
						Continue
					</div>
					<div className="loader">
						<BubbleSlide color="var(--addToCart-text)" height="20px" />
					</div>
				</SubmitBtn>
			</ModalWrapper>
		</Modal.Center>
	);
}

export default TwoFaModal;
