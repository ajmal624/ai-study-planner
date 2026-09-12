import { useEffect, useState } from "react";

import api from "../api";

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function Calendar() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const first = new Date(year, month, 1).toISOString().slice(0, 10);
    const last = new Date(year, month + 1, 0).toISOString().slice(0, 10);

    api.get(`tasks/?start=${first}&end=${last}`).then((response) => {
      setTasks(response.data);
    });
  }, [month, year]);

  const days = getMonthDays(year, month);

  const monthName = new Date(year, month).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <section>
      <div className="page-heading row-between">
        <div>
          <h1>Calendar</h1>
          <p>View all scheduled revision sessions.</p>
        </div>

        <div className="button-row">
          <button onClick={previousMonth}>←</button>
          <strong>{monthName}</strong>
          <button onClick={nextMonth}>→</button>
        </div>
      </div>

      <div className="calendar">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="calendar-heading" key={day}>
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return (
              <div
                className="calendar-day empty"
                key={`empty-${index}`}
              />
            );
          }

          const key = dateKey(day);
          const dayTasks = tasks.filter((task) => task.date === key);

          return (
            <div className="calendar-day" key={key}>
              <strong>{day.getDate()}</strong>

              {dayTasks.map((task) => (
                <div
                  className={`calendar-task ${task.status}`}
                  key={task.id}
                  style={{ borderLeftColor: task.course_color }}
                >
                  {task.course_name}: {task.duration_minutes}m
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}