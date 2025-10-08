import React, { useState } from "react";
import { InputWrapper } from "./custom-input.style";
import { MyInput, Eyes } from "./password.style";
import { RiEyeOffLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";

function CustomPassword({
  value,
  placeholder,
  onChange,
  onBlur,
  isError = false,
  errorMessage,
  name,
  id,
  disabled = false,
  containerId = "keyWord",
  autoComplete = "new-password",
}) {
  const [inputType, setInputType] = useState("password");

  return (
    <InputWrapper>
      <MyInput $isError={isError} id={containerId} className="my_password">
        <input
          className="myInput border-transparent focus:border-transparent focus:ring-0"
          type={inputType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        <Eyes
          type="button"
          $type={inputType}
          onClick={() => {
            if (inputType === "text") {
              setInputType("password");
            } else setInputType("text");
          }}
        >
          <i>
            {inputType === "text" ? (
              <RiEyeLine size={18} />
            ) : (
              <RiEyeOffLine size={18} />
            )}
          </i>
        </Eyes>
      </MyInput>
      {isError && errorMessage ? <p className="error">{errorMessage}</p> : ""}
    </InputWrapper>
  );
}

export default CustomPassword;
