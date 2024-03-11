import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function MyDateRange() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
   
    const datepickerRef = useRef(null);

    const onChange = (dates) => {
        const [start, end]  = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return(
        <div className="relative">
            <FontAwesomeIcon 
                icon={faCalendar} 
                size="lg" 
                onClick={() => datepickerRef.current.setOpen(true)}
                style={{cursor: 'pointer'}}
                />
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                ref={datepickerRef}
            />      
        </div>
    );
    
}
export default MyDateRange;