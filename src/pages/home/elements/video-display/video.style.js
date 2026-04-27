import styled from 'styled-components';

export const VideoContainer = styled.div`
	width: 100%;
	height: 100%;
	margin: 0 auto;
	background-color: rgba(0, 0, 0, 0.1);
	position: relative;

	.video-el {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.controlBar {
		position: absolute;
		z-index: 1;
		bottom: 0;
		width: 100%;
		display: flex;

		.mute_wrapper {
			margin: 15px;
			margin-left: auto;
		}
	}

	/* 🎛 Control bar base */
	media-control-bar {
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7),
			rgba(0, 0, 0, 0.3),
			transparent
		);
		backdrop-filter: blur(6px);
		padding: 8px;
		gap: 8px;
	}

	/* 🎯 Buttons */
	media-play-button,
	media-mute-button,
	media-fullscreen-button {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		padding: 6px;
		transition: all 0.2s ease;
	}

	media-play-button:hover,
	media-mute-button:hover,
	media-fullscreen-button:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: scale(1.05);
	}

	/* 🎚 Progress bar */
	media-time-range {
		--media-range-track-height: 4px;
		--media-range-track-background: rgba(255, 255, 255, 0.3);
		--media-range-bar-color: white;
		--media-range-thumb-background: white;
		border-radius: 5px;
		padding: 3px;
	}

	/* 🔊 Volume slider */
	media-volume-range {
		max-width: 80px;
		border-radius: 5px;
		padding: 3px;
	}

	/* ⏱ Time display */
	media-time-display {
		color: white;
		font-size: 12px;
		font-weight: 500;
		border-radius: 5px;
		padding-inline: 8px;
	}

	media-control-bar {
		opacity: 0;
		transform: translateY(10px);
		transition: all 0.3s ease;
		pointer-events: none;
		width: 100%;
	}

	&:hover media-control-bar {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.mute_only {
		position: absolute;
		right: 15px;
		bottom: 15px;
		z-index: 2;
	}

	.mute_only media-mute-button {
		background: rgba(0, 0, 0, 0.6);
		border-radius: 5px;
		padding: 4px;
		transition: all 0.2s ease;
	}

	.mute_only media-mute-button:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}
`;

export const VideoPlaceHolder = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(${(props) => props.$image}) no-repeat center/cover;

	.playBtn {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		padding: 0;
		margin: 0;
		cursor: pointer;
		border-radius: 4px;
	}
`;
