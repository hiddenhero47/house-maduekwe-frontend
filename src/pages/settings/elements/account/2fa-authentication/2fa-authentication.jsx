import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { copyTextToClipboard } from '../../../../../utilities/basic-functions';
import OTPInput from '../../../../../components/form-components/OTP/OTP-input';
import {
	TwoFAWrapper,
	Card,
	HeaderRow,
	GenerateButton,
	ToggleButton,
	SetupPanel,
	StepText,
	CodeBox,
	EnableButton,
	StatusBadge,
} from './2fa-authentication.style';
import { FiCopy } from 'react-icons/fi';
import { MdOutlineToggleOff, MdOutlineToggleOn } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import UserServices from '../../../../../features/services/custom-hooks/user';
import BubbleSlide from '../../../../../components/loaders/bubbles/BubbleSlide';
import Spinner from '../../../../../components/loaders/spinners/Spinner';

function TwoFAauthentication() {
	const { user } = useSelector((state) => state.auth);

	const [qrData, setQrData] = useState(null);
	const [otp, setOtp] = useState('');

	const enabled = user?.user2fa?.enabled;

	const { mutate: setup2fa, isPending: settingUp } = UserServices.setup2fa();

	const { mutate: verify2fa, isPending: verifying } = UserServices.verify2fa();

	const { mutate: toggle2fa, isPending: toggling } = UserServices.toggle2fa();

	const handleGenerate = () => {
		setup2fa(undefined, {
			onSuccess: (data) => {
				setQrData(data); // contains tempSecret + qrCodeDataURL
			},
		});
	};

	const handleEnable = () => {
		if (otp.length < 6) return;

		verify2fa(otp, {
			onSuccess: () => {
				setQrData(null);
				setOtp('');
			},
		});
	};

	const handleToggle = () => {
		toggle2fa(!enabled);
	};

	return (
		<TwoFAWrapper>
			<Card>
				<HeaderRow>
					<div>
						<h3>Two-Factor Authentication</h3>
						<StatusBadge $enabled={enabled}>
							{enabled ? 'Enabled' : 'Disabled'}
						</StatusBadge>
					</div>

					<ToggleButton
						onClick={handleToggle}
						$isLoading={toggling}
						disabled={toggling}
					>
						<div className="content">
							{enabled ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
						</div>

						<div className="loader">
							<Spinner thin='25px' />
						</div>
					</ToggleButton>
				</HeaderRow>

				{!enabled && !qrData && (
					<GenerateButton
						onClick={handleGenerate}
						$isLoading={settingUp}
						disabled={settingUp}
					>
						<div className="content">Generate QR Code</div>

						<div className="loader">
							<BubbleSlide height="18px" color="var(--addToCart-text)" />
						</div>
					</GenerateButton>
				)}

				{qrData?.otpauth && (
					<SetupPanel>
						<div className="left">
							<StepText>
								1. Download Google Authenticator from App Store or Play Store.
							</StepText>
							<StepText>
								2. Scan the QR code or enter the secret key manually.
							</StepText>
							<StepText>
								3. Enter the 5-digit code below and enable 2FA.
							</StepText>
						</div>

						<div className="right">
							<div className="qrBox">
								<QRCode
									style={{
										maxHeight: '100%',
										height: 'auto',
										maxWidth: '100%',
										width: '100%',
									}}
									value={qrData?.otpauth}
									bgColor="transparent"
									fgColor="var(--mainBody-text)"
								/>
							</div>

							<CodeBox>
								<span>{qrData?.tempSecret}</span>
								<button onClick={() => copyTextToClipboard(qrData?.otpauth)}>
									<FiCopy size={14} />
								</button>
							</CodeBox>

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

							<EnableButton
								$isLoading={verifying}
								disabled={otp.length < 6 || verifying}
								onClick={handleEnable}
							>
								<div className="content">Enable 2FA</div>

								<div className="loader">
									<BubbleSlide height="18px" color="var(--addToCart-text)" />
								</div>
							</EnableButton>
						</div>
					</SetupPanel>
				)}
			</Card>
		</TwoFAWrapper>
	);
}

export default TwoFAauthentication;
