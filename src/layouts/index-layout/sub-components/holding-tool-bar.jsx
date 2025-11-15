import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToolBarWrapper } from './holding.style';
import { MdSell } from 'react-icons/md';

export default function ToolBar({ layoutRef, nos, openHoldings }) {
	const toolbarRef = useRef(null);
	const [pos, setPos] = useState({ x: null, y: null });
	const [dragging, setDragging] = useState(false);
	const offset = useRef({ x: 0, y: 0 });
	const margin = 20;

	const handleMouseDown = (e) => {
		if (!toolbarRef.current || !layoutRef.current) return;

		const layoutRect = layoutRef.current.getBoundingClientRect();
		const toolbarRect = toolbarRef.current.getBoundingClientRect();

		const currentPos = {
			x: pos.x ?? toolbarRect.left - layoutRect.left,
			y: pos.y ?? toolbarRect.top - layoutRect.top,
		};

		offset.current = {
			x: e.clientX - currentPos.x,
			y: e.clientY - currentPos.y,
		};

		setPos(currentPos);
		setDragging(true);
	};

	useEffect(() => {
		if (!dragging || !layoutRef.current || !toolbarRef.current) return;

		const handleMouseMove = (e) => {
			const layoutRect = layoutRef.current.getBoundingClientRect();
			const toolbar = toolbarRef.current;
			const navHeight = 64;

			let x = e.clientX - offset.current.x;
			let y = e.clientY - offset.current.y;

			const minX = layoutRect.left + margin;
			const maxX = layoutRect.right - toolbar.offsetWidth - margin;
			const minY = layoutRect.top + navHeight + margin;
			const maxY = layoutRect.bottom - toolbar.offsetHeight - margin;

			x = Math.max(minX, Math.min(x, maxX));
			y = Math.max(minY, Math.min(y, maxY));

			setPos({ x: x - layoutRect.left, y: y - layoutRect.top });
		};

		const handleMouseUp = () => setDragging(false);

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging, layoutRef]);

	return (
		<ToolBarWrapper
			$dragging={dragging}
			ref={toolbarRef}
			$x={pos.x}
			$y={pos.y}
			onMouseDown={handleMouseDown}
			aria-label="toolbar"
			onDoubleClick={openHoldings}
		>
			<div className="icon">
				<MdSell />
                {nos > 1 ?  <span className="badge">{nos}</span> : ""}
			</div>
		</ToolBarWrapper>
	);
}

ToolBar.propTypes = {
	layoutRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element),
	}).isRequired,
	nos: PropTypes.number.isRequired,
	openHoldings: PropTypes.func.isRequired,
};
