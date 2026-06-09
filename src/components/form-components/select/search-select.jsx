import React, { useState, useEffect, useRef } from 'react';
import {
	CustomSelectContainer,
	CustomSelectValue,
	MenuDialog,
	Option,
	ImageHolder,
	Error,
	SearchBox,
} from './custom-select.style';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

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
	className,
	errormessage,
	useBackground = false,
	setSearchString,
	handleSearch,
	useFilter = true,
	scrollToTop = true,
	disabled = false,
	paddingX,
	paddingY,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const menuRef = useRef(null);
	const bodyRef = useRef(null);

	// const selectedOption = options.find((option) => option.value === value);
	const selectedOption = options.find(
		(option) =>
			option.value === value ||
			String(option.value).toLowerCase() === String(value).toLowerCase()
	);

	const handleOptionClick = (option) => {
		if (onChange) {
			onChange(option.value);
		}
		if (handleChange) {
			handleChange(name || id)(option.value);
		}
		if (menuRef.current && scrollToTop) {
			menuRef.current.scrollTop = 0;
		}
		setIsOpen(false);
	};

	const handleSelectClick = () => {
		if (disabled) return;
		setIsOpen(true);
	};

	const handleBlur = () => {
		if (onBlur) {
			onBlur(name ?? id);
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

	const filter = (options) => {
		if (useFilter && searchValue) {
			return options.filter((option) =>
				option.label?.toLowerCase().includes(searchValue.toLowerCase())
			);
		}
		return options;
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e) => {
			const clickedInsideBody = bodyRef.current?.contains(e.target);
			const clickedInsideMenu = menuRef.current?.contains(e.target);

			if (!clickedInsideBody && !clickedInsideMenu) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	return (
		<>
			<CustomSelectContainer
				tabIndex={0}
				onBlur={handleBlur}
				id={id}
				className="select_wrapper"
			>
				<CustomSelectValue
					className={`${className || ''} custom_select`}
					onClick={handleSelectClick}
					$isError={isError || false}
					$isOpen={isOpen}
					$useBackground={useBackground}
					ref={bodyRef}
					$disabled={disabled}
					$paddingX={paddingX}
					$paddingY={paddingY}
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
							<span className="label form_word">{selectedOption.label}</span>
						</>
					) : (
						<span className="placeholder form_word">{placeholder}</span>
					)}
					<button
						type="button"
						className="arrow"
						style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
					>
						<IoIosArrowDown width={14} height={10} />
					</button>
				</CustomSelectValue>

				<MenuDialog
					ref={menuRef}
					className="select_dropdown"
					$open={isOpen}
					open={isOpen}
					closedby="any"
					onClose={() => setIsOpen(false)}
				>
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
							value={searchValue || ''}
							placeholder=" Search anything..."
							onChange={(e) => search(e.target.value)}
						/>
					</SearchBox>
					<div className="wrapper">
						<Option
							selected={value === ''}
							className="select_option"
							onClick={() => handleOptionClick({ value: '', label: '' })}
						>
							<span> _ _</span>
						</Option>
						{filter(options).map((option, index) => (
							<Option
								key={index}
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
				</MenuDialog>
			</CustomSelectContainer>

			{isError && <Error className="Form_error">{errormessage}!</Error>}
		</>
	);
};

export default SearchSelect;
