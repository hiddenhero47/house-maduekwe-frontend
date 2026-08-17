import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestCheckout from '../components/modal-assets/guest-checkout/guest-index';
import CartServices from '../features/services/custom-hooks/cart';
import {
	closeGuestCheckout,
	resetLocalCart,
	clearLocalCart,
} from '../store/slice/local-cart';
import Modal from '../components/modal/index_modal';
import { HoldingWrapper } from './index-layout/sub-components/holding.style';

const LocalCartProvider = () => {
	const dispatch = useDispatch();

	const modalRef = useRef(null);

	const { items, isOpen } = useSelector((state) => state.localCart);

	const { user } = useSelector((state) => state.auth);

	const activeUser =
		user && typeof user === 'object' && Object.keys(user).length > 0;

	const { mutateAsync: addToCart, isPending } = CartServices.add();

	const openModal = () => {
		modalRef.current?.open();
	};

	const syncingRef = useRef(false);

	const cartServer = async (localItems) => {
		if (syncingRef.current) return;

		const payload = localItems.map((item) => ({
			shopItem: item?.shopItem?._id,
			quantity: item?.quantity,
			selectedAttributes: item?.selectedAttributes,
		}));

		const isValidData =
			Array.isArray(payload) &&
			payload.length > 0 &&
			payload.every(
				(item) =>
					item.shopItem &&
					typeof item.quantity === 'number' &&
					item.quantity > 0
			);

		if (!isValidData) return;

		syncingRef.current = true;

		try {
			await addToCart({ itemList: payload });
			dispatch(clearLocalCart());

			syncingRef.current = false;
		} catch (error) {
			syncingRef.current = false;
		}
	};

	useEffect(() => {
		if (!activeUser || !items.length || isPending) return;

		cartServer(items);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeUser, items]);

	useEffect(() => {
		if (isOpen) {
			openModal();
		}
	}, [isOpen]);

	const handleResetLocalCart = () => {
		dispatch(resetLocalCart());
		modalRef.current?.close();
	};

	return (
		<Modal.Center
			width="fit-content"
			maxWidth="500px"
			onClose={() => dispatch(closeGuestCheckout())}
			onOpen={() => {}}
			refName={modalRef}
			animation={true}
		>
			<HoldingWrapper>
				<GuestCheckout
					items={items}
					resetFunc={handleResetLocalCart}
					close={() => modalRef.current?.close()}
				/>
			</HoldingWrapper>
		</Modal.Center>
	);
};

export default LocalCartProvider;
