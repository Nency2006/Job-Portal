import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function AdminNavbar() {
  return (
    <header className="admin-navbar">
      <div className="navbar-logo">Admin Panel</div>

      <nav className="navbar-links">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
        <NavLink to="/admin/users" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Users</NavLink>
        <NavLink to="/admin/jobs" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Jobs</NavLink>
        <NavLink to="/admin/companies" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Companies</NavLink>
        <NavLink to="/admin/applications" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Applications</NavLink>
        <NavLink to="/logout" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Logout</NavLink>
      </nav>
    </header>
  );
}

export default AdminNavbar;