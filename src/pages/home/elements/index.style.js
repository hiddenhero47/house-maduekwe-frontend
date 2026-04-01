import styled from 'styled-components';
import bannerImage from '../../../assets/images/brand-name.svg';

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

		svg path {
			fill: ${({ theme }) => theme?.intro.logo};
		}

		@supports not (aspect-ratio: 1 / 1) {
			width: 20vmin;
			height: 20vmin;
		}
	}

	#banner_image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 56%;
		aspect-ratio: 3 / 2;

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
			background-image: url(${bannerImage});
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
	}
`;

export const IntroSection = styled.section`
	margin-top: 30px;
	margin-inline: auto;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-bottom: 10px;
	border-bottom: 1px solid ${({ theme }) => theme?.mainBody.line};
	gap: 20px;

	@media (min-width: 741px) and (max-width: 1189px) {
		width: 90%;
	}

	@media (min-width: 701px) and (max-width: 740px) {
		width: 90%;
		justify-content: center;
		padding-bottom: 20px;

		div:first-child {
			align-items: center;
		}
	}

	@media (min-width: 531px) and (max-width: 700px) {
		width: 90%;
	}

	@media (max-width: 530px) {
		width: 90%;
		justify-content: center;
		padding-bottom: 20px;
		gap: 10px;

		div:first-child {
			align-items: center;
		}
	}

	p {
		font-family: 'Inter';

		@media (max-width: 700px) {
			font-size: 18px;
		}
	}

	#authBtn {
		width: fit-content;
		font-family: 'Inter';
		font-size: 16px;
		font-weight: 400;
		line-height: 45px;
		position: relative;
		text-transform: uppercase;
		letter-spacing: 0;
		transition: width ease-in-out;
		transition: all 280ms ease-in-out;
		text-align: center;
		color: ${({ theme }) => theme?.intro.logo};

		@media (max-width: 700px) {
			font-size: 10px;
			line-height: 35px;
		}

		&:hover {
			letter-spacing: 3px;
		}

		&:after,
		&:before {
			content: ' ';
			backface-visibility: hidden;
			border: 1px solid ${({ theme }) => theme?.intro.logoGlass};
			bottom: 0px;
			display: block;
			margin: 0 auto;
			margin-left: -8px;
			position: relative;
			transition: all 280ms ease-in-out;
			width: 0;
		}

		&:hover:after,
		&:hover:before {
			backface-visibility: hidden;
			border-color: ${({ theme }) => theme?.intro.logo};
			transition: width 350ms ease-in-out;
			width: calc(100% + 16px);
		}

		&:hover:before {
			bottom: auto;
			top: 0;
		}
	}

	#galleryBtn {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 5px;
		padding-inline: 8px;
		padding-block: 10px;
		border-radius: 5px;
		background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
		border: 1px solid ${({ theme }) => theme?.mainBody.toolkitActive};
		font-family: 'Inter';
		transition: all 350ms ease-in-out;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;

		@media (max-width: 700px) {
			padding-block: 2px;
		}

		span {
			font-size: 16px;
			font-weight: 600;
			transition:
				color 350ms ease-in-out,
				transform 350ms ease-in-out;

			@media (max-width: 700px) {
				font-size: 10px;
			}
		}

		i {
			font-size: 20px;
			display: flex;
			align-items: center;
			transition:
				transform 350ms ease-in-out,
				color 350ms ease-in-out;

			@media (max-width: 700px) {
				font-size: 12px;
			}
		}

		&:hover span:first-child {
			transform: translateX(3px);
			color: ${({ theme }) => theme?.intro.logo};
		}

		&:hover span:last-child {
			transform: translateX(5px);
			color: ${({ theme }) => theme?.intro.logo};
		}

		&:hover i {
			transform: translateX(6px);
			color: ${({ theme }) => theme?.intro.logo};
		}
	}
`;

export const ContainerSection = styled.section`
	width: 97%;
	display: flex;
	flex-wrap: wrap;
	border-radius: 10px;
	margin-inline: auto;

	/* .style_container {
		border: 1px solid ${({ theme }) => theme?.mainBody.line};
		background-color: ${({ theme }) => theme?.mainBody.container};
		border-radius: 10px;
	} */
`;

export const AppFooter = styled.footer`
	height: 290px;
	width: 99%;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.line};
	margin-top: 15vh;
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
	}
`;

export const BannerWrapper = styled.section`
	width: 100%;
	height: 260px;
	margin-top: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 40px;
	padding: 0 5%;
	overflow: hidden;
	animation: fadeUp 0.8s ease forwards;

	.left {
		position: relative;
		width: 50%;
		height: 100%;
	}

	.left::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 80px;
		background: linear-gradient(
			to right,
			transparent,
			${({ theme }) => theme.mainBody.background}
		);
	}

	.slice {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-image: ${({ $bannerImage }) => `url(${$bannerImage})`};
		background-size: 600px 260px;
		background-repeat: no-repeat;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		transition: transform 0.6s ease;
		border-radius: 3px;
	}

	/* 🎯 SLICES */
	.s1 {
		width: 17%;
		height: 60%;
		left: 0;
		background-position: 0% center;
		z-index: 2;
	}

	.s2 {
		width: 22%;
		height: 75%;
		left: 15%;
		background-position: 21% center;
		z-index: 1;
	}

	.s3 {
		width: 30%;
		height: 100%;
		left: 35%;
		background-position: 56% center;
		z-index: 3;
	}

	.s4 {
		width: 22%;
		height: 85%;
		left: 65%;
		background-position: 93% center;
		z-index: 1;
	}

	/* ✨ HOVER EFFECT */
	.left:hover .s1 {
		transform: translateY(-50%) translateX(-10px);
	}
	.left:hover .s2 {
		transform: translateY(-50%) translateX(-5px);
	}
	.left:hover .s3 {
		transform: translateY(-50%) scale(1.03);
	}
	.left:hover .s4 {
		transform: translateY(-50%) translateX(10px);
	}

	/* 📝 RIGHT SIDE */
	.right {
		width: 45%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	h2 {
		font-size: 28px;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 14px;
		color: ${({ theme }) => theme.mainBody.sbText};
		line-height: 1.6;
	}

	button {
		width: fit-content;
		padding: 10px 18px;
		border-radius: 6px;
		border: 1px solid ${({ theme }) => theme.mainBody.toolkitActive};
		background: transparent;
		color: ${({ theme }) => theme.intro.logo};
		cursor: pointer;
		transition: all 0.3s ease;
	}

	button:hover {
		background: ${({ theme }) => theme.intro.logo};
		color: #fff;
	}

	/* 📱 MOBILE */
	@media (max-width: 768px) {
		flex-direction: column;
		height: auto;

		.left {
			width: 100%;
			height: 200px;
		}

		.right {
			width: 100%;
			text-align: center;
			align-items: center;
		}
	}
`;
