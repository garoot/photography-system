import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import LoginModal from '../Login/Login';

function Navbar() {
    const [backgroundColor, setBackgroundColor] = useState('rgba(7, 13, 22, 0.0)');
    const [isLoaded, setIsLoaded] = useState(false); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(); 
    const menuButtonRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const loginModalRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Sets to true if token exists, false otherwise
    }, [isLoggedIn]);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setIsLoggedIn(false);
    // };

    // Centralized logout logic
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        if (isLoginModalOpen) {
            setIsLoginModalOpen(false);
        }
    };

    // Function to toggle the login modal
    const toggleLoginModal = () => {
        if(isMenuOpen){
            setIsMenuOpen(!isMenuOpen);
        }
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleMenu = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("click...")
            // Existing logic for closing the menu
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
    
            // Logic to close the login modal if clicked outside
            if (isLoginModalOpen && loginModalRef.current && !loginModalRef.current.contains(event.target)) {
                setIsLoginModalOpen(false);
            }
        };
    
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            // Clean up the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, isLoginModalOpen]);
    
    
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
                    <div className="menu-container">
                        <div className="menu-burger" onClick={toggleMenu} ref={menuButtonRef}>
                            <span>Menu</span> {/* Replace with actual burger icon/menu component */}
                        </div>

                        {isMenuOpen && (
                            <div className="dropdown-menu" ref={menuRef}>
                                {/* Your menu items here */}
                                {isLoggedIn ? 
                                    (
                                    <>
                                    <Link to="#" onClick={handleLogout}>Logout</Link>
                                    <Link to="/dashboard">Dashboard</Link>
                                    </>
                                    ) 
                                    : 
                                    (<Link to="#" onClick={toggleLoginModal}>Login</Link>)
                                }                                
                                <Link to="/book-session">Book a session</Link>
                                <Link to="/services">Services</Link>
                                <Link to="/contact">Contact us</Link>
                                {/* more links or menu items */}
                            </div>
                        )}
                    </div>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} modalRef={loginModalRef} />
        </nav>
    );
}

export default Navbar;
