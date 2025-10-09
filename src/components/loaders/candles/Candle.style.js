import styled from "styled-components";

export const CandleWrapper = styled.div`
    width: 150px;
    height: 150px;

    .loader {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5%;
    }

    /* #loader-6 {
    top: 40px;
    left: -2.5px;
  } */

    #loader-6 span {
        /* display: inline-block; */
        width: 10%;
        height: 30%;
        background-color: ${props => (props.$color ? props.$color : "#3498db")};
    }

    #loader-6 span:nth-child(1) {
        animation: grow 1s ease-in-out infinite;
    }

    #loader-6 span:nth-child(2) {
        animation: grow 1s ease-in-out 0.15s infinite;
    }

    #loader-6 span:nth-child(3) {
        animation: grow 1s ease-in-out 0.3s infinite;
    }

    #loader-6 span:nth-child(4) {
        animation: grow 1s ease-in-out 0.45s infinite;
    }

    @keyframes grow {
        0%,
        100% {
            -webkit-transform: scaleY(1);
            -ms-transform: scaleY(1);
            -o-transform: scaleY(1);
            transform: scaleY(1);
        }

        50% {
            -webkit-transform: scaleY(1.8);
            -ms-transform: scaleY(1.8);
            -o-transform: scaleY(1.8);
            transform: scaleY(1.8);
        }
    }
`;
