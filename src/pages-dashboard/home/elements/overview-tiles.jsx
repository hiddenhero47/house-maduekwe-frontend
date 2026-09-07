import React from 'react';
import { useTheme } from 'styled-components';
import { TilesRow } from './index.style';
import StatTile from '../../../components/stat-tile/stat-tile';
import { StatsServices } from '../../../features/services/custom-hooks/stats';
import { addCommas } from '../../../utilities/basic-functions';
import { TbCoin, TbTrendingUp } from 'react-icons/tb';
import { MdOutlineShoppingBag, MdOutlineLocalShipping } from 'react-icons/md';

function OverviewTiles() {
	const theme = useTheme();
	const { data, isPending } = StatsServices.overview();

	return (
		<TilesRow>
			<StatTile
				icon={<TbCoin />}
				label="Revenue this month"
				value={addCommas(data?.thisMonth?.revenue || 0)}
				color={theme?.form?.blue}
				isLoading={isPending}
			/>
			<StatTile
				icon={<TbTrendingUp />}
				label="Avg. order value (this month)"
				value={addCommas(data?.thisMonth?.averageOrderValue || 0)}
				color={theme?.form?.purple}
				isLoading={isPending}
			/>
			<StatTile
				icon={<MdOutlineShoppingBag />}
				label="Orders this month"
				value={addCommas(data?.thisMonth?.orders || 0)}
				color={theme?.form?.green}
				isLoading={isPending}
			/>
			<StatTile
				icon={<MdOutlineLocalShipping />}
				label="Awaiting shipment"
				value={addCommas(data?.awaitingShipment || 0)}
				color={theme?.form?.orange}
				isLoading={isPending}
			/>
		</TilesRow>
	);
}

export default OverviewTiles;
