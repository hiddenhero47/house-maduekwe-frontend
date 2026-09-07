import React from 'react';
import { useTheme } from 'styled-components';
import { Panel, EmptyState } from './index.style';
import DoughnutChart from '../../../components/chart-components/doughnut-chart';
import Candle from '../../../components/loaders/candles/Candle';
import { StatsServices } from '../../../features/services/custom-hooks/stats';

const LABELS = {
	'user-checkout': 'Registered users',
	'guest-checkout': 'Guest checkout',
};

function CheckoutBreakdown() {
	const theme = useTheme();
	const { data, isPending } = StatsServices.checkoutTypeBreakdown();

	const rows = data?.data || [];
	const hasData = rows.some((row) => row.count > 0);

	return (
		<Panel>
			<h2>Guest vs User Checkout</h2>
			<div className="chart_body">
				{isPending ? (
					<EmptyState>
						<Candle />
					</EmptyState>
				) : hasData ? (
					<DoughnutChart
						labels={rows.map((row) => LABELS[row.checkoutType] || row.checkoutType)}
						data={rows.map((row) => row.count)}
						colors={[theme?.form?.blue, theme?.form?.purple]}
					/>
				) : (
					<EmptyState>No checkouts recorded yet</EmptyState>
				)}
			</div>
		</Panel>
	);
}

export default CheckoutBreakdown;
