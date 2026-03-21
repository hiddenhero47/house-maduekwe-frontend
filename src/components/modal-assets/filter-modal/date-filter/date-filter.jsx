import React, { useState, useEffect } from 'react';
import CustomSelect from '../../../form-components/select/custom-select';
import { getPeriod } from '../../../../utilities/basic-functions';

const PERIOD_OPTIONS = [
	{ label: 'Today', value: 'today' },
	{ label: 'Last 7 Days', value: 'this-week' },
	{ label: 'Last 30 Days', value: 'this-month' },
	{ label: 'Last Year', value: 'this-year' },
	{ label: 'Older', value: 'old' },
];

function DateFilter({ forward }) {
	const [period, setPeriod] = useState(null);

	useEffect(() => {
		if (!period) return;
		const range = getPeriod(period);
		if (forward) forward(range);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [period]);
	return (
		<div className='w-[clamp(100px,100%,180px)]'>
			<CustomSelect
				options={PERIOD_OPTIONS}
				value={period}
				placeholder="Filter by date"
				onChange={(val) => setPeriod(val)}
				useBackground
				paddingX="11px"
				paddingY="7px"
			/>
		</div>
	);
}

export default DateFilter;
