import styled from 'styled-components';

export const MenuWrapper = styled.aside`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme?.mainBody.container};
	border-radius: 8px;
	border: 2px solid ${({ theme }) => theme?.mainBody.line};
	position: relative;
`;

export const MenuHeader = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	align-items: center;
	padding-inline: clamp(10px, 10%, 20px);
	padding-top: 10px;
	padding-bottom: 5px;
	position: relative;
	border-bottom: 1.5px solid ${({ theme }) => theme?.mainBody.line};

	#title {
		display: flex;
		align-items: center;

		svg path {
			fill: ${({ theme }) => theme?.intro.logo};
		}

		div {
			font-size: clamp(8px, 65%, 9.8px);
			font-family: ZeroG;
			font-weight: 900;
			line-height: 10px;
			transform: translateX(-8px);
			color: ${({ theme }) => theme?.mainBody.text};

			span {
				color: ${({ theme }) => theme?.intro.logo};
			}
		}
	}

	#closeLeftMenuBtn {
		position: absolute;
		left: calc(100% + 2px);
		padding-block: 5px;
		border-radius: 1px 6px 6px 1px;
		background-color: ${({ theme }) => theme?.intro.logo};
		color: #f2f2f2;
		z-index: 2;
		font-size: 18px;
		cursor: pointer;

		i {
			pointer-events: none;
		}
	}
`;

export const UserSection = styled.div`
	width: 100%;
	padding-inline: clamp(10px, 8%, 15px);
	margin-top: 30px;
	padding-bottom: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;

	#overview {
		width: 100%;
		height: fit-content;
		display: flex;
		padding: 8px;
		background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
		border-radius: 5px;
		border: 1px ${({ theme }) => theme?.mainBody.toolkitActive};
	}

	#avatar {
		height: 35px;
		width: 35px;
		border-radius: 3px;
		background-color: black;
	}

	#client {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-family: Inter;
		font-weight: 600;
		margin-left: 10px;

		span:nth-child(1) {
			color: ${({ theme }) => theme?.mainBody.sbText};
			font-size: 11px;
		}

		span:nth-child(2) {
			color: ${({ theme }) => theme?.mainBody.text};
			font-size: 13px;
		}
	}

	.theme_line_up {
		transform: translateY(-2px);
	}
`;

export const MenuSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 30px;

	h3 {
		font-size: 14px;
		font-weight: 900;
		margin-left: clamp(10px, 8%, 15px);
		color: ${({ theme }) => theme?.menu.sbText};
	}

	ul {
		width: 100%;
		padding-inline: clamp(10px, 8%, 15px);
		padding-bottom: 10px;
		margin-top: 10px;
		height: fit-content;
		max-height: 799px;
		display: flex;
		flex-direction: column;
		gap: 5px;

		li {
			width: 100%;
			margin: 0;
			list-style: none;

			a {
				padding-block: calc(3% + 2px);
			}
		}
	}
`;

export const SocialSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: clamp(20px, 30%, 100px);
	padding-inline: clamp(10px, 8%, 15px);
	padding-bottom: 10px;
	
	.social_wrapper {
		border-top: 1px solid ${({ theme }) => theme?.mainBody.line};
	}
`;
