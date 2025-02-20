import React from "react";
import Sidebar from "./components/Sidebar";
import CalendarComponent from "./components/Calendar";
import "./styles/App.css";


function App() {
    return (
        <div className="app-container"> {/* Apply flex layout */}
            <Sidebar />
            <main className="main-content">
                <h1>VetFlowAI Dashboard</h1>
                <p>This is where your main app content will go.</p>
                <h2>Appointment Calendar</h2>
                <CalendarComponent />
            </main>
        </div>
    );
}

export default App;
