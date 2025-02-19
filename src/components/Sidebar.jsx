import React from "react";
import { useState } from "react";
import { FaHome, FaClipboardList, FaCalendarAlt } from "react-icons/fa";


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex flex-col space-y-2 p-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-700 text-white rounded">
                {isOpen ? "Close" : "Open"}
            </button>
            {isOpen && (
                <nav className="flex flex-col space-y-2">
                    <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
                        <FaHome/>
                        <span>Dashboard</span>
                    </button>

                    <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
                        <span>📋</span>
                        <span>Patients</span>
                    </button>
                    <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
                        <span>📅</span>
                        <span>Appointments</span>
                    </button>
                </nav>
            )}
        </div>

    );
};

export default Sidebar;