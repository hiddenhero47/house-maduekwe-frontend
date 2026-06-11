import styled from 'styled-components';

export const ToastWrapper = styled.div`
	width: min(320px, calc(100vw - 30px));
	min-height: 70px;
	padding: 12px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	border-radius: 8px;
	background: ${({ theme }) => theme?.showcaseBox?.card};
	color: ${({ theme }) => theme?.mainBody?.text};
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	box-shadow: ${({ theme }) =>
		theme.mode === 'dark'
			? `
				0 12px 34px rgba(255, 255, 255, 0.05),
				0 12px 34px rgba(255, 255, 255, 0.03)
			`
			: `
				0 12px 35px rgba(0, 0, 0, 0.08)
			`};
	position: relative;

	.content {
		flex: 1;
	}

	.title {
		font-family: Outfit;
		text-transform: capitalize;
		font-size: 15px;
		font-weight: 900;
		line-height: 1.3;
		letter-spacing: 0.4px;
	}

	.message {
		font-size: 13px;
		color: ${({ theme }) => theme?.mainBody?.sbText};
		line-height: 1.3;
		/* letter-spacing: 0.4px; */
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
		position: absolute;
		left: 50%;
		bottom: 0;
		margin-bottom: 1.5%;
		width: 95%;
		display: flex;
		justify-content: center;
		transform: translateX(-50%);
		background: ${({ $color }) => `${$color}30`};
	}
`;

export const IconHolder = styled.div`
	padding: 5px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 12px;
	background: ${({ $color }) => `${$color}25`};
	color: ${({ $color }) => $color};
	font-size: 20px;
`;

export const ProgressBar = styled.div`
	height: 3px;
	width: 100%;
	border-radius: 9999px;
	transform-origin: left;
	animation: shrink linear forwards;
	background: ${({ $color }) => `${$color}80`};
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
