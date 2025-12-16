import React, { useState } from 'react';
import { MyInput, Eyes, Error } from './password.style';
import { RiEyeOffLine } from 'react-icons/ri';
import { RiEyeLine } from 'react-icons/ri';

function CustomPassword({
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
	containerId = 'keyWord',
	autoComplete = 'new-password',
	useBackground = false,
	paddingX,
	paddingY,
}) {
	const [inputType, setInputType] = useState('password');

	return (
		<>
			<MyInput
				$isError={isError}
				id={containerId}
				className={`${className} form_word`}
				$useBackground={useBackground}
				$paddingX={paddingX}
				$paddingY={paddingY}
			>
				<input
					className="form_word"
					type={inputType}
					name={name}
					id={id}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={placeholder}
					disabled={disabled}
					autoComplete={autoComplete}
				/>
				<Eyes
					type="button"
					$type={inputType}
					onClick={() => {
						if (inputType === 'text') {
							setInputType('password');
						} else setInputType('text');
					}}
				>
					<i>
						{inputType === 'text' ? (
							<RiEyeLine size={18} />
						) : (
							<RiEyeOffLine size={18} />
						)}
					</i>
				</Eyes>
			</MyInput>
			{isError && errormessage ? <Error>{errormessage} !</Error> : ''}
		</>
	);
}

export default CustomPassword;
