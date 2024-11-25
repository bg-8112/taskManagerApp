import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks = [] }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formattedTasks = tasks.map((task) => {
      const assignedDate = moment(task.dueDate).toDate();
      const dueDate = moment(task.dueDate).toDate();
      
      return {
        title: task.title,
        start: assignedDate,
        end: dueDate,
        allDay: false,
      };
    });
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
        style={{ height: "95vh", width: "100%" }} // Adjusted height here
        selectable
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default TaskCalendar;
