import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Legend,
	Tooltip,
} from 'chart.js';
import { useTheme } from 'styled-components';
import { addCommas } from '../../utilities/basic-functions';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const DEFAULT_PALETTE_KEYS = [
	'blue',
	'purple',
	'green',
	'pinkM',
	'blueM',
	'violetL',
	'orange',
	'pinkL',
	'blueL',
	'violetM',
];

function BarChart({ labels, data, horizontal = false, colors, valueSuffix = '' }) {
	const theme = useTheme();
	const gridColor = theme?.mainBody?.line;
	const tickColor = theme?.mainBody?.sbText;

	const palette = useMemo(() => {
		if (Array.isArray(colors) && colors.length) return colors;
		return DEFAULT_PALETTE_KEYS.map((key) => theme?.form?.[key]);
	}, [colors, theme]);

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					data,
					backgroundColor: (labels || []).map((_, i) => palette[i % palette.length]),
					borderRadius: 6,
					maxBarThickness: 28,
				},
			],
		}),
		[labels, data, palette]
	);

	const chartOptions = useMemo(
		() => ({
			indexAxis: horizontal ? 'y' : 'x',
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: theme?.mainBody?.container,
					titleColor: theme?.mainBody?.text,
					bodyColor: theme?.mainBody?.sbText,
					borderColor: theme?.mainBody?.line,
					borderWidth: 1,
					padding: 10,
					callbacks: {
						label: (context) =>
							`${addCommas(context.parsed[horizontal ? 'x' : 'y'] || 0)}${valueSuffix}`,
					},
				},
			},
			scales: {
				x: {
					beginAtZero: true,
					grid: {
						color: horizontal ? gridColor : 'transparent',
						drawTicks: false,
					},
					border: { display: false },
					ticks: { color: tickColor, font: { size: 11 } },
				},
				y: {
					beginAtZero: true,
					grid: {
						color: horizontal ? 'transparent' : gridColor,
						drawTicks: false,
					},
					border: { display: false },
					ticks: { color: tickColor, font: { size: 11 } },
				},
			},
		}),
		[theme, gridColor, tickColor, horizontal, valueSuffix]
	);

	return (
		<div className="w-full h-full">
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
}

BarChart.propTypes = {
	labels: PropTypes.array,
	data: PropTypes.array,
	horizontal: PropTypes.bool,
	colors: PropTypes.array,
	valueSuffix: PropTypes.string,
};

export default BarChart;
