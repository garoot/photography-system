import React from 'react';
import { useEffect, useRef, useState } from 'react';
import './PhotoGrid.css';

function PhotoGrid({ photos }) {
    // Set the initial number of columns based on the window width
    // const initialNumColumns = window.innerWidth >= 768 ? 6 : 3; // Change 768 to your desired breakpoint width
    const [shuffledPhotos, setShuffledPhotos] = useState([]);
    const [columns, setColumns] = useState([]); // New state for columns


    // const getNumColumns = () => window.innerWidth >= 768 ? 6 : 3;

    
    useEffect(() => {
        console.log("Triggered...1")
        // Shuffle photos and then set state
        const shuffle = (array) => {
            let currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
        
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        };

        setShuffledPhotos(shuffle([...photos]));
    }, [photos]); // This will only run when the 'photos' prop changes


    // Function to fill up columns based on screen size
    const fillupColumns = () => {
        let numColumns = window.innerWidth < 768 ? 3 : 6;
        let tempColumns = Array.from({ length: numColumns }, () => []);

        // shuffledPhotos.forEach((photo, index) => {
        //     tempColumns[index % numColumns].push(photo);
        // });
        shuffledPhotos.forEach((photo, index) => {
            // Calculate the column index ensuring it's less than numColumns
            let columnIndex = index % numColumns;
            tempColumns[columnIndex].push(photo);

            // if mobile screen - Only add the photo to the column if it has less than 5 photos
            // if (tempColumns[columnIndex].length < 5 && numColumns === 3) {
            //     tempColumns[columnIndex].push(photo);
            // }
            // else if (tempColumns[columnIndex].length < 8 && numColumns === 6){
            //     tempColumns[columnIndex].push(photo);
            // }
        });

        setColumns(tempColumns); // Update state
        console.log(tempColumns[1].length)
    };

    // Initial fillup
    useEffect(() => {
        fillupColumns();
    }, [shuffledPhotos]); // Dependency on shuffledPhotos

    // Event listener for window resize
    useEffect(() => {
        const handleResize = () => {
            fillupColumns();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [shuffledPhotos]); // Dependency on shuffledPhotos



    
    const [showHeader, setShowHeader] = useState(false);
    const gridRef = useRef(null);

    // initial animation
    useEffect(() => {
        
        const columns = document.querySelectorAll('.photo-column');
        if(window.scrollY === 0){
            columns.forEach((column, index) => {
                column.classList.add(index % 2 === 0 ? 'initialMoveUp' : 'initialMoveDown');
            });
        }
        // This function handles the end of an animation
        const handleAnimationEnd = (e) => {
            // e.target.classList.remove('moveUp', 'moveDown');
            e.target.classList.remove('initialMoveUp', 'initialMoveDown');
    
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
    
    // fade-in animation for PhotoGrid  
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
    
    const handleScroll = () => {
        console.log("scrolling...")
        const columns = gridRef.current.children;
        for (let i = 0; i < columns.length; i++) {
            const translateY = window.scrollY * 0.2 * (i % 2 === 0 ? 1 : -1);
            columns[i].style.transform = `translateY(${translateY}px)`;
        }
    };

    

    // scroll animation
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
                    <div key={columnIndex} className={`photo-column`}>
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
