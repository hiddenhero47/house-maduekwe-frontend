import React from 'react';
import { MyTextarea, Error } from './custom-input.style';

function CustomTextarea({
	value,
	placeholder,
	onChange,
	onBlur,
	isError = false,
	errormessage,
	name,
	id,
	className,
	disabled = false,
	maxHeight,
	minHeight,
	useBackground = false,
	paddingX,
	paddingY,
	autoComplete = 'off',
}) {
	return (
		<>
			<MyTextarea
				name={name}
				id={id}
				className={`${className} form_word`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				$isError={isError}
				placeholder={placeholder}
				disabled={disabled}
				$maxHeight={maxHeight}
				$minHeight={minHeight}
				$useBackground={useBackground}
				$paddingX={paddingX}
				$paddingY={paddingY}
				autoComplete={autoComplete}
			/>
			{isError && errormessage ? (
				<Error className='Form_error' style={{ marginTop: '-6px' }}>{errormessage} !</Error>
			) : (
				''
			)}
		</>
	);
}

export default CustomTextarea;
