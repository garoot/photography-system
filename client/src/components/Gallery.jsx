import React from 'react';
import Box from '@material-ui/core/Box'

const Gallery = props => {
    const galleryStyle={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282c34',
        height: '100vh',
        // width: '80vw'
    }
    const albumStyle = {
        width: '70%',
        display:'flex',
        justifyContent: 'center'
    }
    return (
        <div style={galleryStyle}>
            <Box style={albumStyle}>
                Hello
            </Box>
        </div>
    );
};


export default Gallery;