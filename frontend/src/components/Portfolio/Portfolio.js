import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css'; // Your CSS file for styling
import { Link } from 'react-router-dom';

const Portfolio = () => {
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fadeInLeft');
                        observer.unobserve(entry.target); // Stop observing after animating
                    }
                });
            },
            { threshold: 0.4 }
        );

        videoRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            videoRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [videos]); // Dependency array

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
                {videos.map((video, index) => (
                    <div key={video._id} className="video-item" ref={el => videoRefs.current[index] = el}>
                        
                        <Link to={{
                            pathname: `/video/${video._id}`,
                            // state: { videoId: video._id, videoTitle: video.title, videoDesc: video.description } 
                        }}>
                            <img src={`http://localhost:4000/${video.thumbnailUrl}`} />
                            <div className="video-info">
                                <h3>{video.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
