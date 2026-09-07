import styled from 'styled-components';
import promotionImage from '../../../assets/images/promotion.png';
import underground from '../../../assets/images/underground.png';
import fastLife from '../../../assets/images/fast-life.png';
import newTestImage from '../../../assets/images/new.jpg';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	/* padding-bottom: 20px; */

	& > * {
		flex-shrink: 0;
	}

	#myVideoPlayer {
		width: 100%;
		aspect-ratio: 1.8;
		max-height: calc(100vh - 64px);
		min-height: 79vh;
		display: flex;
		position: relative;

		@supports not (aspect-ratio: 1.8) {
			width: 90vmin;
			height: 50vmin;
		}
	}

	#accessories {
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 20px;
		margin-bottom: 20px;
		padding: 5px;
		z-index: 2;
		border-radius: 10px;
		background-color: rgb(0, 0, 0, 0.4);

		span {
			color: ${({ theme }) => theme?.intro.sbText};
		}
	}

	#introBox {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: clamp(22.5px, 5vw, 50px);
		aspect-ratio: 1 / 1;
		border: 2px solid ${({ theme }) => theme?.intro.boxBorder};
		border-radius: 5px;
		background: ${({ theme }) => theme?.intro.boxBg};
		box-shadow: 0 0 25px ${({ theme }) => theme?.intro.boxShadow};

		/* svg path {
			fill: ${({ theme }) => theme?.intro.logo};
		} */

		@supports not (aspect-ratio: 1 / 1) {
			width: 20vmin;
			height: 20vmin;
		}
	}

	.promotion_header {
		width: 90%;
		margin-inline: auto;
		margin-bottom: 15px;
		margin-top: 40px;
		text-align: center;
	}

	.promotion_header span {
		color: ${({ theme }) => theme.intro.logo};
		text-transform: uppercase;
		letter-spacing: 3px;
		font-size: 12px;

		@media (max-width: 450px) {
			letter-spacing: 2.8px;
			font-size: 11px;
		}
	}

	.promotion_header h2 {
		margin-top: 12px;
		font-size: clamp(28px, 4vw, 48px);
		color: ${({ theme }) => theme.mainBody.text};

		@media (max-width: 450px) {
			margin-top: 3px;
			font-size: clamp(24px, 5vw, 40px);
		}
	}
