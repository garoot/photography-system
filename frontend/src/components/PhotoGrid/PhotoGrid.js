import React from 'react';
import { useEffect, useRef  } from 'react';
import './PhotoGrid.css';

function PhotoGrid({ photos }) {
  // Determine the number of columns based on the window width or a fixed number
    const numColumns = 6; // Or calculate based on window width
    const columns = Array.from({ length: numColumns }, () => []);

    // Distribute photos into columns
    photos.forEach((photo, index) => {
    columns[index % numColumns].push(photo);
    });
    useEffect(() => {
        // Select all columns
        const columns = document.querySelectorAll('.photo-column');
        // console.log(columns);
    
        columns.forEach((column, index) => {
            column.classList.add(index % 2 === 0 ? 'moveUp' : 'moveDown');
        });
    
        // Remove the initial animation class after it ends
        const handleAnimationEnd = (e) => {
            e.target.classList.remove('moveUp', 'moveDown');
        };
        
        columns.forEach(column => {
            column.addEventListener('animationend', handleAnimationEnd);
        });
        
        // Cleanup
        return () => {
            columns.forEach(column => {
                column.removeEventListener('animationend', handleAnimationEnd);
            });
        };
        
    }, []);
    

    useEffect(() => {
        // Set a timeout to add the fade-in class
        const timer = setTimeout(() => {
            const photoItems = document.querySelectorAll('.photo-item');
            photoItems.forEach(item => {
                item.classList.add('fade-in');
            });
        }, 100); // Adjust this delay as needed

        // Cleanup the timeout if the component unmounts
        return () => clearTimeout(timer);
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
    );
}

export default PhotoGrid;
