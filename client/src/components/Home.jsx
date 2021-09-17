import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import {Router, Link, navigate} from '@reach/router'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LandingPage from './LandingPage';
import Gallery from './Gallery';
import ContactUs from './ContactUs';
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

    useEffect(()=>{
        // console.log("gallery body:")
        // console.log(galleryBody)
        console.log("GalleryArray:")
        console.log(galleryArray)
    }, [galleryArray])
    // getting gallery photos to distribute to PhotoManagement and Gallery
    useEffect(async ()=>{
        await axios.get("http://localhost:8000/api/photos/gallery")
            .then(result=> {
                console.log("in Home.jsx useEffect, imgCollection:")
                console.log(result.data)
                let gallery = result.data.gallery
                if(gallery){
                    console.log('we have gallery')
                    console.log(gallery)
                    let tmpGallery = gallery.imgCollection
                    console.log("gallery.imgCollection:")
                    console.log(tmpGallery)
                    setGalleryArray(tmpGallery)
                }else{
                    console.log("nothing in data.gallery")
                }
                setGalleryBody(result.data.gallery[0].imgCollection)
                console.log(result.data.gallery[0].imgCollection)
                // let gallery = result.data.gallery[0]

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

                <ContactUs 
                    path="/contact"
                />

            </Router>            

        </div>
    );
};

export default Home;