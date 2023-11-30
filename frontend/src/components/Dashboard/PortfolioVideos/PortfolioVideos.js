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
        const formData = new FormData(event.target); // Construct formData from the form

        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        fetch(`http://localhost:4000/api/portfolio-videos/${videoId}`, {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedVideo => {
            setVideos(videos => videos.map(video => video._id === videoId ? updatedVideo : video));
            // Optionally, you can reset form fields here if needed
        })
        .catch(error => {
            console.error('There was an error updating the video!', error);
        });
    };

    
    return (
        <div className="portfolio-videos-container">
            {videos.map(video => (
                <form key={video._id} onSubmit={(e) => handleFormSubmit(e, video._id)} className="video-form" encType="multipart/form-data">
                    <input type="hidden" name="_id" value={video._id} />
    
                    <div className='video-player'>
                        <video width="320" height="240" controls>
                            <source src={`http://localhost:4000/${video.videoUrl}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
    
                    <div className='form-field'>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" defaultValue={video.title} required />
                    </div>
    
                    <div className='form-field'>
                        <label htmlFor="newVideo">Upload New Video:</label>
                        <input type="file" id="newVideo" name="video" accept="video/*" />
                    </div>
    
                    <div className='form-field'>
                        <label htmlFor="thumbnailUrl">Current Thumbnail:</label>
                        <img src={`http://localhost:4000/${video.thumbnailUrl}`} alt="Thumbnail" />
                    </div>
    
                    <div className='form-field'>
                        <label htmlFor="newThumbnail">Upload New Thumbnail:</label>
                        <input type="file" id="newThumbnail" name="thumbnail" accept="image/*" />
                    </div>
    
                    <div className='form-field'>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" defaultValue={video.description} required />
                    </div>
    
                    <button type="submit">Update Video</button>
                </form>
            ))}
        </div>
    );
    
};

export default PortfolioVideos;