import React from 'react';
import { Container, TabNav, OptionBtn } from './elements/index.style';
import { BiSolidCabinet } from 'react-icons/bi';
import { TbSubtask } from 'react-icons/tb';
import { SiCircleci } from 'react-icons/si';

function Index() {
	return (
		<Container>
			<h1>Product Classification</h1>

			<TabNav>
				<div id="accountNavWrapper">
					<OptionBtn $active>
						<BiSolidCabinet />
						Categories
					</OptionBtn>

					<OptionBtn $active={false}>
						<TbSubtask />
						Sub Categories
					</OptionBtn>

					<OptionBtn $active={false}>
						<SiCircleci />
						Attributes
					</OptionBtn>
				</div>
			</TabNav>
		</Container>
	);
}

export default Index;
