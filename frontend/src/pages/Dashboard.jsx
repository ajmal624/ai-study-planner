import { useEffect, useState } from "react";

import api from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("dashboard/").then((response) => {
      setData(response.data);

      if (
        "Notification" in window &&
        Notification.permission === "default" &&
        response.data.today_tasks.length > 0
      ) {
        Notification.requestPermission();
      }

      if (
        "Notification" in window &&
        Notification.permission === "granted" &&
        response.data.today_tasks.length > 0
      ) {
        new Notification("StudyFlow reminder", {
          body: `You have ${response.data.today_tasks.length} study session(s) planned today.`,
        });
      }
    });
  }, []);

  if (!data) {
    return <p>Loading your study dashboard...</p>;
  }

  const progress = data.total_tasks
    ? Math.round((data.completed_tasks / data.total_tasks) * 100)
    : 0;

  return (
    <section>
      <div className="page-heading">
        <h1>Welcome to StudyFlow</h1>
        <p>Your personal study plan for today.</p>
      </div>

      <div className="stats-grid">
        <article className="stat-card purple">
          <span>Courses</span>
          <strong>{data.course_count}</strong>
        </article>

        <article className="stat-card green">
          <span>Study completed</span>
          <strong>{data.completed_minutes} min</strong>
        </article>

        <article className="stat-card orange">
          <span>Task progress</span>
          <strong>{progress}%</strong>
        </article>
      </div>

      <div className="two-column">
        <article className="card">
          <h2>Today’s study sessions</h2>

          {data.today_tasks.length === 0 ? (
            <p>No tasks for today. Generate an AI revision plan.</p>
          ) : (
            <div className="task-list">
              {data.today_tasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <span
                    className="color-dot"
                    style={{ backgroundColor: task.course_color }}
                  />

                  <div>
                    <strong>{task.title}</strong>
                    <p>
                      {task.course_name} · {task.duration_minutes} minutes
                    </p>
                  </div>

                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="card">
          <h2>Upcoming exams</h2>

          {data.upcoming_exams.length === 0 ? (
            <p>No future exams added.</p>
          ) : (
            <div className="task-list">
              {data.upcoming_exams.map((exam) => (
                <div className="task-item" key={exam.id}>
                  <span
                    className="color-dot"
                    style={{ backgroundColor: exam.course_color }}
                  />

                  <div>
                    <strong>{exam.title}</strong>
                    <p>
                      {exam.course_name} · {exam.exam_date}
                    </p>
                  </div>

                  <span className="priority">P{exam.priority}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}