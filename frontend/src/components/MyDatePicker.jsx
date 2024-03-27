import React, { useState } from "react";
import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative">
      <DatePicker
        label="Seleccione una fecha"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        adapter={AdapterDateFns}
      />
    </div>
  );
}

export default MyDatePicker;