import styled from 'styled-components';

export const GridWrapper = styled.div`
	position: relative;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
	gap: 14px;
	width: 100%;
	max-width: 620px;
	transition: opacity 0.15s ease;
	opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
	pointer-events: ${({ $dimmed }) => ($dimmed ? 'none' : 'auto')};
`;

export const ReorderingNote = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	opacity: 0.7;
	margin-bottom: 10px;
`;

export const LoadingOverlay = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme?.mainBody?.container}b3;
	border-radius: inherit;
	z-index: 2;
`;

export const Thumb = styled.div`
	position: relative;
	aspect-ratio: 1/1;
	border-radius: 6px;
	overflow: hidden;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	background: ${({ theme }) => theme?.mainBody?.card};
	cursor: grab;
	touch-action: none;

	&:active {
		cursor: grabbing;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.order_badge {
		position: absolute;
		top: 5px;
		left: 5px;
		font-size: 10px;
		font-weight: 700;
		background: ${({ theme }) => theme?.mainBody?.container};
		color: ${({ theme }) => theme?.mainBody?.text};
		border-radius: 4px;
		padding: 1px 6px;
		opacity: 0.85;
	}

	.tag_badge {
		position: absolute;
		bottom: 5px;
		left: 5px;
		font-size: 9px;
		font-weight: 600;
		background: ${({ theme }) => theme.form.blue}cc;
		color: #fff;
		border-radius: 4px;
		padding: 1px 6px;
	}

	.actions {
		position: absolute;
		top: 4px;
		right: 4px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		opacity: 0;
		transition: opacity 0.15s ease;
	}

	&:hover .actions {
		opacity: 1;
	}
`;

export const ThumbIconBtn = styled.button`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
	background: ${({ theme }) => theme?.mainBody?.container};
	color: ${({ $danger, theme }) =>
		$danger ? theme.form.error : theme?.mainBody?.text};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.08)')};
	}
`;

export const AddSection = styled.div`
	display: flex;
	align-items: center;
	gap: 14px;
	margin-top: 16px;
	flex-wrap: wrap;
`;

export const UploadBtn = styled.button`
	padding: 8px 16px;
	border-radius: 6px;
	font-size: 13px;
	font-weight: 600;
	background: ${({ theme }) => theme.form.blue};
	color: #fff;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		opacity: ${({ disabled }) => (disabled ? 0.5 : 0.9)};
	}
`;

export const EmptyState = styled.p`
	font-size: 12px;
	opacity: 0.5;
`;

export const CapNote = styled.p`
	font-size: 11px;
	opacity: 0.5;
	margin-top: 4px;
`;

export const TagModalWrapper = styled.div`
	background-color: ${({ theme }) => theme?.mainBody?.container};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	border-radius: 8px;
	width: 90vw;
	max-width: 420px;
	padding-block: 20px;
	padding-inline: 25px;
	color: ${({ theme }) => theme?.mainBody?.text};

	.modal_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;

		h3 {
			font-size: 15px;
			font-weight: 600;
			margin: 0;
		}

		.closeBtn {
			font-size: 20px;
			opacity: 0.7;

			&:hover {
				opacity: 1;
			}
		}
	}

	.type_group {
		margin-bottom: 14px;

		.type_label {
			font-size: 11px;
			text-transform: uppercase;
			opacity: 0.5;
			margin-bottom: 6px;
		}
	}
`;

export const TagChip = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 5px 10px;
	margin: 0 6px 6px 0;
	border-radius: 20px;
	font-size: 12px;
	border: 1px solid
		${({ $active, theme }) => ($active ? theme.form.blue : theme?.mainBody?.line)};
	background: ${({ $active, theme }) =>
		$active ? `${theme.form.blue}20` : 'transparent'};
	color: ${({ theme }) => theme?.mainBody?.text};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
