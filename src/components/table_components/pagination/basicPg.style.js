import styled from "styled-components";

export const BasicPgWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: fit-content;

    i {
        color: ${({ theme }) => (theme).mainBody?.kitTextDark};
    }
`;

export const PageNosDisplay = styled.div`
    display: flex;
    width: fit-content;
    gap: 20px;
    font-family: Outfit;
    font-size: clamp(10px, 1vw, 13px);
    font-weight: 600;
    line-height: 17.64px;
    color: ${({ theme }) => (theme).mainBody?.sbText};
`;

export const PagNos = styled.span`
    color: ${props =>
        props.$active
            ? ({ theme }) => (theme).mainBody?.text
            : ({ theme }) => (theme).mainBody?.sbText};
    cursor: pointer;
`;
