import React, { useState, useMemo, useEffect } from 'react';
import CountryCodeSelect from './country-code';
import { MyInput, Error } from './phone-number.style';
import PhoneCodeData from './iso-country';

const PhoneInput = ({
	placeholder,
	onChange,
	handleChange,
	isError,
	onBlur,
	name,
	id,
	className,
	errormessage,
	phoneNumber,
	disabled = false,
	containerId = 'keyPhone',
	customChange,
	useBackground = false,
	paddingX,
	paddingY,
	country,
}) => {
	const [codes, setCodes] = useState({
		phone: '+234',
		country: 'NG',
	});
	const [number, setNumber] = useState('');
	const isNumber = /^[0-9]+$/;

	const extractCountryCode = (phoneNumber, phoneCodes, countryCode) => {
		if (!phoneCodes) return null;

		if (countryCode) {
			return phoneCodes.find((p) => p.code === countryCode);
		}

		if (phoneNumber) {
			return phoneCodes.find(
				(p) => phoneNumber.startsWith(p.phoneCode) && p.phoneCode.trim() !== ''
			);
		}
		return null;
	};

	useEffect(() => {
		const countryObj = extractCountryCode(phoneNumber, PhoneCodeData, country);

		if (countryObj) {
			setCodes({
				phone: countryObj.phoneCode,
				country: countryObj.code,
			});

			if (phoneNumber) {
				setNumber(phoneNumber.replace(countryObj.phoneCode, ''));
			}
		} else if (phoneNumber && phoneNumber.trim() !== '') {
			setNumber(phoneNumber);
		}
	}, [phoneNumber, country]);

	const handleNumberInput = (date) => {
		const recentInput = date.replace(codes.phone + ' ', '');
		if (isNumber.test(recentInput) || recentInput === '') {
			setNumber(recentInput);
		}
	};

	useEffect(() => {
		const fullPhoneNumber = codes.phone + number;

		if (codes.phone && number) {
			if (onChange) {
				onChange(fullPhoneNumber);
			}
			if (handleChange) {
				handleChange(name || id)(fullPhoneNumber);
			}
			if (customChange) {
				const codeObject = PhoneCodeData.find(
					(option) => option.code === codes.country
				);
				customChange({
					code: codes.phone,
					number,
					country: codes.country,
					codeObject,
				});
			}
		} else {
			if (onChange) {
				onChange('');
			}
			if (handleChange) {
				handleChange('');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [codes, number]);

	return (
		<>
			<MyInput
				$isError={isError}
				id={containerId}
				className={`${className} form_word`}
				$useBackground={useBackground}
				$paddingX={paddingX}
				$paddingY={paddingY}
				$disabled={disabled}
			>
				<CountryCodeSelect
					id="countryCode"
					name="countryCode"
					onChange={(data) => setCodes(data)}
					value={codes || {}}
					placeholder="__"
					options={PhoneCodeData}
					disabled={disabled}
				/>

				<input
					className="form_word"
					id={id}
					name={name}
					onBlur={onBlur}
					type="tel"
					autoComplete="tel"
					value={codes.phone ? `${codes.phone} ${number}` : number || ''}
					onChange={(e) => handleNumberInput(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
				/>
			</MyInput>

			{isError && <Error>{errormessage}!</Error>}
		</>
	);
};

export default PhoneInput;
