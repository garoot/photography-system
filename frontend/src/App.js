import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import VideoDetail from './components/VideoDetail/VideoDetail';
// Import other pages here

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/video/:id" element={<VideoDetail/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
