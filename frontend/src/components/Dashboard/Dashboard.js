import './Dashboard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the main page
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to close the sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='main'>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
                <Link to="/" className="navbar-logo">
                            <img src="/logo-white@1.5x.png" alt="Malak Photo" />
                </Link>
                <div className='sidebar-buttons'>
                    <button>Activity</button>
                    <button>Booking Requests</button>
                    <button>PhotoGrid Photos</button>
                    <button>Portfolio Videos</button>
                    <button>Statistics</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='display'>
                Hello
            </div>
            <button className={`burger-menu ${!isSidebarOpen ? 'visible' : ''}`} onClick={toggleSidebar}>
                ☰
            </button>      
        </div>
    );
};

export default Dashboard;
