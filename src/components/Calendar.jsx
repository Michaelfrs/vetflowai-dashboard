import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../styles/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment);
const events = [
    {
        title: "Vet Appointment",
        start: new Date(),
        end: new Date(),
        allDay: true,
    },
];

const CalendarComponent = () => {
    return (
        <div className="calendar-container">
            <h2>Appointment Calendar</h2>
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
        </div>
    );
};

export default CalendarComponent;
