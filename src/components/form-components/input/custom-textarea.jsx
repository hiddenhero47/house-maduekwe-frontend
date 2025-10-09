import React from "react";
import { MyTextarea, InputWrapper } from "./custom-input.style";

function CustomTextarea({
  value,
  placeholder,
  onChange,
  onBlur,
  isError = false,
  errorMessage,
  name,
  id,
  disabled = false,
  maxHeight,
  minHeight,
}) {
  return (
    <InputWrapper>
      <MyTextarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        $isError={isError}
        placeholder={placeholder}
        disabled={disabled}
        className="placeholder-search-placeholder border-transparent focus:border-transparent focus:ring-0"
        $maxHeight={maxHeight}
        $minHeight={minHeight}
      />
      {isError && errorMessage ? <p className="error">{errorMessage}</p> : ""}
    </InputWrapper>
  );
}

export default CustomTextarea;
