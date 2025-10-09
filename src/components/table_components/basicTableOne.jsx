import React from "react";
import { BTWrapperOne, BTTableGrid, LoaderWrapper } from "./table.style";
import BasicPg from "./pagination/basicPg";
import Candle from "../loaders/candles/Candle";

function CustomTable({
    isLoading,
    emptyIcon,
    dataSource,
    fields,
    // image,
    onCallRow,
    currentPage = 1,
    changePage,
    totalPages,
    showPagination = true,
}) {

    const callRow = (data) => {
        if (onCallRow) {
            onCallRow(data);
        }
    };

    return (
        <BTTableGrid>
            <div className="overflow-x-auto flex flex-col">
                <BTWrapperOne className="app_font border-[1px] border-solid border-table-border scroll_style">
                    <table className="min-w-full table-auto border-table-lineColor">
                        <thead className="bg-table-headerBg text-left text-sm font-semibold leading-4 tracking-normal">
                            <tr>
                                {fields.map((field, index) => (
                                    <th
                                        key={index}
                                        className="whitespace-nowrap px-[10px] pb-[9px] pt-[13px] text-left text-table-headerText"
                                    >
                                        {field.Header()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {!isLoading && dataSource.length !== 0 ? (
                            <tbody className="divide-y divide-table-lineColor bg-table-bodyBg text-left text-[17px] font-medium leading-6 tracking-normal">
                                {dataSource.map((dataItem, dataIndex) => (
                                    <tr
                                        key={dataIndex}
                                        onClick={() => callRow(dataItem)}
                                        style={{
                                            cursor: onCallRow
                                                ? "pointer"
                                                : "default",
                                        }}
                                    >
                                        {fields.map((field, fieldIndex) => (
                                            <td
                                                key={fieldIndex}
                                                className="whitespace-nowrap px-[10px] py-[9px] text-table-text"
                                            >
                                                {field.Cell({
                                                    value: dataItem[
                                                        field.accessor
                                                    ],
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
                            ""
                        )}
                    </table>
                </BTWrapperOne>
                {isLoading ? (
                    <LoaderWrapper>
                        <div className="countian">
                            <Candle />
                        </div>
                    </LoaderWrapper>
                ) : dataSource.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan={fields.length}>{emptyIcon}</td>
                        </tr>
                    </tbody>
                ) : (
                    ""
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
                ""
            )}
        </BTTableGrid>
    );
}

export default CustomTable;
