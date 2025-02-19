import React from "react";
import Sidebar from "./Sidebar";
import CalendarComponent from "./Calendar"; // Import the new calendar

function App() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-4xl font-bold text-gray-800">Main Content Area</h1>
                <p className="text-lg text-gray-600 mt-2">
                    This is where your main app content will go.
                </p>
                <CalendarComponent /> {/* Add the calendar here */}
            </main>
        </div>
    );
}

export default App;