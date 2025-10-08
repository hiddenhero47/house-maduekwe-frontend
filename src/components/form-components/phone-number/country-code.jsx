import React, { useState, useEffect, useRef } from "react";
import {
    CustomSelectContainer,
    CustomSelectValue,
    SelectOptions,
    Option,
    SearchBox,
} from "./country";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

function CountryCodeSelect({
    options,
    value,
    placeholder,
    onChange,
    handleChange,
    isError = false,
    onBlur,
    name,
    id,
    disabled = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const selectRef = useRef(null);
    const menuRef = useRef(null);
    const bodyRef = useRef(null);
    const [code, setCode] = useState();

    const selectedOption =
        value != null && value.trim() !== ""
            ? options.find(option => option.phoneCode === value)
            : options.find(option => option.code === code);

    const handleOptionClick = (option) => {
        if (selectRef.current) {
            selectRef.current.value = option.phoneCode;
        }
        if (onChange) {
            onChange(option.phoneCode);
        }
        if (handleChange) {
            handleChange(name ? name : id)(option.phoneCode);
        }
        setIsOpen(false);
        setCode(option.code);
    };

    const handleSelectClick = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleBlur = (e) => {
        if (onBlur) {
            onBlur(e);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                bodyRef.current &&
                !bodyRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    function uniqueID(baseID, index) {
        return `${baseID}${index}`;
    }

    const search = (string) => {
        setSearchValue(string);
    };

    const filter = (options) => {
        if (searchValue) {
            return options.filter(option =>
                option.name?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        return options;
    };

    return (
        <CustomSelectContainer tabIndex={0} onBlur={handleBlur} id={id}>
            <CustomSelectValue
                onClick={handleSelectClick}
                $isOpen={isOpen}
                ref={bodyRef}
            >
                {selectedOption ? (
                    <>
                        <span>{selectedOption.flag}</span>
                    </>
                ) : (
                    <span className="placeholder">{placeholder}</span>
                )}
                <i
                    className="arrow"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                >
                    <IoIosArrowDown width={10} height={10} />
                </i>
            </CustomSelectValue>

            <SelectOptions open={isOpen} ref={menuRef}>
                <SearchBox>
                    <button type="button">
                        <BiSearch width={15} height={15} />
                    </button>
                    <input
                        className="myInput border-transparent focus:border-transparent focus:ring-0"
                        type="text"
                        autoComplete="on"
                        name={`${name}_search`}
                        id={`${id}_search`}
                        value={searchValue || ""}
                        placeholder=" Search anything..."
                        onChange={e => search(e.target.value)}
                    />
                </SearchBox>
                <div className="wrapper">
                    {filter(options).map((option, index) => (
                        <Option
                            key={uniqueID(option.code, index)}
                            selected={value === option.phoneCode}
                            onClick={() => handleOptionClick(option)}
                        >
                            <span>
                                {option.flag} {option.name}
                            </span>
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
                onChange={e => onChange(e.target.value)}
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {filter(options).map((option, index) => (
                    <option key={index} value={option.phoneCode}>
                        {option.code}
                    </option>
                ))}
            </select>
        </CustomSelectContainer>
    );
}

export default CountryCodeSelect;
