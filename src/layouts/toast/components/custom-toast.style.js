import styled from 'styled-components';

export const ToastWrapper = styled.div`
	width: min(320px, calc(100vw - 30px));
	min-height: 70px;
	padding-inline: 14px;
	padding-top: 15px;
	padding-bottom: 20px;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	border-radius: 8px;
	color: ${({ theme }) => theme?.mainBody?.text};
	border: 1.2px solid
		${({ theme }) => (theme.mode === 'dark' ? '#4d4d4d' : '#d9d9d9')};
	position: relative;
	overflow: hidden;
	/* background: ${({ theme }) =>
		theme.mode === 'dark'
			? 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
			: 'linear-gradient(180deg, rgb(255, 255, 255,0.58), rgb(252, 252, 252, 0.55))'}; */
	backdrop-filter: ${({ theme }) =>
		theme.mode === 'dark' ? 'blur(20px)' : 'blur(8px)'};
	box-shadow: ${({ theme }) =>
		theme.mode === 'dark'
			? `
				0 20px 50px rgba(0,0,0,0.55)
				inset 0 1px 0 rgba(255,255,255,0.04)
			`
			: `
				0 12px 35px rgba(0, 0, 0, 0.08)
			`};
	background: ${({ theme }) =>
		theme.mode === 'dark'
			? 'linear-gradient(180deg, #262626, #1a1a1a)'
			: 'linear-gradient(180deg, #ffffff, #f2f2f2)'};

	&::after {
		content: '';
		position: absolute;
		right: -20px;
		bottom: -20px;
		width: 140px;
		height: 140px;
		background-image: ${({ theme }) => {
			const color =
				theme.mode === 'dark'
				? '204, 204, 204'
				: '77, 77, 77';

			return `linear-gradient(
				45deg,
				transparent 40%,
				rgba(${color}, 0.06) 40%,
				rgba(${color}, 0.06) 60%,
				transparent 60%
			)`;
        }};
		transform: rotate(15deg);
		pointer-events: none;
	}

	.content {
		flex: 1;
	}

	.title {
		text-transform: capitalize;
		font-size: 14px;
		font-weight: 600;
		/* line-height: 1.3; */
		letter-spacing: 0.4px;
		font-family: Outfit;
	}

	.message {
		font-size: 14px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
		/* line-height: 1.3; */
		font-weight: 600;
		letter-spacing: 0.4px;
		font-family: Outfit;
	}

	.close {
		font-size: 18px;
		opacity: 0.6;
	}

	.action {
		margin-top: 10px;
		font-size: 13px;
		font-weight: 600;
		color: ${({ theme }) => theme?.intro?.logo};
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.progress_wrapper {
		height: 2.5px;
		overflow: hidden;
		position: absolute;
		left: 50%;
		bottom: 0;
		margin-bottom: 1.5%;
		width: 95%;
		display: flex;
		justify-content: center;
		transform: translateX(-50%);
		/* background: ${({ $color }) => `${$color}30`}; */

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(
				90deg,
				transparent,
				${({ $color }) => `${$color}70`},
				transparent
			);
		}
	}
`;

export const IconHolder = styled.div`
	display: flex;
	width: fit-content;
	margin-right: 5px;
	margin-top: 2px;
	color: ${({ $color }) => $color};
	font-size: 18px;
	opacity: 0.9;
`;

export const ProgressBar = styled.div`
	height: 3px;
	width: 100%;
	border-radius: 9999px;
	transform-origin: left;
	animation: shrink linear forwards;
	background: linear-gradient(
		90deg,
		${({ $color }) => `${$color}60`},
		${({ $color }) => $color},
		${({ $color }) => `${$color}60`}
	);
	box-shadow: 0 0 10px ${({ $color }) => `${$color}50`};
	animation: shrink ${({ $duration }) => $duration}ms linear forwards;
	animation-play-state: ${({ $paused }) => ($paused ? 'paused' : 'running')};

	@keyframes shrink {
		from {
			transform: scaleX(1);
		}

		to {
			transform: scaleX(0);
		}
	}
`;
