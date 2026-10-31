import styled from 'styled-components';

export const SliderWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: inherit;
	touch-action: pan-y;
`;

export const Track = styled.div`
	display: flex;
	width: ${({ $count }) => `calc(100% * ${$count})`};
	height: 100%;
	transform: ${({ $index, $count, $dragX }) =>
		`translateX(calc(${-$index * (100 / $count)}% + ${$dragX}px))`};
	transition: ${({ $withTransition }) =>
		$withTransition ? 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'};
`;

export const Slide = styled.div`
	position: relative;
	width: ${({ $count }) => `calc(100% / ${$count})`};
	height: 100%;
	flex-shrink: 0;
	display: flex;
	align-items: ${({ $valign }) =>
		$valign === 'end' ? 'flex-end' : 'center'};
	justify-content: ${({ $align }) =>
		$align === 'right'
			? 'flex-end'
			: $align === 'center'
				? 'center'
				: 'flex-start'};
	padding: 60px;
	/* Extra bottom clearance everywhere — the dot row sits absolutely
	   positioned over the slide, so content (especially a bottom-anchored
	   slide's CTA) needs guaranteed room above it, not just the default
	   padding. */
	padding-bottom: 76px;
	background-image:
		linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7),
			rgba(0, 0, 0, ${({ $valign }) => ($valign === 'end' ? '0.35' : '0.45')}) 55%,
			rgba(0, 0, 0, 0.3)
		),
		url(${({ $image }) => $image});
	background-size: cover;
	background-position: center;
	cursor: pointer;

	@media (min-width: 451px) and (max-width: 1000px) {
		padding: clamp(20px, 5vw, 40px);
		padding-bottom: 60px;
	}

	@media (max-width: 450px) {
		padding: clamp(16px, 4.5vw, 30px);
		padding-bottom: 52px;
	}
`;

export const Content = styled.div`
	max-width: 480px;
	z-index: 2;
	text-align: ${({ $align }) =>
		$align === 'right' ? 'right' : $align === 'center' ? 'center' : 'left'};
	display: flex;
	flex-direction: column;
	align-items: ${({ $align }) =>
		$align === 'right'
			? 'flex-end'
			: $align === 'center'
				? 'center'
				: 'flex-start'};
`;

export const Tag = styled.span`
	display: inline-block;
	padding-inline: clamp(9px, 1.5vw, 14px);
	padding-block: clamp(5px, 1vw, 8px);
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(12px);
	color: ${({ $accent }) => $accent};
	font-size: clamp(11px, 1.5vw, 13px);
	font-weight: 600;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	border: 1px solid ${({ $accent }) => $accent}55;
`;

export const Heading = styled.h2`
	margin-top: 20px;
	font-size: clamp(1.6rem, 5vw, 3.6rem);
	line-height: 1.2;
	color: white;
	font-weight: 700;
	white-space: pre-line;

	@media (max-width: 450px) {
		margin-top: 12px;
	}
`;

export const Text = styled.p`
	margin-top: 18px;
	max-width: 440px;
	color: rgba(255, 255, 255, 0.85);
	font-size: 15.5px;
	line-height: 1.8;

	@media (max-width: 1000px) {
		font-size: clamp(15px, 4vw, 15.5px);
	}

	@media (max-width: 600px) {
		font-size: clamp(14.5px, 3vw, 15.5px);
		line-height: 1.4;
	}

	@media (max-width: 450px) {
		margin-top: 10px;
	}
`;

export const CTAButton = styled.button`
	margin-top: 28px;
	padding-block: 10px;
	padding-inline: 22px;
	border-radius: 8px;
	border: none;
	background: ${({ $accent }) => $accent};
	color: #0f0f0f;
	font-weight: 600;
	cursor: pointer;
	transition: 0.3s;

	@media (max-width: 1000px) {
		padding-block: clamp(8px, 2.2vw, 10px);
		padding-inline: clamp(18px, 3.7vw, 22px);
		font-size: clamp(14px, 3vw, 16px);
	}

	@media (max-width: 450px) {
		margin-top: 18px;
	}

	&:hover {
		transform: translateY(-2px);
	}
`;

export const Dots = styled.div`
	position: absolute;
	bottom: 22px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
	display: flex;
	gap: 8px;

	@media (max-width: 450px) {
		bottom: 14px;
	}
`;

export const Dot = styled.button`
	width: ${({ $active }) => ($active ? '22px' : '7px')};
	height: 7px;
	border-radius: 999px;
	border: none;
	padding: 0;
	cursor: pointer;
	background: ${({ $active }) =>
		$active ? 'white' : 'rgba(255, 255, 255, 0.45)'};
	transition: width 0.3s ease, background 0.3s ease;
`;

export const ArrowButton = styled.button`
	position: absolute;
	top: 50%;
	${({ $side }) => ($side === 'left' ? 'left: 16px;' : 'right: 16px;')}
	transform: translateY(-50%);
	z-index: 3;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.35);
	backdrop-filter: blur(6px);
	color: white;
	font-size: 20px;
	line-height: 1;
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.25s ease, background 0.25s ease;

	&:hover {
		background: rgba(0, 0, 0, 0.55);
	}

	@media (max-width: 700px) {
		display: none;
	}
`;

export const HoverGroup = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	&:hover ${ArrowButton} {
		opacity: 1;
	}
`;
