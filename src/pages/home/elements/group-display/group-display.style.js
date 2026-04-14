import styled from 'styled-components';

export const GroupSection = styled.section`
	h1 {
		font-size: clamp(20px, 3vw, 32px);
		font-weight: 600;
		letter-spacing: -0.5px;
		margin-bottom: 20px;
		padding: 0 clamp(16px, 5vw, 60px);
		color: ${({ theme }) => theme.mainBody.text};

		position: relative;
		display: inline-block;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -6px;
			width: 40%;
			height: 3px;
			background: ${({ theme }) => theme.intro.logo};
			border-radius: 2px;
		}
	}
`;

export const ProductsA = styled.div`
	width: 90%;
	aspect-ratio: 1.8/1;
	display: flex;
	gap: 10px;
	margin-inline: auto;

	@media (min-width: 920px) and (max-width: 1100px) {
		width: 95%;
	}

	@media (min-width: 742px) and (max-width: 910px) {
		width: 98.5%;
	}

	@media (min-width: 501px) and (max-width: 741px) {
		flex-direction: column;
		aspect-ratio: 1/1.22;
	}

	@media (max-width: 500px) {
		flex-direction: column;
		aspect-ratio: 1/1.22;
	}
`;

export const ContainerA = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;

	@media (min-width: 501px) and (max-width: 741px) {
		width: 100%;
	}

	@media (max-width: 500px) {
		width: 100%;
	}
`;

export const CubicleA = styled.div`
	flex: ${({ $flex }) => $flex || '1'};
	width: 100%;
	/* min-width: 500px; */
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export const Item = styled.div`
	height: 100%;
	flex: 1;
	position: relative;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	background: ${({ theme }) =>
		theme.mode === 'dark'
			? theme?.showcaseBox?.card
			: theme?.mainBody?.toolkitBgGlass};
	transition:
		transform 0.4s ease,
		box-shadow 0.4s ease;
	cursor: pointer;

	img {
		transition: transform 0.5s ease;
		object-position: top;
	}

	&:hover img {
		transform: scale(1.1);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
		opacity: 0.8;
		transition: opacity 0.3s ease;
		border-radius: inherit;
		pointer-events: none;
	}

	&:hover::after {
		opacity: 1;
	}

	&.mask_shape {
		--r: 10px; /* outer radius */
		--s: 20px; /* inner curve */
	}

	/* INFO BOX */
	.hoverTag {
		position: absolute;
		left: -16px;
		top: 16px;

		padding: 10px 14px;
		border-radius: 6px;

		background: ${({ theme }) =>
			theme.mode === 'dark' ? theme.mainBody.container : '#ffffff'};

		border: 1px solid ${({ theme }) => theme.mainBody.line};

		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

		white-space: nowrap;

		opacity: 0;
		transform: translateY(10px) scale(0.95);
		transition: all 0.25s ease;

		pointer-events: none;
	}

	/* Show on hover */
	&:hover .hoverTag {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.hoverTag h3 {
		font-size: 14px;
		font-weight: 600;
		color: ${({ theme }) => theme.mainBody.text};
	}

	.hoverTag p {
		font-size: 12px;
		color: ${({ theme }) => theme.form.yellow};
	}
`;
