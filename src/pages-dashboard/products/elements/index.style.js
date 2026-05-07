import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 20px;

	#nav_tab {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		padding: 15px;
		border-radius: 8px;
		gap: 20px;
	}

	#set_grid,
	#set_table {
		padding: 6px;
		border-radius: 4px;
		background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
		font-size: 20px;

		&:hover,
		i:hover {
			color: ${({ theme }) => theme.intro.logo};
		}

		@media (max-width: 500px) {
			font-size: 17px;
			padding: 5px;
		}
	}

	#set_grid[data-active='true'],
	#set_table[data-active='true'] {
		background-color: ${({ theme }) => theme?.filterBtn?.hoverBg};
	}

	#display_body {
		flex-grow: 1;
		flex-basis: 0;
		margin-top: 20px;
		width: 100%;
		overflow-y: auto;
	}
`;

export const Search = styled.div`
	padding-inline: 12px;
	padding-block: 8px;
	display: flex;
	align-items: center;
	width: clamp(200px, 40%, 300px);
	background-color: ${({ theme, $useBackground }) =>
		$useBackground ? theme.form?.background : ''};
	border: ${({ theme, $isError, $useBackground }) => {
		if ($isError) return `1px solid ${theme?.form.error}`;
		if ($useBackground) return `1px solid ${theme.form?.line}`;
		return '';
	}};
	border-radius: ${({ $useBackground }) => ($useBackground ? '5px' : '')};
	transition: all 0.2s ease-out;
	cursor: pointer;

	@media (max-width: 500px) {
		padding-inline: 10px;
		padding-block: 6px;
		width: unset;
		flex-grow: 1;
		flex-basis: 0;

		i {
			font-size: 18px;
		}
	}

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

	&.search_word,
	.search_word {
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

		@media (max-width: 500px) {
			font-size: 12px;
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

export const FilterBtn = styled.button`
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

	/* &:hover {
		background-color: ${({ theme, disabled }) =>
		!disabled ? theme?.filterBtn?.hoverBg : ''};
	} */

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 14px;
		font-weight: 400;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};
	}

	.content:hover {
		color: ${({ theme }) => theme.intro.logo};
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

export const MasonryGrid = styled.div`
	width: 100%;
	margin-inline: auto;
	display: grid;

	grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
	grid-auto-rows: minmax(100px, auto);
	gap: 10px;
	align-items: start;

	@media (min-width: 1191px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 1051px) and (max-width: 1190px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 651px) and (max-width: 1050px) {
		grid-template-columns: repeat(2, 45%);
		justify-content: center;
		grid-auto-rows: auto;
		gap: clamp(10px, 5%, 16px);
		row-gap: 10px;
	}

	@media (min-width: 361px) and (max-width: 650px) {
		justify-content: center;
		grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
		grid-auto-rows: auto;
		gap: clamp(5px, 2%, 10px);
		row-gap: 10px;
	}

	@media (max-width: 360px) {
		justify-content: center;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
`;

export const GridItem = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme?.mainBody?.background};
	border-radius: 8px;

	&:nth-child(odd) {
		grid-row: span 3;
	}

	&:nth-child(even) {
		grid-row: span 2;
	}

	@media (max-width: 1051px) {
		height: auto;
		aspect-ratio: 3/3.8;

		&:nth-child(odd) {
			grid-row: span 3;
		}

		&:nth-child(even) {
			grid-row: span 3;
		}
	}

	.holder {
		width: 100%;
		height: 100%;
		border: inherit;
		position: relative;
		border-radius: inherit;
	}

	.details {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 12px;
		font-family: Outfit;
		border-radius: 0 0 8px 8px;
		background-color: rgba(0, 0, 0, 0.3);
		color: #e4e4e4;

		h3 {
			font-size: 14px;
			font-weight: 400;
		}

		span {
			font-size: 12px;
			font-weight: 400;
		}
	}

	.delete {
		position: absolute;
		top: 0;
		right: 0;
		margin: 10px;
		z-index: 1;
	}
`;

export const Image = styled.img`
	transition: object-position 0.3s ease;
`;

export const TableWrapper = styled.div`
	width: 100%;
	height: auto;
`;

export const EmptyState = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 20px;

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		animation: fadeInUp 0.35s ease;
	}

	i {
		width: clamp(120px, 20vw, 180px);
		opacity: 0.6;
		margin-bottom: 10px;
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
		color: var(--mainBody-text);
		margin-bottom: 6px;
		letter-spacing: 0.3px;
	}

	p {
		font-size: 14px;
		color: var(--mainBody-sbText);
		max-width: 360px;
		line-height: 1.5;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const ActionBtn = styled.button`
	width: 28px;
	/* height: 28px; */
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px !important;
	background-color: ${({ theme }) => theme?.mainBody?.toolkitBg};
	color: ${({ theme }) => theme?.mainBody?.sbText};
	transition: all 0.2s ease;
	padding: 5px;

	svg {
		font-size: 14px;
	}

	&:hover {
		color: ${({ theme }) => theme.intro.logo};
		transform: translateY(-1px);
	}

	&.danger:hover {
		color: #ff4d4f;
	}
`;
