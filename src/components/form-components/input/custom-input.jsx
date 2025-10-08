import React from "react";
import { MyInput, InputWrapper } from "./custom-input.style";

function CustomInput({
  value,
  placeholder,
  onChange,
  onBlur,
  isError = false,
  errorMessage,
  type = "text",
  name,
  id,
  disabled = false,
}) {
  return (
    <InputWrapper>
      <MyInput
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        $isError={isError}
        placeholder={placeholder}
        disabled={disabled}
        className="placeholder-search-placeholder border-transparent focus:border-transparent focus:ring-0"
      />
      {isError && errorMessage ? <p className="error">{errorMessage}</p> : ""}
    </InputWrapper>
  );
}

export default CustomInput;