`;

export const IntroSection = styled.section`
	width: min(1200px, 90%);
	margin: 40px auto 0;
	padding: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 40px;
	border-radius: 16px;
	background:
		/* radial-gradient(
			circle at 15% 25%,
			rgba(185, 51, 26, 0.06),
			transparent 180px
		),
		radial-gradient(
			circle at 85% 75%,
			rgba(185, 51, 26, 0.04),
			transparent 220px
		), */ linear-gradient(
		135deg,
		${({ theme }) => theme?.mainBody?.container},
		${({ theme }) => theme?.mainBody?.card}
	);
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	position: relative;
	overflow: hidden;

	@media (min-width: 901px) and (max-width: 1000px) {
		padding-block: clamp(20px, 8vw, 35px);
		padding-inline: clamp(20px, 8vw, 35px);
	}

	@media (max-width: 900px) {
		flex-direction: column;
		text-align: center;
		padding: 32px 24px;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			${({ theme }) => theme?.intro?.logo},
			transparent
		);
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -30px;
		left: 10%;
		width: clamp(180px, 40%, 320px);
		aspect-ratio: 1;
		border-radius: 20px;
		background: ${({ theme }) =>
			theme.mode === 'dark' ? '#cccccc' : '#4d4d4d'};
		opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.04 : 0.044)};
		transform: rotate(-18deg);
		pointer-events: none;
	}

	.background_shape_1 {
		position: absolute;
		top: 30px;
		right: 8%;
		width: clamp(80px, 30%, 120px);
		aspect-ratio: 1;
		border-radius: 12px;
		background: ${({ theme }) =>
			theme.mode === 'dark' ? theme?.form?.pinkL : theme?.intro?.logo};
		opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.028 : 0.04)};
		transform: rotate(12deg);
	}

	.floating_square {
		position: absolute;
		top: 45%;
		right: 30%;
		width: clamp(50px, 20%, 90px);
		aspect-ratio: 1;
		border-radius: 14px;
		background: ${({ theme }) =>
			theme.mode === 'dark' ? theme?.form?.pinkL : theme?.intro?.logo};
		opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.05 : 0.03)};
		transform: rotate(24deg);
		pointer-events: none;
	}

	.eyebrow {
		color: ${({ theme }) => theme.intro.logo};
		font-size: 12px;
		letter-spacing: 4px;
		text-transform: uppercase;
		font-weight: 600;

		@media (min-width: 351px) and (max-width: 1000px) {
			font-size: 10px;
			letter-spacing: 3px;
		}

		@media (max-width: 350px) {
			font-size: 9.8px;
			letter-spacing: 2.8px;
		}
	}

	.intro_content h1 {
		font-size: clamp(1.9rem, 5vw, 3.8rem);
		line-height: 1.05;
		font-weight: 700;
		color: ${({ theme }) => theme?.mainBody?.text};
		margin-top: 12px;

		background: linear-gradient(
			180deg,
			${({ theme }) => theme.mainBody.text},
			${({ theme }) => theme.mainBody.sbText}
		);

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		@media (min-width: 351px) and (max-width: 1000px) {
			font-size: clamp(1.9rem, 4vw, 3.5rem);
			font-weight: 600;
			letter-spacing: 0.5px;
			line-height: 1.2;
		}

		@media (max-width: 350px) {
			font-size: clamp(1.8rem, 5vw, 3.2rem);
			font-weight: 600;
			letter-spacing: 0.5px;
			line-height: 1.2;
		}
	}

	.intro_content p {
		margin-top: 20px;
		max-width: 550px;
		font-size: 16px;
		line-height: 1.8;
		color: ${({ theme }) => theme.mainBody.sbText};
		letter-spacing: 0.6px;

		@media (min-width: 901px) and (max-width: 1000px) {
			font-size: clamp(11px, 3vw, 14.5px);
		}

		@media (min-width: 351px) and (max-width: 900px) {
			font-size: clamp(12px, 2vw, 14.5px);
		}

		@media (max-width: 350px) {
			font-size: clamp(11px, 3vw, 13px);
		}
	}

	.intro_actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	#galleryBtn {
		padding-block: 9px;
		padding-inline: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: ${({ theme }) => theme.intro.logo};
		color: white;
		font-weight: 600;
		font-size: clamp(14px, 4vw, 15px);
		border: none;
		transition: all 0.3s ease;

		@media (min-width: 351px) and (max-width: 1000px) {
			padding-block: 8px;
			padding-inline: 12px;
			font-size: clamp(13px, 3vw, 14px);
			border-radius: 5px;
		}

		@media (max-width: 350px) {
			padding-block: 7px;
			padding-inline: 8px;
			font-size: clamp(12px, 3vw, 13px);
			font-weight: 500;
			border-radius: 4px;
			letter-spacing: 0.15px;
		}
	}

	#galleryBtn:hover {
		transform: translateY(-2px);
	}

	#authBtn {
		padding-block: 9px;
		padding-inline: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		border: 1px solid ${({ theme }) => theme.mainBody.line};
		background: ${({ theme }) => theme.mainBody.container};
		color: ${({ theme }) => theme.mainBody.text};
		transition: all 0.3s ease;
		font-size: clamp(14px, 4vw, 16px);

		@media (min-width: 351px) and (max-width: 1000px) {
			padding-block: 7px;
			padding-inline: 12px;
			font-size: clamp(13px, 3vw, 14px);
			border-radius: 5px;
		}

		@media (max-width: 350px) {
			padding-block: 6px;
			padding-inline: 8px;
			font-size: clamp(12px, 3vw, 13px);
			border-radius: 4px;
			letter-spacing: 0.15px;
		}
	}

	#authBtn:hover {
		border-color: ${({ theme }) => theme.intro.logo};
		color: ${({ theme }) => theme.intro.logo};
	}
`;

export const AppFooter = styled.footer`
	height: 290px;
	width: 99%;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	margin-top: 13vh;
	margin-inline: auto;
	color: ${({ theme }) => theme?.mainBody.sbText};
	background-color: ${({ theme }) => theme?.mainBody.container};
	position: relative;

	#footer_background {
		width: 100%;
		height: 100%;
	}

	#inner_wrapper {
		width: 100%;
		height: 100%;
		padding-inline: 32px;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 40px;
		position: absolute;
		left: 0;
		top: 0;
	}

	#list_info {
		width: clamp(300px, 100%, 539px);
		display: flex;
		flex-wrap: wrap;
		column-gap: 3rem;
		row-gap: 0.75rem;
		justify-content: center;

		a {
			white-space: nowrap;
			font-size: 0.875rem;
			line-height: 1.5rem;
			position: relative;
			color: ${({ theme }) => theme?.mainBody.sbText};
			transition: color 0.25s ease;

			@media (max-width: 460px) {
				font-size: 0.78rem;
			}
		}

		a::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -4px;
			width: 100%;
			height: 1px;
			background: ${({ theme }) => theme?.intro.logo};
			transform: scaleX(0);
			transform-origin: right;
			transition: transform 0.35s ease;
		}

		a:hover {
			color: ${({ theme }) => theme?.intro.logo};
		}

		a:hover::after {
			transform: scaleX(1);
			transform-origin: left;
		}
	}

	p {
		font-size: 0.875rem;
		line-height: 1.5rem;
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
		text-align: center;

		@media (max-width: 460px) {
			font-size: 0.78rem;
		}
	}
