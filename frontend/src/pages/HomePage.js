import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import PhotoGrid from '../components/PhotoGrid/PhotoGrid';
import ServicesSection from '../components/ServicesSection/ServicesSection'; // Add this
import { useState, useEffect } from 'react';

function HomePage() {
    // Fetch photos from your backend and store them in state, or pass them down as props
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/portfolio-items') // Adjust the URL as needed
        .then(response => response.json())
        .then(data => {
            setPhotos(data)
            console.log("data: ", data)
        })
        .catch(error => console.error('Error fetching photos:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <main>
                <PhotoGrid photos={photos} />
                <ServicesSection />
            </main>
            {/* ... potentially a footer */}
        </div>
    );
}

export default HomePage;
