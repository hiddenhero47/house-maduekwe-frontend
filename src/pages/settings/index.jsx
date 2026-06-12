import React, { useState, useEffect } from 'react';
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
import AccountSettings from './elements/account/account';
import Address from './elements/address/address';
import Order from './elements/order/order';
import OrderPreview from './elements/preview-order/preview-order';
import { useSelector } from 'react-redux';

function Index() {
	const settings = {
		PROFILE: 'profile',
		ADDRESS: 'address',
		ORDERS: 'orders',
	};

	const { user, token } = useSelector((state) => state.auth);

	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search);

	// Read from URL or fallback to PROFILE
	const currentFromUrl = query.get('currentSettings') || settings.PROFILE;
	const orderId = query.get('orderId');

	const [currentSettings, setCurrentSettings] = useState(currentFromUrl);

	// 🔄 When a tab is clicked
	const navigateTo = (value) => {
		setCurrentSettings(value);

		const params = new URLSearchParams();
		params.set('currentSettings', value);

		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	};

	const isActive = (value) => currentSettings === value;

	useEffect(() => {
		if (!token || !user?._id) {
			navigate('/');
		}
	});

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
							{orderId ? 'Back To History' : 'Order History'}
						</NavBarBtn>
					</div>
				</Header>

				{isActive(settings.PROFILE) && <AccountSettings />}

				{isActive(settings.ADDRESS) && <Address />}

				{isActive(settings.ORDERS) && !orderId && (
					<Order
						onSelectOrder={(id) => navigateTo(settings.ORDERS, { orderId: id })}
					/>
				)}

				{isActive(settings.ORDERS) && orderId && (
					<OrderPreview orderId={orderId} />
				)}
			</SettingsWrapper>
		</Container>
	);
}

export default Index;
