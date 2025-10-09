import * as React from "react";
import PropTypes from "prop-types";
import { CustomSVG } from "./index.style";

export const FileDownloadIconLg = ({ width, height }) => (
  <CustomSVG
    width={width}
    height={height}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/CustomSVG"
  >
    <path
      d="M45 52.5L43.2322 54.2678L45 56.0355L46.7678 54.2678L45 52.5ZM47.5 18.75C47.5 17.3693 46.3807 16.25 45 16.25C43.6193 16.25 42.5 17.3693 42.5 18.75L47.5 18.75ZM24.4822 35.5178L43.2322 54.2678L46.7678 50.7322L28.0178 31.9822L24.4822 35.5178ZM46.7678 54.2678L65.5178 35.5178L61.9822 31.9822L43.2322 50.7322L46.7678 54.2678ZM47.5 52.5L47.5 18.75L42.5 18.75L42.5 52.5L47.5 52.5Z"
      fill="currentColor"
    />
    <path
      d="M18.75 60L18.75 63.75C18.75 67.8921 22.1079 71.25 26.25 71.25L63.75 71.25C67.8921 71.25 71.25 67.8921 71.25 63.75V60"
      stroke="currentColor"
      strokeWidth="5"
    />
  </CustomSVG>
);

FileDownloadIconLg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.any,
};

export const FileDownloadIcon = ({ width, height }) => (
  <CustomSVG
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/CustomSVG"
  >
    <path
      d="M24.0078 28L23.3007 28.7071L24.0078 29.4142L24.7149 28.7071L24.0078 28ZM25.0078 10C25.0078 9.44772 24.5601 9 24.0078 9C23.4555 9 23.0078 9.44772 23.0078 10L25.0078 10ZM13.3007 18.7071L23.3007 28.7071L24.7149 27.2929L14.7149 17.2929L13.3007 18.7071ZM24.7149 28.7071L34.7149 18.7071L33.3007 17.2929L23.3007 27.2929L24.7149 28.7071ZM25.0078 28L25.0078 10L23.0078 10L23.0078 28L25.0078 28Z"
      fill="currentColor"
    />
    <path
      d="M10.0078 32L10.0078 34C10.0078 36.2091 11.7987 38 14.0078 38L34.0078 38C36.217 38 38.0078 36.2091 38.0078 34V32"
      stroke="currentColor"
      strokeWidth="2"
    />
  </CustomSVG>
);

FileDownloadIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.any,
};

export const SelectedFileIcon = ({ width, height }) => (
  <CustomSVG
    width={width}
    height={height}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/CustomSVG"
  >
    <path
      d="M19.7574 4.5H13.5C10.6716 4.5 9.25736 4.5 8.37868 5.37868C7.5 6.25736 7.5 7.67157 7.5 10.5V25.5C7.5 28.3284 7.5 29.7426 8.37868 30.6213C9.25736 31.5 10.6716 31.5 13.5 31.5H22.5C25.3284 31.5 26.7426 31.5 27.6213 30.6213C28.5 29.7426 28.5 28.3284 28.5 25.5V13.2426C28.5 12.6295 28.5 12.323 28.3858 12.0473C28.2716 11.7716 28.0549 11.5549 27.6213 11.1213L21.8787 5.37868C21.4451 4.94513 21.2284 4.72836 20.9527 4.61418C20.677 4.5 20.3705 4.5 19.7574 4.5Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M13.5 19.5L22.5 19.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13.5 25.5L19.5 25.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19.5 4.5V10.5C19.5 11.9142 19.5 12.6213 19.9393 13.0607C20.3787 13.5 21.0858 13.5 22.5 13.5H28.5"
      stroke="currentColor"
      strokeWidth="2"
    />
  </CustomSVG>
);

SelectedFileIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.any,
};

export const BadIcon = ({ width, height }) => (
  <CustomSVG
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/CustomSVG"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomSVG>
);

BadIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.any,
};

export const DownloadCustomSVG = ({ width, height }) => (
  <CustomSVG
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/CustomSVG"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 11.8799C9.00757 12.2746 8.61029 12.7835 8.34839 13.367L8.34352 13.3779C8.26605 13.5505 8.20111 13.6952 8.14829 13.8063C8.10219 13.9032 8.03371 14.0441 7.94687 14.1656C7.82083 14.342 7.65546 14.5371 7.414 14.6934C7.17254 14.8497 6.92683 14.9207 6.71431 14.9635C6.51342 15.0039 6.27177 15.0033 6.0642 15.0029H6.06419L6 15.0028C4.89543 15.0028 4 15.8982 4 17.0028C4 18.1073 4.89543 19.0028 6 19.0028H12H18C19.1046 19.0028 20 18.1073 20 17.0028C20 15.8982 19.1046 15.0028 18 15.0028L17.9358 15.0029H17.9358C17.7282 15.0033 17.4866 15.0039 17.2857 14.9635C17.0732 14.9207 16.8275 14.8497 16.586 14.6934C16.3445 14.5371 16.1792 14.342 16.0531 14.1656C15.9663 14.0441 15.8978 13.9032 15.8517 13.8063C15.7989 13.6952 15.7339 13.5505 15.6565 13.3779L15.6516 13.367C15.3897 12.7835 14.9924 12.2746 14.5 11.8799V9.54687C15.8201 10.1528 16.8818 11.2236 17.4763 12.5481C17.5599 12.7344 17.6158 12.8588 17.6579 12.9475C17.6683 12.9693 17.6767 12.9866 17.6835 13.0001L17.7032 13.0008C17.7668 13.0027 17.854 13.0028 18 13.0028C20.2091 13.0028 22 14.7936 22 17.0028C22 19.2119 20.2091 21.0028 18 21.0028H12H6C3.79086 21.0028 2 19.2119 2 17.0028C2 14.7936 3.79086 13.0028 6 13.0028C6.14598 13.0028 6.23318 13.0027 6.29677 13.0008L6.31654 13.0001C6.32326 12.9866 6.33167 12.9693 6.34206 12.9475C6.38425 12.8588 6.44011 12.7344 6.52373 12.5481C7.11818 11.2236 8.17993 10.1528 9.5 9.54688V11.8799ZM6.29756 13.0365C6.29755 13.0365 6.29761 13.0363 6.29774 13.0361L6.29777 13.0361L6.29756 13.0365ZM17.7024 13.0365C17.7024 13.0365 17.7024 13.0363 17.7022 13.0361L17.7023 13.0361L17.7024 13.0365Z"
      fill="currentColor"
    />
    <path
      d="M12 3L11.2929 2.29289L12 1.58579L12.7071 2.29289L12 3ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13L13 13ZM7.29289 6.29289L11.2929 2.29289L12.7071 3.70711L8.70711 7.70711L7.29289 6.29289ZM12.7071 2.29289L16.7071 6.29289L15.2929 7.70711L11.2929 3.70711L12.7071 2.29289ZM13 3L13 13L11 13L11 3L13 3Z"
      fill="currentColor"
    />
  </CustomSVG>
);

DownloadCustomSVG.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.any,
};
