import styled from 'styled-components';

export const MyInput = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 17.633px;
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
	cursor: pointer;

	input {
		flex-grow: 1;
		flex-basis: 0;
		border: 0px solid transparent;
		&:focus {
			border-color: transparent;
			outline: none;
			box-shadow: none;
		}
	}

	&.form_word,
	.form_word {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		color: ${({ theme, $disabled }) =>
			$disabled ? theme.formInput?.placeholder : theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	&:focus-within {
		outline: none;
		border: ${({ theme, $useBackground }) => {
			if ($useBackground) return `1px solid ${theme?.form.sbLine}`;
			return '';
		}};
		background-color: ${({ theme, $useBackground }) =>
			$useBackground ? theme.form?.sbBackground : ''};
		color: ${({ theme }) => theme?.form.text};
	}

	&:hover {
		border: ${({ theme, $useBackground }) => {
			if ($useBackground) return `1px solid ${theme?.form.sbLine}`;
			return '';
		}};
	}

	input[type='date']::-webkit-inner-spin-button,
	input[type='date']::-webkit-calendar-picker-indicator {
		display: none;
		-webkit-appearance: none;
	}
`;

export const Eyes = styled.button`
	display: flex;
	color: ${(props) =>
		props.$type === 'text'
			? ({ theme }) => theme?.form.text
			: ({ theme }) => theme?.form.sbText};
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;
