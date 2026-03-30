import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-x: hidden;
	padding-bottom: 40px;
	padding-inline: clamp(10px, 2%, 32px);
	color: ${({ theme }) => theme.mainBody.text};

	& > * {
		flex-shrink: 0;
	}

	& > section svg {
		border-radius: inherit;
	}

	.bottom_line {
		border-bottom: 1px solid ${({ theme }) => theme.mainBody.line};
	}

	#header {
		font-size: 30px;
		font-weight: 800;
		letter-spacing: 12px;
		font-family: ZeroG;
		border-bottom: 1.5px solid ${({ theme }) => theme.mainBody.line};

		@media (min-width: 601px) and (max-width: 1000px) {
			font-size: 20px;
			letter-spacing: 10px;
		}

		@media (max-width: 600px) {
			font-size: 14px;
			letter-spacing: 8px;
			padding-bottom: 5px;
			margin-bottom: 5px;
			margin-top: 9vh;
		}
	}

	#subHeader {
		font-size: 13px;
		font-weight: 500;
		line-height: 8px;
		letter-spacing: 8px;
		font-family: Inter;

		@media (min-width: 601px) and (max-width: 1000px) {
			font-size: 11px;
			letter-spacing: 6px;
			line-height: 7px;
		}

		@media (max-width: 600px) {
			font-size: 8px;
			letter-spacing: 3.5px;
			line-height: 5px;
			margin-bottom: 5vh;
		}
	}

	#headerBox {
		height: 50vh;
		@media (max-width: 600px) {
			height: 35vh;
		}
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
		gap: 4px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 14.3px;
		font-weight: 600;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};

		i {
			font-size: 20px;
		}
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

export const NewArrivalsBtn = styled.button`
	padding-block: 13px;
	padding-inline: 18px;
	margin-inline: auto;
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 9999px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.basicBtn?.bgActive
			: theme?.basicBtn?.bgActive};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;
	color: ${({ theme }) => theme?.basicBtn?.textActive};

	&:hover {
		background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.basicBtn?.background : ''};
		color: ${({ theme }) => theme?.basicBtn?.text};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 2px;

		i {
			display: inline-flex;
			font-size: 14px;
			transform: translateX(0);
			transition:
				transform 0.25s ease,
				opacity 0.25s ease;
		}
	}

	/* 👇 Arrow animation */
	&:hover .content i {
		transform: translateX(6px);
		opacity: 0.85;
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (min-width: 601px) and (max-width: 1000px) {
		padding-block: 9px;
		padding-inline: 14px;
		.content {
			gap: 4px;
			font-size: 10px;

			i {
				font-size: 11px;
			}
		}
	}

	@media (max-width: 600px) {
		padding-block: 8px;
		padding-inline: 11px;
		.content {
			gap: 4px;
			font-size: 8px;

			i {
				font-size: 8px;
			}
		}
	}
`;

export const MasonryGrid = styled.div`
	width: 90%;
	margin-inline: auto;
	display: grid;

	grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
	grid-auto-rows: minmax(120px, auto);
	gap: 16px;
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
		row-gap: 16px;
	}

	@media (min-width: 361px) and (max-width: 650px) {
		width: 99%;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
		grid-auto-rows: auto;
		gap: clamp(5px, 2%, 10px);
		row-gap: 16px;
	}

	@media (max-width: 360px) {
		width: 100%;
		justify-content: center;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
`;

export const MasonryItem = styled.div`
	width: 100%;
	height: 100%;
	display: block;
	/* background-color: ${({ theme }) => theme?.mainBody.container}; */

	/* Let some items span 2 rows for a masonry effect */
	&:nth-child(odd) {
		grid-row: span 3;
	}

	&:nth-child(even) {
		grid-row: span 3;
	}

	@media (max-width: 1051px) {
		height: auto;
		aspect-ratio: 3/3.8;
	}
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
