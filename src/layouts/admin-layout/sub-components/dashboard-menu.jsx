import React from 'react';
import { SideBar, MenuSection, SocialSection } from './dashboard-menu.style';
import { Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FaInstagram, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import { IoShirtSharp } from 'react-icons/io5';
import { IoCreate } from 'react-icons/io5';
import { FaLayerGroup } from 'react-icons/fa6';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { MdLocalShipping } from 'react-icons/md';
import { MdPayment } from 'react-icons/md';
import { TbFlagCancel } from 'react-icons/tb';
import { IoIosSettings } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import { ensureRole } from '../../../store/slice/auth';
import { roleType } from '../../../utilities/app-const';
import { useSelector, useDispatch } from 'react-redux';

function SideMenu({ close }) {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	return (
		<SideBar>
			<h1 id="header_title" className="font-sans">
				House Maduekwe
			</h1>

			<MenuSection className="mt-[15px]">
				<ul>
					<li>
						<Link
							to="/admin"
							onClick={() => close()}
							className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
						>
							<div className="flex items-center gap-[8px]">
								<i className="text-[19px] text-[var(--menu-icon)]">
									<RxDashboard />
								</i>

								<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
									Overview
								</span>
							</div>
						</Link>
					</li>
				</ul>
			</MenuSection>

			<div className="mt-[17px] Y_scroll_style w-full">
				<MenuSection className="">
					<h3 className="font-sans">Products</h3>

					<ul>
						<li>
							<Link
								to="/admin/products"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<IoShirtSharp />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Shop Items
									</span>
								</div>
							</Link>
						</li>

						<li>
							<Link
								to="/admin/products/design"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<IoCreate />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Design Items
									</span>
								</div>
							</Link>
						</li>

						<li>
							<Link
								to="/admin/products/group"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<FaLayerGroup />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Group Items
									</span>
								</div>
							</Link>
						</li>

						<li>
							<Link
								to="/admin/products/classification"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<BiSolidCategoryAlt />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Categories & Attributes
									</span>
								</div>
							</Link>
						</li>
					</ul>
				</MenuSection>

				<MenuSection className="mt-[17px]">
					<h3 className="font-sans">Orders</h3>

					<ul>
						<li>
							<Link
								to="/admin/orders"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<MdLocalShipping />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Orders Placed
									</span>
								</div>
							</Link>
						</li>

						<li>
							<Link
								to="/admin/payment-logs"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<MdPayment />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Payment Logs
									</span>
								</div>
							</Link>
						</li>

						<li>
							<Link
								to="/admin/flagged-orders"
								onClick={() => close()}
								className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
							>
								<div className="flex items-center gap-[8px]">
									<i className="text-[19px] text-[var(--menu-icon)]">
										<TbFlagCancel />
									</i>

									<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
										Flagged Orders
									</span>
								</div>
							</Link>
						</li>
					</ul>
				</MenuSection>

				{user?.role === roleType.SUPER_ADMIN && (
					<MenuSection className="mt-[17px]">
						<h3 className="font-sans">Administrator</h3>

						<ul>
							<li>
								<Link
									to="/admin/administrate"
									onClick={() => close()}
									className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
								>
									<div className="flex items-center gap-[8px]">
										<i className="text-[19px] text-[var(--menu-icon)]">
											<FaUserPlus />
										</i>

										<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
											Create Admin
										</span>
									</div>
								</Link>
							</li>

							<li>
								<Link
									to="/admin/app-settings"
									onClick={() => close()}
									className="w-full p-[3%] flex items-center justify-between rounded-[5px]"
								>
									<div className="flex items-center gap-[8px]">
										<i className="text-[19px] text-[var(--menu-icon)]">
											<IoIosSettings />
										</i>

										<span className="text-[13px] font-medium text-[var(--menu-text)] font-sans">
											App Settings
										</span>
									</div>
								</Link>
							</li>
						</ul>
					</MenuSection>
				)}
			</div>

			<SocialSection>
				<div className="social_wrapper">
					<a href="https://instagram.com" target="_blank" rel="noreferrer">
						<FaInstagram />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noreferrer">
						<FaXTwitter />
					</a>
					<a href="https://facebook.com" target="_blank" rel="noreferrer">
						<FaFacebookF />
					</a>
				</div>

				<div className="footer_text">© 2025 House Maduekwe</div>
			</SocialSection>
		</SideBar>
	);
}

export default SideMenu;
