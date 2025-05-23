import React, { useState } from 'react'; 

const CustomDatePicker = ({type, id, dataRangeStart, selectedDateOne, dataRangeEnd, label, placeholder, onChange, disabled, value, onValidation, maxLength }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');


  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'yyyy-mm-dd' format 
  
  const handleDateChange = (event) => {
    const selectedDateOne = event.target.value;
    const selectedDate = event.target.value;
    onChange(selectedDate)
    // Check if the selected date matches the desired format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(selectedDate)) {
      setError('अमान्य तिथि प्रारूप। कृपया YYYY-MM-DD प्रारूप का उपयोग करें।');
  
      return;
    }

    // Perform validation to check if the selected date is within the data range
    if (selectedDate >= dataRangeStart && selectedDate <= dataRangeEnd) {
      setSelectedDate(selectedDate);
      setError('');
      onValidation(true)
    } else {
      setError('चयनित तिथि मान्य सीमा से बाहर है.');
      onValidation(false)
      
    }

    if (selectedDate > currentDate) {
      // Show error message if selected date is after the present date
      setError('कृपया सही जन्म तिथि दर्ज करे');
      onValidation(false)
      onChange(''); // Clear the selected date value
    } else {
      onChange(selectedDate);
      onValidation(true)
    }
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
         type={type}
         id={id}
        //  min={dataRangeStart}
        //  max={currentDate} // Set the max attribute to the current date
        min={dataRangeStart}
        max={dataRangeEnd}
        value={selectedDateOne}
        placeholder={placeholder}
        onChange={handleDateChange}
        disabled={disabled}
        //autoComplete="new-password"
        autoComplete="off"
        className='form-control'
        maxLength = {maxLength}
      />
         {value > dataRangeEnd && (
        <div className="error">{placeholder} आवश्यक है।</div>  // editied by sonali (added placeholder instead of static text)
      )}
    </div>
  );
};

export default CustomDatePicker; 


















