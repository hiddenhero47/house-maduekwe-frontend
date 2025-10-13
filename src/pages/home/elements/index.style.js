import styled from 'styled-components';

export const Container = styled.div`
	color: black;
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 5px;
	background-color: #111;

	p {
		font-family: ZeroG;
	}
`;

export const IntroWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
	/* overflow: hidden; */

	#introContainer {
		width: fit-content;
		height: 100px;
		position: absolute;
		inset: 0;
		margin: auto;
		display: flex;
		align-items: center;
	}

	#introBox {
		width: 100px;
		height: 100px;
		border: 2px solid rgba(185, 51, 26, 0.5);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0%;
		z-index: 2;
		background: rgba(185, 51, 26, 0.05);
		box-shadow: 0 0 25px rgba(185, 51, 26, 0.15);
		animation: logoEnter 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;

		svg path {
			fill: #b9331a;
			animation: svgGlow 2.5s ease-in-out infinite alternate;
		}
	}
	#introBox:after {
		content: '';
		display: block;
		height: 90%;
		width: 3px;
		background: #d9d9d9;
		position: absolute;
		top: 0;
		right: -25px;
		bottom: 0;
		margin: auto;
		border-radius: 9999px;
		animation: expand 2s ease-in-out forwards;
	}

	#intrText {
		height: 100px;
		color: #d9d9d9;
		padding-left: 150px;
		font-family: 'ZeroG', sans-serif;
		display: flex;
		align-items: center;
		gap: 15px;
		font-weight: 300;
		letter-spacing: 2px;
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
			animation: wordFade 1s ease-out 2.1s forwards;
			color: #b9331a;
			font-weight: 500;
		}
	}

	/* === Animations === */
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
