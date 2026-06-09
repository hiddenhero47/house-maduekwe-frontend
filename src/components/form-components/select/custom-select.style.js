import styled, { css } from 'styled-components';

export const CustomSelectContainer = styled.div`
	position: relative;
	width: 100%; /* Adjust the width as needed */
`;

export const CustomSelectValue = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 17.633px;
	padding-inline: ${({ $paddingX }) => ($paddingX ? $paddingX : '')};
	padding-block: ${({ $paddingY }) => ($paddingY ? $paddingY : '')};
	box-sizing: border-box;
	cursor: pointer;
	position: relative;
	transition: all 0.2s;
	gap: 7px;
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	background-color: ${({ theme, $useBackground, $isOpen }) => {
		if (!$useBackground) return '';
		return $isOpen ? theme.form?.sbBackground : theme.form?.background;
	}};
	border: ${({ theme, $isError, $isOpen, $useBackground, $disabled }) => {
		if ($disabled) return `1px solid ${theme?.form?.disabled}`;
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($isOpen) return `1px solid ${theme?.form.sbLine}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};

	&:hover {
		border: ${({ theme, $useBackground }) => {
			if ($useBackground) return `1px solid ${theme?.form.sbLine}`;
			return '';
		}};
	}

	.form_word {
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		color: ${({ theme, $disabled }) =>
			$disabled ? theme.form?.disableText : theme?.form.text};

		&:hover {
			color: ${({ theme }) => theme?.form.text};
		}

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	.placeholder {
		color: ${({ theme }) => theme?.form.sbText};

		&:hover {
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	.label {
		overflow-x: auto;
	}

	.arrow {
		width: fit-content;
		height: 100%;
		transition: all 0.4s;
		cursor: pointer;
		pointer-events: none;
		position: absolute;
		right: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${({ theme }) => theme?.form.sbText};
	}

	.imageContainer {
		height: 19px;
		width: 19px;
	}

	input {
		border: 0px solid transparent;
		&:focus {
			border-color: transparent;
			outline: none;
			box-shadow: none;
		}
	}
`;

export const SelectOptions = styled.div`
	padding-top: 10px;
	padding-bottom: 15px;
	padding-inline: 5px;
	position: absolute;
	top: 110%;
	left: 0;
	width: 100%;
	max-height: 200px;
	margin-left: -1px;
	border: 1px solid ${({ theme }) => theme.formInput?.borderColor};
	border-radius: 5px;
	display: ${({ open }) => (open ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	z-index: 1;
	background-color: ${({ theme }) => theme.formInput?.menuBg};
	transition: all 0.4s;
	color: ${({ theme }) => theme.formInput?.menuTx};

	.wrapper {
		flex: 1;
		width: 100%;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3px;
			height: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgb(166, 171, 183, 0.7);
			border-radius: 40px;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
	}
`;

export const MenuDialog = styled.dialog.withConfig({
	shouldForwardProp: (prop) => prop !== 'closedBy',
})`
	padding-top: 10px;
	padding-bottom: 15px;
	padding-inline: 5px;
	position: absolute;
	top: 110%;
	width: 100%;
	max-height: 200px;
	margin-inline: auto;
	border: 1px solid ${({ theme }) => theme?.form.menuBorder};
	border-radius: 5px;
	display: ${({ $open }) => ($open ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	z-index: 2;
	background-color: ${({ theme }) => theme?.form.menuBg};
	transition: all 0.4s;
	color: ${({ theme }) => theme?.form.menuText};

	@supports (hanging-punctuation: first) and (font: -apple-system-body) and
		(-webkit-appearance: none) {
		min-height: 200px;
		&::backdrop {
			display: none !important;
			background-color: transparent !important;
			background: transparent !important;
			pointer-events: none !important;
			opacity: 0 !important;
		}
	}

	.wrapper {
		flex: 1;
		width: 100%;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3px;
			height: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgb(166, 171, 183, 0.7);
			border-radius: 40px;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
	}
`;

export const Option = styled.div`
	width: 100%;
	font-size: 13px;
	font-weight: 600;
	border-radius: 5px;
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	padding: 8px 15px;
	cursor: pointer;
	color: ${({ theme, selected }) =>
		selected ? theme?.form.menuSbText : theme?.form.menuText};
	gap: 5px;
	background: ${({ theme, selected }) =>
		selected ? theme?.form.menuActive : 'transparent'};

	.imageContainer {
		height: 20px;
		width: 20px;
	}

	&:hover {
		background: ${({ theme }) => theme?.form.menuActive};
		color: ${({ theme }) => theme?.form.menuSbText};
	}
`;

export const ImageHolder = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	border-radius: 3px;

	img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		object-fit: cover;
	}
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;

export const SearchBox = styled.div`
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme?.form.line};
	transition: border-color 0.1s;
	padding: 7px 12px;
	margin-bottom: 8px;

	&:focus-within {
		border-color: ${({ theme }) => theme?.form.line};
	}

	button {
		color: ${({ theme }) => theme?.form.sbText};
		padding: 0;
		border: 0 solid transparent;
		background-color: transparent;
	}

	.myInput {
		padding: 0;
		width: 93%;
		background-color: transparent;
		font-family: Outfit;
		font-size: 14px;
		font-weight: 400;
		line-height: 12px;
		letter-spacing: 0em;
		color: ${({ theme }) => theme?.form.text};

		&::placeholder {
			color: ${({ theme }) => theme?.form.sbText};
		}

		&:focus {
			outline: none;
			border-color: transparent;
		}
	}

	@media (min-width: 745px) and (max-width: 860px) {
		max-width: 100%;
		width: 95%;
		margin-left: auto;
		margin-right: auto;
	}
`;

export const SelectControl = styled.div`
	display: flex;
	flex-direction: column;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	margin-inline: ${(props) => (props.$marginX ? props.$marginX : '0')};
	margin-block: ${(props) => (props.$marginY ? props.$marginY : '0')};

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
