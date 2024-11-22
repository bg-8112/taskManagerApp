import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks = [] }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formattedTasks = tasks.map((task) => ({
      title: task.title,
      start: new Date(task.assignedDate),
      end: new Date(task.dueDate),
      allDay: false,
    }));
    setEvents(formattedTasks);
  }, [tasks]);

  const handleSelectEvent = (event) => {
    alert(`Task: ${event.title}`);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", width: "100%" }}
        selectable
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default TaskCalendar;
