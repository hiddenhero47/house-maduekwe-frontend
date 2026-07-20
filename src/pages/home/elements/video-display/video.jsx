import React, { useState, useRef, useEffect } from 'react';
import { VideoContainer, VideoPlaceHolder } from './video.style';
import { AppPlayIcon } from '../../../../components/icon-components/media';
import { Skeleton } from '../../../../components/loaders/skeleton/skeleton.style';
import {
	MediaController,
	MediaControlBar,
	MediaTimeRange,
	MediaTimeDisplay,
	MediaVolumeRange,
	MediaPlaybackRateButton,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaMuteButton,
	MediaFullscreenButton,
} from 'media-chrome/react';
import Hls from "hls.js";

function MyVideo({
	videoSrc,
	isPreloaded = true,
	placeholder,
	autoPlay = true,
	autoReplay = true,
	onStartNoSound = true,
	isLoading = false,
	useMuteOnly = true,
	loadingCallBack,
}) {
	const videoRef = useRef(null);
	const [showPlayer, setShowPlayer] = useState(isPreloaded);

	const handlePlay = () => {
		setShowPlayer(true);
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleVolume = () => {
			if (!video.muted && video.volume === 0) {
				video.volume = 0.1;
			}
		};

		video.addEventListener('volumechange', handleVolume);

		return () => {
			video.removeEventListener('volumechange', handleVolume);
		};
	}, []);

	const handleLoaded = async () => {
		try {
			await videoRef.current?.play();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const video = videoRef.current;

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(videoSrc);
			hls.attachMedia(video);

			return () => hls.destroy();
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = videoSrc;
		}
	}, [videoSrc]);

	return (
		<VideoContainer className="video_wrapper">
			{isLoading ? (
				<Skeleton
					height="100%"
					width="100%"
					className="video_loader"
					$color1="var(--skeleton-background1)"
					$color2="var(--skeleton-background2)"
				/>
			) : showPlayer ? (
				<MediaController
					style={{
						width: '100%',
						height: '100%',
					}}
				>
					<video
						ref={videoRef}
						slot="media"
						src={videoSrc}
						preload="metadata"
						fetchPriority="high"
						autoPlay={autoPlay}
						muted={onStartNoSound}
						loop={autoReplay}
						controls={false}
						poster={!isPreloaded ? placeholder : undefined}
						className="video_el"
						onCanPlay={() => loadingCallBack?.(true)}
						onError={() => loadingCallBack?.(false)}
						onLoadedData={handleLoaded}
						playsInline
					/>

					<div className="controlBar">
						{useMuteOnly ? (
							<div className="mute_only">
								<MediaPlayButton />
								<MediaMuteButton />
							</div>
						) : (
							<MediaControlBar>
								<MediaPlayButton />
								<MediaTimeRange />
								{/* <MediaTimeDisplay showDuration /> */}
								<MediaMuteButton />
								<MediaVolumeRange />
								<MediaFullscreenButton />
							</MediaControlBar>
						)}
					</div>
				</MediaController>
			) : (
				<VideoPlaceHolder $image={placeholder}>
					<button className="playBtn" onClick={handlePlay}>
						<AppPlayIcon width={40} height={40} />
					</button>
				</VideoPlaceHolder>
			)}
		</VideoContainer>
	);
}

export default MyVideo;
