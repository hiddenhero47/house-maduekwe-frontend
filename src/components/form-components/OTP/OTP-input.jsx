import React, { useState, useRef, useEffect } from "react";
import { OTPInputWrapper, Container, OTPInputBox } from "./OTP-input.style";

const OTPInput = ({
  field = 5,
  width,
  height,
  size = "48px",
  gap = "13px",
  paddingX,
  paddingY,
  fontSize = "30px",
  name,
  id,
  onChange,
  handleChange,
  onBlur,
  isError = false,
  errorMessage,
  boxClass,
}) => {
  const [OTPValue, setOTPValue] = useState(Array(field).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, field);
  }, [field]);

  const handleFieldChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newOTPValue = [...OTPValue];
      newOTPValue[index] = value;
      setOTPValue(newOTPValue);

      if (value === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (value !== "" && index < field - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const newOTPValue = [...OTPValue];
    for (let i = 0; i < field; i++) {
      newOTPValue[i] = pasteData[i] || "";
    }
    setOTPValue(newOTPValue);
    const lastIndex = Math.min(pasteData.length, field) - 1;
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
    e.preventDefault();
  };

  useEffect(() => {
    const value = OTPValue.join("");
    if (onChange) {
      onChange(value);
    }
    if (handleChange) {
      handleChange(name || id)(value);
    }
    if (onBlur) {
      onBlur(name ?? id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OTPValue]);

  return (
    <OTPInputWrapper id={id}>
      <Container $gap={gap} $paddingX={paddingX} $paddingY={paddingY}>
        {Array.from({ length: field }).map((_, index) => (
          <OTPInputBox
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`border-transparent focus:border-transparent focus:ring-0 ${boxClass}`}
            type="number"
            maxLength={1}
            value={OTPValue[index]}
            onChange={(e) => handleFieldChange(e, index)}
            onPaste={handlePaste}
            $isActive={OTPValue[index] !== ""}
            $size={size}
            $isError={isError}
            $fontSize={fontSize}
            width={width}
            height={height}
          />
        ))}
      </Container>
      {isError && errorMessage ? <p className="error">{errorMessage}</p> : ""}
    </OTPInputWrapper>
  );
};

export default OTPInput;
