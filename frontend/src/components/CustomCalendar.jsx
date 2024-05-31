import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Paper, Grid } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import esLocale from "date-fns/locale/es";
import EventIcon from "@material-ui/icons/Event";

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#ebac0f" },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "#1b5e20",
      },
    },
    MuiPickersBasePicker: {
      container: {
        maxWidth: "400px",
      },
      pickerView: {
        minWidth: "400px",
        minHeight: "450px",
      },
    },
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        maxHeight: "750px",
      },
    },
  },
});

export const styles = makeStyles(() => ({
  notInThisMonthDayPaper: {
    width: "45px",
    height: "45px",
    backgroundColor: "#eeeeee",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
  },
  normalDayPaper: {
    width: "45px",
    height: "45px",
    backgroundColor: "#F2DFAE",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
  },
  selectedDayPaper: {
    width: "45px",
    height: "45px",
    backgroundColor: "#F6B203",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: "2px",
    padding: "1px",
    cursor: "pointer",
  },
}));

export default function CustomCalendar({
  sesionesData,
  fetchLineasSesion,
  fetchEjercicios,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sesionesFechaSeleccionada, setSesionesFechaSeleccionada] = useState(
    []
  );
  const [ejercicios, setEjercicios] = useState([]);

  const classes = styles();
  const today = new Date();
  const sesionDays =
    sesionesData && Array.isArray(sesionesData)
      ? sesionesData.map((sesion) => formatDate(new Date(sesion.fecha)))
      : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener ejercicios para todas las sesiones
        const ejerciciosPromises = sesionesFechaSeleccionada.map(
          async (sesion) => {
            const ejercicio = await fetchEjercicios(sesion.ejercicio_id);
            return ejercicio;
          }
        );
        // Esperar que todas las promesas se resuelvan
        const ejerciciosData = await Promise.all(ejerciciosPromises);
        setEjercicios(ejerciciosData);
      } catch (error) {
        console.error("Error al cargar los ejercicios:", error);
      }
    };
    fetchData();
  }, [sesionesFechaSeleccionada, fetchEjercicios]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  const handleDateChange = async (date) => {
    const sesiones = await fetchLineasSesion(date);
    setSesionesFechaSeleccionada(sesiones);
    setSelectedDate(date);
  };

  const getDayElement = (day, selectedDate, isInCurrentMonth) => {
    const isSelected = day.getTime() === selectedDate.getTime();
    const isToday =
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();
    const formattedDayFrontend = `${day
      .getDate()
      .toString()
      .padStart(2, "0")}-${(day.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.getFullYear()}`;
    const isSesion = sesionDays.includes(formattedDayFrontend);
    let dateTile;

    if (isInCurrentMonth) {
      if (isSesion) {
        dateTile = (
          <Paper className={classes.selectedDayPaper}>
            <Grid item>{day.getDate()}</Grid>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ margin: "-4px" }}>
                <EventIcon fontSize="small" />
              </Grid>
            </Grid>
          </Paper>
        );
      } else {
        dateTile = (
          <Paper
            className={
              isSelected
                ? classes.selectedDayPaper
                : isToday
                ? classes.todayPaper
                : classes.normalDayPaper
            }
          >
            <Grid item>{day.getDate()}</Grid>
          </Paper>
        );
      }
    } else {
      dateTile = (
        <Paper className={classes.notInThisMonthDayPaper}>
          <Grid item>{day.getDate()}</Grid>
        </Paper>
      );
    }

    return dateTile;
  };

  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            variant="static"
            renderDay={(day, selectedDate, isInCurrentMonth) =>
              getDayElement(day, selectedDate, isInCurrentMonth)
            }
            format="dd-MM-yyyy"
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>


      <div style={{ marginTop: "-11px" }}>
        <div className="grid grid-cols-3 gap-4">
          {sesionesFechaSeleccionada.map((sesion) => (
            <div key={sesion.id} className="sessionCard">
              {ejercicios.find(
                (ejercicio) => ejercicio.id === sesion.ejercicio_id
              ) && (
                <div className="exerciseInfo">
                  <img
                    className="exerciseImage"
                    src={
                      ejercicios.find(
                        (ejercicio) => ejercicio.id === sesion.ejercicio_id
                      ).url_foto
                    }
                    alt={
                      ejercicios.find(
                        (ejercicio) => ejercicio.id === sesion.ejercicio_id
                      ).nombre
                    }
                  />
                  <p>
                    {
                      ejercicios.find(
                        (ejercicio) => ejercicio.id === sesion.ejercicio_id
                      ).nombre
                    }
                  </p>
                  <p>
                    {sesion.series}x{sesion.repeticiones}_{sesion.kilos} Kg
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
