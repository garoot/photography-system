import React, { useEffect, useState } from 'react';
import { Paper, Modal, ClickAwayListener, FormControl, FormHelperText, FormLabel, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from 'react-responsive'


const Login = props => {
    const {open, setOpen} = props
    const [openLoginForm, setOpenLoginForm] = useState(false)
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    const handleClose = () => {
        setOpen(!open)
        
    }
    useEffect(()=>{
        setOpenLoginForm(open)
    }, [open])

    const authFormStyle = {
        width:'500px', 
        display:'flex',
        padding:'20px', 
        justifyContent:'center',
    }

    const inputFieldStyle = {
        border:'1px solid #52aeca',
        borderRadius: '5px',
        
    }

    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(92, 64, 60, 0.353)",
            }  ,
            margin: '20px'
        },
        formButton: {
            "&:hover": {
                backgroundColor: "#684840 !important",
            },
            backgroundColor: '#412f2b6c', 
            color: 'white', 
            width:'300px', 
            marginLeft:'100px'
        },
        regButton: {
            "&:hover": {
                backgroundColor: "#1b6838 !important",
            },
            backgroundColor: '#52aeca', 
            color: 'white', 
            margin:'20px 0', 
            width:'300px',
            marginLeft:'100px'
        },
 
    })
    const classes = useStyles()

    return (
        <div>

            {/* <Modal
                open={openForm}
                onClose={handleClose}
                style={{width:'40%'}}
            >
            </Modal> */}
            <Dialog
                open={openLoginForm}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'rgba(27, 27, 27, 0.793)',
                        border: '1px solid rgba(92, 64, 60, 0.1)',
                        color: 'white',
                        padding:'80px 0px',
                        borderRadius: '20px',
                    }
                }}
            >
                <DialogTitle style={{display:'flex', justifyContent:'center'}}>Login Form</DialogTitle>
                    <FormControl style={authFormStyle}>
                        <FormLabel></FormLabel>
                            <TextField id="outlined-basic" input InputLabelProps={{style:{color:'white'}}} label="Username" variant="outlined" color="primary" className={classes.root}/>
                            <TextField id="outlined-basic" input InputLabelProps={{style:{color:'white'}}} label="Password" variant="outlined" color="primary" className={classes.root}/>
                        <Button variant="contained" className={classes.formButton}>
                            Submit
                        </Button>
                        <Button variant="contained" className={classes.regButton}>
                            Register
                        </Button>
                    </FormControl>
            </Dialog>

        </div>
    );
};


export default Login;