import React, { useState } from 'react';
import { SecurityWrapper, AccountNav, OptionBtn } from './account.style';
import UserDetails from './user-details/user-details';

function AccountSettings() {
	const profile = {
		DETAILS: 'details',
		PASSWORD: 'password',
		TWO_FA: '2fa',
	};

	const [option, setOption] = useState(profile.DETAILS);

	const handelOptions = (value) => {
		setOption(value);
	};
	return (
		<SecurityWrapper>
			<AccountNav>
				<div id="accountNavWrapper">
					<OptionBtn
						$active={option === profile.DETAILS}
						className="slow"
						onClick={() => handelOptions(profile.DETAILS)}
					>
						<span className="slow">User Details</span>
					</OptionBtn>

					<OptionBtn
						$active={option === profile.TWO_FA}
						className="slow"
						onClick={() => handelOptions(profile.TWO_FA)}
					>
						<span className="slow">2FA Authentication</span>
					</OptionBtn>

					<OptionBtn
						$active={option === profile.PASSWORD}
						className="slow"
						onClick={() => handelOptions(profile.PASSWORD)}
					>
						<span className="slow">Password</span>
					</OptionBtn>
				</div>
			</AccountNav>
			<div id="accountBody">
				{option === profile.DETAILS && <UserDetails />}
			</div>
		</SecurityWrapper>
	);
}

export default AccountSettings;
