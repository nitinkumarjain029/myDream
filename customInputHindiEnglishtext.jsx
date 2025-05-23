import React, { useState, useRef } from 'react';
import $ from "jquery";

const CustomInputTextHindiEnglish = ({ id, label, placeholder, inputValue, onChange , nameLabel, disabled, onValidation, required, maxLength, autoComplete, className  }) => {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef(null);


  const handleChange = (event) => {
    const inputValue = event.target.value;
   
    const formattedValue = inputValue.replace(/^\s*/, ''); // Remove space at the beginning
    setValue(formattedValue);
    validateInput(formattedValue); 
    onChange(formattedValue)
  };


  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    const char = String.fromCharCode(charCode);
    const isValidChar = /^[a-zA-Z\s\u0900-\u097F]+$/.test(char); // Allow English and Hindi characters

    let getnameEng1 = $("#"+event.target.id).parents('.nameEnglish1').siblings('.error'); 
   
    let geterr_cstEng1 = $("#"+event.target.id).parents('.nameEnglish1').siblings('.error_cstmFEng1'); 
       onValidation(true) //added nk11
     if(getnameEng1.length === 0 || !isValidChar){ 
      
      if(getnameEng1.length === 1) {
        geterr_cstEng1.removeClass('hide')
        getnameEng1.addClass('hide') 
       if (!isValidChar) {
         event.preventDefault();  //Prevent input if the character is invalid 
         
        setValidationError(`कृपया ${nameLabel} अंग्रेजी में दर्ज करें।`);
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
  

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData('text/plain');
    setValue(pastedValue);
    validateInput(pastedValue);
  };

  const validateInput = (inputValue) => {
    if (inputValue.trim() === '') {
      setValidationError(``);           //कृपया ${nameLabel} दर्ज करें। 
      onValidation(false) // added nk
    } else {
      setValidationError('');
    }
  };



  return (
    <>
    <div className='nameEnglish1'>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={inputValue}
        className={className}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onPaste={handlePaste}
        nameLabel={nameLabel}
        ref={inputRef}
        disabled = {disabled}
        autoComplete={autoComplete}
        required = {required}
        maxLength={maxLength}
      />
     
    </div>
    {validationError && <div className="error_cstmFEng1">{validationError}</div>} 
    </>
  );
};

export default CustomInputTextHindiEnglish;
