import styled from "styled-components";

export const InputWrapper = styled.div`
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

export const MyInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.formInput?.bgColor};
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
  font-size: 14px;
  font-weight: 400;
  line-height: 17.64px;
  letter-spacing: -0.30000001192092896px;
  color: ${({ theme }) => theme.formInput?.color};

  &:disabled {
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  &:hover {
    color: ${({ theme }) => theme.formInput?.color};
    border-color: ${({ theme }) => theme.formInput?.focusColor};

    &::placeholder {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.formInput?.focusColor};
    color: ${({ theme }) => theme.formInput?.color};
  }

  &::placeholder {
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  @media (max-width: 500px) {
    padding-inline: 15px;
    padding-block: 12px;
    font-size: 13px;
  }
`;

export const MyTextarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-height: ${(props) => props.$maxHeight || "56px"};
  max-height: ${(props) => props.$minHeight || "76px"};
  background-color: ${({ theme }) => theme.formInput?.bgColor};
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
  font-size: 14px;
  font-weight: 400;
  line-height: 17.64px;
  letter-spacing: -0.30000001192092896px;
  color: ${({ theme }) => theme.formInput?.color};

  &:disabled {
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  &:hover {
    color: ${({ theme }) => theme.formInput?.color};
    border-color: ${({ theme }) => theme.formInput?.focusColor};

    &::placeholder {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.formInput?.focusColor};
    color: ${({ theme }) => theme.formInput?.color};
  }

  &::placeholder {
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  @media (max-width: 500px) {
    padding-inline: 15px;
    padding-block: 12px;
    font-size: 13px;
  }
`;

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-inline: ${(props) => (props.$marginX ? props.$marginX : "")};
  margin-block: ${(props) => (props.$marginY ? props.$marginY : "")};

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
      line-height: 16px;
      letter-spacing: 0em;
      margin-bottom: 5.7px;
    }
  }
`;
