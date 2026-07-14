import React from 'react';
import { MasonryGrid, MasonryItem, EmptyState } from './index.style';
import ShopItem from '../../../components/shop-item-display-unit/index';
import { Skeleton } from '../../../components/loaders/skeleton/skeleton.style';
import { EmptyCartIcon } from '../../../components/icon-components/empty-cart-icon';

function MasonryLayout({ data = [], isLoading = false }) {
	const isEmpty = Array.isArray(data) && data.length === 0;

	// ✅ LOADING STATE (Skeletons)
	if (isLoading) {
		return (
			<MasonryGrid>
				{Array.from({ length: 8 }).map((_, i) => (
					<MasonryItem key={i}>
						<Skeleton
							height="100%"
							width="100%"
							$color1="var(--skeleton-background1)"
							$color2="var(--skeleton-background2)"
						/>
					</MasonryItem>
				))}
			</MasonryGrid>
		);
	}

	// ✅ EMPTY STATE
	if (isEmpty) {
		return (
			<EmptyState>
				<div className="content">
					<i>
						<EmptyCartIcon width="100%" height="100%" />
					</i>

					<h3>No Products Found</h3>

					<p>
						We couldn’t find any products matching your selection. Try adjusting
						your filters or check back later.
					</p>
				</div>
			</EmptyState>
		);
	}

	// ✅ SUCCESS STATE
	return (
		<MasonryGrid>
			{data.map((item, i) => (
				<MasonryItem key={item?._id || i}>
					<ShopItem
					    id={`shopItem${i}`}
						isLoading={false}
						product={item}
						width="100%"
						height="100%"
					/>
				</MasonryItem>
			))}
		</MasonryGrid>
	);
}

export default MasonryLayout;
