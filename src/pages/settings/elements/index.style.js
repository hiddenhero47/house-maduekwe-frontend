import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 20px;
`;

export const SettingsWrapper = styled.div`
	width: clamp(600px, 85%, 1400px);
	min-height: 70%;
	box-sizing: border-box;
	padding-inline: 39px;
	padding-block: 34px;
	margin-right: auto;
	margin-left: 24px;
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	border-radius: 12px;
	border: 1px solid ${({ theme }) => theme?.mainBody?.cardLine};
	background-color: ${({ theme }) => theme?.mainBody?.card};
	color: ${({ theme }) => theme?.mainBody?.text};

	@media (min-width: 621px) and (max-width: 1000px) {
		width: clamp(600px, 95%, 1400px);
		margin-inline: auto;
		padding-inline: 34px;
		padding-block: 29px;
	}

	@media (max-width: 620px) {
		width: 95%;
		margin-inline: auto;
		padding-inline: 29px;
		padding-block: 24px;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	.title {
		font-size: 20px;
		font-weight: 600;
		letter-spacing: -0.30000001192092896px;
		display: flex;
		align-items: center;
		gap: 5px;

		i {
			font-size: 27px;
		}
	}

	#navSettings {
		display: flex;
		gap: 10px 5%; /* row-gap column-gap */
		align-items: center;
		margin-top: 30px;
		padding-bottom: 5px;
		flex-wrap: wrap;
		border-bottom: 1px solid ${({ theme }) => theme?.mainBody?.cardSbLine};

		@media (max-width: 580px) {
			column-gap: 5px;
		}

		@media (max-width: 364px) {
			justify-content: center;
		}
	}
`;

export const NavBarBtn = styled.button`
	font-size: 15px;
	font-weight: 400;
	letter-spacing: -0.30000001192092896px;
	white-space: nowrap;
	padding-inline: 20.5px;
	padding-block: 7px;
	border-radius: 4px;
	background-color: ${(props) =>
		props.$active ? ({ theme }) => theme?.basicBtn?.bgActive : 'transparent'};
	color: ${(props) =>
		props.$active
			? ({ theme }) => theme?.basicBtn?.textActive
			: ({ theme }) => theme?.basicBtn?.text};

	@media (max-width: 580px) {
		font-size: 13px;
		padding-inline: 16.5px;
		padding-block: 7px;
	}

	@media (max-width: 364px) {
		width: 100%;
	}
`;
