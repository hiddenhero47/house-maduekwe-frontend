import styled from 'styled-components';

export const Container = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: 40px 24px 60px;
	color: ${({ theme }) => theme.mainBody.text};

	#body {
		display: flex;
		flex-direction: column;
		gap: 60px;
		max-width: 1050px;
		margin: 0 auto;
	}
`;

export const Hero = styled.div`
	display: grid;
	grid-template-columns: 1.2fr 1fr;
	gap: 40px;
	align-items: center;
	margin-bottom: -30px;

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	h1 {
		font-size: 2.2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 1rem;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 520px;
		line-height: 1.6;
	}

	.highlight {
		font-weight: 600;
		color: ${({ theme }) => theme.mainBody.text};
	}

	.hero-image {
		border-radius: 14px;
		overflow: hidden;
		min-height: 280px;
	}

	.hero-image img {
		transition: transform 0.4s ease;
	}

	.hero-image:hover img {
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;

		.hero-image {
			order: -1; /* 👈 image on top on mobile */
		}
	}
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
	border-bottom: 1px solid ${({ theme }) => theme.mainBody.cardSbLine};
	padding-bottom: 20px;

	h2 {
		font-size: 1.2rem;
		font-weight: 700;
		color: ${({ theme }) => theme.mainBody.text};
	}

	p {
		font-size: 0.9rem;
		line-height: 1.7;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 700px;
	}

	ul {
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 6px;

		li {
			font-size: 0.85rem;
			color: ${({ theme }) => theme.mainBody.sbText};
		}
	}

	.value-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		border-radius: 10px;
		background: var(--mainBody-toolkitBg);
		transition: 0.2s;
	}

	.value-card svg {
		font-size: 20px;
		color: var(--intro-logo);
	}

	.value-card h4 {
		font-size: 0.9rem;
		font-weight: 600;
	}

	.value-card p {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.value-card:hover {
		transform: translateY(-3px);
	}

	.section-intro {
		font-size: 0.85rem;
		opacity: 0.7;
		max-width: 600px;
	}

	.policy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 14px;
		margin-top: 10px;
	}

	.policy-item {
		display: flex;
		gap: 10px;
		padding: 12px;
		border-radius: 8px;
		background: var(--mainBody-toolkitBg);
		transition: 0.2s;
	}

	.policy-item svg {
		font-size: 18px;
		color: var(--intro-logo);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.policy-item h4 {
		font-size: 0.85rem;
		font-weight: 600;
	}

	.policy-item p {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.policy-item:hover {
		transform: translateY(-2px);
	}

	.consent {
		margin-top: 10px;
		font-size: 0.8rem;
		opacity: 0.6;
	}
`;

export const Founder = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 30px;
	align-items: center;

	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h2 {
		font-size: 1.2rem;
		font-weight: 700;
	}

	h3 {
		font-size: 1rem;
		font-weight: 600;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	p {
		font-size: 0.9rem;
		line-height: 1.7;
		color: ${({ theme }) => theme.mainBody.sbText};
	}

	.tag {
		font-size: 16px;
		font-weight: 700;
		color: var(--intro-logo);
		background: rgba(0, 0, 0, 0.05);
		padding: 4px 8px;
		border-radius: 20px;
		width: fit-content;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
