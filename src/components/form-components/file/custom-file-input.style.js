import styled from 'styled-components';

export const FileInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-height: ${(props) => props.height};
`;

export const FileInput = styled.div`
	width: 100%;
	min-height: 185px;
	height: 467px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	border: 2px dashed ${(props) => (props.$isError ? 'red' : '#D2D2D2')};

	&.isDragging {
		border: 2px solid #008080;
	}

	& input[type='file'] {
		display: none;
		width: auto;
	}

	.FileLabel {
		cursor: pointer;

		#FillBtn {
			border-radius: 5px;
			pointer-events: none;
			padding-block: 5.5px;
			padding-inline: 30px;
			margin-top: 26px;

			@media (max-width: 500px) {
				padding-block: 5.5px;
				padding-inline: 30px;
			}
		}

		#FillBtnLg {
			pointer-events: none;
			padding-block: 15px;
			padding-inline: 40px;
			padding-bottom: 18px;
			margin-top: 21px;

			@media (max-width: 500px) {
				padding-block: 15px;
				padding-inline: 40px;
				padding-bottom: 18px;
			}
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.icon {
		color: #008080;
	}

	.iconLg {
		color: #343434;
	}

	.FileText {
		font-family: Hanken Grotesk;
		font-size: 18px;
		font-weight: 600;
		line-height: 23.45px;
	}

	.FileTextLg {
		font-family: Hanken Grotesk;
		font-size: 28px;
		font-weight: 600;
		line-height: 36.48px;
	}

	.FileSubText {
		font-family: Hanken Grotesk;
		font-size: 12px;
		font-weight: 500;
		line-height: 15.64px;
		display: flex;
		align-items: center;
		gap: 8px;

		i {
			width: 28px;
			height: 1px;
			background-color: #000000;
		}
	}

	.FileSubTextLg {
		font-family: Hanken Grotesk;
		font-size: 20px;
		font-weight: 700;
		line-height: 26.06px;
		display: flex;
		align-items: center;
		gap: 8px;

		i {
			width: 26px;
			height: 1px;
			background-color: #000000;
		}
	}
`;

export const FileInputSelected = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-inline: 10px;
	padding-left: 12px;
	padding-block: 10px;
	border: 1px solid #8e8e8e;
	border-radius: 10px;

	&:hover {
		border: 1px solid #008080;
	}

	.file_Icon {
		/* color: #bbbbbb; */
		color: #308242;
	}

	.shape {
		max-width: 80%;
	}

	.Details {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
		font-family: Hanken Grotesk;
		font-size: 16px;
		font-weight: 600;
		line-height: 20.85px;

		span {
			color: #616161;
		}
	}

	.clear {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
		font-family: Outfit;
		font-size: 10px;
		font-weight: 400;
		line-height: 12.6px;
		color: #d93e39;

		i {
			color: #343434;
		}
	}
`;

export const Error = styled.p`
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 0%;
	margin-top: 3px;
	margin-left: 10px;
	font-family: Hanken Grotesk;
	font-size: 12px;
	font-weight: 400;
	line-height: 10px;
	letter-spacing: -0.01em;
	color: #d93e39;
`;

export const FileControl = styled.div`
	display: flex;
	flex-direction: column;
	width: ${(props) => props.width};
	/* height: ${(props) => props.height}; */
	height: auto;
	margin-inline: ${(props) => (props.$marginX ? props.$marginX : '0')};
	margin-block: ${(props) => (props.$marginY ? props.$marginY : '0')};

	label:first-child {
		color: #4a4a4a;
		transition: all 0.1s ease-out;
		font-family: Hanken Grotesk;
		font-size: 18px;
		font-weight: 600;
		line-height: 23px;
		letter-spacing: 0em;
		margin-bottom: 7px;
	}

	&:focus-within {
		label {
			color: #008080;
		}
	}

	@media (max-width: 500px) {
		label:first-child {
			font-size: 14px;
			font-weight: 600;
			line-height: 18px;
			letter-spacing: 0em;
			margin-bottom: 2.7px;
		}
	}
`;

export const ButtonSell = styled.button`
	padding-block: 9.02px;
	padding-inline: 15.5px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	background-color: ${(props) =>
		!props.$isLoading && props.disabled ? 'rgb(0, 128, 128, 0.6)' : '#008080'};
	position: relative;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${(props) => (props.$isLoading ? 'hidden' : 'visible')};
		font-family: Hanken Grotesk;
		font-size: 14px;
		font-weight: 600;
		line-height: 18px;
		letter-spacing: 0em;
		color: #ffffff;
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (max-width: 500px) {
		padding-inline: 15.5px;

		.content {
			gap: 4px;
			font-size: 14px;
			font-weight: 600;
			line-height: 18px;
			letter-spacing: 0em;
		}
	}
`;
