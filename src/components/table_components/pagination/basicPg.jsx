import React, { useState, useMemo } from "react";
import { BasicPgWrapper, PageNosDisplay, PagNos } from "./basicPg.style";
import { useTheme } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



function BasicPg({ currentPage, changePage, totalPages }) {
    const theme = useTheme();
    const [active, setActive] = useState("");

    const goBack = () => {
        setActive("left");
        if (currentPage - 1 >= 1) {
            changePage(currentPage - 1);
        }
    };

    const goForward = () => {
        setActive("right");
        if (currentPage + 1 <= totalPages) {
            changePage(currentPage + 1);
        }
    };

    const setCurrentPage = (index) => {
        if (index <= totalPages && index >= 1) {
            changePage(index);
        }
    };

    const getPageRange = useMemo(() => {
        return () => {
            const range = [];
            const chunkSize = 6;
            const chunkIndex = Math.ceil(currentPage / chunkSize);
            const start = (chunkIndex - 1) * chunkSize + 1;
            const end = Math.min(start + chunkSize - 1, totalPages);

            for (let i = start; i <= end; i++) {
                range.push(i);
            }

            if (
                range.length === 6 &&
                !(currentPage + 1 <= range[5]) &&
                currentPage + 1 <= totalPages
            ) {
                const x = [...range];
                x.shift();
                x.push(currentPage + 1);

                console.log("5", x);

                return x;
            }

            if (
                !(currentPage - 1 >= range[0]) &&
                currentPage - 1 >= 1 &&
                !(currentPage >= totalPages - 1)
            ) {
                const x = [...range];
                x.pop();
                x.unshift(currentPage - 1);

                console.log("0", x);

                return x;
            }

            if (
                currentPage + 1 >= totalPages - 1 &&
                !range.includes(currentPage - 1) &&
                currentPage - 1 !== 0 &&
                end > chunkSize
            ) {
                const x = [...range];
                x.unshift(currentPage - 1);
                console.log("bbb", x);
                return x;
            }

            // if (currentPage === totalPages && !range.includes(totalPages)) {
            //     const x = [...range];
            //     x.push(totalPages);
            //     console.log("ccc", x);
            //     return x;
            // }

            return range;
        };
    }, [currentPage, totalPages]);

    return (
        <BasicPgWrapper>
            <button onClick={goBack}>
                <i
                    style={{
                        color:
                            active === "left"
                                ? (theme)?.table?.arrowActive
                                : "",
                    }}
                >
                    <IoIosArrowBack size={12} />
                </i>
            </button>
            <PageNosDisplay>
                {getPageRange().map(index => (
                    <PagNos
                        $active={currentPage === index}
                        key={index}
                        onClick={() => setCurrentPage(index)}
                    >
                        {index}
                    </PagNos>
                ))}
            </PageNosDisplay>
            <button onClick={goForward}>
                <i
                    style={{
                        color:
                            active === "left"
                                ? (theme)?.table?.arrowActive
                                : "",
                    }}
                >
                    <IoIosArrowForward size={12} />
                </i>
            </button>
        </BasicPgWrapper>
    );
}

export default BasicPg;
