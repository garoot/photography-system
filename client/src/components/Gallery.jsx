import React, { useEffect } from 'react';
import Box from '@mui/material/Box'
import { useState } from 'react';
import Grid from '@mui/material/Grid'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useMediaQuery } from 'react-responsive'


const Gallery = props => {
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const [photoHeight, setPhotoHeight] = useState()
    const galleryStyle={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#282c34',
        backgroundColor: 'black',
        height: '800px',
        // width: '80vw'
    }
    const paperStyle = {
        maxHeight: '600px',
    }
    const galleryStyleMobile={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#282c34',
        backgroundColor: 'black',
        width: '100vw',
        height:'100vh'
    }
    const paperStyleMobile = {
        maxWidth: '300px',
        maxHeight: '500px',
        // paddingBottom:'0px',
        marginBottom:'0px'
    }

    const {galleryArray} = props
    const [displayPhotos, setDisplayPhotos] = useState([])
    useEffect(()=>{
        setDisplayPhotos(galleryArray)
    }, [galleryArray])
    return (
        <div style={galleryStyle}>
            <Carousel >
            {displayPhotos && displayPhotos.map(photo=> {
                    return (
                        <Paper style={isTabletOrMobile? paperStyleMobile: paperStyle}>
                            <img onContextMenu={(e)=> e.preventDefault()} src={photo} width={isTabletOrMobile&& "300px"} height={isTabletOrMobile?'500px': '600px'} alt="" />
                        </Paper>
                    )
                })}
            </Carousel>
        </div>
    );
};


export default Gallery;