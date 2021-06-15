import React from 'react';
import Navbar from './Navbar';
import {Router} from '@reach/router'


const Home = props => {

    return (
        <div>
            {/* <Button variant="contained" color="secondary">
                Click me
            </Button> */}
            <Navbar />
            <Router>

            </Router>

        </div>
    );
};

export default Home;