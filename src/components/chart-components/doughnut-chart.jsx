import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import { useTheme } from 'styled-components';
import { addCommas } from '../../utilities/basic-functions';

ChartJS.register(ArcElement, Legend, Tooltip);

const DEFAULT_PALETTE_KEYS = ['blue', 'purple', 'green', 'orange', 'pinkM'];

function DoughnutChart({ labels, data, colors, showLegend = true }) {
	const theme = useTheme();

	const palette = useMemo(() => {
		if (Array.isArray(colors) && colors.length) return colors;
		return DEFAULT_PALETTE_KEYS.map((key) => theme?.form?.[key]);
	}, [colors, theme]);

	const total = (data || []).reduce((sum, value) => sum + (Number(value) || 0), 0);

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					data,
					backgroundColor: palette,
					borderColor: theme?.mainBody?.card,
					borderWidth: 2,
					hoverOffset: 6,
				},
			],
		}),
		[labels, data, palette, theme]
	);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			cutout: '68%',
			plugins: {
				legend: {
					display: showLegend,
					position: 'bottom',
					labels: {
						color: theme?.mainBody?.sbText,
						font: { size: 11 },
						boxWidth: 10,
						usePointStyle: true,
						pointStyle: 'circle',
					},
				},
				tooltip: {
					backgroundColor: theme?.mainBody?.container,
					titleColor: theme?.mainBody?.text,
					bodyColor: theme?.mainBody?.sbText,
					borderColor: theme?.mainBody?.line,
					borderWidth: 1,
					padding: 10,
					callbacks: {
						label: (context) => {
							const value = context.parsed || 0;
							const pct = total ? ((value / total) * 100).toFixed(1) : 0;
							return `${context.label}: ${addCommas(value)} (${pct}%)`;
						},
					},
				},
			},
		}),
		[theme, showLegend, total]
	);

	return (
		<div className="w-full h-full">
			<Doughnut data={chartData} options={chartOptions} />
		</div>
	);
}

DoughnutChart.propTypes = {
	labels: PropTypes.array,
	data: PropTypes.array,
	colors: PropTypes.array,
	showLegend: PropTypes.bool,
};

export default DoughnutChart;
