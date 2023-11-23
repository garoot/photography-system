import React from 'react';
import './VideoDetail.css'; // Your CSS file for styling

const VideoDetail = () => {
    // Testing with static values
    const video = {
        title: "Sample Video",
        description: "This is a sample description."
    };

    return (
        <div className='video-container'>
            <h3>{video.title}</h3>
            <iframe 
                className='video-iframe'

                src="https://www.youtube.com/embed/O5lTrkHelGg" // Simplified URL for testing
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
            <p>{video.description}</p>
        </div>
    );
};

export default VideoDetail;

