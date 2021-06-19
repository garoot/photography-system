import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box'
import GalleryForm from './GalleryForm';
import {Router} from '@reach/router'
import axios from 'axios';
import Gallery from './Gallery';


const PhotoManagement = props => {
    const mainStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282c34',
        height: '100%',
        
    }
    // this is for gallery photos preview - in URL - also for gallery display
    // this must be exactly similar to fileList
    // const [galleryArray, setGalleryArray] = useState([])
    const {galleryArray, setGalleryArray, galleryBody, setGalleryBody} = props
    const [galleryArray2, setGalleryArray2] = useState([])
    const [galleryBody2, setGalleryBody2] = useState({})

    // useEffect( async ()=>{
    //     await axios.get("http://localhost:8000/api/photos/gallery")
    //         .then(result=> {
    //             console.log(result.data.photos[0])
    //             let tmpArr = result.data.photos[0].imgCollection
    //             // tmpArr = Array.from(tmpArr).map(file=> {
    //             //     return URL.createObjectURL(file)
    //             // })
    //             setGalleryArray2(tmpArr)

    //         })
    //         .catch(err=> console.log(err))
    // }, [])
    useEffect( async ()=>{
        await setGalleryArray2(galleryArray)
    }, [galleryArray])

    useEffect( async ()=>{
        await setGalleryBody2(galleryBody)
    }, [galleryBody])

    return (
        <div style={mainStyle}>
            <GalleryForm
                galleryArray={galleryArray2}
                setGalleryArray={setGalleryArray2}
                galleryBody={galleryBody2}
                setGalleryBody={setGalleryBody}
            /> 
        </div>
    );
};

export default PhotoManagement;