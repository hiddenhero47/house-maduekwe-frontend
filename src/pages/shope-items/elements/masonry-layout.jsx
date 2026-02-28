import React, { useEffect, useRef } from 'react';
import { MasonryGrid, MasonryItem} from './index.style';
import ShopItem from '../../../components/shop-item-display-unit/index';

function MasonryLayout({ data = [], isLoading = false }) {
	return (
		<>
			{data.length > 0 ? (
				<MasonryGrid>
					{data.map((item, i) => (
						<MasonryItem key={item?._id || i}>
							<ShopItem
								isLoading={isLoading}
								product={item}
								width="100%"
								height="100%"
							/>
						</MasonryItem>
					))}
				</MasonryGrid>
			) : (
				<div>
					<p>No Data</p>
				</div>
			)}
		</>
	);
}

export default MasonryLayout;
//clamp(25px, 33%, 80px)
