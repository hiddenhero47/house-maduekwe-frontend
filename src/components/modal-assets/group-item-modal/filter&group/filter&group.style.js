import styled, { keyframes } from 'styled-components';

export const FilterModalWrapper = styled.div`
	width: clamp(320px, 90vw, 480px);
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	padding: 28px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
	animation: fadeIn 0.18s ease-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 10px;

		h3 {
			font-size: 20px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			letter-spacing: -0.3px;
		}

		p {
			font-size: 13px;
			color: ${({ theme }) => theme.mainBody.sbText};
			margin-top: 6px;
			max-width: 380px;
			line-height: 1.4;
		}

		.closeBtn {
			font-size: 22px;
			color: ${({ theme }) => theme.mainBody.sbText};
			cursor: pointer;
			transition: 0.2s ease;

			&:hover {
				color: ${({ theme }) => theme.mainBody.text};
				transform: rotate(90deg);
			}
		}
	}

	.crater_wrapper {
		display: flex;
		column-gap: 20px;

		@media (max-width: 970px) {
			flex-direction: column;
		}
	}

	.craters {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.form_box {
		display: flex;
		gap: 10px;

		@media (max-width: 468px) {
			flex-wrap: wrap;
		}
	}

	.form_control {
		width: 100%;
		min-width: 150px;
		display: flex;
		flex-direction: column;

		@media (max-width: 970px) {
			max-width: 450px;
		}

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			transition: all 0.1s ease-out;
			font-size: 0.875rem;
			font-weight: 600;
			margin-bottom: 8px;
			margin-left: 8px;
		}

		&:focus-within {
			label {
				color: ${({ theme }) => theme?.mainBody?.text};
			}
		}
	}

	.filter_section {
		margin-top: 18px;

		h4 {
			font-size: 14px;
			font-weight: 700;
			color: ${({ theme }) => theme.mainBody.text};
			margin-bottom: 10px;
		}
	}

	.form_note {
		font-size: 12px;
		color: ${({ theme }) => theme?.mainBody?.sbKitText};
		margin-top: 6px;
		margin-left: 8px;
	}

	.filter_actions {
		display: flex;
		justify-content: space-between;
		margin-top: 26px;
		gap: 10px;

		button {
			flex: 1;
			padding: 11px 16px;
			border-radius: 8px;
			border: none;
			font-size: 14px;
			font-weight: 600;
			cursor: pointer;
			transition: 0.18s ease;
		}

		.reset_btn {
			background: ${({ theme }) => theme.filterBtn.background};
			color: ${({ theme }) => theme.filterBtn.text};

			&:hover {
				background: ${({ theme }) => theme.filterBtn.hoverBg};
			}
		}

		.apply_btn {
			background: ${({ theme }) =>
				theme.mode === 'dark' ? '#f1f1f1' : theme.addToCart.background};
			color: ${({ theme }) =>
				theme.mode === 'dark' ? '#0f0f0f' : theme.formBtn.text};

			&:hover {
				background: ${({ theme }) =>
					theme.mode === 'dark' ? '#d9d9d9' : theme.addToCart.hoverBg};
			}
		}
	}
`;

export const GroupItem = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px;
	border-radius: 12px;
	cursor: pointer;

	background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
	border: 1px solid ${({ theme }) => theme?.mainBody.line};

	transition: all 0.25s ease;

	&:hover {
		background-color: ${({ theme }) => theme?.mainBody.toolkitActive};
		transform: translateY(-2px);
	}

	&.selected {
		border-color: ${({ theme }) => theme?.colors?.primary};
		background-color: ${({ theme }) => theme?.mainBody.toolkitActive};
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;

		color: ${({ theme }) => theme?.mainBody.text};

		.name {
			font-size: 14px;
			font-weight: 600;
		}

		.count {
			font-size: 13px;
			color: ${({ theme }) => theme?.mainBody.sbText};
		}
	}

	input {
		pointer-events: none;
	}
`;

export const LoaderWrapper = styled.div`
	width: 100%;
	min-height: 248px;
	position: relative;

	.countian {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
	}
`;

const floatFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const NoData = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	margin-inline: auto;

	.countian {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-inline: auto;
		animation: ${floatFade} 0.35s ease;
	}

	i {
		opacity: 0.65;
		width: 40%;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: ${({ theme }) => theme.mainBody.text};
		margin-top: 6px;
	}

	span {
		font-size: 14px;
		line-height: 1.6;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 360px;
		text-align: center;
	}
`;

export const RetryBtn = styled.button`
	margin-top: 10px;
	padding-block: 5px;
	padding-inline: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.filterBtn?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.filterBtn?.hoverBg : ''};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 600;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};
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
			font-size: 11px;
		}
	}
`;
