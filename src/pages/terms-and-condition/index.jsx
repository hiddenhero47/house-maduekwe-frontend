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
				<h1>Terms &amp; Conditions</h1>
				<p>
					The rules and conditions for using House Maduekwe and purchasing our
					products.
				</p>
				<LastUpdated>Last updated: July 22, 2026</LastUpdated>
			</Hero>

			<Content>
				<Section id="acceptance">
					<h2>Acceptance of Terms</h2>
					<p>
						By accessing or using the House Maduekwe website, you agree to be
						bound by these Terms &amp; Conditions. If you do not agree with any
						part of these terms, please do not use our website.
					</p>
				</Section>

				<Section id="eligibility">
					<h2>Eligibility</h2>
					<p>
						You must be at least 18 years old, or have permission from a parent
						or legal guardian, to make purchases on our website.
					</p>
				</Section>

				<Section id="products">
					<h2>Products and Pricing</h2>
					<ul>
						<li>All prices are listed in the currency shown at checkout.</li>
						<li>We reserve the right to change prices at any time.</li>
						<li>
							Product availability is not guaranteed until your order is
							confirmed.
						</li>
						<li>
							We make reasonable efforts to display product colors accurately,
							but actual colors may vary by device.
						</li>
					</ul>
				</Section>

				<Section id="orders">
					<h2>Orders and Payment</h2>
					<p>
						When you place an order, you agree that all information provided is
						accurate and complete. Payments are processed securely through
						Stripe, and we do not store your full payment card details.
					</p>
					<p>
						We reserve the right to refuse, cancel, or limit any order for
						reasons including suspected fraud, pricing errors, or product
						unavailability.
					</p>
				</Section>

				<Section id="shipping">
					<h2>Shipping and Delivery</h2>
					<p>
						Shipping times are estimates and may vary depending on your location
						and carrier delays. House Maduekwe is not responsible for delays
						caused by shipping providers or circumstances beyond our control.
					</p>
				</Section>

				<Section id="returns">
					<h2>Returns and Refunds</h2>
					<p>
						We want you to be satisfied with your purchase. Eligible items may
						be returned or exchanged in accordance with our Return Policy.
						Returned items must generally be unused, in original condition, and
						with all tags attached.
					</p>
				</Section>

				<Section id="account">
					<h2>Account Responsibility</h2>
					<p>
						If you create an account, you are responsible for maintaining the
						confidentiality of your login credentials and for all activities
						that occur under your account.
					</p>
				</Section>

				<Section id="intellectual">
					<h2>Intellectual Property</h2>
					<p>
						All content on this website, including text, images, logos, designs,
						and graphics, is the property of House Maduekwe or its licensors and
						is protected by applicable intellectual property laws.
					</p>
				</Section>

				<Section id="liability">
					<h2>Limitation of Liability</h2>
					<p>
						To the fullest extent permitted by law, House Maduekwe shall not be
						liable for any indirect, incidental, special, or consequential
						damages arising from your use of the website or purchase of our
						products.
					</p>
				</Section>

				<Section id="law">
					<h2>Governing Law</h2>
					<p>
						These Terms &amp; Conditions shall be governed by and construed in
						accordance with the laws applicable in the jurisdiction where House
						Maduekwe operates, without regard to conflict of law principles.
					</p>
				</Section>

				<Section id="changes">
					<h2>Changes to These Terms</h2>
					<p>
						We may update these Terms &amp; Conditions from time to time.
						Changes will be posted on this page with an updated effective date.
					</p>
				</Section>

				<Section id="contact">
					<h2>Contact Us</h2>
					<p>
						If you have any questions about these Terms &amp; Conditions, please
						contact us at:
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
