import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, isToday, startOfWeek, addWeeks } from "date-fns";
import esLocale from "date-fns/locale/es";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Semana() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [sesiones, setSesiones] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sesionesResponse, ejerciciosResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/sesiones/sesiones-con-lineas`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/v1/ejercicios`),
        ]);
        setSesiones(sesionesResponse.data.data);
        setEjercicios(ejerciciosResponse.data.data);

      } catch (error) {
        console.error("Error al obtener las sesiones: ", error);
      }
    };

    fetchData();
    
  }, []);

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Lunes
  const startOfDisplayedWeek = addWeeks(startOfCurrentWeek, currentWeek);
  const days = [];

  const formatSessionInfo = (date) => {
    const formattedDateForSearch = format(date, "yyyy-MM-dd");
    const session =
      sesiones.length > 0
        ? sesiones.find((session) => session.fecha === formattedDateForSearch)
        : null;

    return session;
  };

  // Semana actual, anterior y siguiente
  for (let i = -1; i <= 1; i++) {
    const startOfWeekDate = addWeeks(startOfDisplayedWeek, i);
    const daysOfWeek = [];

    for (let j = 0; j <= 6; j++) {
      const currentDate = addDays(startOfWeekDate, j);
      const formattedDate = format(currentDate, "dd/MM", { locale: esLocale });

      const sessionInfo = formatSessionInfo(currentDate);
      daysOfWeek.push({
        date: currentDate,
        formattedDate,
        isToday: isToday(currentDate),
        session: sessionInfo,
      });
    }
    days.push(daysOfWeek);
  }

  const goPreviousWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek - 1);
  };

  const goNextWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek + 1);
  };

  function formatKilos(kilos) {
    if (typeof kilos === 'number') {
      if (Number.isInteger(kilos)) {
        return kilos.toString();
      } else {
        // Convierte a número en caso de ser una cadena
        const kilosNum = Number(kilos);
        return Number.isInteger(kilosNum) ? kilosNum.toString() : kilosNum.toFixed(2);
      }
    } else {
      return 'Valor no válido';
    }
  }

  return (
    <div className="mt-10">
      <h1 className="w-full text-2xl text-gray-800 font-bold leading-tight text-center">
        Sesiones
      </h1>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 border border-gray-400 text-center"
          onClick={goPreviousWeek}
        >
          Semana anterior
        </button>
        <button
          className="px-4 py-2 border border-gray-400 text-center"
          onClick={goNextWeek}
        >
          Semana siguiente
        </button>
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="text-left font-medium">
            {days[1].map((day, index) => (
              <th
                key={index}
                className={`px-4 py-2 border border-gray-400 text-center align-middle ${
                  day.isToday ? "bg-blue-200" : ""
                }`}
              >
                {capitalize(format(day.date, "EEEE", { locale: esLocale }))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((weekDays, weekIndex) => (
            <tr key={weekIndex} className="text-left">
              {weekDays.map((day, index) => (
                <td
                  key={index}
                  className={`px-4 py-2 border border-gray-400 text-center align-middle ${
                    day.isToday ? "bg-blue-200" : ""
                  }`}
                >
                  <div>{day.formattedDate}</div>
                  {day.session !== null && day.session !== undefined ? (
                    <>
                      <div className="font-bold text-sm">
                        {day.session.nombre}
                      </div>
                      {day.session.lineas_sesion.length > 0 && (
                        <div>
                          {day.session.lineas_sesion.map(
                            (linea, lineaIndex) => (
                              <div className="text-left" key={lineaIndex}>
                                {ejercicios.find(ejercicio => ejercicio.id === linea.ejercicio_id)?.nombre}: {linea.series}x{linea.repeticiones}_{formatKilos(parseFloat(linea.kilos))}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>Agregar sesión</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
