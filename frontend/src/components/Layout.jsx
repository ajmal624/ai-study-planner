import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>StudyFlow</h1>
        <p>Plan smarter. Study better.</p>

        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/exams">Exams</NavLink>
          <NavLink to="/availability">Availability</NavLink>
          <NavLink to="/planner">AI Revision Plan</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>
        </nav>

        <button className="logout-button" onClick={logout}>
          Log out
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}