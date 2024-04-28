import React, {useState} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {Paper, Grid} from "@material-ui/core";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {makeStyles} from "@material-ui/core/styles";
import esLocale from 'date-fns/locale/es';

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {backgroundColor: "#8bc34a",},
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "#1b5e20",
        },},},});

export const styles = makeStyles(() => ({ //define CSS for different date types
    notInThisMonthDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#eeeeee",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
    },
    normalDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#e8f5e9",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
    },
    selectedDayPaper: {
        width: "31px",
        height: "31px",
        backgroundColor: "#f9fbe7",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "lime",
        padding: "1px",
        cursor: "pointer",
    },
    todayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "lightGreen",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
        color: " white",
    },}));
export default function CustomCalendar() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes = styles(); // import those CSS
    const today = new Date(); // just Date object of today
    const sesionDays = [1, 6, 10, 24, 15] // array of sunny days 1st,6th etc
    
    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
        const isSesion = sesionDays.includes(day.getDate());
        const isSelected = day.getDate() === selectedDate.getDate();
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
    
        let dateTile;
        if (isInCurrentMonth) {
            if(isSesion){
                dateTile = (
                    <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
                        <Grid item>
                            <img src="/mancuerna.jpg" alt="Mancuerna" style={{ width: '24px', height: '24px' }} />
                        </Grid>
                        <Grid item>{day.getDate()}</Grid>
                    </Paper>
                );
            } else {
                dateTile = (
                    <Paper className={classes.notInThisMonthDayPaper}>
                        <Grid item>{day.getDate()}</Grid>
                    </Paper>)

            }
            
            
        } else {
            dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
                <Grid item><br/></Grid>
                <Grid item style={{color: "lightGrey"}}>
                    {day.getDate()}
                </Grid>
            </Paper>)
        }
        return dateTile;
    }
    return (
        <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            variant="static"
            renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) =>
              getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)
            }
            format="dd-MM-yyyy" // Establece el formato de fecha
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </div>
    );}