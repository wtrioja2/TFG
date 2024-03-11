import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function MyDatePicker(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    //const datepickerRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        //console.log('Nueva fecha seleccionada:', date);
    
        const formattedDate = format(date, 'yyyy-MM-dd');
        //console.log('Nueva fecha formateada:', formattedDate);
      };

    return(
        <div className="relative">
            {/* <FontAwesomeIcon 
                icon={faCalendar} 
                size="lg" 
                onClick={() => datepickerRef.current.setOpen(true)}
                style={{cursor: 'pointer'}}
                /> */}
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="form-control pl-10 pr-3"
                //ref={datepickerRef}
            />               
        </div>
    );
}
export default MyDatePicker;
/* 
() => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  };
  
() => {
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    return (
      <>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </>
    );
  };

() => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
    return (
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    );
  }; */