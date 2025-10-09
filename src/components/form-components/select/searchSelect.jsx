import React, { useState, useEffect, useRef } from "react";
import {
  CustomSelectContainer,
  CustomSelectValue,
  SelectOptions,
  Option,
  ImageHolder,
  Error,
  SearchBox,
} from "./custom-select.style";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

const SearchSelect = ({
  options,
  value,
  placeholder,
  onChange,
  handleChange,
  isError,
  onBlur,
  name,
  id,
  errormessage,
  background,
  setSearchString,
  handleSearch,
  useFilter = true,
  scrollToTop = true,
  useBg = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null);
  const menuRef = useRef(null);
  const bodyRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (option) => {
    selectRef.current = option.value;
    if (onChange) {
      onChange(option.value);
    }
    if (handleChange) {
      handleChange(name || id)(option.value);
    }
    setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  const search = (string) => {
    setSearchValue(string);
    if (setSearchString) {
      setSearchString(string);
    }
  };

  const handelSearchCall = () => {
    if (handleSearch) {
      handleSearch(searchValue);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !bodyRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
        search("");
        if (searchValue.trim().length !== 0) {
          handelSearchCall();
        }
        if (menuRef.current && scrollToTop) {
          menuRef.current.scrollTop = 0;
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filter = (options) => {
    if (useFilter && searchValue) {
      return options.filter((option) =>
        option.label?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return options;
  };

  return (
    <>
      <CustomSelectContainer
        tabIndex={0}
        onBlur={handleBlur}
        id={id}
        className="My_select"
      >
        <CustomSelectValue
          className="displayValue"
          onClick={handleSelectClick}
          $isError={isError || false}
          $isOpen={isOpen}
          $background={background}
          $useBg={useBg}
          ref={bodyRef}
          $disabled={disabled}
        >
          {selectedOption ? (
            <>
              {selectedOption.image && (
                <div className="imageContainer">
                  <ImageHolder>
                    <img
                      src={selectedOption.image}
                      alt={selectedOption.label}
                    />
                  </ImageHolder>
                </div>
              )}
              <span className="label">{selectedOption.label}</span>
            </>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
          <i
            className="arrow"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
          >
            <IoIosArrowDown width={14} height={10} />
          </i>
        </CustomSelectValue>

        <SelectOptions className="select_dropdown" open={isOpen} ref={menuRef}>
          <SearchBox>
            <button type="button" onClick={handelSearchCall}>
              <BiSearch width={15} height={15} />
            </button>
            <input
              className="myInput border-transparent focus:border-transparent focus:ring-0"
              type="text"
              autoComplete="on"
              name={`${name}_search`}
              id={`${id}_search`}
              onKeyDown={handelSearchCall}
              value={searchValue || ""}
              placeholder=" Search anything..."
              onChange={(e) => search(e.target.value)}
            />
          </SearchBox>
          <div className="wrapper">
            <Option
              selected={value === ""}
              className="select_option"
              onClick={() => handleOptionClick({ value: "", label: "" })}
            >
              <span> _ _</span>
            </Option>
            {filter(options).map((option) => (
              <Option
                key={option.value}
                selected={value === option.value}
                onClick={() => handleOptionClick(option)}
                className="option"
              >
                {option.image && (
                  <div className="imageContainer">
                    <ImageHolder>
                      <img src={option.image} alt={option.label} />
                    </ImageHolder>
                  </div>
                )}
                <span>{option.label}</span>
              </Option>
            ))}
          </div>
        </SelectOptions>

        <select
          ref={selectRef}
          name={name}
          id={id}
          style={{ display: "none" }}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {filter(options).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CustomSelectContainer>

      {isError && <Error>{errormessage}!</Error>}
    </>
  );
};

export default SearchSelect;
