import { toast } from "react-toastify";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";

export function numberToWords(number) {
  const units = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];

  const teens = [
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (number === 0) {
    return "Zero";
  }

  if (number < 10) {
    return units[number];
  }

  if (number >= 11 && number <= 19) {
    return teens[number - 11];
  }

  const numArray = number.toString().split("").map(Number);
  const numWords = [];

  if (numArray[0] > 0) {
    numWords.push(units[numArray[0]] + " Hundred");
  }

  if (numArray[1] > 1) {
    numWords.push(tens[numArray[1]]);
    if (numArray[2] > 0) {
      const unitWord = units[numArray[2]];
      numWords.push(unitWord);
    }
  } else if (numArray[1] === 1) {
    numWords.push(teens[numArray[2] - 1]);
  } else if (numArray[2] > 0) {
    const unitWord = units[numArray[2]];
    numWords.push(unitWord);
  }

  return numWords.join(" ");
}

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function getFirstLetters(inputString) {
  const words = inputString?.split(" ");

  if (!words || words.length === 0 || !inputString) {
    return "N/A"; // No words in the input string
  }

  if (words.length === 1) {
    const word = words[0];
    if (word.length === 1) {
      return word.repeat(2); // If it's a single letter, return it repeated
    }
    return word.slice(0, 2); // If it's a single word, return the first two letters
  }

  const firstWord = words[0];
  const secondWord = words[1];

  return `${firstWord.charAt(0)}${secondWord.charAt(0)}`;
}

export function addCommas(number) {
  if (isNaN(number)) {
    return number.toString();
  }
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
}

export function truncateHex({ hexString, len = 0 }) {
  if (hexString && hexString?.length > len && len > 5) {
    const prefixLength = Math.ceil((len - 5) / 2);
    const suffixLength = len - prefixLength - 3; // 3 for the ellipsis

    const prefix = hexString?.substring(0, prefixLength);
    const suffix = hexString?.substring(hexString.length - suffixLength);

    return prefix + "..." + suffix;
  }
  return hexString ?? "";
}

export function truncate({ str, len }) {
  if (str.length > len && str.length > 0) {
    let new_str = str + "";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(""));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + "...";
  }
  return str;
}

export const copyTextToClipboard = async (text) => {
  if ("clipboard" in navigator) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("copied");
      return true;
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      toast.error("Failed to copy");
      return false;
    }
  } else {
    try {
      const success = document.execCommand("copy", true, text);
      if (!success) {
        console.error("Failed to copy text to clipboard.");
      }
      toast.success("copied");
      return success;
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      toast.error("Failed to copy");
      return false;
    }
  }
};

export function formatPhoneNumber(phoneNumber) {
  const parsedNumber =
    phoneNumber && parsePhoneNumberFromString(phoneNumber?.toString());
  if (parsedNumber) {
    return parsedNumber.formatInternational();
  }
  return phoneNumber; // Return the original if parsing fails
}

export function getPeriod(period) {
  const today = moment();
  const startDate = today.startOf("day"); // Always start from today
  let endDate;

  switch (period) {
    case "this-week":
      endDate = today.clone().subtract(7, "days"); // Subtract 7 days
      break;
    case "this-month":
      endDate = today.clone().subtract(1, "months"); // Subtract 1 month
      break;
    case "this-year":
      endDate = today.clone().subtract(1, "years"); // Subtract 1 year
      break;
    case "old":
      endDate = today.clone().subtract(10, "years"); // Subtract 10 years
      break;
    default:
      endDate = today;
      break;
  }

  return {
    start: startDate.format("YYYY-MM-DD"),
    end: endDate.format("YYYY-MM-DD"),
  };
}

export const getFromLocalStorage = (value) => {
  if (!value || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(value);
};
