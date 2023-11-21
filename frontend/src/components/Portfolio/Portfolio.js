import React, { useState, useEffect } from 'react';
import './Portfolio.css'; // Your CSS file for styling

const Portfolio = () => {
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
        <div className="portfolio">
            <h2>Featured Videos</h2>
            <div className="videos-grid">
                {videos.map((video) => (
                    <div key={video._id} className="video-item">
                        <img src={`http://localhost:4000/${video.thumbnailUrl}`} />
                        <div className="video-info">
                            <h3>{video.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
