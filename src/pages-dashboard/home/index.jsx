import React from 'react';
import { Container, PanelGrid } from './elements/index.style';
import OverviewTiles from './elements/overview-tiles';
import SalesChart from './elements/sales-chart';
import CheckoutBreakdown from './elements/checkout-breakdown';
import OrderStatusPanel from './elements/order-status-panel';
import TopSellingPanel from './elements/top-selling-panel';

function Index() {
	return (
		<Container>
			<h1>Dashboard Overview</h1>

			<OverviewTiles />

			<PanelGrid>
				<SalesChart />
				<CheckoutBreakdown />
			</PanelGrid>

			<PanelGrid>
				<OrderStatusPanel />
				<TopSellingPanel />
			</PanelGrid>
		</Container>
	);
}

export default Index;
