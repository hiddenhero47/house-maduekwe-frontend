import React, { useState, useEffect, useRef } from 'react';
import {
	CustomSelectContainer,
	CustomSelectValue,
	MenuDialog,
	Option,
	SearchBox,
} from './country';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

function CountryCodeSelect({
	options,
	value,
	placeholder,
	onChange,
	onBlur,
	name,
	id,
	disabled = false,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const menuRef = useRef(null);
	const bodyRef = useRef(null);

	const selectedOption = (() => {
		if (!value) return null;

		if (value.country && value.country.trim() !== '') {
			return options.find((option) => option.code === value.country);
		}

		if (value.phone && value.phone.trim() !== '') {
			return options.find((option) => option.phoneCode === value.phone);
		}

		return null;
	})();

	const handleOptionClick = (option) => {
		if (onChange) {
			onChange?.({
				phone: option.phoneCode,
				country: option.code,
			});
		}
		setIsOpen(false);
	};

	const handleBlur = (e) => {
		if (onBlur) {
			onBlur(e);
			setIsOpen(false);
		}
	};

	const filter = (options) => {
		if (searchValue) {
			return options.filter((option) =>
				option.name?.toLowerCase().includes(searchValue.toLowerCase())
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
		<CustomSelectContainer tabIndex={0} onBlur={handleBlur} id={id}>
			<CustomSelectValue
				onClick={() => !disabled && setIsOpen(true)}
				$isOpen={isOpen}
				ref={bodyRef}
			>
				{selectedOption ? (
					<>
						<span className="form_word">{selectedOption.flag}</span>
					</>
				) : (
					<span className="placeholder form_word">{placeholder}</span>
				)}
				<button
					className="arrow"
					style={{
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
					}}
				>
					<IoIosArrowDown width={10} height={10} />
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
					<button type="button">
						<BiSearch width={15} height={15} />
					</button>
					<input
						className="myInput border-transparent focus:border-transparent focus:ring-0"
						type="text"
						autoComplete="on"
						name={`${name}_search`}
						id={`${id}_search`}
						value={searchValue || ''}
						placeholder=" Search anything..."
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</SearchBox>
				<div className="wrapper">
					{filter(options).map((option, index) => (
						<Option
							key={index}
							selected={value === option.phoneCode}
							onClick={() => handleOptionClick(option)}
							className="option"
						>
							<span>
								{option.flag} {option.name}
							</span>
						</Option>
					))}
				</div>
			</MenuDialog>
		</CustomSelectContainer>
	);
}

export default CountryCodeSelect;
