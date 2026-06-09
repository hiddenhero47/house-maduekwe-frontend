import React from 'react';
import {
	LoginWrapper,
	LeftBox,
	MyForm,
	RightBox,
} from './elements/index.style';
import { Link } from 'react-router-dom';
import { FaInstagram, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { VectorIcon } from '../../components/icon-components/index.style';
import AppLogo from '../../assets/images/app-logo.svg?react';
import image1 from '../../assets/images/suits1.jpg';
import SignIn from './elements/sign-in/sign-in';
import SignUp from './elements/sign-up/sign-up';
import {
	useParams,
	useMatch,
	useNavigate,
	useLocation,
} from 'react-router-dom';

function Index() {
	const navigate = useNavigate();
	return (
		<LoginWrapper>
			<div id="body">
				<LeftBox>
					<div
						className="mb-[15px] mx-[auto] cursor-pointer"
						onClick={() => navigate('/')}
					>
						<div id="title">
							<i>
								<VectorIcon width="35px" height="35px" vector={AppLogo} />
							</i>
							<div>
								HOUSE <span>MADUEKWE</span>
							</div>
						</div>
					</div>

					<div className="w-full flex items-center">
						{useMatch('authentication') && (
							<MyForm>
								<SignIn />
							</MyForm>
						)}

						{useMatch('authentication/sign-up') && (
							<MyForm>
								<SignUp />
							</MyForm>
						)}
					</div>
				</LeftBox>

				<RightBox>
					<div className="rounded-[inherit] imageHolder">
						<img src={image1} alt="error" />
					</div>
				</RightBox>
			</div>

			<div id="footer">
				<div>
					<span className="text-[12px] mx-[auto]">© 2026 House Maduekwe</span>
				</div>

				<div>
					<span className="flex justify-center items-center gap-[20px] text-[18px] mx-[auto]">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaInstagram />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaXTwitter />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noreferrer"
							className="transition-all duration-300 ease-in-out hover:text-[var(--intro-logo)] hover:scale-125"
						>
							<FaFacebookF />
						</a>
					</span>
				</div>
			</div>
		</LoginWrapper>
	);
}

export default Index;
