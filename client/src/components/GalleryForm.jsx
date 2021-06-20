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
import { Paper } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
        // minHeight: '300px',
        alignItems: 'flex-start',
        marginTop:'50px'
    }
    const gridContainerStyle = {
        margin:'10px 50px 50px 20px',
        display:'flex',
        justifyContent:'center'
    }
    const previewPhotoStyle = {
        margin:'5px', 
        marginBottom:'-50px'
    }
    
    const dividerStyle = {
        borderBottom:'1px solid #6e706f63', 
        width:'100%',
        margin:'30px'
    }

    // this is for gallery photos preview - in URL - also for gallery display
    // this must be exactly similar to fileList
    const {galleryArray, setGalleryArray, galleryBody, setGalleryBody} = props
    const [displayGallery, setDisplayGallery] = useState([])
    const [uploadGalleryBody, setUploadGalleryBody] = useState({})

    // this is imgCollection - where we save files on change - unchanged
    const [fileList, setFileList] = useState([{}])
    const [deletedFiles, setDeletedFiles] = useState([])

    const [openDialog, setOpenDialog] = useState(false)
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const [previewID, setPreviewID] = useState()
    const [confirm, setConfirm] = useState(false)
    const [disableDeleteButton, setDisableDeleteButton] = useState(true)

    useEffect(()=>{
        if(galleryArray && galleryArray.length>0){
            setDisplayGallery(galleryArray)
            setFileList(galleryArray)
        }
    }, [galleryArray])

    useEffect(()=>{
        if(displayGallery.length > 0){
            setDisableDeleteButton(false)
        }
    }, [displayGallery])

    useEffect(()=>{
        setDeletedFiles([])
    }, [])

    // handle onChange for upload field
    const imageHandler = async (e) => {
        // 1: first handle onChange
        let newPhotos = Array.from(e.target.files)
        let tmpCopy = []
        console.log("fileList:")
        console.log(fileList)
        if(fileList && fileList.length > 0 && Array.isArray(fileList)){
            tmpCopy = [...fileList, ...newPhotos]
        }else{
            tmpCopy = newPhotos
        }
        // fileList is like username and pswd on change in previous projects
        // mainly for submitting/uploading
        await setFileList(tmpCopy)
        //2: then transform tmpArr content to handle preview 
        // this one is for displaying
        newPhotos = Array.from(newPhotos).map(file=> {
            return URL.createObjectURL(file)
        })
        let prevArr = []
        console.log("displayGallery:")
        console.log(displayGallery)
        if(displayGallery && displayGallery.length > 0 && Array.isArray(displayGallery)){
            prevArr = [...displayGallery, ...newPhotos]
        }else {
            prevArr = [...newPhotos]
        }
        await setDisplayGallery(prevArr)
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
        if(!fileList[0] && deletedFiles){
            let tmp = [""]
            setFileList(tmp)
        }
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
        else if(!fileList[0] && deletedFiles){
            deleteGallery()
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
        // console.log(fileList.le)
        if(fileList.length > 1){
            await setPreviewID(key)
            console.log("deletedFiles now:")
            if(deletedFiles && deletedFiles.length >0 && Array.isArray(deletedFiles)){
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
            console.log(key)
            setOpenDialog(true)
        } else {
            alert("click Delete button ")
        }
        
    }
    // deletes one picture from DisplayGallery and FileList
    const handleDelete = (e,idx)=> {
        console.log(previewID)
        let tmpArr = fileList
        // let tmpArr2 = displayGallery

        console.log("fileList")
        console.log(fileList)
        console.log("displayGallery")
        console.log(displayGallery)

        tmpArr.splice(previewID, 1)
        // tmpArr2.splice(previewID, 1)
        console.log("previewID")
        console.log(previewID)
        console.log("new fileList")
        console.log(tmpArr)
        console.log("new displayGallery")
        console.log(tmpArr)
        
        setFileList(tmpArr)
        setDisplayGallery(tmpArr)
        console.log("deletedFiles:")
        console.log(deletedFiles)

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
            <Paper style={{padding:'50px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minWidth:'100%'}} elevation={3}>
                <form onSubmit={handleUpload} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <span className="divider" style={dividerStyle}></span>
                    <h3 style={{color:'black'}}>Manage Gallery</h3>
                    <FormControl style={{display:'flex', justifyContent:'flex-start',  width:'70%', marginTop:'40px'}} disabled>
                        <InputLabel>Album Name</InputLabel>
                        <Select
                        value="gallery"
                        defaultValue="gallery"
                        style={{width:'50%'}}
                        >
                            <MenuItem value="gallery">
                                Gallery
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  style={GalleryFormStyle}>
                        <TextField
                            id=""
                            label=""
                            type="file"
                            onChange={imageHandler}
                            inputProps={{multiple:true}}
                            style={{display:'flex',justifyContent:'space-between', marginBottom:'20px', width:'100%'}}
                        />
                    </FormControl >
                    <span id="grid-container" style={gridContainerStyle}>
                        <Grid container spacing={8} style={{display:'flex', justifyContent:'center'}}>
                                {displayGallery&& displayGallery.map((photo, idx)=> {
                                    return (
                                    <Grid item xs={5} style={previewPhotoStyle} onContextMenu={(e)=> e.preventDefault()}>
                                        <img onContextMenu={(e)=> e.preventDefault()} src={photo} alt="file" height={isTabletOrMobile? "80px":"170px"} onClick={(e)=>handlePreviewClick(e,idx,photo)}/>
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
                                                Confirm
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
                        <span style={{display:'flex', width:'50%', justifyContent:'space-around'}}>
                            <Button type="submit" variant="contained" color="default" style={{marginTop:'40px'}}>
                            Save
                            </Button>
                            <Button disabled={disableDeleteButton} onClick={deleteGallery} variant="contained" color="default" style={{color:'white',marginTop:'40px', backgroundColor:'#b81c1cce'}}>
                            Delete
                            </Button>
                        </span>
                </form>
                
                <span className="divider" style={dividerStyle}></span>
                <form style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h3 style={{color:'black'}}>Upload Client Album</h3>
                <FormControl style={clientPhotoFormStyle}>
                    <TextField
                            id=""
                            label=""
                            type="file"
                            onChange={imageHandler}
                            inputProps={{multiple:true}}
                        />
                    <FormHelperText></FormHelperText>
                </FormControl>
                <span style={{display:'flex', width:'50%', justifyContent:'space-around'}}>
                            <Button type="submit" variant="contained" color="default" style={{marginTop:'40px'}}>
                            Save
                            </Button>
                            <Button disabled={disableDeleteButton} onClick={deleteGallery} variant="contained" color="default" style={{color:'white',marginTop:'40px', backgroundColor:'#b81c1cce'}}>
                            Delete
                            </Button>
                        </span>
                </form>
            </Paper>
        </div>
    );
};

export default GalleryForm;