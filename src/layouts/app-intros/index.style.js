import styled from 'styled-components';

export const IntroWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #111;
	position: relative;

	/* ===================== */
	/* 🔹 Intro Container */
	/* ===================== */
	#introContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1.5rem, 4vw, 3rem);

		@media (max-width: 500px) {
			gap: clamp(1rem, 3.5vw, 3rem);
		}
	}

	/* ===================== */
	/* 🔹 Logo Box */
	/* ===================== */
	#introBox {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;

		width: clamp(45px, 14vw, 100px);
		aspect-ratio: 1 / 1;
		border: 2px solid rgba(185, 51, 26, 0.5);
		border-radius: 12px;
		background: rgba(185, 51, 26, 0.05);
		box-shadow: 0 0 25px rgba(185, 51, 26, 0.15);

		animation: logoEnter 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;

		svg path {
			fill: #b9331a;
			animation: svgGlow 2.5s ease-in-out infinite alternate;
		}

		@supports not (aspect-ratio: 1 / 1) {
			width: 20vmin;
			height: 20vmin;
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: calc(-1 * clamp(14px, 2.5vw, 25px));
			margin: auto;

			display: block;
			height: 80%;
			width: clamp(1px, 0.5vw, 3px);
			background: #d9d9d9;
			border-radius: 9999px;

			animation: expand 2s ease-in-out forwards;

			@media (max-width: 500px) {
				width: clamp(1px, 0.4vw, 2px);
				right: calc(-1 * clamp(11px, 2.5vw, 15px));
			}
		}
	}

	/* ===================== */
	/* 🔹 Intro Text */
	/* ===================== */
	#intrText {
		display: flex;
		align-items: center;
		gap: clamp(6px, 2vw, 15px);
		font-family: 'ZeroG', sans-serif;
		font-size: clamp(0.625rem, 2.5vw, 1.25rem);
		font-weight: 300;
		letter-spacing: 2px;
		color: #d9d9d9;

		opacity: 0;
		transform: translateY(10px);
		animation: fadeIn 2.3s ease-out 0.5s forwards;

		span {
			display: inline-block;
			opacity: 0;
			transform: translateY(20px);
		}

		.first {
			animation: wordFade 1s ease-out 1.8s forwards;
		}

		.second {
			color: #b9331a;
			font-weight: 500;
			animation: wordFade 1s ease-out 2.1s forwards;
		}
	}

	/* ===================== */
	/* 🔹 Animations */
	/* ===================== */
	@keyframes logoEnter {
		0% {
			transform: scale(0) rotate(-20deg);
			left: 40%;
			opacity: 0;
		}
		40% {
			transform: scale(1.1) rotate(5deg);
			left: 40%;
			opacity: 1;
		}
		60% {
			transform: scale(0.95);
			left: 40%;
		}
		100% {
			transform: scale(1) rotate(0);
			left: 0%;
		}
	}

	@keyframes expand {
		0% {
			height: 0;
			opacity: 0;
		}
		40% {
			height: 0;
			opacity: 0.5;
		}
		100% {
			height: 80%;
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(15px);
		}
		60% {
			opacity: 0.5;
			transform: translateY(5px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes wordFade {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes svgGlow {
		from {
			filter: drop-shadow(0 0 0 rgba(185, 51, 26, 0));
		}
		to {
			filter: drop-shadow(0 0 6px rgba(185, 51, 26, 0.8));
		}
	}
`;
