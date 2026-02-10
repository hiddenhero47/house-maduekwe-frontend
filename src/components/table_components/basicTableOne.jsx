import React from 'react';
import {
	BTWrapperOne,
	BTTableGrid,
	LoaderWrapper,
	NoData,
	RetryBtn,
} from './table.style';
import BasicPg from './pagination/basicPg';
import Candle from '../loaders/candles/Candle';

function CustomTable({
	isLoading,
	dataSource,
	fields,
	onDoubleCallRow,
	onCallRow,
	currentPage = 1,
	changePage,
	totalPages,
	showPagination = true,
	paddingHeaderX = '9px',
	paddingHeaderY = '11px',
	paddingCellX = '9px',
	paddingCellY = '12px',
	headerBg = true,
	bodyBg = true,
	useStrip = false,
	emptyIcon,
	emptyText,
	emptySbText,
	refetch,
	addData,
}) {
	const callRow = (data) => {
		if (onCallRow) {
			onCallRow(data);
		}
	};

	const doubleCallRow = (data) => {
		if (onDoubleCallRow) {
			onDoubleCallRow(data);
		}
	};

	return (
		<BTTableGrid>
			<div className="overflow-x-auto flex flex-col">
				<BTWrapperOne
					$paddingHeaderX={paddingHeaderX}
					$paddingHeaderY={paddingHeaderY}
					$paddingCellX={paddingCellX}
					$paddingCellY={paddingCellY}
					$headerBg={headerBg}
					$bodyBg={bodyBg}
					$useStrip={useStrip}
					className="scroll_style"
				>
					<table className="min-w-full table-auto">
						<thead className="text-left">
							<tr>
								{fields.map((field, index) => (
									<th
										key={index}
										className="whitespace-nowrap text-left font-sans"
									>
										{field.Header()}
									</th>
								))}
							</tr>
						</thead>
						{!isLoading && dataSource.length !== 0 ? (
							<tbody className="text-left">
								{dataSource.map((dataItem, dataIndex) => (
									<tr
										key={dataIndex}
										onClick={() => callRow(dataItem)}
										onDoubleClick={() => doubleCallRow(dataItem)}
										style={{
											cursor: onCallRow || onDoubleCallRow ? 'pointer' : 'default',
										}}
									>
										{fields.map((field, fieldIndex) => (
											<td key={fieldIndex} className="whitespace-nowrap">
												{field.Cell({
													value: dataItem[field.accessor],
													row: {
														original: dataItem,
													},
													nos: dataIndex + 1,
												})}
											</td>
										))}
									</tr>
								))}
							</tbody>
						) : (
							''
						)}
					</table>
				</BTWrapperOne>
				{isLoading ? (
					<LoaderWrapper>
						<div className="countian">
							<Candle color="var(--mainBody-sbKitText)" />
						</div>
					</LoaderWrapper>
				) : dataSource.length === 0 ? (
					<NoData>
						<div className="countian">
							<i>{emptyIcon}</i>

							<h3>{emptyText}</h3>

							<span>{emptySbText}</span>

							{refetch && (
								<RetryBtn onClick={() => refetch()}>
									<div className="content">Retry</div>
								</RetryBtn>
							)}

							{addData && (
								<RetryBtn onClick={() => addData()}>
									<div className="content">+ Add</div>
								</RetryBtn>
							)}
						</div>
					</NoData>
				) : (
					''
				)}
			</div>

			{currentPage && changePage && totalPages && showPagination ? (
				<div className="mt-[15px] flex w-full justify-end">
					<BasicPg
						currentPage={currentPage}
						changePage={changePage}
						totalPages={totalPages}
					/>
				</div>
			) : (
				''
			)}
		</BTTableGrid>
	);
}

export default CustomTable;
