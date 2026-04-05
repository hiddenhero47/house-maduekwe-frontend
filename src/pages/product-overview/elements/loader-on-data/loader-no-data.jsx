import React from 'react';
import { LoaderWrapper, NoData, RetryBtn } from './loader-no-data.style';
import CandleWrapper from '../../../../components/loaders/candles/Candle';
import { EmptyCartIcon } from '../../../../components/icon-components/empty-cart-icon';

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

						<h3>PRODUCT NOT FOUND</h3>

						<span>
							This product was not found. Please try something else
						</span>

						{refetch && (
							<RetryBtn onClick={() => refetch()}>
								<div className="content">Refresh</div>
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
