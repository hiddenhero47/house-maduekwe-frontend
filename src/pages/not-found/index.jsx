import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi2';
import { FaArrowLeftLong } from 'react-icons/fa6';

import {
	Container,
	Content,
	IconWrapper,
	ErrorCode,
	Title,
	Description,
	ButtonGroup,
	PrimaryBtn,
	SecondaryBtn,
} from './elements/index.style';

function Index() {
	const navigate = useNavigate();

	return (
		<Container className="Y_scroll_style">
			<Content>
				<IconWrapper>
					<TbError404 />
				</IconWrapper>

				<ErrorCode>404</ErrorCode>

				<Title>Page Not Found</Title>

				<Description>
					The page you're looking for doesn't exist, may have been moved,
					or the link you followed is no longer available.
				</Description>

				<ButtonGroup>
					<PrimaryBtn onClick={() => navigate('/')}>
						<HiOutlineHome />
						Go Home
					</PrimaryBtn>

					<SecondaryBtn onClick={() => navigate(-1)}>
						<FaArrowLeftLong />
						Go Back
					</SecondaryBtn>
				</ButtonGroup>
			</Content>
		</Container>
	);
}

export default Index;