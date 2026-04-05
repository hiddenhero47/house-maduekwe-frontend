import React from 'react';
import { LoaderWrapper, NoData, RetryBtn } from './cart-loader.style';
import { useSelector } from 'react-redux';
import CandleWrapper from '../../../../components/loaders/candles/Candle';
import { useTheme } from 'styled-components';
import {EmptyCartIcon} from '../../../../components/icon-components/empty-cart-icon';

function CartLoader({ isLoading, data, refetch }) {
	const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isDark = theme.mode === 'dark';
	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;
	return (
		<>
			{isLoading ? (
				<LoaderWrapper>
					<div className="countian">
						<CandleWrapper color="var(--mainBody-sbKitText)" />
					</div>
				</LoaderWrapper>
			) : data.length === 0 ? (
				<NoData>
					<div className="countian">
						<i><EmptyCartIcon width="100%" height="100%"/></i>

						<h3>{activeUser ? 'NO ITEMS IN CART' : 'USER NOT LOGGED IN'}</h3>

						<span>
							{activeUser
								? 'There are no items in your cart. Consider adding one'
								: 'You are not logged in. Login to experience more'}
						</span>

						{(refetch && activeUser) && (
							<RetryBtn onClick={() => refetch()}>
								<div className="content">Retry</div>
							</RetryBtn>
						)}
					</div>
				</NoData>
			) : (
				''
			)}
		</>
	);
}

export default CartLoader;

