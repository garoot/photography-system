import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Make sure the path is correct for your project structure

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        {/* Navbar content here */}
        </nav>
    );
}

export default Navbar;
