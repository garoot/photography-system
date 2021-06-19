import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import {Router, Link, navigate} from '@reach/router'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LandingPage from './LandingPage';
import Gallery from './Gallery';
import Footer from './Footer';
import { useMediaQuery } from 'react-responsive'
import PhotoManagement from './PhotoManagement'
import axios from 'axios';

const Home = props => {
    // this is for gallery photos preview - in URL - also for gallery display
    // this must be exactly similar to fileList
    const [galleryArray, setGalleryArray] = useState([])
    const [galleryBody, setGalleryBody] = useState({
        albumName: "gallery",
        imgCollection: [],
        _id: ""
    })
    const isMobile = useMediaQuery({ maxHeight: 900, maxWidth: 450 })

    useEffect(()=>{
        // console.log("gallery body:")
        // console.log(galleryBody)
    }, [galleryBody])
    // getting gallery photos to distribute to PhotoManagement and Gallery
    useEffect(()=>{
        axios.get("http://localhost:8000/api/photos/gallery")
            .then(result=> {
                // console.log("in Home.jsx useEffect, imgCollection:")
                // console.log(result.data.gallery[0].imgCollection)
                setGalleryBody(result.data.gallery)
                let gallery = result.data.gallery
                let tmpGallery = result.data.gallery.imgCollection
                console.log("tmpGallery:")
                console.log(tmpGallery)
                setGalleryArray(tmpGallery)
            })
            .catch(err=> console.log(err))
    }, [])
    return (
        <div>
            <Navbar />
            <Router>
                <LandingPage 
                    path="/"
                />

                <PhotoManagement 
                    path="/photos/manage"
                    galleryArray={galleryArray}
                    setGalleryArray={setGalleryArray}
                    galleryBody={galleryBody}
                    setGalleryBody={setGalleryBody}
                />
                <Gallery 
                    path="/gallery"
                    galleryArray={galleryArray}
                />

            </Router>            

        </div>
    );
};

export default Home;