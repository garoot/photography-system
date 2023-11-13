import React from 'react';
import { useEffect, useRef, useState } from 'react';
import './PhotoGrid.css';

function PhotoGrid({ photos }) {
  // Determine the number of columns based on the window width or a fixed number
    const numColumns = 6; // Or calculate based on window width
    const columns = Array.from({ length: numColumns }, () => []);

    // Distribute photos into columns
    photos.forEach((photo, index) => {
    columns[index % numColumns].push(photo);
    });

    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const columns = document.querySelectorAll('.photo-column');
    
        columns.forEach((column, index) => {
            column.classList.add(index % 2 === 0 ? 'moveUp' : 'moveDown');
        });
    
        // This function handles the end of an animation
        const handleAnimationEnd = (e) => {
            e.target.classList.remove('moveUp', 'moveDown');
    
            // If the last column has finished animating
            if (e.target.classList.contains('photo-column') && e.target.nextElementSibling === null) {
                setShowHeader(true); // This will cause the header to fade in
            }
        };
    
        // Add event listeners
        columns.forEach(column => {
            column.addEventListener('animationend', handleAnimationEnd);
        });
    
        // Cleanup function to remove event listeners
        return () => {
            columns.forEach(column => {
                column.removeEventListener('animationend', handleAnimationEnd);
            });
        };
    }, []);
    
    

    useEffect(() => {
        // Set a timeout to add the fade-in class to the photo items
        const timerPhotoItems = setTimeout(() => {
            const photoItems = document.querySelectorAll('.photo-item');
            photoItems.forEach(item => {
                item.classList.add('fade-in');
            });
        }, 100); // Photo items start fading in after 100ms
    
        // Set another timeout to fade in the header and button after the photo items
        const timerHeader = setTimeout(() => {
            console.log('Setting showHeader to true');
            setShowHeader(true); // This will add the 'fade-in' class to the header
        }, 1100); // Header starts fading in after 1100ms
    
        // Cleanup the timeouts if the component unmounts
        return () => {
            clearTimeout(timerPhotoItems);
            clearTimeout(timerHeader);
        };
    }, []);
    
    
    

    const gridRef = useRef(null);

    const handleScroll = () => {
        console.log("scrolling...")
        const columns = gridRef.current.children;
        for (let i = 0; i < columns.length; i++) {
            const translateY = window.scrollY * 0.1 * (i % 2 === 0 ? 1 : -1);
            columns[i].style.transform = `translateY(${translateY}px)`;
        }
    };
    
    useEffect(() => {

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div ref={gridRef} className="photo-grid">
                {columns.map((column, columnIndex) => (
                    <div
                        key={columnIndex}
                        className={`photo-column ${columnIndex % 2 === 0 ? 'moveUp' : 'moveDown'}`}
                    >
                        {column.map((photo, photoIndex) => (
                        <div key={photoIndex} className="photo-item">
                            <img 
                                src={`http://localhost:4000/${photo.url}`} 
                                alt={photo.title || `Photography ${photoIndex}`} 
                                loading="eager"
                            />
                        </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Header and button */}
            <div className={`header-container ${showHeader ? 'fade-in' : ''}`}>
                <h1 className="header-title">Malak Alshahrani</h1>
                <a href="#learn-more" className="learn-more-btn">Learn More</a>
            </div>

        </>
    
    );
}

export default PhotoGrid;
