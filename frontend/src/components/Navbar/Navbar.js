import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [backgroundColor, setBackgroundColor] = useState('rgba(7, 13, 22, 0)'); // Initial color is fully transparent

    useEffect(() => {
        const handleScroll = () => {
            const newColor = window.scrollY > 0 ? 'rgba(7, 13, 22, 1)' : 'rgba(7, 13, 22, 0)'; // Solid color when scrolled
            setBackgroundColor(newColor);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="navbar" style={{ backgroundColor: backgroundColor }}>
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
