import React, { useState } from 'react';

const CustomEmailComponent = ({ id, label, placeholder, onChange, onValidation, enteredEmail, disabled, className, autoComplete}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    onChange(enteredEmail)
    setEmail(enteredEmail);
    validateEmail(enteredEmail);
  };

  const validateEmail = (enteredEmail) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
       if (enteredEmail.trim() === '') {
      setError('');
      onValidation(false);
    } else if (!emailRegex.test(enteredEmail)) {
      setError('कृपया सही ईमेल आईडी दर्ज करें।'); 
      onValidation(false); 
    } else {
      setError('');
       onValidation(true);
    }
  };

  const handleBlur = () => {
    if (email.includes('.') && email.lastIndexOf('.') - email.indexOf('.') <= 4) {
      setEmail(email.slice(0, email.lastIndexOf('.') + 4));
    }
  };

  const handleKeyDown = (event) => {
         const atIndex = email.indexOf('@');
         const dotIndex = email.lastIndexOf('.');
       
        if (atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex && email.length - dotIndex > 3 && event.key !== 'Backspace') {
         event.preventDefault();
        }
      };

  return (
    <div className='nameEmail'>
      <label htmlFor={id}>{label}</label>
      <input
        type="email"
        id={id}
       // enteredEmail={email}
        value={enteredEmail}
        placeholder={placeholder}
        className={className}
        onChange={handleEmailChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="new-password"
        disabled = {disabled}
      
      />
      {error && <p  className="error">{error}</p>} 
    </div>
  );
};

export default CustomEmailComponent;