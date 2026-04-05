import styled, { keyframes } from 'styled-components';

export const LoaderWrapper = styled.div`
	width: 100%;
	min-height: 500px;
	position: relative;

	.countian {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
	}
`;

const floatFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const NoData = styled.div`
	width: 60%;
	position: relative;
	display: flex;
	margin-inline: auto;

	.countian {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-inline: auto;
		animation: ${floatFade} 0.35s ease;
	}

	i {
		opacity: 0.65;
		width: 40%;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: ${({ theme }) => theme.mainBody.text};
		margin-top: 6px;
	}

	span {
		font-size: 14px;
		line-height: 1.6;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 360px;
		text-align: center;
	}
`;

export const RetryBtn = styled.button`
	margin-top: 10px;
	padding-block: 5px;
	padding-inline: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	background-color: ${({ $isLoading, disabled, theme }) =>
		!$isLoading && disabled
			? theme?.filterBtn?.disabledBg
			: theme?.filterBtn?.background};
	position: relative;
	cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: ${({ theme, disabled }) =>
			!disabled ? theme?.filterBtn?.hoverBg : ''};
	}

	.content {
		display: flex;
		align-items: center;
		gap: 6px;
		visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
		font-size: 13px;
		font-weight: 600;
		font-family: Inter;
		color: ${({ theme }) => theme?.filterBtn?.text};
	}

	.loader {
		display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
		position: absolute;
		margin: auto;
		z-index: 2;
	}

	@media (max-width: 500px) {
		padding-inline: 7px;
		.content {
			gap: 4px;
			font-size: 11px;
		}
	}
`;

export const EmptyState = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30px 20px;

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		animation: fadeInUp 0.35s ease;
	}

	i {
		width: clamp(120px, 20vw, 180px);
		opacity: 0.6;
		margin-bottom: 10px;
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
		color: var(--mainBody-text);
		margin-bottom: 6px;
		letter-spacing: 0.3px;
	}

	p {
		font-size: 14px;
		color: var(--mainBody-sbText);
		max-width: 360px;
		line-height: 1.5;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;
