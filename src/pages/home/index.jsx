import React from 'react';
import { Container } from './elements/index.style';
import Intro from '../../layouts/app-intros/intro';

function Index() {
	return (
		<Container>
			{/* <p className="text-5xl m-[auto]">House Maduekwe</p> */}

			<Intro />
		</Container>
	);
}

export default Index;
