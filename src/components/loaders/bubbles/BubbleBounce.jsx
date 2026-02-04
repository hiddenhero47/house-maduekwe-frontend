import React from "react";
import { BubbleBounceWrapper } from "./bubble.style";

function BubbleBounce({ color, height }) {
    return (
        <BubbleBounceWrapper $color={color} height={height}>
            <div className="loader" id="loader-2">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </BubbleBounceWrapper>
    );
}

export default BubbleBounce;
