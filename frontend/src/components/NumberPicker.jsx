import React, { } from "react";

const NumberPicker = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="number-picker">
      <button onClick={handleDecrease}>-</button>
      <span> {value} </span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default NumberPicker;