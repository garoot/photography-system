import './Dashboard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Activity from './Activity/Activity';
import BookingRequest from './BookingRequests/BookingRequests';
import PhotoGridPhotos from './PhotoGridPhotos/PhotoGridPhotos';
import PortfolioVideos from './PortfolioVideos/PortfolioVideos';
import Statistics from './Statistics/Statistics';
import LoginModal from '../Login/Login';

const Dashboard = () => {

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('Activity'); // Default active button

    // handling the openning and closing of the login modal
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    useEffect(() => {
        if(!isAuthenticated()) {
            setIsLoginModalOpen(true);
        }
    }, [])
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };
    
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

    return isAuthenticated() ? (
        <div className='main-container'>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
                <Link to="/" className="sidebar-logo">
                            <img src="/logo-white@1.5x.png" alt="Malak Photo" />
                </Link>
                <div className={`sidebar-buttons ${isSidebarOpen ? 'open' : ''}`}>
                    <button className={activeButton === 'Activity' ? 'active' : ''} onClick={() => setActiveButton('Activity')}>
                        Activity
                    </button>
                    <button className={activeButton === 'Booking Requests' ? 'active' : ''} onClick={() => setActiveButton('Booking Requests')}>
                        Booking Requests
                    </button>
                    {/* <button>Booking Requests</button> */}
                    <button className={activeButton === 'PhotoGrid Photos' ? 'active' : ''} onClick={() => setActiveButton('PhotoGrid Photos')}>
                        PhotoGrid Photos
                    </button>
                    <button className={activeButton === 'Portfolio Videos' ? 'active' : ''} onClick={() => setActiveButton('Portfolio Videos')}>
                        Portfolio Videos
                    </button>
                    <button className={activeButton === 'Statistics' ? 'active' : ''} onClick={() => setActiveButton('Statistics')}>
                        Statistics
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='display'>
                {activeButton === 'Activity' && <Activity />}
                {activeButton === 'Booking Requests' && <BookingRequest />}
                {activeButton === 'PhotoGrid Photos' && <PhotoGridPhotos />}
                {activeButton === 'Portfolio Videos' && <PortfolioVideos />}
                {activeButton === 'Statistics' && <Statistics />}
            </div>
            <button className={`burger-menu ${!isSidebarOpen ? 'visible' : ''}`} onClick={toggleSidebar}>
                ☰
            </button>
        </div>
    ) : (
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    )
};

export default Dashboard;
