import React from 'react';
import {Router, Link, navigate} from '@reach/router'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'


const LandingPage = props => {
    return (
        <div>
            <Box className="App-header" style={{backgroundImage: "url(/background2.jpeg)", backgroundPosition: 'center'}}>
                <div style={{backgroundColor: 'rgba(60, 60, 61, 0.55)', position: 'absolute', top:'0', left:'0', width:'100%', height:'100%'}}>
                </div>
                <div style={{margin:'10px 690px 100px 850px'}}>
                    <Button variant="contained" color="default" color="primary" style={{border:'1px solid black'}} onClick={()=>navigate('/gallery')}>
                        Gallery
                    </Button>                    

                    </div>
            </Box>
        </div>
    );
};


export default LandingPage;