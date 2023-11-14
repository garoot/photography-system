import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [backgroundColor, setBackgroundColor] = useState('rgba(7, 13, 22, 0)');
    const [isLoaded, setIsLoaded] = useState(false); // State to handle the fade-in

    useEffect(() => {
        const handleScroll = () => {
            const newColor = window.scrollY > 0 ? 'rgba(7, 13, 22, 0.94)' : 'rgba(7, 13, 22, 0)';
            setBackgroundColor(newColor);
        };

        window.addEventListener('scroll', handleScroll);

        // Set a timeout to delay the fade-in effect
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500); // Delay in milliseconds

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer); // Clear the timeout if the component unmounts
        };
    }, []);

    return (
        <nav className={`navbar ${isLoaded ? 'fade-in' : ''}`} style={{ backgroundColor: backgroundColor }}>
            <div className="navbar-content">
                <div className="navbar-logo">
                    <img src="/logo-white@1.5x.png" alt="Malak Photo" />
                </div>
                <div className="menu-burger">
                    <span>Menu</span> {/* Replace with actual burger icon/menu component */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
