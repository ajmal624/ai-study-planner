import { useEffect, useState } from "react";

import api from "../api";

export default function Exams() {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    course: "",
    title: "",
    exam_date: "",
    priority: 3,
    target_score: 80,
  });

  async function loadData() {
    const [courseResponse, examResponse] = await Promise.all([
      api.get("courses/"),
      api.get("exams/"),
    ]);

    setCourses(courseResponse.data);
    setExams(examResponse.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submit(event) {
    event.preventDefault();

    await api.post("exams/", form);

    setForm({
      course: "",
      title: "",
      exam_date: "",
      priority: 3,
      target_score: 80,
    });

    loadData();
  }

  async function removeExam(id) {
    if (!window.confirm("Delete this exam?")) return;

    await api.delete(`exams/${id}/`);
    loadData();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Exams</h1>
        <p>Add upcoming exams so the planner can prioritize revision.</p>
      </div>

      <form className="card form-grid" onSubmit={submit}>
        <h2>Add exam</h2>

        <select
          required
          value={form.course}
          onChange={(event) => setForm({ ...form, course: event.target.value })}
        >
          <option value="">Select course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          required
          placeholder="Exam title"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
        />

        <input
          required
          type="date"
          value={form.exam_date}
          onChange={(event) =>
            setForm({ ...form, exam_date: event.target.value })
          }
        />

        <select
          value={form.priority}
          onChange={(event) =>
            setForm({ ...form, priority: Number(event.target.value) })
          }
        >
          <option value="1">Priority 1 — Low</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3 — Normal</option>
          <option value="4">Priority 4</option>
          <option value="5">Priority 5 — High</option>
        </select>

        <input
          required
          type="number"
          min="0"
          max="100"
          placeholder="Target score"
          value={form.target_score}
          onChange={(event) =>
            setForm({ ...form, target_score: event.target.value })
          }
        />

        <button type="submit">Add exam</button>
      </form>

      <div className="card">
        <h2>Upcoming exams</h2>

        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Exam</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Target</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.course_name}</td>
                <td>{exam.title}</td>
                <td>{exam.exam_date}</td>
                <td>P{exam.priority}</td>
                <td>{exam.target_score}%</td>
                <td>
                  <button
                    className="danger-button"
                    onClick={() => removeExam(exam.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}