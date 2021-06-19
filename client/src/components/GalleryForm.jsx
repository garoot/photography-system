import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

// handle preview delete
//  Gallery: 
//  -Gallery.jsx must get gallery photos from server,
//  and distribute to GalleryForm and GalleryPhotos
// -So, GalleryArray must be moved to Gallery

// TODO:

// BACKEND:
// -create route and controller to retrieve gallery photos
// create route and controller to update gallery photos

// HERE
// -handle delete in preview: deletes in both fileList and GalleryArray
// -show warning if >6 images uploaded, and only first 6 will be displayed
// -give tips on how many wide pictures to upload .etc
// (Or display them as slides)
// -handle mobile view and UI/UX

// GalleryPhotos:
// display photos 

// JWT
// BACKEND
// FRONTEND

// Client Photo Uploading and Control 

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}))

const GalleryForm = props => {
    // must recieve the array of images from PhotoManagement.jsx if exist to enable edit
    // const [previewGallery, setPreviewGallery] = useState([])

    const mainStyle = {
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center',
        margin:'120px',
        border:'1px solid black',
        width:'50%',
        // marginBottom:'100px',
        paddingBottom:'0px',

        // alignItems: 'flex-start'
    }

    // const GalleryFormStyle = {
    //     width:'70%', 
    //     display:'flex',
    //     padding:'20px 30px 0px 30px', 

    //     alignItems: 'flex-start',
    // }
    const GalleryFormStyle = {
        width:'70%', 
        padding:'20px 30px 0px 30px', 
    }

    const clientPhotoFormStyle = {
        width:'70%', 
        display:'flex',
        // top:'0',
        padding:'20px 30px 0px 30px', 
        justifyContent:'flex-start',
        // border: '1px solid white',
        minHeight: '300px',
        alignItems: 'flex-start',
        marginTop:'50px'
    }
    const gridContainerStyle = {
        marginBottom:'20px'
    }
    const previewPhotoStyle = {
        margin:'5px', 
        marginBottom:'-50px'
    }
    

    const dividerStyle = {
        borderBottom:'1px solid #505352c0', 
        width:'100%',
        margin:'100px'
    }


    // this is for gallery photos preview - in URL - also for gallery display
    // this must be exactly similar to fileList
    const {galleryArray, setGalleryArray, galleryBody, setGalleryBody} = props
    const [displayGallery, setDisplayGallery] = useState([])
    const [uploadGalleryBody, setUploadGalleryBody] = useState({})

    // this is imgCollection - where we save files on change - unchanged
    const [fileList, setFileList] = useState([{}])
    const [deletedFiles, setDeletedFiles] = useState([])
    // this is where we 
    // const [galleryUpload, setGalleryUpload] = useState({
    //     imgCollection: [],
    //     albumName:"gallery"
    // })
    const [openDialog, setOpenDialog] = useState(false)
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const [previewID, setPreviewID] = useState()
    const [confirm, setConfirm] = useState(false)
    const [disableDeleteButton, setDisableDeleteButton] = useState(true)



    useEffect(()=>{
        setDisplayGallery(galleryArray)
        setFileList(galleryArray)
        // console.log("first useEffect "+galleryArray)
    }, [galleryArray])


    useEffect(()=>{
        // setUploadGalleryBody(galleryBody)
        // console.log("GalleryForm.jsx uploadGalleryBody:")
        // console.log(uploadGalleryBody)
        // console.log("first useEffect "+galleryArray)
    }, [galleryBody])

    useEffect(()=>{
        if(displayGallery.length > 0){
            setDisableDeleteButton(false)
        }
    }, [displayGallery])

    useEffect(()=>{
        setDeletedFiles([])
        // console.log(galleryUpload)
        // console.log("from useEffect(): ")
        // let tmpArr = [...fileList]
        // fileList.map((file,idx)=>{
        //     if(typeof(file)!='string'){
        //         console.log((file))
        //     }
        // })
        // console.log("GalleryForm.jsx, fileList:")
        // console.log(fileList)
    }, [fileList])

    // handle onChange for upload field
    const imageHandler = async (e) => {
        // 1: first handle onChange
        let newPhotos = Array.from(e.target.files)
        let tmpCopy = [...fileList, ...newPhotos]
        // fileList is like username and pswd on change in previous projects
        // mainly for submitting/uploading
        await setFileList(tmpCopy)
        //2: then transform tmpArr content to handle preview 
        // this one is for displaying
        newPhotos = Array.from(newPhotos).map(file=> {
            return URL.createObjectURL(file)
        })
        let prevArr = [...displayGallery]
        prevArr.push(...newPhotos)
        await setDisplayGallery(prevArr)
        // console.log(displayGallery)
        // console.log(galleryArray)
    }

    // clearing storage on unmount
    useEffect(()=>{
        return ()=>{
            let tmpArr = displayGallery
            tmpArr = Array.from(tmpArr).map(file=> {
                return URL.revokeObjectURL(file)
            })
            console.log("unmounting")
        }
    }, [])

    const handleUpload = async (e) => {
        e.preventDefault()
        console.log("fileList[0]")
        console.log(fileList[0])
        if(fileList[0]){
            let formData = new FormData()
            console.log("GalleryForm.jsx fileList from handleUpload():")
            console.log(fileList)
            fileList.map((file,idx)=>{
                console.log("fileList[0]")
                console.log(fileList[0])
                if(typeof(file)=='string'){
                    console.log('file[0]')
                    console.log(file[0])
                    formData.append('prevCollection', file)
                } else {
                    formData.append('imgCollection', file)
                }
            })
            console.log("files to be deleted from db")
            console.log(deletedFiles)
            deletedFiles.map(file => {
                formData.append('deletedFiles', file)
            })
            formData.append('albumName', "gallery")
            // console.log(formData.getAll('albumName'))
            console.log("files copied into formData from fileList for uploading:")
            console.log(formData.getAll('imgCollection'))
            await axios.post('http://localhost:8000/api/photos/upload', formData)
                .then(result => {
                    console.log(result.data)
                    window.location.reload()
                })
                .catch(err => console.log(err))
        }
    }
    
    const handleClose = () => {
        setOpenDialog(false)
        let tmpArr = deletedFiles
        if(deletedFiles){
            tmpArr.pop()
        }
        setDeletedFiles(tmpArr)
        console.log("poping from deletedFiles in handleClose")
        console.log(deletedFiles)
    }
    const handlePreviewClick = async (e, key,photo)=> {
        await setPreviewID(key)
        // console.log("deletedFiles:")
        // console.log(deletedFiles)
        if(deletedFiles){
            let tmpArr = deletedFiles
            tmpArr.push(displayGallery[key])
            await setDeletedFiles(tmpArr)
        }
        else{
            let tmpArr = []
            tmpArr.push(displayGallery[key])
            await setDeletedFiles(tmpArr)
        }
        console.log("adding photo to deletedFiles in handlePreviewClick")
        console.log(deletedFiles)
        // console.log(photo)
        // console.log(tmpArr)
        console.log(key)
        setOpenDialog(true)
    }
    // deletes one picture from DisplayGallery and FileList
    const handleDelete = (e,idx)=> {
        console.log(previewID)
        let tmpArr = fileList
        console.log("displayGallery is:")
        console.log(displayGallery)
        tmpArr.splice(previewID, 1)
        console.log("displayGallery will be:")
        console.log(tmpArr)
        setDisplayGallery(tmpArr)
        setFileList(tmpArr)
        setOpenDialog(false)
        setPreviewID(null)
    }
    const deleteGallery = (e) => {
        // console.log(galleryArray.length)
        if(galleryArray.length > 0){
            axios.delete('http://localhost:8000/api/photos/delete/album/gallery')
            .then(response => {
                console.log(response)
                setDisplayGallery([])
                setFileList([])
                setDisableDeleteButton(true)
            })
            .catch(err => console.log(err))
        }
        setDisplayGallery([]) 
        setFileList([])
        setDisableDeleteButton(true)
        
    }



    return (
        <div style={mainStyle}>
            <form onSubmit={handleUpload}>
            <h3 style={{color:'white'}}>Manage Gallery</h3>

                <FormControl>
                    <TextField
                        id=""
                        label="Album Name"
                        value={"gallery"}
                    />
                </FormControl>
                <FormControl  style={GalleryFormStyle}>
                    <TextField
                        id=""
                        label=""
                        type="file"
                        onChange={imageHandler}
                        inputProps={{multiple:true}}
                        style={{display:'flex',justifyContent:'space-between'}}
                    />
                    <span id="grid-container" style={gridContainerStyle}>
                    <Grid container spacing={8}>
                            {displayGallery&& displayGallery.map((photo, idx)=> {
                                return (
                                <Grid item xs={4} style={previewPhotoStyle}>
                                    <img src={photo} alt="file" height={isTabletOrMobile? "80px":"170px"} onClick={(e)=>handlePreviewClick(e,idx,photo)}/>
                                    <Dialog
                                        open={openDialog}
                                        // TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-slide-title"
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete it?"}</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Deleting this photo will remove it from the Gallery 
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={(e)=> handleDelete(e,idx)} style={{color:'red'}}>
                                            Delete
                                        </Button>
                                        <Button onClick={handleClose} color="">
                                            Cancel
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>)
                            })}

                            
                    </Grid>
                    </span>
                    <span>
                    <Button type="submit" variant="contained" color="default" style={{marginTop:'40px'}}>
                    Save
                    </Button>
                    <Button disabled={disableDeleteButton} onClick={deleteGallery} variant="contained" color="default" style={{marginTop:'40px'}}>
                    Delete
                    </Button>
                    </span>

                </FormControl >
            </form>
            
            <span className="divider" style={dividerStyle}></span>
            <FormControl style={clientPhotoFormStyle}>
                <FormLabel></FormLabel>
                <TextField
                        id=""
                        label=""
                        type="file"
                        onChange={imageHandler}
                        inputProps={{multiple:true}}
                    />
                <FormHelperText></FormHelperText>
            </FormControl>
          
            
        </div>
    );
};

export default GalleryForm;