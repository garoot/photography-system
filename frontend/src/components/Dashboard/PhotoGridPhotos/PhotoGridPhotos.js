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

    // Handle delete
    const handleDelete = photoId => {
        console.log("deleting ", photoId)
        const token = localStorage.getItem('token');
        fetch(`http://localhost:4000/api/portfolio-items/${photoId}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the item from the state
                setPhotos(photos => photos.filter(photo => photo._id !== photoId));
            })
            .catch(error => {
                console.error('There was an error deleting the item!', error);
            });
    };

    // Handle change in title input
    const handleTitleChange = (photoId, newTitle) => {
        setPhotos(photos => photos.map(photo => {
            if (photo._id === photoId) {
                return { ...photo, title: newTitle };
            }
            return photo;
        }));
    };

    // Handle change in description textarea
    const handleDescriptionChange = (photoId, newDescription) => {
        setPhotos(photos => photos.map(photo => {
            if (photo._id === photoId) {
                return { ...photo, description: newDescription };
            }
            return photo;
        }));
    };


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
                            onChange={(e) => handleTitleChange(photo._id, e.target.value)}
                        />
                        <input 
                            type="file" 
                        />
                        <textarea 
                            value={photo.description} 
                            onChange={(e) => handleDescriptionChange(photo._id, e.target.value)}
                        />
                        <button type="button" onClick={() => handleDelete(photo._id)}>Delete</button>
                        <button type="button">update</button>
                    </form>
                </div>
                    
            ))}
        </div>
    );
};

export default PhotoGridPhotos;