`;

export const BannerImage = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 56%;
	aspect-ratio: 3 / 2;
	animation: bannerIntro 0.6s ease forwards;
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.95);

	@keyframes bannerIntro {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.banner_grid {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0px;
	}

	.tile {
		width: 100%;
		height: 100%;
		background-image: url(${({ $bannerImage }) => $bannerImage});
		background-size: 300% 200%; /* 🔥 KEY */
		background-repeat: no-repeat;
		border-radius: 6px;
		transition: transform 0.4s ease;
		/* background-color: rgb(0, 0, 0, 0.8); */
	}

	/* 🎯 POSITIONING (THIS IS THE MAGIC) */

	.t1 {
		background-position: 0% 0%;
	}
	.t2 {
		background-position: 50% 0%;
	}
	.t3 {
		background-position: 100% 0%;
	}

	.t4 {
		background-position: 0% 100%;
	}
	.t5 {
		background-position: 50% 100%;
	}
	.t6 {
		background-position: 100% 100%;
	}

	/* ✨ HOVER EFFECT */

	&:hover .t1 {
		transform: translate(-20px, -20px);
	}
	&:hover .t2 {
		transform: translateY(-20px);
	}
	&:hover .t3 {
		transform: translate(20px, -20px);
	}
	&:hover .t4 {
		transform: translate(-20px, 20px);
	}
	&:hover .t5 {
		transform: translateY(20px);
	}
	&:hover .t6 {
		transform: translate(20px, 20px);
	}
`;

export const LoaderWrapper = styled.div`
	width: 90%;
	height: 80vh;
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
	}

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

export const Loader = styled.div`
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

export const Promotion = styled.section`
	width: 90%;
	margin-inline: auto;
	margin-top: 20px;
	display: grid;
	grid-template-columns: 420px 1fr;
	gap: 25px;

	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
	}

	.promo_video {
		position: relative;
		height: 650px;
		border-radius: 14px;
		overflow: hidden;
		cursor: pointer;

		border: 1px solid ${({ theme }) => theme.mainBody.line};

		@media (max-width: 1000px) {
			height: 550px;
		}
	}

	.promo_hero {
		position: relative;
		border-radius: 14px;
		overflow: hidden;
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
			url(${promotionImage});
		background-size: cover;
		background-position: center;
		min-height: 650px;
		display: flex;
		align-items: center;
		padding: 60px;
		cursor: pointer;

		@media (min-width: 451px) and (max-width: 1000px) {
			min-height: 520px;
			padding: clamp(20px, 5vw, 40px);
		}

		@media (max-width: 450px) {
			min-height: 420px;
			padding: clamp(18px, 5vw, 35px);
		}

		button {
			margin-top: 28px;
			padding-block: 10px;
			padding-inline: 22px;
			border-radius: 8px;
			border: none;
			background: ${({ theme }) => theme.intro.logo};
			color: white;
			font-weight: 600;
			cursor: pointer;
			transition: 0.3s;

			@media (max-width: 1000px) {
				padding-block: clamp(8px, 2.2vw, 10px);
				padding-inline: clamp(18px, 3.7vw, 22px);
				font-size: clamp(14px, 3vw, 16px);
			}
		}

		button:hover {
			transform: translateY(-2px);
		}
	}

	.content {
		max-width: 520px;
		z-index: 2;
	}

	.tag {
		display: inline-block;
		padding-inline: clamp(9px, 1.5vw, 14px);
		padding-block: clamp(5px, 1vw, 8px);
		border-radius: 999px;
		background: ${({ theme }) => theme.mainBody.toolkitBgGlass};
		backdrop-filter: blur(12px);
		color: ${({ theme }) => theme.intro.logo};
		font-size: clamp(11px, 1.5vw, 13px);
		font-weight: 600;
	}

	h2 {
		margin-top: 20px;
		font-size: clamp(1.6rem, 5vw, 3.8rem);
		line-height: 1.25;
		color: white;
		font-weight: 700;
	}

	p {
		margin-top: 18px;
		max-width: 460px;
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
	}
`;

export const VideoWrapper = styled.div`
	display: ${({ $isLoading }) => ($isLoading ? 'none' : 'flex')};
	width: auto;
	height: 100%;
`;
