import './PhotoGridPhotos.css'; // Import your CSS file for styling
import React, { useState, useEffect } from 'react';


const PhotoGridPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newFile, setNewFile] = useState(null);

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

    // Handle new photo submission
    const handleNewPhotoSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newTitle);
        formData.append('description', newDescription);
        if (newFile) {
            formData.append('file', newFile);
        }

        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/portfolio-items/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newPhoto => {
            setPhotos(photos => [...photos, newPhoto]);
            // Reset form
            setNewTitle('');
            setNewDescription('');
            setNewFile(null);
        })
        .catch(error => {
            console.error('There was an error creating the photo!', error);
        });
    };

    // Handle delete with confirmation
    const handleDelete = photoId => {
        // Show confirmation dialog
        if (window.confirm('Are you sure you want to delete this photo?')) {
            console.log("deleting ", photoId);
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
        }
    };

    // Handle update
    const handleUpdate = photoId => {
        const photoToUpdate = photos.find(photo => photo._id === photoId);
        if (!photoToUpdate) {
            console.error('Photo not found');
            return;
        }

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', photoToUpdate.title);
        formData.append('description', photoToUpdate.description);
        if (photoToUpdate.file) {
            formData.append('file', photoToUpdate.file);
        }

        fetch(`http://localhost:4000/api/portfolio-items/${photoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData // Send as FormData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedPhoto => {
            setPhotos(photos => photos.map(photo => {
                return photo._id === photoId ? updatedPhoto : photo;
            }));
        })
        .catch(error => {
            console.error('There was an error updating the item!', error);
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

    // Handle file input change
    const handleFileChange = (photoId, file) => {
        setPhotos(photos => photos.map(photo => {
            if (photo._id === photoId) {
                return { ...photo, file }; // Temporarily store the file object in state
            }
            return photo;
        }));
    };


    return (
        <div className='forms-container'>
            <div className='photo-form'>
                <h3>Add a new Portfolio Image</h3>
                <form onSubmit={handleNewPhotoSubmit}>
                    <input 
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setNewFile(e.target.files[0])}
                    />
                    <textarea 
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button type="submit">Create New Photo</button>
                </form>
            </div>
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
                            onChange={(e) => handleFileChange(photo._id, e.target.files[0])}
                        />
                        <textarea 
                            value={photo.description} 
                            onChange={(e) => handleDescriptionChange(photo._id, e.target.value)}
                        />
                        <button type="button" onClick={() => handleDelete(photo._id)}>Delete</button>
                        <button type="button" onClick={() => handleUpdate(photo._id)}>Update</button>
                    </form>
                </div>
                    
            ))}
        </div>
    );
};

export default PhotoGridPhotos;
