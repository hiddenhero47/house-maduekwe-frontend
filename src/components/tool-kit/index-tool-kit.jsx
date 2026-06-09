import React, { useState, useRef, useEffect } from 'react';
import { Container, MenuDialog } from './index-tool-kit.style';

function ToolKit({
	warperClass = '',
	btnId = '',
	btnClass = '',
	menuId = '',
	menuClass = '',
	icon,
	text,
	children,
	closeOnClick = true,
	useCoords = false,
	alineRight = false,
}) {
	const [open, setOpen] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0, right: 0 });
	const menuRef = useRef(null);
	const bodyRef = useRef(null);

	const toggle = (e) => {
		setOpen((prev) => !prev);

		const rect = e.currentTarget.getBoundingClientRect();
		setCoords({
			top: rect.bottom + window.scrollY,
			left: rect.left + window.scrollX,
			right: rect.right + window.scrollX,
		});
	};

	const handleClick = (e) => {
		if (!closeOnClick) return;
		// if a button (or inside a button) is clicked → close
		if (e.target.closest('button')) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (!open) return;

		const handleClick = (e) => {
			const clickedInsideBody = bodyRef.current?.contains(e.target);
			const clickedInsideMenu = menuRef.current?.contains(e.target);

			if (!clickedInsideBody && !clickedInsideMenu) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [open]);

	return (
		<Container ref={bodyRef} className={warperClass} $useCoords={useCoords}>
			{/* Trigger */}
			<button onClick={toggle} id={btnId} className={btnClass}>
				{icon && <i>{icon}</i>}
				{text && text}
			</button>

			{/* Dropdown Panel */}
			<MenuDialog
				ref={menuRef}
				id={menuId}
				className={menuClass}
				open={open}
				$open={open}
				closedby="any"
				onClose={() => setOpen(false)}
				$useCoords={useCoords}
				$alineRight={alineRight}
				$top={coords.top}
				$left={coords.left}
				$right={coords.right}
			>
				<div className="wrapper" onClick={handleClick}>
					{children}
				</div>
			</MenuDialog>
		</Container>
	);
}

export default ToolKit;
