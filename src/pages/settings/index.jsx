import React, { useState } from 'react';
import {
	Container,
	SettingsWrapper,
	Header,
	NavBarBtn,
} from './elements/index.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserGear } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import AccountSettings from './elements/account';

function Index() {
	const settings = {
		PROFILE: 'profile',
		ADDRESS: 'address',
		ORDERS: 'orders',
	};

	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search);

	// Read from URL or fallback to PROFILE
	const currentFromUrl = query.get('currentSettings') || settings.PROFILE;

	const [currentSettings, setCurrentSettings] = useState(currentFromUrl);

	// 🔄 When a tab is clicked
	const navigateTo = (value) => {
		setCurrentSettings(value);

		const params = new URLSearchParams(location.search);
		params.set('currentSettings', value);

		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	};

	const isActive = (value) => currentSettings === value;

	return (
		<Container className="Y_scroll_style">
			<SettingsWrapper className="bg-mainBody-cardBg text-mainBody-text">
				<Header>
					<h2 className="title">
						{isActive(settings.PROFILE) && (
							<>
								<i>
									<FaUserGear />
								</i>
								Account Settings
							</>
						)}

						{isActive(settings.ADDRESS) && (
							<>
								<i>
									<IoLocationSharp />
								</i>
								Address Management
							</>
						)}

						{isActive(settings.ORDERS) && (
							<>
								<i>
									<TbTruckDelivery />
								</i>
								Your Order History
							</>
						)}
					</h2>

					<div id="navSettings">
						<NavBarBtn
							$active={isActive(settings.PROFILE)}
							onClick={() => navigateTo(settings.PROFILE)}
						>
							Account Settings
						</NavBarBtn>

						<NavBarBtn
							$active={isActive(settings.ADDRESS)}
							onClick={() => navigateTo(settings.ADDRESS)}
						>
							Manage Addresses
						</NavBarBtn>

						<NavBarBtn
							$active={isActive(settings.ORDERS)}
							onClick={() => navigateTo(settings.ORDERS)}
						>
							Order History
						</NavBarBtn>
					</div>
				</Header>

				{isActive(settings.PROFILE) && <AccountSettings />}
			</SettingsWrapper>
		</Container>
	);
}

export default Index;
