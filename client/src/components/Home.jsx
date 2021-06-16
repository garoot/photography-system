import React from 'react';
import Navbar from './Navbar';
import {Router, Link, navigate} from '@reach/router'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LandingPage from './LandingPage';
import Gallery from './Gallery';

const Home = props => {

    return (
        <div>
            <Navbar />
            <Router>
                <LandingPage 
                    path="/"
                />
                <Gallery 
                    path="/gallery"
                />
            </Router>

        </div>
    );
};

export default Home;