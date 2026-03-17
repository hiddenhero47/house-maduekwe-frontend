import React from 'react';
import { LoaderWrapper, NoData, RetryBtn } from './filter&group.style';
import CandleWrapper from '../../../loaders/candles/Candle';
import { useTheme } from 'styled-components';
import { EmptyCartIcon } from '../../../icon-components/empty-cart-icon';

function LoaderNoData({ isLoading, data, refetch }) {
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
						<i>
							<EmptyCartIcon width="100%" height="100%" />
						</i>

						<h3>NO PRODUCT FOUND</h3>

						<span>
							There is no available product to show. Please try something else
						</span>

						{refetch && (
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

export default LoaderNoData;
