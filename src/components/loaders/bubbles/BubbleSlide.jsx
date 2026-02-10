import React from "react";
import { BubbleSlideWrapper } from "./bubble.style";

function BubbleSlide({ color, height }) {
    return (
        <BubbleSlideWrapper $color={color} height={height}>
            <div className="loader" id="loader-4">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </BubbleSlideWrapper>
    );
}

export default BubbleSlide;
