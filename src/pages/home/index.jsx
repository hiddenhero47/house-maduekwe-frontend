import React from 'react';
import { Container } from './elements/index.style';
import myImage from '../../assets/images/svg-raffle-icon4.svg';
// import { newTest } from  '../../utilities/testScrip'

function Index() {
	return (
		<Container>
			<div>
				<div className=" h-[300px] w-[300px]">
					<div className="imageHolder">
						<img src={myImage} alt="" />
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Index;
