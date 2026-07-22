import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import './index.css';
import GlobalStyleInjector from './global.style';
import IndexLayout from './layouts/index-layout/index';
import DashboardLayout from './layouts/admin-layout/index';
import WrapperLayout from './layouts/wrapper-layout/index';
import AppToast from './layouts/toast/index-toast';
//pages
import Home from './pages/home';
import AboutUs from './pages/about-us';
import Settings from './pages/settings';
import NotFound from './pages/not-found';
import ProductOverview from './pages/product-overview';
import UserCart from './pages/user-cart';
import ShopeItems from './pages/shope-items';
import Authentication from './pages/auth';
import Checkout from './pages/checkout ';
import ResetPassword from './pages/reset-password';
import Success from './pages/success';
import GuestOrder from './pages/guest-order';
import PrivacyPolicy from './pages/private-policy';
import TermsAndConditions from './pages/terms-and-condition';
// Dashboard pages
import Overview from './pages-dashboard/home';
import Product from './pages-dashboard/products';
import ProductDesign from './pages-dashboard/product-design';
import ProductUpdate from './pages-dashboard/product-update';
import ProductGroups from './pages-dashboard/product-groups';
import ProductClassing from './pages-dashboard/product-classing';
import Orders from './pages-dashboard/orders';
import OrdersDetails from './pages-dashboard/orders-details';
import Payment from './pages-dashboard/payment';
import Flagged from './pages-dashboard/flagged';
import Administrator from './pages-dashboard/administrator';
import AppSettings from './pages-dashboard/settings';

const queryClient = new QueryClient();

function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
								<Route path="/checkout/:orderId" element={<Checkout />} />
								<Route path="/success" element={<Success />} />
								<Route path="/guest-order" element={<GuestOrder />} />
								<Route path="/privacy-policy" element={<PrivacyPolicy />} />
								<Route
									path="/terms-and-conditions"
									element={<TermsAndConditions />}
								/>
							</Route>

							<Route path="/admin" element={<DashboardLayout />}>
								<Route index element={<Overview />} />
								<Route path="products" element={<Product />} />
								<Route path="products/design" element={<ProductDesign />} />
								<Route path="products/design/:id" element={<ProductUpdate />} />
								<Route path="products/group" element={<ProductGroups />} />
								<Route
									path="products/classification"
									element={<ProductClassing />}
								/>
								<Route path="orders" element={<Orders />} />
								<Route path="orders/:id" element={<OrdersDetails />} />
								<Route path="payment-logs" element={<Payment />} />
								<Route path="flagged-orders" element={<Flagged />} />
								<Route path="administrate" element={<Administrator />} />
								<Route path="app-settings" element={<AppSettings />} />
							</Route>

							<Route element={<WrapperLayout />}>
								<Route path="/authentication/*" element={<Authentication />} />
								<Route
									path="/reset-password/:token?"
									element={<ResetPassword />}
								/>
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</div>
				</Router>
				<AppToast />
			</QueryClientProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
