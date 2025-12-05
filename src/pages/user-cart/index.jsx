import React from 'react';
import {
	Container,
	Item,
	ColorCircle,
	SummaryContainer,
	Footer,
} from './elements/index.style';
import { FaTrash, FaArrowRightLong } from 'react-icons/fa6';

function Index() {
	return (
		<Container>
			<h1 className="text-[30px] font-normal font-[Audiowide] pt-[20px] mb-[50px]">
				Shopping Cart
			</h1>

			<div className="flex flex-wrap gap-[10px] w-full">
				<div id="cartItems">
					<ul role="list">
						<li className="py-[30px] border-b border-b-[var(--mainBody-line)]">
							<Item>
								<button className="image_button" onClick={() => {}}>
									<div className="imageHolder">
										<img
											src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
											alt="Error"
										/>
									</div>
								</button>

								<div className="ml-[clamp(5px,5%,25px)] flex flex-col w-full justify-between">
									<div className="flex justify-between w-full">
										<div>
											<h3>Basic Tee</h3>
											<div className="flex gap-[10px] flex-wrap">
												<p>
													<span>size :</span> <span>M</span>
												</p>
												<p className="flex items-center gap-[10px]">
													<span>color :</span>{' '}
													<ColorCircle $color={'#5b594f'} $active={true} />
												</p>
											</div>
										</div>

										<h3>$10000</h3>
									</div>

									<div className="flex justify-between w-full items-center">
										<p>Qty 1</p>

										<button className="text-[15px] text-[var(--intro-logo)]">
											Remove
										</button>
									</div>
								</div>
							</Item>
						</li>

						<li className="py-[30px] border-b border-b-[var(--mainBody-line)]">
							<Item>
								<button className="image_button" onClick={() => {}}>
									<div className="imageHolder">
										<img
											src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
											alt="Error"
										/>
									</div>
								</button>

								<div className="ml-[clamp(5px,5%,25px)] flex flex-col w-full justify-between">
									<div className="flex justify-between w-full">
										<div>
											<h3>Basic Tee</h3>
											<div className="flex gap-[10px] flex-wrap">
												<p>
													<span>size :</span> <span>M</span>
												</p>
												<p className="flex items-center gap-[10px]">
													<span>color :</span>{' '}
													<ColorCircle $color={'#5b594f'} $active={true} />
												</p>
											</div>
										</div>

										<h3>$10000</h3>
									</div>

									<div className="flex justify-between w-full items-center">
										<p>Qty 1</p>

										<button className="text-[15px] text-[var(--intro-logo)]">
											Remove
										</button>
									</div>
								</div>
							</Item>
						</li>

						<li className="py-[30px] border-b border-b-[var(--mainBody-line)]">
							<Item>
								<button className="image_button" onClick={() => {}}>
									<div className="imageHolder">
										<img
											src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg"
											alt="Error"
										/>
									</div>
								</button>

								<div className="ml-[clamp(5px,5%,25px)] flex flex-col w-full justify-between">
									<div className="flex justify-between w-full">
										<div>
											<h3>Basic Tee</h3>
											<div className="flex gap-[10px] flex-wrap">
												<p>
													<span>size :</span> <span>M</span>
												</p>
												<p className="flex items-center gap-[10px]">
													<span>color :</span>{' '}
													<ColorCircle $color={'#5b594f'} $active={true} />
												</p>
											</div>
										</div>

										<h3>$10000</h3>
									</div>

									<div className="flex justify-between w-full items-center">
										<p>Qty 1</p>

										<button className="text-[15px] text-[var(--intro-logo)]">
											Remove
										</button>
									</div>
								</div>
							</Item>
						</li>
					</ul>
				</div>

				<div id="cartSummary">
					<SummaryContainer>
						<div className="w-full flex flex-col">
							<h3 className="mb-[24px] font-semibold text-[18px] note">
								Order summary
							</h3>

							<div class="flex justify-between text-base font-medium pt-[10px] mb-[10px] note_sc">
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									Subtotal
								</p>
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									$99.00
								</p>
							</div>

							<div class="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top note_sc">
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									Tax estimate
								</p>
								<p className="text-[15px] text-[var(--mainBody-sbText)]">
									$8.32
								</p>
							</div>

							<div class="flex justify-between text-base font-medium pt-[10px] mb-[10px] line_top total_sc">
								<p>Order total</p>
								<p>$112.32</p>
							</div>

							<Footer>
								<button onClick={() => {}} className="btn btn_checkout">
									Checkout
								</button>

								<button onClick={() => {}} className="btn btn_continue">
									Continue Shopping{' '}
									<i>
										<FaArrowRightLong />
									</i>
								</button>
							</Footer>
						</div>
					</SummaryContainer>
				</div>
			</div>
		</Container>
	);
}

export default Index;
