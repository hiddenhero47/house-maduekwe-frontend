import React from 'react';
import { MyInput, InputWrapper, Error } from './custom-input.style';

function CustomInput({
	value,
	placeholder,
	onChange,
	onBlur,
	isError = false,
	errormessage,
	type = 'text',
	name,
	id,
	className,
	disabled = false,
	useBackground = false,
	paddingX,
	paddingY,
	autoComplete = 'off',
}) {
	return (
		<>
			<MyInput
				type={type}
				name={name}
				id={id}
				className={`${className} form_word`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				$isError={isError}
				placeholder={placeholder}
				disabled={disabled}
				$useBackground={useBackground}
				$paddingX={paddingX}
				$paddingY={paddingY}
				autoComplete={autoComplete}
			/>
			{isError && errormessage ? <Error>{errormessage} !</Error> : ''}
		</>
	);
}

export default CustomInput;
