import React, { useState } from 'react';
import { Panel, PanelHeader, PeriodTabs, PeriodBtn, EmptyState } from './index.style';
import LineChart from '../../../components/chart-components/line-chart';
import Candle from '../../../components/loaders/candles/Candle';
import { StatsServices } from '../../../features/services/custom-hooks/stats';

const PERIODS = [
	{ key: 'day', label: '7 Days' },
	{ key: 'week', label: '5 Weeks' },
	{ key: 'month', label: '12 Months' },
];

function SalesChart() {
	const [period, setPeriod] = useState('day');
	const { data, isPending } = StatsServices.salesTimeseries(period);

	const series = data?.data || [];
	const hasData = series.some((point) => point.revenue > 0);

	return (
		<Panel>
			<PanelHeader>
				<h2>Sales Overview</h2>
				<PeriodTabs>
					{PERIODS.map((p) => (
						<PeriodBtn
							key={p.key}
							type="button"
							$active={period === p.key}
							onClick={() => setPeriod(p.key)}
						>
							{p.label}
						</PeriodBtn>
					))}
				</PeriodTabs>
			</PanelHeader>

			<div className="chart_body">
				{isPending ? (
					<EmptyState>
						<Candle />
					</EmptyState>
				) : hasData ? (
					<LineChart
						labels={series.map((point) => point.label)}
						data={series.map((point) => point.revenue)}
					/>
				) : (
					<EmptyState>No sales recorded for this period yet</EmptyState>
				)}
			</div>
		</Panel>
	);
}

export default SalesChart;
