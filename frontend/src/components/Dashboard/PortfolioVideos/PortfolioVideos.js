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

    const handleFormSubmit = async (event, videoId) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    
return (
        <div className="portfolio-videos-container">
            {videos.map(video => (
                <form key={video._id} onSubmit={(e) => handleFormSubmit(e, video._id)} className="video-form">
                    <input type="hidden" name="_id" value={video._id} />

                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" defaultValue={video.title} required />

                    <label htmlFor="videoUrl">Video URL:</label>
                    <input type="text" id="videoUrl" name="videoUrl" defaultValue={video.videoUrl} required />

                    <label htmlFor="thumbnailUrl">Current Thumbnail:</label>
                    <img src={video.thumbnailUrl} alt="Thumbnail" />
                    <label htmlFor="newThumbnail">Upload New Thumbnail:</label>
                    <input type="file" id="newThumbnail" name="thumbnailUrl" accept="image/*" />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" defaultValue={video.description} required />

                    <button type="submit">Update Video</button>
                </form>
            ))}
        </div>
    );
};

export default PortfolioVideos;