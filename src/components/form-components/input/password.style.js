import styled from "styled-components";

export const MyInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 17.633px;
  border: 1px solid
    ${(props) =>
      props.$isError
        ? ({ theme }) => theme.formInput?.errorColor
        : ({ theme }) => theme.formInput?.borderColor};
  border-radius: 5px;
  transition: all 0.1s ease-out;
  padding-inline: 18.07px;
  padding-block: 15px;
  font-family: Outfit;
  font-size: 13px;
  font-weight: 400;
  line-height: 17.64px;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.formInput?.color};
  background-color: ${({ theme }) => theme.formInput?.bgColor};
  cursor: pointer;

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.formInput?.focusColor};
    color: ${({ theme }) => theme.formInput?.color};
  }

  &:hover {
    color: ${({ theme }) => theme.formInput?.color};
    border-color: ${({ theme }) => theme.formInput?.focusColor};
  }

  @media (max-width: 500px) {
    padding-inline: 15px;
    padding-block: 10px;
    font-size: 13px;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  .myInput {
    padding: 0 !important;
    flex-grow: 1;
    flex-basis: 0;
    min-width: 0;
    min-height: fit-content;
    background-color: transparent;
    color: ${({ theme }) => theme.formInput?.color};
    border: 0 solid transparent;
    font-family: Outfit;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.64px;
    letter-spacing: -0.3px;

    &::placeholder {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }

    &:focus {
      outline: none !important;
      border-color: transparent !important;
      outline: none;
      color: ${({ theme }) => theme.formInput?.color};
    }

    @media (max-width: 500px) {
      font-size: 13px;
    }
  }
`;

export const Eyes = styled.button`
  display: flex;
  color: ${(props) =>
    props.$type === "text"
      ? ({ theme }) => theme.formInput?.color
      : ({ theme }) => theme.formInput?.placeholder};
`;
