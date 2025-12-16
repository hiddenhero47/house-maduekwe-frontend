import styled from 'styled-components';

export const InputWrapper = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;

export const MyInput = styled.input`
	width: 100%;
	background-color: ${({ theme, $useBackground }) =>
		$useBackground ? theme.form?.background : ''};
	border: ${({ theme, $isError, $useBackground }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	transition: all 0.2s ease-out;
	padding-inline: ${({ $paddingX }) => ($paddingX ? $paddingX : '')};
	padding-block: ${({ $paddingY }) => ($paddingY ? $paddingY : '')};

	&.form_word,
	.form_word {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		color: ${({ theme }) => theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	&:disabled {
		color: ${({ theme }) => theme?.form?.sbText};
		border: 1px solid ${({ theme }) => theme?.form?.disabled};
	}

	&:hover {
		border: 1px solid ${({ theme }) => theme.form?.sbLine};
	}

	&:focus {
		outline: none;
		border: 1px solid ${({ theme }) => theme?.form.sbLine};
		background-color: ${({ theme, $useBackground }) =>
			$useBackground ? theme.form?.sbBackground : ''};
		color: ${({ theme }) => theme?.form.text};
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		display: none;
	}
`;

export const MyTextarea = styled.textarea`
	width: 100%;
	max-width: 100%;
	min-height: ${(props) => props.$maxHeight || '56px'};
	max-height: ${(props) => props.$minHeight || '76px'};
	background-color: ${({ theme, $useBackground }) =>
		$useBackground ? theme.form?.background : ''};
	border: ${({ theme, $isError, $useBackground }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	transition: all 0.2s ease-out;
	padding-inline: ${({ $paddingX }) => ($paddingX ? $paddingX : '')};
	padding-block: ${({ $paddingY }) => ($paddingY ? $paddingY : '')};

	&.form_word,
	.form_word {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		color: ${({ theme }) => theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	&:disabled {
		color: ${({ theme }) => theme?.form?.sbText};
		border: 1px solid ${({ theme }) => theme?.form?.disabled};
	}

	&:hover {
		border: 1px solid ${({ theme }) => theme.form?.sbLine};
	}

	&:focus {
		outline: none;
		border: 1px solid ${({ theme }) => theme?.form.sbLine};
		background-color: ${({ theme, $useBackground }) =>
			$useBackground ? theme.form?.sbBackground : ''};
		color: ${({ theme }) => theme?.form.text};
	}

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		display: none;
	}
`;

export const InputControl = styled.div`
	display: flex;
	flex-direction: column;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	margin-inline: ${(props) => (props.$marginX ? props.$marginX : '')};
	margin-block: ${(props) => (props.$marginY ? props.$marginY : '')};

	label {
		color: ${({ theme }) => theme.formInput?.placeholder};
		transition: all 0.1s ease-out;
		font-family: Outfit;
		font-size: 16px;
		font-weight: 600;
		line-height: 23px;
		letter-spacing: 0em;
		margin-bottom: 10px;
	}

	&:focus-within {
		label {
			color: ${({ theme }) => theme.formInput?.label};
		}
	}

	@media (max-width: 500px) {
		label {
			font-size: 14px;
			font-weight: 600;
			line-height: 16px;
			letter-spacing: 0em;
			margin-bottom: 5.7px;
		}
	}
`;
