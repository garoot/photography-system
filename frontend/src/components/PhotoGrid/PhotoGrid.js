import React from 'react';
import { useEffect, useLayoutEffect, useRef  } from 'react';
import './PhotoGrid.css';

function PhotoGrid({ photos }) {
  // Determine the number of columns based on the window width or a fixed number
    const numColumns = 6; // Or calculate based on window width
    const columns = Array.from({ length: numColumns }, () => []);

    // Distribute photos into columns
    photos.forEach((photo, index) => {
    columns[index % numColumns].push(photo);
    });

    // useEffect(() => {
    //     // Set a timeout to add the fade-in class
    //     const timer = setTimeout(() => {
    //         const photoItems = document.querySelectorAll('.photo-item');
    //         photoItems.forEach(item => {
    //             item.classList.add('fade-in');
    //         });
    //     }, 100); // Adjust this delay as needed

    //     // Cleanup the timeout if the component unmounts
    //     return () => clearTimeout(timer);
    // }, []);

    const gridRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            console.log('Scroll event triggered'); // Add this line
            const { current } = gridRef;
            if (current) {
                const columnElements = current.getElementsByClassName('photo-column');
                for (let i = 0; i < columnElements.length; i++) {
                const offset = (window.scrollY / 10) * (i % 2 === 0 ? -1 : 1);
                columnElements[i].style.transform = `translateY(${offset}px)`;
                }
            }
        };
        console.log('Adding scroll event listener'); // Add this line

        window.addEventListener('scroll', handleScroll);
    
        return () => {
            console.log('Removing scroll event listener'); // Add this line

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
