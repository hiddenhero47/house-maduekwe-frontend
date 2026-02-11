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

function TwoFAauthentication() {
	const { user } = useSelector((state) => state.auth);

	const [qrGenerated, setQrGenerated] = useState(false);
	const [otp, setOtp] = useState('');
	const [enabled, setEnabled] = useState(user?.user2fa?.enabled || false);

	const data = { code: 'DF6VEQJUH4HFJFJH34F' };

	const handleGenerate = () => {
		setQrGenerated(true);
	};

	const handleEnable = () => {
		if (otp.length < 5) return;
		setEnabled(true);
		setQrGenerated(false);
	};

	const handleToggle = () => {
		if (enabled) {
			setEnabled(false);
			setQrGenerated(false);
		}
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

					<ToggleButton onClick={handleToggle}>
						{enabled ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
					</ToggleButton>
				</HeaderRow>

				{!enabled && !qrGenerated && (
					<GenerateButton onClick={handleGenerate}>
						Generate QR Code
					</GenerateButton>
				)}

				{qrGenerated && (
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
									value={data.code}
									bgColor="transparent"
									fgColor="var(--mainBody-text)"
								/>
							</div>

							<CodeBox>
								<span>{data.code}</span>
								<button onClick={() => copyTextToClipboard(data.code)}>
									<FiCopy size={14} />
								</button>
							</CodeBox>

							<OTPInput
								onChange={(value) => setOtp(value)}
								field={5}
								id="AuthOTP"
								size="45px"
								fontSize="22px"
								paddingY="5px"
								gap="10px"
								useBackground
							/>

							<EnableButton disabled={otp.length < 5} onClick={handleEnable}>
								Enable 2FA
							</EnableButton>
						</div>
					</SetupPanel>
				)}
			</Card>
		</TwoFAWrapper>
	);
}

export default TwoFAauthentication;
