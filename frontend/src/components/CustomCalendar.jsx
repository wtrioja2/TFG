import React, {useState} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
export default function CustomCalendar() {
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    variant="static"
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}