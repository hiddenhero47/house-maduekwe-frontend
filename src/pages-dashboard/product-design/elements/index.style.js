import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	/* overflow-y: auto; */

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 20px 24px;
		border-radius: 12px;
		background: ${({ theme }) => theme.mainBody.card};
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		margin-bottom: 20px;
	}

	.title-area {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.header .icon {
		width: 42px;
		height: 42px;
		border-radius: 10px;
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.intro.logo};
		font-size: 18px;
	}

	#title1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
		line-height: 1.2;
	}

	#title2 {
		font-size: 0.875rem;
		color: ${({ theme }) => theme.mainBody.sbText};
		margin-top: 2px;
	}

	.Form_error {
		font-size: 11.5px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.form_wrapper {
		flex: 1;
		max-height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		overflow: hidden;
	}

	#form_wrapper {
		width: 100%;
		flex-basis: 0;
		flex-grow: 1;
		overflow: hidden;

		padding-block: 18px;
		border-radius: 10px;
		background-color: ${({ theme }) => theme?.mainBody?.background};
		border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
		}

		.actions {
			width: 100%;
			justify-content: flex-end;
		}
	}
`;

export const SaveBtn = styled.button`
	padding-block: 6px;
	padding-inline: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.mainBody?.toolkitBg};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.filterBtn?.text};

	&:hover {
		/* background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.filterBtn?.hoverBg : ''}; */
		transform: translateY(-1px);
		color: ${({ theme }) => theme.intro.logo};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 600;
		font-family: Inter;
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
			font-size: 12px;
		}
	}
`;

export const AddBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;

	padding: 6px 14px;
	border-radius: 999px;

	font-size: 13px;
	font-weight: 500;

	color: ${({ theme }) => theme.mainBody.sbText};
	background: ${({ theme }) => theme.mainBody.card};

	border: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	cursor: pointer;

	transition:
		background 0.2s ease,
		color 0.2s ease,
		transform 0.15s ease,
		box-shadow 0.15s ease;

	svg {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
		transition:
			transform 0.2s ease,
			color 0.2s ease;
	}

	svg:first-child {
		font-size: 16px;
	}

	span {
		white-space: nowrap;
	}

	&:hover {
		background: ${({ theme }) => theme.mainBody.toolkitBg};
		color: ${({ theme }) => theme.mainBody.text};
		transform: translateY(-1px);

		svg:last-child {
			transform: translateX(3px);
			color: ${({ theme }) => theme.mainBody.text};
		}
	}

	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
`;

export const FormBody = styled.div`
	width: 100%;
	min-height: 0;
	padding-inline: clamp(10px, 3%, 32px);
	padding-block: 15px;

	#form_body_container {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}

	#right_content,
	#left_content {
		max-width: 100%;
		min-width: 300px;
		flex-grow: 1;
		flex-basis: 0;
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		@media (max-width: 500px) {
			min-width: 100%;
		}
	}

	.form_control {
		width: 100%;
		max-width: 390px;
		display: flex;
		flex-direction: column;

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
`;

export const ChipBody = styled.div`
	width: 100%;
	padding-inline: clamp(10px, 3%, 32px);

	.main_wrapper {
		border-top: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
		padding-block: 20px;
	}

	h3 {
		font-size: 0.98rem;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
		line-height: 1.2;
		display: flex;
		gap: 6px;
		margin-left: 10px;
		margin-bottom: 18px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 30px;
	}

	.field {
		display: flex;
		flex-direction: column;
		max-width: 420px;

		label {
			color: ${({ theme }) => theme?.mainBody?.sbText};
			font-size: 0.875rem;
			font-weight: 600;
			margin-bottom: 8px;
			margin-left: 8px;
			transition: 0.15s ease;
		}

		&:focus-within label {
			color: ${({ theme }) => theme?.mainBody?.text};
		}
	}
`;
