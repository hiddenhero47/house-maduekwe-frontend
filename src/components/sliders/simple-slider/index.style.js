import styled from "styled-components";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.5s ease;
  font-family: Sora;
`;

export const Slider = styled.div`
  display: inline-flex;
  width: ${({ $items }) => `calc(100% * ${$items})`};
  transform: translateX(${({ translate }) => translate}%);
  transition: transform 0.5s ease;
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  transition: transform 0.5s ease;

  .My_image {
    display: flex;
    max-width: 100%;
    width: 210px;
    height: 210px;

    @media (min-width: 1624px) {
      width: 240px;
      height: 240px;
    }

    @media (max-width: 500px) {
      width: 200px;
      height: 200px;
    }
  }

  .imageHolder {
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`;

export const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 1624px) {
    gap: 29px;
  }
`;

export const Narration = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  letter-spacing: -0.3px;
  gap: 15px;

  @media (min-width: 1624px) {
    gap: 27px;
  }

  h3 {
    font-size: 38px;
    font-weight: 700;

    @media (min-width: 1624px) {
      font-size: 48px;
      font-weight: 600;
      line-height: 60.48px;
    }

    @media (max-width: 500px) {
      font-size: 28px;
      font-weight: 600;
    }
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20.16px;

    @media (min-width: 1624px) {
      font-size: 16px;
      line-height: 20.16px;
    }

    @media (max-width: 500px) {
      font-size: 13px;
    }
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 24px;
  color: white;
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  gap: 6.69px;
  margin-top: 20px;
`;

export const Bullet = styled.span`
  width: ${({ $active }) => ($active === "true" ? "16px" : "8px")};
  height: 8px;
  border-radius: ${({ $active }) =>
    $active === "true" ? "4px" : "9999px"};
  background-color: ${({ $active }) =>
    $active === "true" ? "#E4E8F1" : "rgba(228, 232, 241, 0.2)"};
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;
