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
                <div style={{margin:'-70px 680px 100px 850px'}}>
                    <Button variant="contained" color="default" color="primary" style={{backgroundColor: '#412f2b6c',border:'1px solid rgba(92, 64, 60, 0.953)'}} onClick={()=>navigate('/gallery')}>
                        Gallery
                    </Button>                    

                    </div>
            </Box>
        </div>
    );
};


export default LandingPage;