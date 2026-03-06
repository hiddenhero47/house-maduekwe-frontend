import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const TwoFAWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const Card = styled.div`
	width: 100%;
	max-width: 950px;
	background: ${({ theme }) => theme.mainBody.container};
	border: 1px solid ${({ theme }) => theme.mainBody.cardLine};
	border-radius: 18px;
	padding: 30px;
	animation: ${fadeIn} 0.3s ease;
`;

export const HeaderRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	h3 {
		font-size: 18px;
		font-weight: 600;
	}
`;

export const StatusBadge = styled.span`
	display: inline-block;
	margin-top: 5px;
	font-size: 12px;
	font-weight: 600;
	padding: 4px 10px;
	border-radius: 999px;

	background: ${({ $enabled, theme }) =>
		$enabled ? 'rgba(48,130,66,0.15)' : theme.mainBody.toolkitActive};

	color: ${({ $enabled, theme }) =>
		$enabled ? theme.form.green : theme.mainBody.sbText};
`;

export const ToggleButton = styled.button`
	font-size: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	color: ${({ theme }) => theme.mainBody.sbText};
	transition: all 0.2s ease;

	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	.content {
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		display: flex;
		align-items: center;
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
	}

	&:hover {
		transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.05)')};
		color: ${({ disabled, theme }) =>
			disabled ? theme.mainBody.sbText : theme.intro.logo};
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const GenerateButton = styled.button`
	margin-top: 25px;
	padding: 10px 16px;
	border-radius: 8px;
	font-size: 15px;
	font-weight: 600;
	width: 250px;

	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	background: ${({ theme }) => theme.basicBtn.bgActive};
	color: ${({ theme }) => theme.basicBtn.textActive};
	transition: 0.2s;

	.content {
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

export const SetupPanel = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 35px;
	gap: 40px;

	@media (max-width: 900px) {
		flex-direction: column;
	}

	.left {
		flex: 1;
	}

	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}

	.qrBox {
		border: 12px solid ${({ theme }) => theme.mainBody.toolkitBgGlass};
		max-width: 251px;
		max-height: 251px;
		width: 50%;
		margin-inline: auto;
		border-radius: 6px;
	}
`;

export const StepText = styled.p`
	font-size: 14px;
	margin-bottom: 15px;
	color: ${({ theme }) => theme.mainBody.sbText};
`;

export const CodeBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 250px;
	padding: 8px 12px;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.mainBody.cardLine};
	background: ${({ theme }) => theme.mainBody.background};

	span {
		font-weight: 600;
		font-size: 13px;
	}

	button {
		background: transparent;
		display: flex;
		align-items: center;
	}
`;

export const EnableButton = styled.button`
	width: 250px;
	padding: 10px;
	border-radius: 10px;
	font-weight: 600;
	font-size: 15px;

	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	background: ${({ theme }) => theme.formBtn.background};
	color: ${({ theme }) => theme.formBtn.text};
	transition: 0.2s;

	.content {
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	}

	.loader {
		display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
		position: absolute;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
