import './PhotoGridPhotos.css'; // Import your CSS file for styling
import React, { useState, useEffect } from 'react';


const PhotoGridPhotos = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/portfolio-items') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            setPhotos(data)
            console.log("data: ", data)
            console.log(photos)
        })
        .catch(error => console.error('Error fetching photos:', error));
    }, []);

    return (
        <div className='forms-container'>
            {photos.map(photo => (
                <div className='photo-form'>
                    <img 
                        src={`http://localhost:4000/${photo.url}`} 
                        alt={photo.title} 
                        loading="eager"
                    />
                    <form key={photo._id} onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="text" 
                            value={photo.title} 
                        />
                        <input 
                            type="file" 
                        />
                        <textarea 
                            value={photo.description} 
                        />
                        <button type="button">Delete</button>
                    </form>
                </div>
                    
            ))}
        </div>
    );
};

export default PhotoGridPhotos;
