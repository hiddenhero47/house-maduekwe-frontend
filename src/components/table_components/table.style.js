import styled from "styled-components";

export const BTWrapperOne = styled.div`
    width: 100%;
    height: fit-content;
    max-height: 100%;
    border-radius: 8px;
    overflow: hidden;
    overflow-x: auto;
    font-family: Outfit;

    td:has(.last) {
        padding-right: 6px;
    }

    td:has(.icon) {
        color: rgba(0, 128, 128, 1);
        cursor: pointer;
    }

    tr {
        font-family: Outfit;
        font-size: 14px;
        font-weight: 600;
        line-height: 22.68px;
        text-align: left;
    }

    .nowrap {
        white-space: nowrap;
        display: flex;
        align-items: center;
    }

    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        font-style: normal;
    }

    tr:nth-child(even) .avatar {
        color: rgba(217, 62, 57, 1);
        background-color: rgba(217, 62, 57, 0.3);
    }

    tr:nth-child(odd) .avatar {
        color: rgba(232, 155, 0, 1);
        background-color: rgba(232, 155, 0, 0.3);
    }

    tr:first-child .avatar {
        color: rgba(52, 175, 179, 1);
        background-color: rgba(215, 255, 255, 1);
    }
`;

export const BTTableGrid = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr 55px;
`;

export const LoaderWrapper = styled.div`
    width: 100%;
    min-height: 300px;
    position: relative;

    .countian {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }
`;
