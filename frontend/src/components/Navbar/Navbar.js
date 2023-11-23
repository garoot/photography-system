import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [backgroundColor, setBackgroundColor] = useState('rgba(7, 13, 22, 0.0)');
    const [isLoaded, setIsLoaded] = useState(false); // State to handle the fade-in

    useEffect(() => {
        const handleScroll = () => {
            // const newColor = window.scrollY > 0 ? 'rgba(7, 13, 22, 0.94)' : 'rgba(7, 13, 22, 0.1)';
            // setBackgroundColor(newColor);
                // Define the start and end points of the scroll where the change should be complete
            const startChangePosition = 0; // The scroll position where the change starts
            const endChangePosition = 400; // The scroll position where the change ends

            // Get the current scroll position
            const scrollY = window.scrollY;

            // Calculate the opacity based on the scroll position
            let opacity = 0.0; // Start with the initial opacity
            if (scrollY > startChangePosition) {
                // Calculate the scroll distance within the change range
                const distance = Math.min(scrollY - startChangePosition, endChangePosition - startChangePosition);
                // Interpolate the opacity based on the scroll distance
                opacity = 0.0 + (2 * (distance / (endChangePosition - startChangePosition)));
            }

            // Ensure opacity stays within bounds
            opacity = Math.min(Math.max(opacity, 0.0), 0.98);

            // Set the new background color with the interpolated opacity
            const newColor = `rgba(7, 13, 22, ${opacity})`;
            setBackgroundColor(newColor);
        };

        window.addEventListener('scroll', handleScroll);

        // Set a timeout to delay the fade-in effect
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300); // Delay in milliseconds

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer); // Clear the timeout if the component unmounts
        };
    }, []);

    return (
        <nav className={`navbar ${isLoaded ? 'fade-in' : ''}`} style={{ backgroundColor: backgroundColor }}>
            <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <img src="/logo-white@1.5x.png" alt="Malak Photo" />
                    </Link>
                <div className="menu-burger">
                    <span>Menu</span> {/* Replace with actual burger icon/menu component */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
