import React, { useState, useEffect, useRef } from "react";
import {
    CustomSelectContainer,
    CustomSelectValue,
    SelectOptions,
    Option,
    ImageHolder,
    Error,
} from "./custom-select.style";
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = ({
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
    scrollToTop = false,
    useBg = false,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const menuRef = useRef(null);
    const bodyRef = useRef(null);

    const selectedOption = options.find(option => option.value === value);

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
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (
                !menuRef.current?.contains(e.target) &&
                !bodyRef.current?.contains(e.target)
            ) {
                setIsOpen(false);
                if (menuRef.current && scrollToTop) {
                    menuRef.current.scrollTop = 0;
                }
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [scrollToTop]);

    return (
        <>
            <CustomSelectContainer
                tabIndex={0}
                onBlur={onBlur}
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
                            <span className="label">
                                {selectedOption.label}
                            </span>
                        </>
                    ) : (
                        <span className="placeholder">{placeholder}</span>
                    )}

                    <i
                        className="arrow"
                        style={{
                            transform: isOpen
                                ? "rotate(0deg)"
                                : "rotate(-90deg)",
                        }}
                    >
                        <IoIosArrowDown width={14} height={10} />
                    </i>
                </CustomSelectValue>

                <SelectOptions
                    className="select_dropdown"
                    open={isOpen}
                    ref={menuRef}
                >
                    <div className="wrapper">
                        <Option
                            selected={value === ""}
                            onClick={() =>
                                handleOptionClick({
                                    value: "",
                                    label: "",
                                })
                            }
                        >
                            <span> _ _</span>
                        </Option>
                        {options.map(option => (
                            <Option
                                className="select_option"
                                key={option.value}
                                selected={value === option.value}
                                onClick={() => handleOptionClick(option)}
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
                    onChange={(e) =>
                        onChange && onChange(e.target.value)
                    }
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map(option => (
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

export default CustomSelect;
