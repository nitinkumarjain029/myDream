import React, { useState,  useRef } from 'react'; 
import $ from "jquery";

const CustomInputText = ({ id, label, placeholder,inputValue, nameLabel, minLength, maxLength, disabled,onBlur, onChange, onValidation, className  }) => {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState(''); 
  const inputRef = useRef(null);
  onChange(inputValue);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/^\s*/, ''); 
    //const isValid = /^[a-zA-Z0-9\s/,-]*$/.test(formattedValue);
    const isValid = /^[\u0900-\u097Fa-zA-Z0-9\s/,-]*$/.test(formattedValue); // Hindi + English

  
    if (isValid) {
      setValue(formattedValue); // Update state only if input is valid
      validateInput(formattedValue);
      onChange(formattedValue); // Pass the valid value to the onChange handler
    } 
  };
  

  const validateInput = (inputValue) => { 
    const regex = /^[a-zA-Z0-9\s\/,-]+$/; // Regular expression to allow English letters, spaces, slash, dash, or comma
    if (inputValue.trim() === '') {
      setValidationError(``);  // कृपया ${nameLabel} दर्ज करें।
    } else if (regex.test(inputValue)) {
      setValidationError('');
    } else {
      setValidationError(``); //कृपया सही ${nameLabel} दर्ज करें।
    }
  };


  const handleKeyPress = (event) => { 
    const keyCode = event.charCode;
    const char = String.fromCharCode(keyCode);
    //const isValidChar = /^[a-zA-Z0-9\s\/,-]+$/.test(char); // Check if the entered character is valid text.
    const isValidChar = /^[a-zA-Z0-9/]*$/.test(char); // Check if the entered character is valid text.

     let getnameAddress = $("#"+event.target.id).parents('.nameAddressBoth').siblings('.error');
     let geterr_cstAddress = $("#"+event.target.id).parents('.nameAddressBoth').siblings('.error_custom_Address'); 
     onValidation(true) //added nk11
     //console.log("getnameAddress", getnameAddress, event.target.id) 

     if(getnameAddress.length === 0 || !isValidChar){
      if(getnameAddress.length === 1) {
         geterr_cstAddress.removeClass('hide')
         getnameAddress.addClass('hide') 
       if (!isValidChar) {
         event.preventDefault();  //Prevent input if the character is invalid 
         
         setValidationError(`कृपया ${nameLabel} दर्ज करें।`);
         onValidation(false) //added nk11
         
       } else {
         setValidationError('');
         onValidation(true) //added nk11 
        }
      }
     } else {
        if (!isValidChar) {
           event.preventDefault();  //Prevent input if the character is invalid
         
          setValidationError(`कृपया ${nameLabel} दर्ज करें।`);
          onValidation(false) //added nk11
         
        } else {
          setValidationError('');
          onValidation(true) //added nk11
        }
      }
   }
   

  return (
    <>
    <div className='nameAddressBoth'>
      <label htmlFor={id}>{label}</label> 
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
       onKeyPress={handleKeyPress}
     
        className={className} 
        nameLabel={nameLabel}
        ref={inputRef}
        onBlur={onBlur}
        minLength = {minLength}
        maxLength ={maxLength}
        disabled = {disabled}
        autoComplete="off"  
    />
        
    </div>
    {validationError && <div className="error_custom_Address">{validationError}</div>}
    </>
  );
};

export default CustomInputText; 







