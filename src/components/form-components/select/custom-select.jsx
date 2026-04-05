import React, { useState, useRef } from 'react';
import {
	CustomSelectContainer,
	CustomSelectValue,
	MenuDialog,
	Option,
	ImageHolder,
	Error,
} from './custom-select.style';
import { IoIosArrowDown } from 'react-icons/io';

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
	className,
	errormessage,
	useBackground = false,
	scrollToTop = false,
	disabled = false,
	paddingX,
	paddingY,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);
	const bodyRef = useRef(null);

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
					closedby="any"
					onClose={() => setIsOpen(false)}
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
						{options.map((option, index) => (
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

			{isError && <Error className="Form_error">{errormessage} !</Error>}
		</>
	);
};

export default CustomSelect;
