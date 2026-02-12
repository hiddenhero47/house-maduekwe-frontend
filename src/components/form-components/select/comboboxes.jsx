import React, { useState, useEffect, useRef } from 'react';
import {
	CustomSelectContainer,
	CustomSelectValue,
	MenuDialog,
	Option,
	ImageHolder,
	Error,
} from './custom-select.style';
import { IoIosArrowDown } from 'react-icons/io';

const Comboboxes = ({
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
	searchId,
	errormessage,
	useBackground,
	scrollToTop = false,
	disabled = false,
	setSearchAPI,
	paddingX,
	paddingY,
	searchValue,
	setSearchValue,
	onSearch,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);
	const bodyRef = useRef(null);
	const inputRef = useRef(null);
	const lastActionRef = useRef(null);

	const selectedOption = options.find((option) => option.value === value);

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
		if (setSearchValue) {
			setSearchValue(option.label);
		}
		if (onSearch) {
			onSearch(searchId)(option.label);
		}
		lastActionRef.current = 'select';
		setIsOpen(false);
	};

	const handleSelectClick = (e) => {
		if (disabled) return;

		if (inputRef.current?.contains(e.target) && isOpen) {
			return;
		}
		setIsOpen((prev) => !prev);
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

	const filter = (options) => {
		if (searchValue) {
			return options.filter((option) =>
				option.label?.toLowerCase().includes(searchValue.toLowerCase())
			);
		}
		return options;
	};

	const search = (e) => {
		if (setSearchValue) {
			setSearchValue(e.target.value);
		}
		if (onSearch) {
			onSearch(searchId)(e.target.value);
		}
		lastActionRef.current = 'typing';
	};

	const searchBlur = (e) => {
		setTimeout(() => {
			if (lastActionRef.current === 'typing') {
				if (selectedOption && selectedOption.label !== searchValue) {
					setSearchValue(selectedOption.label || '');
				}
			}
			lastActionRef.current = null; // reset
		}, 100);
	};

	return (
		<>
			<CustomSelectContainer
				tabIndex={0}
				onBlur={onBlur}
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
					<input
						ref={inputRef}
						id={searchId}
						className="form_word"
						type="text"
						value={searchValue || ''}
						onChange={search}
						placeholder={placeholder}
						onBlur={(e) => searchBlur(e)}
					/>

					<button
						className="arrow"
						style={{
							transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
						}}
					>
						<IoIosArrowDown width={14} height={10} />
					</button>
				</CustomSelectValue>

				<MenuDialog
					ref={menuRef}
					className="select_dropdown"
					$open={isOpen}
					open={isOpen}
				>
					<div className="wrapper">
						<Option
							selected={value === ''}
							onClick={() =>
								handleOptionClick({
									value: '',
									label: '',
								})
							}
						>
							<span> _ _</span>
						</Option>
						{filter(options).map((option, index) => (
							<Option
								className="select_option"
								key={index}
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
				</MenuDialog>
			</CustomSelectContainer>

			{isError && <Error className='Form_error'>{errormessage} !</Error>}
		</>
	);
};

export default Comboboxes;
