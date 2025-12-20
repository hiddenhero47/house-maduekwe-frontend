import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  SliderContainer,
  Slider,
  Slide,
  SlideContent,
  LeftArrow,
  RightArrow,
  Navigation,
  Bullet,
  Narration,
} from "./index.style";

const ImageSlider = ({ content, useArrow = false }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideShowTimer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000); // Auto slide change every 5 seconds

    return () => clearTimeout(slideShowTimer);
  }, [content.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  const handleBulletClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <SliderContainer ref={sliderRef}>
      <Slider
        translate={-currentIndex * (100 / content.length)}
        $items={content.length}
      >
        {content.map((element, index) => (
          <Slide key={index}>
            <SlideContent>
              <div className="My_image">
                <div className="imageHolder">
                  <img src={element.picture} alt={`Slide ${index}`} />
                </div>
              </div>
              <Narration>
                <h3>{element.heading}</h3>
                <p>{element.narration}</p>
              </Narration>
            </SlideContent>
          </Slide>
        ))}
      </Slider>

      {useArrow && (
        <>
          <LeftArrow onClick={handlePrevious}>&#8249;</LeftArrow>
          <RightArrow onClick={handleNext}>&#8250;</RightArrow>
        </>
      )}

      <Navigation>
        {content.map((_, index) => (
          <Bullet
            key={index}
            $active={index === currentIndex ? "true" : "false"}
            onClick={() => handleBulletClick(index)}
          />
        ))}
      </Navigation>
    </SliderContainer>
  );
};

ImageSlider.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      narration: PropTypes.string.isRequired,
    })
  ).isRequired,
  useArrow: PropTypes.bool,
};

export default ImageSlider;
