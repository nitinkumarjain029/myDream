import React from 'react';

const RadioButtonGroup = ({ id, label, options, selectedValue, onChange, name, disabled }) => {
  const handleRadioChange = (event) => {
    const { value } = event.target;
    onChange(value); // Pass the selected value back to the parent
  };

  return (
    <div className="radio-group d-flex align-items-center">
      {/* <h6 htmlFor={id}>{label}</h6> */}
      {options.map((option) => (
        <span key={option.id} className="d-flex align-items-center">
          <input
            type="radio"
            id={option.id} // Unique ID for each radio button
            value={option.value} // The value to be sent onChange
            checked={selectedValue === option.value} // Compare the selected value
            onChange={handleRadioChange} // Trigger change
            name={name || id} // Name attribute
            disabled={disabled}
          />
          <label className="radio-inline ms-1" htmlFor={option.id}>
            {option.label}
          </label>
        </span>
      ))}
    </div>
  );
};

export default RadioButtonGroup; 






