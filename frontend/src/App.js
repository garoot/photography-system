import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import VideoDetail from './components/VideoDetail/VideoDetail';
import Dashboard from './components/Dashboard/Dashboard'
// Import other pages here

function App() {

    function NavbarWrapper() {
        const location = useLocation();

        if (location.pathname === '/dashboard') {
            return null;
        }
        return <Navbar />;
    }

    return (
        <div className="App">
            <Router>
                <NavbarWrapper />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/video/:id" element={<VideoDetail/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
