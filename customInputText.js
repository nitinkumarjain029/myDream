import React, { useState, useEffect, useRef } from 'react';
import $ from "jquery";

const CustomInputText = ({ id,className , label, placeholder, nameLabel, onChange, disabled, onValidation, onFocus, autoComplete, maxLength, minLength, inputValue }) => {
  const [value, setValue] = useState(inputValue || ''); // Initialize with inputValue if passed
  const [validationError, setValidationError] = useState('');

  const inputRef = useRef(null);

  // Synchronize internal state with the inputValue prop when it changes
  useEffect(() => {
    setValue(inputValue || ''); // Update value if inputValue prop changes
  }, [inputValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/^\s*/, ''); // Remove space at the beginning

    setValue(formattedValue); // Update internal state
    onChange(formattedValue); // Call the external onChange handler
    validateInput(formattedValue); // Validate input
  };

  const filterHindiLetters = (text) => {
    const hindiRegex = /^[\u0900-\u097F\s]+$/;
    const filteredText = text.split('').filter((char) => hindiRegex.test(char)).join('');
    return filteredText;
  };

  const handleKeyPress = (event) => {
    const char = String.fromCharCode(event.charCode);
    const isValidChar = /^[\u0900-\u097F\s]+$/.test(char);

    let getname = $("#" + event.target.id).parents('.nameHindi').siblings('.error');
    let geterr_cst = $("#" + event.target.id).parents('.nameHindi').siblings('.error_cstm');
    onValidation(true);

    if (getname.length === 0 || !isValidChar) {
      if (getname.length === 1) {
        geterr_cst.removeClass('hide');
        getname.addClass('hide');
        if (!isValidChar) {
          event.preventDefault();
          setValidationError(`कृपया ${nameLabel} हिंदी में दर्ज करें।`);
          onValidation(false);
        } else {
          setValidationError('');
          onValidation(true);
        }
      } else {
        if (!isValidChar) {
          event.preventDefault();
          setValidationError(`कृपया ${nameLabel} हिंदी में दर्ज करें।`);
          onValidation(false);
        } else {
          setValidationError('');
          onValidation(true);
        }
      }
    }
  };

  const sanitizeText = (text) => {
    const formattedText = text.trim();
    const hindiRegex = /^[\u0900-\u097F\s]+$/;
    return formattedText.split('').filter((char) => hindiRegex.test(char)).join('');
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData('text/plain');
    const sanitizedValue = sanitizeText(pastedValue);

    if (sanitizedValue.length > 0) {
      setValue(sanitizedValue); // Update internal state
      onChange(sanitizedValue); // Call the external onChange handler
      validateInput(sanitizedValue);
      onValidation(true);
    }
  };

  const validateInput = (inputValue) => {
    const regex = /^[\u0900-\u097F\s]+$/;
    if (inputValue.trim() === '') {
      setValidationError('');
      onValidation(true);
    } else if (regex.test(inputValue)) {
      setValidationError('');
      onValidation(true);
    } else {
      setValidationError(`कृपया ${nameLabel} हिंदी में दर्ज करें।`);
      onValidation(false);
    }
  };

  return (
    <>
      <div className='nameHindi'>
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={inputValue} // Bind inputValue to the input field
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          nameLabel={nameLabel}
          onPaste={handlePaste}
          ref={inputRef}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          className={ className ? className : ""}
        />
      </div>
      {validationError && <div className="error_cstm">{validationError}</div>}
    </>
  );
};

export default CustomInputText; 







