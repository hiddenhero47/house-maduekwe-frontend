import React, { useState, useRef } from 'react';
import { Container } from './elements/index.style';
import { toast } from '../../layouts/toast/toast-handler';

function Index() {
	return (
		<Container className="text-mainBody-yellow">
			<p>Index home</p>

			<button onClick={() => toast.success('Successfully')}>test toast</button>
		</Container>
	);
}

export default Index;
