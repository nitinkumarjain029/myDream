import React, { useState, useRef } from 'react';

const AadharInput = ({onChange, onValidation, label, id, autoComplete}) => { 
  const [aadharNumber, setAadharNumber] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters  
    const formattedNumber = numericValue.substr(0, 12);

    setAadharNumber(formattedNumber);
    validateAadharNumber(formattedNumber);
    onChange(value);
  };

  const handleKeyDown = (event) => { 
    if (event.key === 'Backspace' && aadharNumber.endsWith('-')) { 
      event.preventDefault();
      const trimmedNumber = aadharNumber.slice(0, -1);
      setAadharNumber(trimmedNumber);
      validateAadharNumber(trimmedNumber);
      setError("")
    }
  };

  

  const validateAadharNumber = (number) => {
    if (number.length === 0) {
      setError('');
      onValidation(false);
    } else if (number.length !== 12) {
      setError('कृपया 12 अंक का आधार नंबर दर्ज करें।');          //कृपया 12 अंक का आधार नंबर दर्ज करें।
      onValidation(false);
    } else if (!/^\d+$/.test(number)) {
      setError('');
      onValidation(false);
    } else {
      setError('');
      onValidation(true);
    }
  };
  

  return (
    <>
      <label htmlFor="aadhar">आधार नंबर <span className="red"></span></label> 
      
      <input
        label= {label}
        ref={inputRef}
        type="password"
        id={id}
        value={aadharNumber}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="xxxx-xxxx-xxxx"
        autoComplete= {autoComplete}
      />
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default AadharInput; 





