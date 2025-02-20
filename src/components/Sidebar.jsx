import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <button><span>🏠</span> Dashboard</button>
            <button><span>📋</span> Patients</button>
            <button><span>📅</span> Appointments</button>
        </nav>
    );
};

export default Sidebar;
