import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  FileInputWrapper,
  FileInput,
  FileInputSelected,
  Error,
  ButtonSell,
} from "./custom-file-input.style";
import { TriangleWarning as Warning } from "../../icons/utilities-icons";
import {
  FileDownloadIcon,
  FileDownloadIconLg,
  BadIcon,
  SelectedFileIcon,
} from "../../icon-components/form";

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
  isModal = false,
  convertFunc,
  isSelected,
  accept,
  height = "234px",
}) {
  const myFileRef = useRef(null);
  const inputRef = useRef(null);
  const [fileState, setFileState] = useState("unselected");
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
    myFileRef.current.classList.add("isDragging");
  };

  const handleDragleaveDragend = () => {
    if (myFileRef) {
      myFileRef.current.classList.remove("isDragging");
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
      // if (myFileRef) {
      // 	myFileRef.current.classList.remove('isError');
      // }
      const fileData = [];
      for (const file of files) {
        fileData.push(file);
      }
      forward(fileData);
    } else {
      const files = e.target.files[0];
      // if (myFileRef) {
      // 	myFileRef.current.classList.remove('isError');
      // }
      const fileData = files;
      forward(fileData);
    }
    setFileState("selected");
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
      setFileState("selected");
      if (onBlur) {
        onBlur(name ?? id);
      }
      setTouched(true);
    }

    if (myFileRef) {
      myFileRef.current.classList.remove("isDragging");
      // myFileRef.current.classList.remove('isError');
    }
  };
  const handelClear = () => {
    setFileState("unselected");
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
        unit: fileSize.KB >= 1000 ? "MB" : "KB",
        type: data[0]?.type,
      };
    }

    if (!isMultiple && data) {
      const fileSize = convertBits(data?.size ?? 0);
      return {
        name: data?.name,
        size: fileSize.KB >= 1000 ? fileSize.MB : fileSize.KB,
        unit: fileSize.KB >= 1000 ? "MB" : "KB",
        type: data?.type,
      };
    }

    return {
      name: "No file",
      size: 0,
      unit: "KB",
      type: "No type",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <FileInputWrapper height={height}>
      {fileState === "unselected" && (
        <FileInput
          id={id}
          ref={myFileRef}
          $isError={isError}
          onDragOver={handleDragover}
          onDragLeave={handleDragleaveDragend}
          onDragEnd={handleDragleaveDragend}
          onDrop={handleDrop}
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
            {isModal ? (
              <i className="icon">
                <FileDownloadIcon width={48} height={48} />
              </i>
            ) : (
              <i className="iconLg">
                <FileDownloadIconLg width={90} height={90} />
              </i>
            )}
            {isModal ? (
              <>
                <p className="FileText mt-[3px]">Drag file to upload</p>
                <span className="FileSubText">
                  <i></i> or select file <i></i>
                </span>
              </>
            ) : (
              <>
                <p className="FileTextLg mt-[6px]">Drag file to upload</p>
                <span className="FileSubTextLg">
                  <i></i> or select file <i></i>
                </span>
              </>
            )}
          </div>
          <label htmlFor="uploader-button" className="FileLabel">
            {isModal ? (
              <ButtonSell id="FillBtn" className="btn">
                <div className="content">Upload File</div>
              </ButtonSell>
            ) : (
              <ButtonSell id="FillBtnLg" className="btn">
                <div className="content">Upload File</div>
              </ButtonSell>
            )}
          </label>
        </FileInput>
      )}
      {fileState === "selected" && value ? (
        <FileInputSelected>
          <div className="flex items-center shape">
            <i className="file_Icon">
              <SelectedFileIcon width={36} height={36} />
            </i>
            <div className="Details">
              <h3 className="overflow-x-auto">{fileDetails.name}</h3>
              <span className="overflow-x-auto">
                {fileDetails.size} {fileDetails.unit}
              </span>
            </div>
          </div>
          <div className="clear" onClick={handelClear}>
            <i className="isIcon">
              <BadIcon width={24} height={24} />
            </i>
            Clear
          </div>
        </FileInputSelected>
      ) : (
        ""
      )}
      {isError && errorMessage && touched ? (
        <Error className="error">
          <Warning width={11} height={11} /> {errorMessage}
        </Error>
      ) : (
        ""
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
