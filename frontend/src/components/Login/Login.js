import './Login.css'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginModal = ({ isOpen, onClose, modalRef }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const credentials = { email, password };
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                // Close the modal after successful login
                onClose(); 
                // navigate('/'); // Redirect to the main page
                window.location.reload();
            } else {
                // Handle errors (e.g., show an error message)
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login request failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className="close" onClick={onClose}>&times;</div>
                <form className='login-form' onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input 
                        type="text" 
                        placeholder="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;