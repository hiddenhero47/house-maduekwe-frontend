import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import CustomInput from '../input/custom-input'; // adjust path
import { ChipsWrapper, ChipsContainer, Chip, Error } from './chips-input.style';

const ChipsInput = ({
	value = [],
	onChange,
	setFieldValue,
	placeholder = 'Type and press Enter',
	isError = false,
	errormessage,
	useBackground = false,
	name,
	id,
	paddingX = '12px',
	paddingY = '10px',
	max = Infinity,
    onBlur
}) => {
	const [inputValue, setInputValue] = useState('');
	const [shake, setShake] = useState(false);

	const triggerShake = () => {
		setShake(true);
		setTimeout(() => setShake(false), 300);
	};

	const addChip = (val) => {
		const trimmed = val.trim();
		if (!trimmed) return;

		// prevent duplicates
		if (value.includes(trimmed)) return;

		// enforce max
		if (value.length >= max) {
			triggerShake();
			return;
		}
		const newValues = [...value, trimmed];
		if (onChange) {
			onChange(newValues);
		}
		if (setFieldValue) {
			setFieldValue(name ?? id, newValues);
		}
        if (onBlur) {
			onBlur(name ?? id);
		}
	};

	const removeChip = (chipToRemove) => {
		const newValues = value.filter((chip) => chip !== chipToRemove);

		if (onChange) {
			onChange(newValues);
		}

		if (setFieldValue) {
			setFieldValue(name ?? id, newValues);
		}
	};
	const handleKeyDown = (e) => {
        console.log("start");
        
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addChip(inputValue);
			setInputValue('');
		}

		// remove last chip with backspace
		if (e.key === 'Backspace' && !inputValue && value.length > 0) {
			removeChip(value[value.length - 1]);
		}
	};

	return (
		<ChipsWrapper>
			{/* Top Input */}
			<CustomInput
				value={inputValue}
				placeholder={placeholder}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				isError={isError}
				useBackground={useBackground}
				paddingX={paddingX}
				paddingY={paddingY}
				name={name}
				id={id}
			/>

			{/* Chips Display */}
			<ChipsContainer
				$isError={isError}
				$useBackground={useBackground}
				$shake={shake}
			>
				{value.map((chip, index) => (
					<Chip key={index}>
						<span>{chip}</span>
						<button type="button" onClick={() => removeChip(chip)}>
							<IoClose size={16} />
						</button>
					</Chip>
				))}
			</ChipsContainer>

			{isError && errormessage && (
				<Error className="Form_error">{errormessage} !</Error>
			)}
		</ChipsWrapper>
	);
};

export default ChipsInput;
