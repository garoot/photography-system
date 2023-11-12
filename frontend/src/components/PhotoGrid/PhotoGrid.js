import React from 'react';
import './PhotoGrid.css'; // Make sure the path is correct for your project structure

function PhotoGrid({ photos }) { // Assume photos is passed as a prop
    return (
        <div className="photo-grid">
            {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                    <img src={`http://localhost:4000/${photo.url}`} alt={photo.title || `Photography ${index}`} />
                </div>
            ))}
        </div>
    );
}

export default PhotoGrid;
