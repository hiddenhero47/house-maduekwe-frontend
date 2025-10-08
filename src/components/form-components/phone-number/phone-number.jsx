import React, { useState, useMemo, useEffect } from "react";
import CountryCodeSelect from "./country-code";
import { NumberInputWrapper, MyInput } from "./phone-number.style";
import CountryCode from "./iso-country";

const MyPhoneNumberInput = ({
  placeholder,
  onChange,
  handleChange,
  isError,
  onBlur,
  name,
  id,
  errorMessage,
  phoneNumber,
  disabled = false,
  containerId = "keyPhone",
  customChange,
}) => {
  const [code, setCode] = useState("+234");
  const [number, setNumber] = useState("");
  const isNumber = /^[0-9]+$/;

  const extractCountryCode = (phoneNumber, countryCodes) => {
    if (phoneNumber && countryCodes) {
      for (const country of countryCodes) {
        if (
          phoneNumber.startsWith(country.phoneCode) &&
          country.phoneCode.trim() !== ""
        ) {
          return country;
        }
      }
    }
    return null;
  };

  useMemo(() => {
    const country = extractCountryCode(phoneNumber, CountryCode);

    if (country && phoneNumber) {
      setCode(country.phoneCode);
      setNumber(phoneNumber.replace(country.phoneCode, ""));
    } else if (phoneNumber && phoneNumber.trim() !== "") {
      setNumber(phoneNumber);
    }
  }, [phoneNumber]);

  const handleNumberInput = (date) => {
    const recentInput = date.replace(code + " ", "");
    if (isNumber.test(recentInput) || recentInput === "") {
      setNumber(recentInput);
    }
  };

  useEffect(() => {
    const phoneNumber = code + number;

    if (code && number) {
      if (onChange) {
        onChange(phoneNumber);
      }
      if (handleChange) {
        handleChange(name || id)(phoneNumber);
      }
      if (customChange) {
        const codeObject = CountryCode.find(
          (option) => option.phoneCode === code
        );
        customChange({ code, number, codeObject });
      }
    } else {
      if (onChange) {
        onChange("");
      }
      if (handleChange) {
        handleChange("");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, number]);

  return (
    <NumberInputWrapper>
      <MyInput $isError={isError} id={containerId}>
        <CountryCodeSelect
          id="countryCode"
          name="countryCode"
          onChange={(code) => setCode(code)}
          value={code || ""}
          placeholder="__"
          options={CountryCode}
          disabled={disabled}
        />

        <input
          className="myInput border-transparent focus:border-transparent focus:ring-0"
          id={id}
          onBlur={onBlur}
          type="tel"
          autoComplete="tel"
          value={code ? code + " " + number : number || ""}
          onChange={(e) => handleNumberInput(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
      </MyInput>

      {isError && errorMessage ? <p className="error">{errorMessage}</p> : ""}
    </NumberInputWrapper>
  );
};

export default MyPhoneNumberInput;
