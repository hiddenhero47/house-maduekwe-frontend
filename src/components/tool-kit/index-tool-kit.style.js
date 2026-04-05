import styled from 'styled-components';

export const Container = styled.div`
	position: ${({ $useCoords }) => ($useCoords ? '' : 'relative')};
	display: inline-block;
	overflow: visible;
`;

export const MenuDialog = styled.dialog.withConfig({
	shouldForwardProp: (prop) => prop !== 'closedBy',
})`
	position: ${({ $useCoords }) => ($useCoords ? 'fixed' : 'absolute')};

	top: ${({ $useCoords, $top }) => ($useCoords ? `${$top}px` : '100%')};

	left: ${({ $useCoords, $left, $alineRight }) =>
		$useCoords
			? $alineRight
				? 'auto'
				: `${$left}px`
			: $alineRight
				? 'auto'
				: '0'};

	right: ${({ $useCoords, $right, $alineRight }) =>
		$useCoords
			? $alineRight
				? `calc(100vw - ${$right}px)`
				: 'auto'
			: $alineRight
				? '0'
				: 'auto'};

	display: flex;
	min-width: 180px;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme?.form?.menuBorder};
	background: ${({ theme }) => theme?.form?.menuBg};
	padding-inline: 8px;
	padding-block: 8px;
	flex-direction: column;
	z-index: 1000;
	box-shadow: ${({ theme }) =>
		theme.mode === 'dark'
			? '0px 4px 12px rgba(255,255,255,0.15), 0px 0px 0px 1px rgba(255,255,255,0.04)'
			: '0px 2px 6px rgba(0,0,0,0.05), 0px 8px 20px rgba(0,0,0,0.08)'};

	/* 🔥 animation improvements */
	transform-origin: ${({ $alineRight }) =>
		$alineRight ? 'top right' : 'top left'};

	opacity: 0;
	visibility: hidden;
	pointer-events: none;

	transform: ${({ $alineRight }) =>
		$alineRight
			? 'translateY(8px) translateX(8px) scale(0.96)'
			: 'translateY(8px) translateX(-8px) scale(0.96)'};

	transition:
		opacity 0.18s ease,
		transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
		visibility 0.18s ease;

	/* 👇 open state */
	&[open] {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: translateY(0) translateX(0) scale(1);
	}

	/* optional: smooth exit before close */
	&:not([open]) {
		display: flex; /* 👈 important for exit animation */
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

export const OptionItem = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	border-radius: 6px;
	font-size: 14px;
	transition: all 0.2s ease;
	border: none;
	background: transparent;
	cursor: pointer;

	color: var(--mainBody-text);

	&:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	/* dark mode */
	[data-theme='dark'] &,
	.dark & {
		&:hover {
			background: rgba(255, 255, 255, 0.06);
		}
	}

	/* 🔵 EDIT variant */
	&.edit {
		color: var(--mainBody-text);
	}

	/* 🔴 DELETE variant */
	&.delete {
		color: #ef4444;

		&:hover {
			background: rgba(239, 68, 68, 0.1);
		}
	}
`;
