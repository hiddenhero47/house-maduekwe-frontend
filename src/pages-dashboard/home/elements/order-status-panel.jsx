import React from 'react';
import { useTheme } from 'styled-components';
import { Panel, PanelHeader, Badge, EmptyState } from './index.style';
import BarChart from '../../../components/chart-components/bar-chart';
import Candle from '../../../components/loaders/candles/Candle';
import { StatsServices } from '../../../features/services/custom-hooks/stats';

// Mirrors the status -> color language used for order badges in pages-dashboard/orders
const STATUS_LABELS = {
	pending: 'Pending',
	paid: 'Paid',
	processing: 'Processing',
	shipped: 'Shipped',
	delivered: 'Delivered',
	cancelled: 'Cancelled',
	returned: 'Returned',
	'processing-return': 'Return Processing',
};

const STATUS_COLOR_KEYS = {
	pending: 'orange',
	paid: 'green',
	processing: 'blue',
	shipped: 'yellow',
	delivered: 'green',
	cancelled: 'error',
	returned: 'purple',
	'processing-return': 'violetL',
};

function OrderStatusPanel() {
	const theme = useTheme();
	const { data, isPending } = StatsServices.orderStatusBreakdown();

	const rows = data?.data || [];
	const hasData = rows.some((row) => row.count > 0);

	return (
		<Panel>
			<PanelHeader>
				<h2>Orders by Status</h2>
				{typeof data?.awaitingShipment === 'number' && (
					<Badge>{data.awaitingShipment} awaiting shipment</Badge>
				)}
			</PanelHeader>

			<div className="chart_body">
				{isPending ? (
					<EmptyState>
						<Candle />
					</EmptyState>
				) : hasData ? (
					<BarChart
						labels={rows.map((row) => STATUS_LABELS[row.status] || row.status)}
						data={rows.map((row) => row.count)}
						colors={rows.map((row) => theme?.form?.[STATUS_COLOR_KEYS[row.status]])}
						horizontal
					/>
				) : (
					<EmptyState>No orders recorded yet</EmptyState>
				)}
			</div>
		</Panel>
	);
}

export default OrderStatusPanel;
