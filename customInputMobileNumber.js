import React, { useState } from 'react';
import $ from "jquery";

const CustomMobileNumberInput = ({labelName, label, placeholder, id, onChange, value, disabled, pattern, maxLength,minLength, onValidation, type, onKeyDown, onBlur, className}) => {
  const [mobileNumber, setMobileNumber] = useState(''); 
  const [error, setError] = useState('');
  

  
 const handleMobileNumberChange = (event) => {
    const enteredNumber = event.target.value;

    let getnameMobileNumber = $("#"+event.target.id).parents('.nameMobileNumber').siblings('.error')   // tuesday 13
    let getErr_cstMobileNumber = $("#"+event.target.id).parents('.nameMobileNumber').siblings('.error_cstm')  // tuesday 13
    onValidation(true) //added nk11

    if (getnameMobileNumber.length === 0){
    
      if(getnameMobileNumber.length === 1){
        getErr_cstMobileNumber.removeClass('hide')
        getnameMobileNumber.addClass('hide') 

    if (!/^\d*$/.test(enteredNumber)) {
      setError(`कृपया अंक दर्ज करें`); //कृपया अंक दर्ज करें.
      onValidation(false) // added nk
      
    } else if (enteredNumber.length > maxLength) {
      setError('');
      onValidation(false) // added nk
    } else if (enteredNumber.length < maxLength && enteredNumber.length > 0) { 
      setMobileNumber(enteredNumber);
      setError("");  
      onValidation(false) // added nk 
    } else {
      setMobileNumber(enteredNumber);
      setError('');
      onValidation(false) // added nk  
    }
      } else { 

        if (!/^\d*$/.test(enteredNumber)) {
          setError(`कृपया अंक दर्ज करें`);  //कृपया अंक दर्ज करें. 
          onValidation(false) // added nk
          
        } else if (enteredNumber.length > maxLength) {
          setError('');
          onValidation(false) // added nk
        } else if (enteredNumber.length < maxLength && enteredNumber.length > 0) { 
          setMobileNumber(enteredNumber);
          setError(``);  //कृपया ${maxLength} अंक का ${labelName} दर्ज करें
        
          onValidation(false) // added nk 
        } else {
          setMobileNumber(enteredNumber);
          setError('');
          onValidation(false) // added nk  
        }
      }                                         
    }
  };


  return (
    <div className='nameMobileNumber'>
      <label htmlFor={id}>{label}</label>  
      <input
        type={type}
        pattern={pattern}
        label = {label}
        labelName = {labelName}
        id={id}
        className={className}
        placeholder={placeholder}
        defaultValue={mobileNumber}
        value={value}
        onInput ={handleMobileNumberChange}
        onChange={onChange}
        onBlur={onBlur}
        maxLength = {maxLength}
        minLength = {minLength}
        disabled = {disabled}
        onKeyDown={onKeyDown}
        autoComplete="new-password"
      
      />
      {error && <div className="error_cstm">{error}</div>} 
    </div>
  );
};

export default CustomMobileNumberInput;
















