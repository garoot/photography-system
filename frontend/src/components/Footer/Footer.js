import React from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section about">
                <h2>About Me</h2>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.</p>
                <a href="/learn-more">Learn more →</a>
                {/* Social media icons here */}
            </div>
            
            <div className="footer-section menu">
                <h2>Menu</h2>
                <a href="/home">Home</a>
                <a href="/about-me">About me</a>
                <a href="/services">Services</a>
                {/* ... other menu items */}
            </div>
            
            <div className="footer-section services">
                <h2>Services</h2>
                <a href="/video">Video</a>
                <a href="/photography">Photography</a>
                <a href="/all-services">All Services</a>
            </div>
            
            <div className="footer-section contact">
                <h2>Contact</h2>
                <p>hi@website.com</p>
                <p>800 123-456</p>
                <p>Evergreen 27, San Francisco, CA, 90210</p>
            </div>
            
            
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                {/* Other bottom footer content here */}
            </div>
        </footer>
    );
};

export default Footer;
