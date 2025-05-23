import React, { useState,  useRef } from 'react';
import $ from "jquery";

const CustomInputText = ({ id, className, label, placeholder, nameLabel, onChange, onValidation, disabled, inputValue, maxLength, minLength, autoComplete }) => {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState(''); 
  const inputRef = useRef(null);

 

  const handleChange = (event) => {
    const inputValue = event.target.value;
      onChange(inputValue)
    if (event.type === 'paste') {
      const pastedValue = event.clipboardData.getData('text/plain');
      const filteredValue = filterEnglishLetters(pastedValue);
  
      onChange(filteredValue);
      setValue(filteredValue);
      validateInput(filteredValue);
    } else {
      const formattedValue = inputValue.replace(/^\s*/, ''); // Remove space at the beginning
      
      onChange(inputValue);
      setValue(formattedValue);
      validateInput(formattedValue);
    }
  };
  
  const filterEnglishLetters = (text) => {
    const englishRegex = /^[A-Za-z\s]+$/; // Regular expression to match English characters before /^[a-zA-Z\s]+$/
   
    const filteredText = text.split('').filter((char) => englishRegex.test(char)).join('');
    return filteredText;
  };
  

  const handleKeyPress = (event) => {
    const keyCode = event.charCode;
    const char = String.fromCharCode(keyCode);
    const isValidChar = /^[A-Za-z\s]+$/.test(char); // Check if the entered character is valid English text.

    let getnameEng = $("#"+event.target.id).parents('.nameEnglish').siblings('.error') 
   
    let geterr_cstEng = $("#"+event.target.id).parents('.nameEnglish').siblings('.error_cstmFEng') 
       onValidation(true) //added nk11
    

     if(getnameEng.length === 0 || !isValidChar){ 
      
      if(getnameEng.length === 1) {
        geterr_cstEng.removeClass('hide')
        getnameEng.addClass('hide') 
       if (!isValidChar) {
         event.preventDefault();  //Prevent input if the character is invalid
         
        setValidationError(`कृपया ${nameLabel} अंग्रेजी  में दर्ज करें।`);
         onValidation(true) //added nk11
         
       } else {
        setValidationError('');
         onValidation(true) //added nk11
        }
     } else {
        if (!isValidChar) {
        event.preventDefault();  //Prevent input if the character is invalid
         
          setValidationError(`कृपया ${nameLabel} अंग्रेजी  में दर्ज करें।`); 
          onValidation(false) //added nk11
         
        } else {
          setValidationError('');
          onValidation(true) //added nk11
        }
      }
   }
   
  };


  const sanitizeText = (text) => {
    const formattedText = text.trim(); // Remove leading and trailing spaces
    const englishRegex = /^[A-Za-z\s]+$/; // Regular expression to match Hindi characters and spaces
  
    return formattedText.split('').filter((char) => englishRegex.test(char)).join('');
  };
  
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData('text/plain');
    const sanitizedValue = sanitizeText(pastedValue);
  
    if (sanitizedValue.length > 0) {
      onChange(sanitizedValue);
      setValue(sanitizedValue);
      validateInput(sanitizedValue);
      onValidation(true);
    }
  };



  const validateInput = (inputValue) => {
    const regex = /^[a-zA-Z\s]+$/; // Regular expression to allow only English text and spaces
    if (inputValue.trim() === '') {
      setValidationError(``);
      // onValidation(false) // added nk11
    } else if (regex.test(inputValue)) {
      setValidationError('');
      // onValidation(false) // added nk11
    } else {
      setValidationError(`कृपया ${nameLabel} अंगेजी में दर्ज करें।`); 
      // onValidation(false) // added nk11
    }
  };


  return (
    <>
      <div className='nameEnglish'>
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          nameLabel={nameLabel}
          //autoComplete="new-password"
          autoComplete="off"
          ref={inputRef}
          disabled = {disabled}
          maxLength={maxLength}
          minLength={minLength}
          className={ className ? className : ""}
        /> 
      </div>
      {validationError && <div className="error_cstmFEng">{validationError}</div>} 
    </>
  );
};

export default CustomInputText;



