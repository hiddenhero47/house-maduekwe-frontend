import styled from 'styled-components';

export const FileInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: fit-content;
	margin-inline: auto;
`;

export const FileInput = styled.div`
	width: ${({width}) => width};
	aspect-ratio: 4/2;
	min-height: 165px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	border: ${({ theme, $isError, $useBackground, $disabled }) => {
		if ($disabled) return `2px dashed ${theme?.form?.disabled}`;
		if ($isError) return `2px dashed ${theme?.form.error}`;
		if ($useBackground) return `2px dashed ${theme.form?.line}`;
		return '';
	}};
	transition: all 0.2s ease-in-out;

	&:hover {
		border: 2px dashed ${({ theme }) => theme?.form.sbLine};
	}

	&.isDragging {
		border: 2px solid ${({ theme }) => theme?.form.blue};
	}

	& input[type='file'] {
		display: none;
		width: auto;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		div {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 3px;
			margin-block: 5px;
			margin-inline: 15px;
		}
	}

	.icon {
		color: ${({ theme }) => theme?.form.sbText};
		width: clamp(35px, 50%, 45px);
		aspect-ratio: 1/1;
		display: flex;

		svg {
			width: 100%;
			height: 100%;
		}
	}

	.form_file_word {
		font-family: Inter;
		font-size: 13px;
		font-weight: 600;
		color: ${({ theme }) => theme?.form.sbText};
	}
`;

export const FileInputSelected = styled.div`
	width: ${({width}) => width};
	aspect-ratio: 4/2;
	min-height: 165px;
	display: flex;
	align-items: center;
	padding: 8px;
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	border: ${({ theme, $isError, $useBackground, $disabled }) => {
		if ($disabled) return `2px dashed ${theme?.form?.disabled}`;
		if ($isError) return `2px dashed ${theme?.form.error}`;
		if ($useBackground) return `2px dashed ${theme.form?.line}`;
		return '';
	}};

	&:hover {
		border: 2px dashed ${({ theme }) => theme?.form.sbLine};
	}

	.icon {
		color: ${({ theme }) => (theme.mode === 'dark' ? '#4d4d4d' : '#a6a6a6')};
		font-size: 36px;
		margin-left: 10px;
	}

	.selected_file_wrapper {
		width: 80%;
		max-width: calc(100% - 50px);
		display: flex;
		align-items: center;
		gap: 4%;
		margin-right: auto;
	}

	.file_details {
		/* max-width: 75%; */
		max-width: calc(100% - 50px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;

		h3,
		span {
			max-width: 100%;
			font-family: Outfit;
			font-size: 13px;
			font-weight: 600;
			color: ${({ theme }) => theme?.form.text};
			overflow-x: auto;
		}

		span {
			font-size: 12px;
			font-weight: 400;
			color: ${({ theme }) => theme?.form.sbText};
		}
	}

	.file_clear_btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 2px;
		color: ${({ theme }) => (theme.mode === 'dark' ? '#b30059' : '#cc0000')};
		font-size: 12px;

		i {
			font-size: 20px;
			font-weight: 600;
		}
	}
`;

export const ButtonShell = styled.label`
	padding-block: 5px;
	padding-inline: 8px;
	margin-top: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	background-color: ${({ $isLoading, $disabled, theme }) =>
		!$isLoading && $disabled
			? theme?.formBtn?.disabledBg
			: theme?.formBtn?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: ${({ theme, $disabled }) =>
			!$disabled ? theme?.formBtn?.hoverBg : ''};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 11.8px;
		font-weight: 600;
		color: ${({ theme }) => theme?.formBtn?.text};
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (max-width: 500px) {
		padding-inline: 7px;
		.content {
			gap: 4px;
			font-size: 10.8px;
		}
	}
`;

export const Error = styled.p`
	margin-left: 4px;
	font-size: 13.3px;
	font-weight: 800;
	font-family: Inter;
	color: ${({ theme }) => theme?.form.error};
`;
