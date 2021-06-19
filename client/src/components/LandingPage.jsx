import React from 'react';
import {Router, Link, navigate} from '@reach/router'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from 'react-responsive'


const LandingPage = props => {
    const is4K = useMediaQuery({minDeviceHeight: 900})
    const isMobile = useMediaQuery({ maxHeight: 900, maxWidth: 450 })

    const backgroundStyleDesktop = {
        backgroundImage: "url(/background2.jpeg)", 
        backgroundPosition: 'top', 
        backgroundRepeat:'repeat-x', 
    }
    const backgroundStyle4k = {
        backgroundImage: "url(/background2.jpeg)", 
        backgroundPosition: 'top', 
        backgroundRepeat:'repeat-x', 
        marginTop:'-5px',
        marginBottom: '-105px'
    }

    const backgroundLayerStyle = {
        backgroundColor: 'rgba(60, 60, 61, 0.15)', 
        position: 'absolute', 
        top:'0', 
        left:'0', 
        width:'100%', 
        height:'100%',
    }
    // const backgroundLayerStyleMobile = {
    //     backgroundColor: 'rgba(60, 60, 61, 0.35)', 
    //     position: 'absolute', 
    //     top:'0', 
    //     left:'0', 
    //     width:'100%', 
    //     height:'99.6%',
    // }
    const backgroundLayerStyle4k = {
        backgroundColor: 'rgba(60, 60, 61, 0.35)', 
        position: 'absolute', 
        top:'0', 
        left:'0', 
        width:'100%', 
        height:'89.3%'
    }

    return (
        <div>
            <Box className="App-header" style={is4K? backgroundStyle4k:backgroundStyleDesktop}>
                <div style={is4K? backgroundLayerStyle4k: backgroundLayerStyle}>
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