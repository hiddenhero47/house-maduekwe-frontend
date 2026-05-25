import styled from 'styled-components';

export const GalleryWrapper = styled.div`
	height: 100vh;
	background: black;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
    display: flex;
    flex-direction: column;

	header {
		height: 70px;
		padding-inline: 20px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		color: white;
	}

	.left,
	.right {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);

		font-size: 50px;
		color: white;
		z-index: 4;
	}

	.left {
		left: 20px;
	}

	.right {
		right: 20px;
	}
`;

export const MainImage = styled.div`
	/* height: 75%; */
    flex: 1;
	aspect-ratio: 1/1;
    max-width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-inline: auto;
	border-radius: inherit;

	div {
		width: 100%;
		height: 100%;
		border-radius: inherit;
        cursor: zoom-in;
	}
`;

export const ThumbList = styled.div`
	height: 80px;
	display: flex;
	gap: 10px;

	overflow: auto;
	padding: 10px;

	button {
		width: 65px;
		height: 70px;
		opacity: 0.6;
	}

	button.active {
		opacity: 1;
		border: 2px solid white;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
