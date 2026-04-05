import React, { useMemo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	FileInputWrapper,
	FileInput,
	FileInputSelected,
	Error,
	ButtonShell,
} from './custom-file-input.style';
import { BsImageFill } from 'react-icons/bs';
import { LuFileX } from 'react-icons/lu';
import { SiFiles } from 'react-icons/si';

function CustomFileInput({
	value,
	onChange,
	setFieldValue,
	isMultiple = false,
	isError,
	onBlur,
	name,
	id,
	errorMessage,
	convertFunc,
	isSelected,
	accept,
	useBackground,
	disabled,
	width,
}) {
	const myFileRef = useRef(null);
	const inputRef = useRef(null);
	const [fileState, setFileState] = useState('unselected');
	const [data, setData] = useState();
	const [touched, setTouched] = useState(false);

	function convertBits(bits) {
		const KB = (bits / 8 / 1024).toFixed(2);
		const MB = (KB / 1024).toFixed(2);
		return { KB, MB };
	}

	useEffect(() => {
		if (isSelected) {
			isSelected(fileState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileState]);

	const handleDragover = (e) => {
		e.preventDefault();
		myFileRef.current.classList.add('isDragging');
	};

	const handleDragleaveDragend = () => {
		if (myFileRef) {
			myFileRef.current.classList.remove('isDragging');
		}
	};

	const forward = async (value) => {
		const fileData = convertFunc ? await convertFunc(value) : value;
		setData(value);
		if (onChange) {
			onChange(fileData);
		}
		if (setFieldValue) {
			setFieldValue(name ? name : id, fileData);
		}
	};

	const onChangeFile = (e) => {
		if (isMultiple) {
			const files = e.target.files;
			const fileData = [];
			for (const file of files) {
				fileData.push(file);
			}
			forward(fileData);
		} else {
			const files = e.target.files[0];
			const fileData = files;
			forward(fileData);
		}
		setFileState('selected');
		if (onBlur) {
			onBlur(name ?? id);
		}
		setTouched(true);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		if (e.dataTransfer.files.length) {
			if (isMultiple) {
				const files = e.dataTransfer.files;
				inputRef.current = files;
				const fileData = [];
				for (const file of files) {
					fileData.push(file);
				}
				forward(fileData);
			} else {
				const files = e.dataTransfer.files[0];
				inputRef.current = files;
				const fileData = files;
				forward(fileData);
			}
			setFileState('selected');
			if (onBlur) {
				onBlur(name ?? id);
			}
			setTouched(true);
		}

		if (myFileRef) {
			myFileRef.current.classList.remove('isDragging');
			// myFileRef.current.classList.remove('isError');
		}
	};
	const handelClear = () => {
		setFileState('unselected');
		setData(null);
		if (onChange) {
			onChange(null);
		}
		if (setFieldValue) {
			setFieldValue(name ? name : id, null);
		}
	};

	const fileDetails = useMemo(() => {
		if (isMultiple && data) {
			const total = data?.reduce((sum, item) => {
				const size = Number(item.size);
				return sum + size;
			}, 0);
			const fileSize = convertBits(total ?? 0);
			return {
				name: `${data?.length} Files`,
				size: fileSize.KB >= 1000 ? fileSize.MB : fileSize.KB,
				unit: fileSize.KB >= 1000 ? 'MB' : 'KB',
				type: data[0]?.type,
			};
		}

		if (!isMultiple && data) {
			const fileSize = convertBits(data?.size ?? 0);
			return {
				name: data?.name,
				size: fileSize.KB >= 1000 ? fileSize.MB : fileSize.KB,
				unit: fileSize.KB >= 1000 ? 'MB' : 'KB',
				type: data?.type,
			};
		}

		return {
			name: 'No file',
			size: 0,
			unit: 'KB',
			type: 'No type',
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<FileInputWrapper>
			{fileState === 'unselected' && (
				<FileInput
					width={width}
					id={id}
					ref={myFileRef}
					$isError={isError}
					onDragOver={handleDragover}
					onDragLeave={handleDragleaveDragend}
					onDragEnd={handleDragleaveDragend}
					onDrop={handleDrop}
					$useBackground={useBackground}
					$disabled={disabled}
				>
					<input
						type="file"
						name={name}
						id="uploader-button"
						multiple={isMultiple}
						accept={accept}
						onChange={onChangeFile}
						ref={inputRef}
					/>
					<div className="container">
						<i className="icon">
							<BsImageFill />
						</i>

						<div>
							<p className="form_file_word">Drag file to upload</p>
							<span className="form_file_word">or select file</span>
						</div>
					</div>

					<ButtonShell htmlFor="uploader-button" $disabled={disabled}>
						<div className="content">Upload File</div>
					</ButtonShell>
				</FileInput>
			)}

			{fileState === 'selected' && value ? (
				<FileInputSelected
					width={width}
					$useBackground={useBackground}
					$isError={isError}
					$disabled={disabled}
				>
					<div className="selected_file_wrapper">
						<i className="icon">
							<SiFiles />
						</i>
						<div className="file_details">
							<h3 className="scroll_style">{fileDetails.name}</h3>
							<span className="scroll_style">
								{fileDetails.size} {fileDetails.unit}
							</span>
						</div>
					</div>
					<button type="button" className="file_clear_btn" onClick={handelClear}>
						<i className="isIcon">
							<LuFileX />
						</i>
						clear
					</button>
				</FileInputSelected>
			) : (
				''
			)}

			{isError && errorMessage && touched ? (
				<Error className="error Form_error">{errorMessage} !</Error>
			) : (
				''
			)}
		</FileInputWrapper>
	);
}

CustomFileInput.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func,
	setFieldValue: PropTypes.any,
	isMultiple: PropTypes.bool,
	isError: PropTypes.bool,
	onBlur: PropTypes.func,
	name: PropTypes.string,
	id: PropTypes.string,
	errorMessage: PropTypes.string,
	isModal: PropTypes.bool,
	convertFunc: PropTypes.func,
	isSelected: PropTypes.func,
	accept: PropTypes.string,
	height: PropTypes.string,
};

export default CustomFileInput;
