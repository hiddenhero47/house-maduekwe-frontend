import styled from 'styled-components';

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	border-radius: 8px;

	width: 90vw;
	max-width: 1000px;
	padding-block: 20px;
	padding-inline: 25px;
	color: ${({ theme }) => theme?.mainBody?.text};

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;

		@media (max-width: 450px) {
			flex-direction: column-reverse;

			.closeBtn {
				margin-left: auto;
			}
		}

		.title {
			display: flex;
			align-items: center;
			gap: 12px;

			svg {
				font-size: 22px;
				color: ${({ theme }) => theme.intro.logo};
			}

			h3 {
				font-size: 16px;
				font-weight: 600;
				margin: 0;
			}

			p {
				font-size: 12px;
				opacity: 0.6;
				margin: 2px 0 0;
			}
		}

		.closeBtn {
			font-size: 22px;
			opacity: 0.7;

			&:hover {
				opacity: 1;
				transform: scale(1.05);
			}
		}
	}
`;

export const OpenBtn = styled.button`
	width: fit-content;
	height: fit-content;
`;

export const Display = styled.div`
	width: clamp(220px, 30%, 250px);
	aspect-ratio: 1/1;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	background: ${({ theme }) => theme?.mainBody?.card};
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 450px) {
		margin-inline: auto;
	}

	&:hover img {
		transform: scale(1.03);
	}

	img {
		/* transition: object-position 0.3s ease; */
		transition: all 0.4s;
		transition-timing-function: ease-in-out;
	}
`;

export const ModalGrid = styled.div`
	flex: 1;
	min-width: 360px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(62px, 1fr));
	gap: 12px;

	@media (max-width: 450px) {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex: unset;
		width: 100%;
		min-width: unset;
	}
`;

export const ImageItem = styled.button`
	aspect-ratio: 1/1;
	border-radius: 3px;
	background: ${({ theme }) => theme?.mainBody?.hover};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	transition: 0.2s ease;

	@media (max-width: 450px) {
		width: clamp(40px, 15%, 60px);
	}

	${({ $isSelected, theme }) =>
		$isSelected &&
		`
      border: 2.5px solid ${theme.form.blue};
      box-shadow: 0 0 0 2px ${theme.form.blue}20;
    `}

	${({ $toBeRemoved, theme }) =>
		$toBeRemoved &&
		`
      border: 2.5px solid ${theme.form.error};
      opacity: 0.6;
    `}

	 &:hover {
		transform: translateY(-2px);
	}
`;
