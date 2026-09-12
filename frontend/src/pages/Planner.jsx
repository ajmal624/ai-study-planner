import { useEffect, useState } from "react";

import api from "../api";

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [days, setDays] = useState(14);
  const [message, setMessage] = useState("");

  async function loadTasks() {
    const response = await api.get("tasks/");
    setTasks(response.data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function generatePlan() {
    setMessage("");

    try {
      const response = await api.post("tasks/generate-plan/", { days });
      setTasks(response.data);
      setMessage(`${response.data.length} study sessions created.`);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Could not generate the plan. Add a course and a future exam first."
      );
    }
  }

  async function toggleTask(task) {
    await api.patch(`tasks/${task.id}/`, {
      status: task.status === "completed" ? "pending" : "completed",
    });

    loadTasks();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>AI revision plan</h1>
        <p>
          The planner prioritizes near exams, high-priority courses, and topics
          with lower completion progress.
        </p>
      </div>

      <div className="card planner-controls">
        <label>
          Plan duration
          <select
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="21">21 days</option>
            <option value="30">30 days</option>
          </select>
        </label>

        <button onClick={generatePlan}>Generate revision plan</button>
      </div>

      {message && <p className="message success">{message}</p>}

      <div className="card">
        <h2>Study sessions</h2>

        {tasks.length === 0 ? (
          <p>No study sessions yet. Generate your first revision plan.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-item large-task" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => toggleTask(task)}
                />

                <span
                  className="color-dot"
                  style={{ backgroundColor: task.course_color }}
                />

                <div>
                  <strong>{task.title}</strong>
                  <p>
                    {task.date} · {task.course_name} ·{" "}
                    {task.duration_minutes} minutes
                  </p>

                  {task.notes && <small>{task.notes}</small>}
                </div>

                {task.generated_by_ai && (
                  <span className="ai-badge">AI plan</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}