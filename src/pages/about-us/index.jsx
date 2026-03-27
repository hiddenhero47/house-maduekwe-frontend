import React from 'react';
import { Container, Section, Hero, Founder } from './elements/index.style';
import { FiShield, FiStar, FiShoppingBag } from 'react-icons/fi';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FiBox, FiAlertCircle, FiUser, FiSlash } from 'react-icons/fi';
import { FiLock, FiCreditCard, FiEye } from 'react-icons/fi';
import { MdContentPaste } from 'react-icons/md';
import { IoMdAttach } from 'react-icons/io';
import brandImage from '../../assets/images/53c02593-30f5-4ad0-96e3-aa4d532cb995.svg'

const dummyImage = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=
eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80`;

function Index() {
	return (
		<Container className="Y_scroll_style">
			<div id="body">
				{/* HERO */}
				<Hero className="intro-y">
					<div className="hero-text">
						<h1>House Maduekwe</h1>

						<p className="highlight">
							Luxury streetwear for men who move with purpose.
						</p>

						<p>
							Designed with intention. Built for presence. Worn with confidence.
						</p>
					</div>

					<div className="hero-image imageHolder">
						<img
							src={brandImage}
							alt="Luxury streetwear"
						/>
					</div>
				</Hero>

				{/* ABOUT */}
				<Section className="intro-y">
					<h2>Our Values</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
						<div className="value-card">
							<FiStar />
							<h4>Premium Quality</h4>
							<p>
								Every piece is crafted with attention to detail and luxury
								standards.
							</p>
						</div>

						<div className="value-card">
							<FiShoppingBag />
							<h4>Modern Experience</h4>
							<p>Seamless shopping powered by modern tools and clean design.</p>
						</div>

						<div className="value-card">
							<FiShield />
							<h4>Secure Payments</h4>
							<p>
								Trusted checkout powered by Stripe with future Apple Pay
								support.
							</p>
						</div>
					</div>
				</Section>

				{/* FOUNDER */}
				<Founder className="intro-y">
					<div className="imageHolder rounded-[12px] overflow-hidden min-h-[350px]">
						<img src={dummyImage} alt="Chinedu Maduekwe" />
					</div>

					<div className="content">
						<span className="tag">Founder</span>
						<h2>Chinedu Maduekwe</h2>

						<p>
							House Maduekwe was built on a vision of confidence, culture, and
							elevated streetwear — designed for modern men who value identity.
						</p>

						<p>
							Blending creativity with structure, Chinedu brings together
							fashion, technology, and user experience to create a brand that
							feels as premium as it looks.
						</p>
					</div>
				</Founder>

				{/* TERMS */}
				<Section className="intro-y">
					<h2 className="flex items-center gap-[8px]">
						<MdContentPaste />
						Terms & Conditions
					</h2>

					<p className="section-intro">
						By using House Maduekwe, you agree to the following terms that
						ensure a smooth and fair experience for all users.
					</p>

					<div className="policy-grid">
						<div className="policy-item">
							<FiBox />
							<div>
								<h4>Product Availability</h4>
								<p>
									All products are subject to availability and may be updated.
								</p>
							</div>
						</div>

						<div className="policy-item">
							<FiAlertCircle />
							<div>
								<h4>Pricing</h4>
								<p>Prices may change without prior notice.</p>
							</div>
						</div>

						<div className="policy-item">
							<FiSlash />
							<div>
								<h4>Order Rights</h4>
								<p>We reserve the right to cancel or refuse any order.</p>
							</div>
						</div>

						<div className="policy-item">
							<FiUser />
							<div>
								<h4>Account Responsibility</h4>
								<p>
									You are responsible for maintaining your account security.
								</p>
							</div>
						</div>
					</div>
				</Section>

				{/* PRIVACY */}
				<Section className="intro-y">
					<h2 className="flex items-center gap-[8px]">
						<IoMdAttach />
						Privacy Policy
					</h2>

					<p className="section-intro">
						We respect your privacy and are committed to protecting your
						personal information.
					</p>

					<div className="policy-grid">
						<div className="policy-item">
							<FiLock />
							<div>
								<h4>Data Protection</h4>
								<p>We do not sell or share your personal information.</p>
							</div>
						</div>

						<div className="policy-item">
							<FiCreditCard />
							<div>
								<h4>Secure Payments</h4>
								<p>Transactions are processed securely via Stripe.</p>
							</div>
						</div>

						<div className="policy-item">
							<FiEye />
							<div>
								<h4>Usage Tracking</h4>
								<p>We use cookies to improve performance and experience.</p>
							</div>
						</div>
					</div>

					<p className="consent">
						By using our platform, you agree to these practices.
					</p>
				</Section>

				<Section className="intro-y">
					<h2>Contact Us</h2>

					<div className="flex flex-col gap-[10px]">
						<div className="flex items-center gap-[8px]">
							<FiMail />
							<span>support@housemaduekwe.com</span>
						</div>

						<div className="flex items-center gap-[8px]">
							<FiPhone />
							<span>+234 XXX XXX XXXX</span>
						</div>
					</div>
				</Section>
			</div>
		</Container>
	);
}

export default Index;
