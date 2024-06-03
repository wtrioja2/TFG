import React, { useState } from "react";

const roundToTwoDecimals = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const Counter = ({ value, onIncrement, onDecrement, onUpdate, isKilos }) => {
  const [editing, setEditing] = useState(false);
  const [displayValue, setDisplayValue] = useState(value.toString());

  const handleInputChange = (e) => {
    setDisplayValue(e.target.value);
  };

  const handleInputBlur = () => {
    let newValue = parseFloat(displayValue);

    // Si es para kilos, redondea a 2 decimales
    if (isKilos) {
      roundToTwoDecimals(newValue);
    } else {
      newValue = parseInt(newValue);
    }

    if (!isNaN(newValue)) {
      onUpdate(newValue);
    } else {
      setDisplayValue(value.toString());
    }
    setEditing(false);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-l hover:bg-blue-600"
        onClick={onDecrement}
      >
        -
      </button>
      {editing ? (
        <input
          className="px-2 py-1 border border-gray-400 text-center w-16"
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
        />
      ) : (
        <span
          className="px-2 py-1 border border-gray-400 text-center w-16"
          onClick={() => setEditing(true)}
        >
          {value}
        </span>
      )}
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Counter;