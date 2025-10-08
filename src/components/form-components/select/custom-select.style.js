import styled from "styled-components";

export const CustomSelectContainer = styled.div`
  position: relative;
  width: 100%; /* Adjust the width as needed */
`;

export const CustomSelectValue = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 17.633px;
  padding-inline: 18.07px;
  padding-block: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.64px;
  letter-spacing: -0.3px;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.formInput?.placeholder : theme.formInput?.label};
  position: relative;
  transition: all 0.2s;
  gap: 7px;
  background-color: ${({ theme, $useBg, $isOpen }) =>
    $useBg && $isOpen
      ? theme.formInput?.bgColor
      : $useBg
        ? theme.formInput?.optionHoverBg
        : theme.formInput?.bgColor};
  border: ${({ theme, $isError, $isOpen, $useBg }) =>
    $isError && $isOpen
      ? `1px solid ${theme.formInput?.errorColor}`
      : $isError
        ? `1px solid ${theme.formInput?.errorColor}`
        : $isOpen
          ? `1px solid ${theme.formInput?.focusColor}`
          : $useBg
            ? `1px solid transparent`
            : `1px solid ${theme.formInput?.borderColor}`};

  @media (max-width: 500px) {
    padding-inline: 15px;
    padding-block: 12px;
    font-size: 13px;
  }

  &:hover {
    color: ${({ theme }) => theme.formInput?.color};
    border-color: ${({ theme }) => theme.formInput?.focusColor};
  }

  .placeholder {
    color: ${({ theme }) => theme.formInput?.placeholder};
    font-size: 14px;
    line-height: 17.64px;
  }

  .label {
    overflow-x: auto;
  }

  .arrow {
    width: fit-content;
    height: 100%;
    transition: all 0.4s;
    cursor: pointer;
    pointer-events: none;
    position: absolute;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.formInput?.placeholder};
  }

  .imageContainer {
    height: 19px;
    width: 19px;
  }
`;

export const SelectOptions = styled.div`
  padding-top: 10px;
  padding-bottom: 15px;
  padding-inline: 5px;
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 200px;
  margin-left: -1px;
  border: 1px solid ${({ theme }) => theme.formInput?.borderColor};
  border-radius: 5px;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: ${({ theme }) => theme.formInput?.menuBg};
  transition: all 0.4s;
  color: ${({ theme }) => theme.formInput?.menuTx};

  .wrapper {
    flex: 1;
    width: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(166, 171, 183, 0.7);
      border-radius: 40px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

export const Option = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  color: ${({ theme, selected }) =>
    selected ? theme.formInput?.optionHoverTx : theme.formInput?.menuTx};
  gap: 5px;
  background: ${({ theme, selected }) =>
    selected ? theme.formInput?.optionHoverBg : "transparent"};

  .imageContainer {
    height: 20px;
    width: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.formInput?.optionHoverBg};
    color: ${({ theme }) => theme.formInput?.optionHoverTx};
  }
`;

export const ImageHolder = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
  }
`;

export const Error = styled.span`
  margin: 2px 0 10px 2px;
  font-family: Outfit;
  font-size: 11px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.formInput?.errorColor};
`;

export const SearchBox = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.formInput?.borderColor};
  transition: border-color 0.1s;
  padding: 7px 12px;
  margin-bottom: 8px;

  &:focus-within {
    border-color: ${({ theme }) => theme?.formInput?.borderColor};
  }

  button {
    color: ${({ theme }) => theme?.formInput.placeholder};
    padding: 0;
    border: 0 solid transparent;
    background-color: transparent;
  }

  .myInput {
    padding: 0;
    width: 93%;
    background-color: transparent;
    font-family: Outfit;
    font-size: 14px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0em;
    color: ${({ theme }) => theme.formInput?.color};

    &::placeholder {
      color: ${({ theme }) => theme.formInput?.placeholder};
    }

    &:focus {
      outline: none;
      border-color: transparent;
    }
  }

  @media (min-width: 745px) and (max-width: 860px) {
    max-width: 100%;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SelectControl = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-inline: ${(props) => (props.$marginX ? props.$marginX : "0")};
  margin-block: ${(props) => (props.$marginY ? props.$marginY : "0")};

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
