import React, { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

function MyDatePicker({ selectedDate, onDateChange }) {
  
  const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate || new Date());

  console.log("Renderizando MyDatePicker...");

  useEffect(() => {
    setLocalSelectedDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setLocalSelectedDate(date);
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <div className="relative mt-3">
      <DatePicker
          label="Seleccione una fecha"
          value={localSelectedDate}
          onChange={handleDateChange}
          inputFormat="dd/MM/yyyy"
          slotProps={{ textField: { variant: 'outlined' } }}
        />
      </div>
    </LocalizationProvider>
  );
}

export default MyDatePicker;