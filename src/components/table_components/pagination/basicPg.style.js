import styled from "styled-components";

export const BasicPgWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: fit-content;

    i {
        color: ${({ theme }) => (theme).table?.arrow};
    }
`;

export const PageNosDisplay = styled.div`
    display: flex;
    width: fit-content;
    gap: 20px;
    font-family: Outfit;
    font-size: 14px;
    font-weight: 600;
    line-height: 17.64px;
    color: ${({ theme }) => (theme).table?.pageNos};
`;

export const PagNos = styled.span`
    color: ${props =>
        props.$active
            ? ({ theme }) => (theme).table?.pageNosActive
            : ({ theme }) => (theme).table?.pageNos};
    cursor: pointer;
`;
