import React, { useState, useEffect, useRef } from 'react';
import './PortfolioVideos.css'; // Import your CSS file for styling

const PortfolioVideos = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {

        // Fetch videos from the API when the component mounts
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://localhost:4000/portfolio-videos');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVideos(data); // Set the videos in state
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, []); // Empty dependency array ensures this effect runs once on mount
    
    return (
        <>

        </>
    );
};

export default PortfolioVideos;