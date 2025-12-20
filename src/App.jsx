import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import './index.css';
import GlobalStyleInjector from './global.style';
import IndexLayout from './layouts/index-layout/index';
import DashboardLayout from './layouts/admin-layout/index';
import WrapperLayout from './layouts/wrapper-layout/index';
//pages
import AppToast from './layouts/toast';
import Home from './pages/home';
import AboutUs from './pages/about-us';
import Settings from './pages/settings';
import NotFound from './pages/not-found';
import ProductOverview from './pages/product-overview';
import UserCart from './pages/user-cart';
import ShopeItems from './pages/shope-items';
import Authentication from './pages/auth';
// Dashboard pages
import Admin from './pages-dashboard/home';
import Product from './pages-dashboard/home';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<GlobalStyleInjector />
				<div id="containerBody">
					<Routes>
						<Route element={<IndexLayout />}>
							<Route path="/" element={<Home />} />
							<Route path="/about-us" element={<AboutUs />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/overview/:id" element={<ProductOverview />} />
							<Route path="/my-cart" element={<UserCart />} />
							<Route path="/products/*" element={<ShopeItems />} />
						</Route>

						<Route path="/admin" element={<DashboardLayout />}>
							<Route index element={<Admin />} />
							<Route path="products" element={<Product />} />
						</Route>

						<Route element={<WrapperLayout />}>
							<Route path="/authentication/*" element={<Authentication />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</div>
			</Router>
			<AppToast />
		</QueryClientProvider>
	);
}

export default App;
