import React, { useRef, useEffect, useState } from 'react';
import Modal from '../../modal/index_modal';
import BubbleSlide from '../../loaders/bubbles/BubbleSlide';
import { IoIosCloseCircle } from 'react-icons/io';
import { HiViewGridAdd } from 'react-icons/hi';
import OTPInput from '../../form-components/OTP/OTP-input';
import { ModalWrapper, SubmitBtn } from './index.style';
import { useSelector, useDispatch } from 'react-redux';
import { reset2FaHandler } from '../../../store/slice/2fa-handler';
import { IoIosLock } from "react-icons/io";

function TwoFaModal({ CallBackAPI }) {
	const dispatch = useDispatch();
	const { isOpen, payload, url } = useSelector((state) => state.twoFaHandler);

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
		if (isOpen && payload && url) {
			openModal();
		}

		return () => {
			dispatch(reset2FaHandler());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const nextFunc = async () => {
		if (otp.length < 6) return;
		await CallBackAPI({ ...payload, token: otp });
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
					<button className="closeBtn" onClick={closeModal}>
						<IoIosCloseCircle />
					</button>
				</div>
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

				<SubmitBtn
					type="button"
					$isLoading={false}
					className="mt-[20px]"
					onClick={nextFunc}
					disabled={otp.length < 6}
				>
					<div className="content">
						<HiViewGridAdd />
						Save Address
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
