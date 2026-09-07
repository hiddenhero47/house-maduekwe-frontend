import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	Filler,
} from 'chart.js';
import { useTheme } from 'styled-components';
import { addCommas } from '../../utilities/basic-functions';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Legend,
	Tooltip,
	Filler
);

const hexToRgba = (hex, opacity) => {
	if (!hex) return `rgba(0, 136, 232, ${opacity})`;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

function LineChart({ labels, data, color, valuePrefix = '' }) {
	const theme = useTheme();
	const lineColor = color || theme?.form?.blue;
	const gridColor = theme?.mainBody?.line;
	const tickColor = theme?.mainBody?.sbText;

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					data,
					fill: true,
					backgroundColor: (context) => {
						const { ctx, chartArea } = context.chart;
						if (!chartArea) return 'transparent';
						const gradient = ctx.createLinearGradient(
							0,
							chartArea.top,
							0,
							chartArea.bottom
						);
						gradient.addColorStop(0, hexToRgba(lineColor, 0.35));
						gradient.addColorStop(1, hexToRgba(lineColor, 0));
						return gradient;
					},
					borderColor: lineColor,
					borderWidth: 2,
					pointBackgroundColor: lineColor,
					pointBorderWidth: 0,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: lineColor,
					pointRadius: 2,
					pointHitRadius: 10,
					cubicInterpolationMode: 'monotone',
				},
			],
		}),
		[labels, data, lineColor]
	);

	const chartOptions = useMemo(
		() => ({
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
							`${valuePrefix}${addCommas(Number(context.parsed.y || 0).toFixed(2))}`,
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: gridColor, drawTicks: false },
					border: { display: false },
					ticks: {
						color: tickColor,
						font: { size: 11 },
						callback: (value) => addCommas(value),
					},
				},
				x: {
					grid: { display: false },
					border: { display: false },
					ticks: { color: tickColor, font: { size: 11 } },
				},
			},
		}),
		[theme, gridColor, tickColor, valuePrefix]
	);

	return (
		<div className="w-full h-full">
			<Line data={chartData} options={chartOptions} />
		</div>
	);
}

LineChart.propTypes = {
	labels: PropTypes.array,
	data: PropTypes.array,
	color: PropTypes.string,
	valuePrefix: PropTypes.string,
};

export default LineChart;
