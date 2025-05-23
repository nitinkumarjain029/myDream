import React, { useState } from 'react';

const CustomTextAreaInput = ({id, label, inputForArea, onChange, placeholder, disabled, rows,minLength,maxLength, className }) => {
  const [textAreaInput, setTextAreaInput] = useState("");

  const handleAreaInput = (e)=>{
   const inputForArea = e.target.value;
   setTextAreaInput(inputForArea)
   onChange(inputForArea);

  }
  return (
    <div>
      <label htmlFor={id}>{label}</label> 
      <textarea
        id = {id}
        className= {className} 
        //label={label}
        value={inputForArea}
        onChange={handleAreaInput}
        rows={rows}
        placeholder={placeholder}
        disabled = {disabled}
        minLength={minLength}
        maxLength={maxLength}

        autoComplete="new-password"
      />
    </div>
  );
};

export default CustomTextAreaInput; 
