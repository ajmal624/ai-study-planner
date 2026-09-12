<<<<<<< HEAD
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Availability from "./pages/Availability";
import Calendar from "./pages/Calendar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Exams from "./pages/Exams";
import Login from "./pages/Login";
import Planner from "./pages/Planner";

function ProtectedRoute({ children }) {
  return localStorage.getItem("access_token")
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<Exams />} />
        <Route path="availability" element={<Availability />} />
        <Route path="planner" element={<Planner />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  );
=======
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Availability from "./pages/Availability";
import Calendar from "./pages/Calendar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Exams from "./pages/Exams";
import Login from "./pages/Login";
import Planner from "./pages/Planner";

function ProtectedRoute({ children }) {
  return localStorage.getItem("access_token")
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<Exams />} />
        <Route path="availability" element={<Availability />} />
        <Route path="planner" element={<Planner />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  );
>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
}