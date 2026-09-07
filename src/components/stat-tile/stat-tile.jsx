import React from 'react';
import PropTypes from 'prop-types';
import { Card, IconWrap } from './stat-tile.style';

function StatTile({ icon, label, value, color, isLoading }) {
	return (
		<Card>
			<IconWrap $color={color}>{icon}</IconWrap>
			<div className="flex flex-col">
				<span className="label">{label}</span>
				<span className="value">{isLoading ? '—' : value}</span>
			</div>
		</Card>
	);
}

StatTile.propTypes = {
	icon: PropTypes.node,
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.string,
	isLoading: PropTypes.bool,
};

export default StatTile;
