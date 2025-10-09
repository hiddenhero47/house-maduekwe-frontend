import styled from "styled-components";

export const NumberInputWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  .error {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0%;
    margin-top: 3px;
    margin-left: 10px;
    font-family: Outfit;
    font-size: 12px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.formInput?.errorColor};
  }
`;

export const MyInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 17.633px;
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.formInput?.errorColor : theme.formInput?.borderColor};
  border-radius: 5px;
  transition: all 0.1s ease-out;
  padding-inline: 18.07px;
  padding-block: 11.5px;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.64px;
  letter-spacing: -0.3px;
  cursor: pointer;
  color: ${({ theme }) => theme.formInput?.color};

  svg {
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.formInput?.focusColor};
    color: ${({ theme }) => theme.formInput?.color};

    svg {
      color: ${({ theme }) => theme.formInput?.color};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.formInput?.color};
    border-color: ${({ theme }) => theme.formInput?.focusColor};

    svg {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }
  }

  @media (max-width: 500px) {
    padding-inline: 15px;
    padding-block: 10px;
    font-size: 13px;
  }

  .myInput {
    padding: 0 !important;
    width: 90%;
    background-color: transparent;
    color: ${({ theme }) => theme.formInput?.color};
    margin-left: 5px;
    border: 0 solid transparent;
    font-size: 14px;

    &:disabled {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }

    &::placeholder {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }

    &:focus {
      outline: none !important;
      border-color: transparent !important;
      color: ${({ theme }) => theme.formInput?.color};
    }
  }
`;

export const NumberInputControl = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-inline: ${({ $marginX }) => ($marginX ? $marginX : "0")};
  margin-block: ${({ $marginY }) => ($marginY ? $marginY : "0")};

  label {
    color: ${({ theme }) => theme.formInput?.placeholder};
    transition: all 0.1s ease-out;
    font-family: Outfit;
    font-size: 16px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    margin-bottom: 10px;
  }

  &:focus-within {
    label {
      color: ${({ theme }) => theme.formInput?.label};
    }
  }

  @media (max-width: 500px) {
    label {
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0em;
      margin-bottom: 5.7px;
    }
  }
`;
