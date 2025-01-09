import React, { useState } from "react";
import './Positive_input.css';
function PositiveInput() {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false); // Initial error state is false

  const handleChange = (event) => {
    const newValue = event.target.value;
    const isPositiveNumber = /^\d+(\.\d+)?$/.test(newValue) || newValue === ''; // Allow empty input

    if (isPositiveNumber) {
      setValue(newValue);
      setHasError(false); // Clear error on valid input
    } else {
      setHasError(true);
    }
  };

  const handleBlur = () => {
    if (value === '') {
      setHasError(true); // Error for empty input
    } else if (parseFloat(value) <= 0) {
      setHasError(true); // Error for non-positive number
    }
  };

  // Assuming errorMessage is defined elsewhere (improve error message clarity)
  const errorMessage = 'Please enter a positive number.';

  return (
    <div className="numb">
      <input type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        min="0"
        className={hasError ? 'error-input' : ''}
      />
      {hasError && <div className="error-msg">{errorMessage}</div>}
      
    </div>
  );
}

export default PositiveInput;
