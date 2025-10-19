import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;

	#myVideoPlayer {
		width: 100%;
		aspect-ratio: 1.8;
		display: flex;
		position: relative;

		@supports not (aspect-ratio: 1.8) {
			width: 90vmin;
			height: 50vmin;
		}
	}
`;
