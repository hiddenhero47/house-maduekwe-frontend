import styled from 'styled-components';

export const OTPInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-family: Outfit;

	.error {
		display: flex;
		align-items: center;
		gap: 5px;
		margin: 0%;
		margin-top: 3px;
		margin-left: 10px;
		font-size: 12px;
		font-weight: 400;
		line-height: 10px;
		letter-spacing: -0.01em;
		color: ${({ theme }) => theme.formInput?.errorColor};
	}
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;

export const Container = styled.div`
	/* height: fit-content; */
	display: flex;
	align-items: center;
	gap: ${(props) => props.$gap};
	padding-inline: ${(props) => (props.$paddingX ? props.$paddingX : '')};
	padding-block: ${(props) => (props.$paddingY ? props.$paddingY : '')};
`;

export const OTPInputBox = styled.input`
	width: ${({ width, $size }) => (width ? width : $size ? $size : '')};
	height: ${({ height }) => (height ? height : '')};
	aspect-ratio: ${({ $size }) => ($size ? '1/1' : '')};
	min-height: 0;
	line-height: 1;
	padding: 0;
	text-align: center;
	box-sizing: border-box;
	background-color: ${({ theme, $isActive, $useBackground }) => {
		if ($isActive) return theme.form?.sbBackground;
		if ($useBackground) return theme.form?.background;
		return '';
	}};
	border: ${({ theme, $isError, $useBackground, $isActive }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($isActive) return `1px solid ${theme?.form.sbLine}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	transition: all 0.2s ease-out;

	&:focus {
		outline: none;
		border: 1px solid ${({ theme }) => theme?.form.sbLine};
		background-color: ${({ theme, $useBackground }) =>
			$useBackground ? theme.form?.sbBackground : ''};
		color: ${({ theme }) => theme?.form.text};
	}

	&:disabled {
		color: ${({ theme }) => theme?.form?.sbText};
		border: 1px solid ${({ theme }) => theme?.form?.disabled};
	}

	&:hover {
		border: 1px solid ${({ theme }) => theme.form?.sbLine};
	}

	&.form_otp_word,
	.form_otp_word {
		font-size: ${(props) => props.$fontSize};
		font-weight: 600;
		color: ${({ theme }) => theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		display: none;
	}
`;
