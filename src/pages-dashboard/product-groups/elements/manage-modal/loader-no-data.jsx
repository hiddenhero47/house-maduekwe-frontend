import React from 'react';
import { LoaderWrapper, NoData, RetryBtn } from './manage-modal.style';
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

						<h3>NO PRODUCT FOUND</h3>

						<span>
							There are no added product to show. Please try adding a product
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
