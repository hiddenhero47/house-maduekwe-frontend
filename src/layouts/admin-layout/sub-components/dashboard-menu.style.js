import styled from 'styled-components';

export const SideBar = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* padding-inline: clamp(10px, 10%, 25px); */
    padding-block: 15px;
    border-radius: inherit;

    #header_title {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        margin-top: 10px;
        padding-inline: clamp(10px, 10%, 30px);
        color: ${({ theme }) => theme?.mainBody.text};
    }
`;

export const MenuSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	h3 {
		font-size: 14px;
		font-weight: 500;
		margin-left: clamp(10px, 8%, 15px);
		color: ${({ theme }) => theme?.mainBody.kitTextDark};
	}

	ul {
		width: 100%;
		padding-inline: clamp(10px, 8%, 15px);
		padding-bottom: 10px;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		gap: 5px;

		li {
			width: 100%;
			list-style: none;

			a {
				padding-block: calc(3% + 2px);
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 6px;
				transition: all 0.25s ease;
				background-color: transparent;

				&:hover {
					background-color: ${({ theme }) => theme?.mainBody.toolkitBg};
					transform: translateX(3px);

					i {
						color: ${({ theme }) => theme?.intro.logo};
					}

					span {
						color: ${({ theme }) => theme?.menu.active};
					}
				}
			}
		}
	}
`;

export const SocialSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: auto;
	/* margin-bottom: 10%; */
	padding-inline: clamp(10px, 8%, 15px);
	padding-bottom: 10px;

	.social_wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		padding-top: 15px;
		border-top: 1px solid ${({ theme }) => theme?.mainBody.line};

		a {
			font-size: 18px;
			color: ${({ theme }) => theme?.menu.icon};
			transition: all 0.3s ease;

			&:hover {
				color: ${({ theme }) => theme?.intro.logo};
				transform: scale(1.2);
			}
		}
	}

	.footer_text {
		font-size: 11px;
		text-align: center;
		margin-top: 10px;
		color: ${({ theme }) => theme?.menu.sbText};
	}
`;
