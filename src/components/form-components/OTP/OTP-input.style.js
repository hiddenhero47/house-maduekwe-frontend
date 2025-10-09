import styled from "styled-components";

export const OTPInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Outfit;

  .error {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0%;
    margin-top: 3px;
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.formInput?.errorColor};
  }
`;

export const Container = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap};
  padding-inline: ${(props) => (props.$paddingX ? props.$paddingX : "0")};
  padding-block: ${(props) => (props.$paddingY ? props.$paddingY : "0")};
`;

export const OTPInputBox = styled.input`
  width: ${(props) => (props.width ? props.width : props.$size)};
  height: ${(props) => (props.height ? props.height : props.$size)};
  padding: 0;
  text-align: center;
  box-sizing: border-box;
  font-size: ${(props) => props.$fontSize};
  font-weight: 600;
  border: 1px solid
    ${(props) =>
      props.$isError
        ? props.theme.formInput?.errorColor
        : props.$isActive
          ? props.theme.OTPInput?.borderActive
          : props.theme.OTPInput?.border};
  color: ${({ theme }) => theme.OTPInput?.color};
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.OTPInput?.bgColorActive
      : props.theme.OTPInput?.bgColor};

  &:focus {
    color: ${({ theme }) => theme.OTPInput?.color} !important;
    outline: none;
    border-color: ${({ theme }) => theme.OTPInput?.borderActive};
    background-color: ${({ theme }) => theme.OTPInput?.bgColorActive};
  }

  &:hover {
    border-color: ${({ theme }) => theme.OTPInput?.borderActive};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;
