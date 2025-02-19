import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([
        {
            title: "Vet Appointment",
            start: new Date(),
            end: new Date(moment().add(1, "hour").toDate()),
        },
    ]);

    // Handle selecting a date on the calendar
    const handleSelectSlot = ({ start, end }) => {
        const title = prompt("Enter Appointment Title:");
        if (title) {
            setEvents([...events, { title, start, end }]);
        }
    };

    return (
        <div className="h-screen p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Appointment Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ height: 500 }}
                className="border border-gray-300 rounded-lg p-2"
            />
        </div>
    );
};

export default CalendarComponent;