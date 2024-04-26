import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

function MyDatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log("Renderizando MyDatePicker...");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <div className="relative">
      <DatePicker
          label="Seleccione una fecha"
          value={selectedDate}
          onChange={handleDateChange}
          inputFormat="dd/MM/yyyy"
          slotProps={{ textField: { variant: 'outlined' } }}
        />
      </div>
    </LocalizationProvider>
  );
}

export default MyDatePicker;