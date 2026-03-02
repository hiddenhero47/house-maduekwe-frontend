import styled, { keyframes } from 'styled-components';

export const LoaderWrapper = styled.div`
	width: 100%;
	min-height: 300px;
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
	width: 100%;
	position: relative;
	display: flex;

	.countian {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-inline: auto;
		margin-top: 30px;
		animation: ${floatFade} 0.35s ease;
	}

	i {
		opacity: 0.65;
	}

	h3 {
		font-size: 17px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: ${({ theme }) => theme.mainBody.text};
		margin-top: 6px;
	}

	span {
		font-size: 15px;
		line-height: 1.6;
		color: ${({ theme }) => theme.mainBody.sbText};
		max-width: 360px;
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
