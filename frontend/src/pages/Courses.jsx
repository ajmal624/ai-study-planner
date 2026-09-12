<<<<<<< HEAD
import { useEffect, useState } from "react";

import api from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    color: "#6366f1",
    total_topics: 10,
    completed_topics: 0,
  });

  async function loadCourses() {
    const response = await api.get("courses/");
    setCourses(response.data);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  async function submit(event) {
    event.preventDefault();
    await api.post("courses/", form);

    setForm({
      name: "",
      code: "",
      color: "#6366f1",
      total_topics: 10,
      completed_topics: 0,
    });

    loadCourses();
  }

  async function updateProgress(course) {
    const completed = window.prompt(
      `Completed topics for ${course.name}:`,
      course.completed_topics
    );

    if (completed === null) return;

    await api.patch(`courses/${course.id}/`, {
      completed_topics: Number(completed),
    });

    loadCourses();
  }

  async function removeCourse(id) {
    if (!window.confirm("Delete this course and its related data?")) return;

    await api.delete(`courses/${id}/`);
    loadCourses();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Courses</h1>
        <p>Add subjects and monitor progress.</p>
      </div>

      <form className="card form-grid" onSubmit={submit}>
        <h2>Add course</h2>

        <input
          required
          placeholder="Course name, e.g. Mathematics"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />

        <input
          placeholder="Course code, e.g. MATH101"
          value={form.code}
          onChange={(event) => setForm({ ...form, code: event.target.value })}
        />

        <input
          type="number"
          required
          min="1"
          placeholder="Total topics"
          value={form.total_topics}
          onChange={(event) =>
            setForm({ ...form, total_topics: event.target.value })
          }
        />

        <input
          type="color"
          title="Course color"
          value={form.color}
          onChange={(event) => setForm({ ...form, color: event.target.value })}
        />

        <button type="submit">Add course</button>
      </form>

      <div className="course-grid">
        {courses.map((course) => (
          <article className="card course-card" key={course.id}>
            <div className="row-between">
              <div>
                <h2>{course.name}</h2>
                <p>{course.code || "No course code"}</p>
              </div>

              <span
                className="course-badge"
                style={{ backgroundColor: course.color }}
              />
            </div>

            <p>
              {course.completed_topics} of {course.total_topics} topics complete
            </p>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{
                  width: `${course.progress}%`,
                  backgroundColor: course.color,
                }}
              />
            </div>

            <strong>{course.progress}% complete</strong>

            <div className="button-row">
              <button onClick={() => updateProgress(course)}>
                Update progress
              </button>

              <button
                className="danger-button"
                onClick={() => removeCourse(course.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
=======
import { useEffect, useState } from "react";

import api from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    color: "#6366f1",
    total_topics: 10,
    completed_topics: 0,
  });

  async function loadCourses() {
    const response = await api.get("courses/");
    setCourses(response.data);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  async function submit(event) {
    event.preventDefault();
    await api.post("courses/", form);

    setForm({
      name: "",
      code: "",
      color: "#6366f1",
      total_topics: 10,
      completed_topics: 0,
    });

    loadCourses();
  }

  async function updateProgress(course) {
    const completed = window.prompt(
      `Completed topics for ${course.name}:`,
      course.completed_topics
    );

    if (completed === null) return;

    await api.patch(`courses/${course.id}/`, {
      completed_topics: Number(completed),
    });

    loadCourses();
  }

  async function removeCourse(id) {
    if (!window.confirm("Delete this course and its related data?")) return;

    await api.delete(`courses/${id}/`);
    loadCourses();
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Courses</h1>
        <p>Add subjects and monitor progress.</p>
      </div>

      <form className="card form-grid" onSubmit={submit}>
        <h2>Add course</h2>

        <input
          required
          placeholder="Course name, e.g. Mathematics"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />

        <input
          placeholder="Course code, e.g. MATH101"
          value={form.code}
          onChange={(event) => setForm({ ...form, code: event.target.value })}
        />

        <input
          type="number"
          required
          min="1"
          placeholder="Total topics"
          value={form.total_topics}
          onChange={(event) =>
            setForm({ ...form, total_topics: event.target.value })
          }
        />

        <input
          type="color"
          title="Course color"
          value={form.color}
          onChange={(event) => setForm({ ...form, color: event.target.value })}
        />

        <button type="submit">Add course</button>
      </form>

      <div className="course-grid">
        {courses.map((course) => (
          <article className="card course-card" key={course.id}>
            <div className="row-between">
              <div>
                <h2>{course.name}</h2>
                <p>{course.code || "No course code"}</p>
              </div>

              <span
                className="course-badge"
                style={{ backgroundColor: course.color }}
              />
            </div>

            <p>
              {course.completed_topics} of {course.total_topics} topics complete
            </p>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{
                  width: `${course.progress}%`,
                  backgroundColor: course.color,
                }}
              />
            </div>

            <strong>{course.progress}% complete</strong>

            <div className="button-row">
              <button onClick={() => updateProgress(course)}>
                Update progress
              </button>

              <button
                className="danger-button"
                onClick={() => removeCourse(course.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
}