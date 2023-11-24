import React, { useState,useEffect } from 'react';
import './VideoDetail.css'; // Your CSS file for styling
import { useParams, useLocation } from 'react-router-dom'; // Import useLocation


const VideoDetail = () => {
    const [video, setVideo] = useState([]);
    const { id } = useParams();

    useEffect( () =>  {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`http://localhost:4000/portfolio-videos/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVideo(data); // Set the video in state
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };
        fetchVideo();
    })
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

