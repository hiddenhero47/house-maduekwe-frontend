import React from 'react';
import { Panel, EmptyState } from './index.style';
import BarChart from '../../../components/chart-components/bar-chart';
import Candle from '../../../components/loaders/candles/Candle';
import { StatsServices } from '../../../features/services/custom-hooks/stats';

function TopSellingPanel() {
	const { data, isPending } = StatsServices.topSellingItems({ limit: 8 });

	const rows = data?.data || [];

	return (
		<Panel>
			<h2>Top Selling Items{data?.month ? ` (${data.month})` : ''}</h2>
			<div className="chart_body">
				{isPending ? (
					<EmptyState>
						<Candle />
					</EmptyState>
				) : rows.length ? (
					<BarChart
						labels={rows.map((row) => row.name || 'Unnamed item')}
						data={rows.map((row) => row.quantitySold)}
						valueSuffix=" sold"
						horizontal
					/>
				) : (
					<EmptyState>No items sold this month yet</EmptyState>
				)}
			</div>
		</Panel>
	);
}

export default TopSellingPanel;
