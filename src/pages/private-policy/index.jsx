import React from 'react';
import {
	Container,
	Hero,
	Content,
	Section,
	LastUpdated,
} from './elements/index.style';

function Index() {
	return (
		<Container className="Y_scroll_style">
			<Hero>
				<h1>Privacy Policy</h1>
				<p>How House Maduekwe collects, uses, and protects your information.</p>
				<LastUpdated>Last updated: July 22, 2026</LastUpdated>
			</Hero>

			<Content>
				<Section id="intro">
					<h2>Introduction</h2>
					<p>
						House Maduekwe ("we," "our," or "us") respects your privacy and is
						committed to protecting your personal information. This Privacy
						Policy explains how we collect, use, disclose, and safeguard your
						information when you visit our website, make a purchase, or interact
						with us.
					</p>
				</Section>

				<Section id="collect">
					<h2>Information We Collect</h2>
					<p>We may collect the following types of information:</p>
					<ul>
						<li>Name, email address, phone number, and shipping address.</li>
						<li>
							Billing and payment information processed securely through Stripe.
						</li>
						<li>Order history and purchase preferences.</li>
						<li>
							Device, browser, and usage information collected through cookies
							and analytics.
						</li>
						<li>
							Communications you send to us through email or customer support.
						</li>
					</ul>
				</Section>

				<Section id="use">
					<h2>How We Use Your Information</h2>
					<p>We use your information to:</p>
					<ul>
						<li>Process and fulfill your orders.</li>
						<li>Provide customer support and respond to inquiries.</li>
						<li>
							Send order confirmations, shipping updates, and transactional
							emails.
						</li>
						<li>Improve our website, products, and shopping experience.</li>
						<li>Detect and prevent fraud or unauthorized activity.</li>
						<li>Comply with legal obligations and enforce our policies.</li>
					</ul>
				</Section>

				<Section id="payment">
					<h2>Payments</h2>
					<p>
						We use Stripe to process payments. We do not store your full credit
						card details on our servers. Payment information is handled securely
						by Stripe in accordance with its privacy and security practices.
					</p>
				</Section>

				<Section id="sharing">
					<h2>Sharing Your Information</h2>
					<p>
						We do not sell your personal information. We may share information
						with trusted service providers who help us operate our business,
						including:
					</p>
					<ul>
						<li>Payment processors such as Stripe.</li>
						<li>Shipping and delivery providers.</li>
						<li>Email service providers such as Mailgun.</li>
						<li>Analytics and website hosting providers.</li>
					</ul>
					<p>
						These providers are only permitted to use your information as
						necessary to perform services on our behalf.
					</p>
				</Section>

				<Section id="cookies">
					<h2>Cookies and Analytics</h2>
					<p>
						We use cookies and similar technologies to remember your
						preferences, keep items in your cart, analyze website traffic, and
						improve your shopping experience. You can control cookies through
						your browser settings.
					</p>
				</Section>

				<Section id="security">
					<h2>Data Security</h2>
					<p>
						We implement reasonable administrative, technical, and physical
						safeguards to protect your personal information. However, no method
						of transmission over the internet is completely secure, and we
						cannot guarantee absolute security.
					</p>
				</Section>

				<Section id="rights">
					<h2>Your Rights</h2>
					<p>
						Depending on your location, including certain U.S. states, you may
						have rights regarding your personal information, such as the right
						to access, correct, delete, or request information about how your
						data is used.
					</p>
					<p>
						To exercise these rights, please contact us using the information
						below.
					</p>
				</Section>

				<Section id="children">
					<h2>Children's Privacy</h2>
					<p>
						Our website is not intended for children under 13 years of age, and
						we do not knowingly collect personal information from children.
					</p>
				</Section>

				<Section id="changes">
					<h2>Changes to This Policy</h2>
					<p>
						We may update this Privacy Policy from time to time. Any changes
						will be posted on this page with an updated effective date.
					</p>
				</Section>

				<Section id="contact">
					<h2>Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy or our privacy
						practices, please contact us at:
					</p>

					<div className="contact-box">
						<strong>House Maduekwe</strong>
						<p>Email: support@housemaduekwe.com</p>
						<p>Website: https://housemaduekwe.com</p>
					</div>
				</Section>
			</Content>
		</Container>
	);
}

export default Index;
