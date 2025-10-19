import React from 'react';
import { Container } from './elements/index.style';
import { useOutletContext } from 'react-router-dom';

function Index() {
	const { aftermath } = useOutletContext();
	return (
		<Container>
			<div id='myVideoPlayer' className='flex'>
				{aftermath ? (
				<p className="text-5xl m-[auto] intro-y">Video Player</p>
			) : (
				<p className="text-5xl m-[auto]">Intro still running...</p>
			)}
			</div>
		</Container>
	);
}

export default Index;
