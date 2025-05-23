

import React, { useState } from 'react';

const CustomSelect = ({ label, id, placeholder, options = [], disabled, onChange, inputValue, namefield, valueProp, labelProp, name, onChangeCapture,className }) => {
  // Initialize local state for the select value
  const [selectValue, setSelectValue] = useState(""); 

  // Handle change events for the select dropdown
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSelectValue(inputValue); // Update local state
    onChange(inputValue); // Trigger the parent component's onChange handler
  };

  return (
    <>
      {label !== "null" && <label htmlFor={id}>{label}</label>}  
      <select
        id={id}
        placeholder={placeholder}
        className= "form-control"
        onChange={handleChange}
        disabled={disabled}
        value={inputValue || selectValue}
        namefield={namefield}
        name={name}
        onChangeCapture={onChangeCapture}
      >
        <option key="0" value="0">
          {placeholder}
        </option>

        {/* Safely map through options, ensuring it is an array */} 
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option[valueProp]} value={option[valueProp]}>
              {option[labelProp]}
            </option>
          ))}
      </select>
    </>
  );
};

export default CustomSelect;



