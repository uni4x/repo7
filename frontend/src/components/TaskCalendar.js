import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TaskCalendar({ tasks }) {
    const taskDates = tasks.map(task => new Date(task.deadline));

    return (
        <div>
            <h2>Task Deadlines</h2>
            <Calendar
                tileContent={({ date, view }) =>
                    view === 'month' && taskDates.find(d => d.toDateString() === date.toDateString()) ? (
                        <p style={{ backgroundColor: 'orange', color: 'white' }}>Task Due</p>
                    ) : null
                }
            />
        </div>
    );
}

export default TaskCalendar;