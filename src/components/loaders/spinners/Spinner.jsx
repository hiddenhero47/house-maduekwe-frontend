import React from "react";
import { SpinnerWrapper } from "./Spinner.style";

function Spinner({ thin = "65px" }) {
    return (
        <SpinnerWrapper>
            <svg
                className="spinner"
                width={thin}
                height={thin}
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className="path"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                ></circle>
            </svg>
        </SpinnerWrapper>
    );
}

export default Spinner;
