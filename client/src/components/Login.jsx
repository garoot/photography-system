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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';



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

    const dialogStyle = {
        backgroundColor: 'rgba(27, 27, 27, 0.793)',
        border: '1px solid rgba(92, 64, 60, 0.1)',
        color: 'white',
        padding:'20px 0px',
        borderRadius: '20px',
    }

    const dialogStyleMobile = {
        backgroundColor: 'rgba(27, 27, 27, 0.793)',
        border: '1px solid rgba(92, 64, 60, 0.1)',
        color: 'white',
        padding:'20px 0px',
        borderRadius: '20px',
    }
    const authFormStyle = {
        width:'400px', 
        display:'flex',
        padding:'20px 30px 0px 30px', 
        justifyContent:'center',
    }
    const authFormStyleMobile = {
        width:'280px', 
        display:'flex',
        padding:'5px', 
        justifyContent:'center',
    }

    const useStyles = makeStyles({
        inputStyle: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(92, 64, 60, 0.353)",
            }  ,
            margin: '20px'
        },
        inputStyleMobile: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(92, 64, 60, 0.353)",
                size: 'small'
            }  ,
            margin: '5px 40px',
            height: '50px',
            width: '200px',
        },
        formButton: {
            "&:hover": {
                color: 'white',
                backgroundColor: '#52aeca', 
            },
            backgroundColor: '#52aeca', 
            color: 'rgba(28, 65, 68, 0.904)', 
            width:'250px', 
            marginTop:'10px',
            marginLeft:'80px',
            fontWeight:'bold'
        },
        formButtonMobile: {
            "&:hover": {
                color:'white',
                backgroundColor: '#52aeca', 
            },
            backgroundColor: '#52aeca', 
            color: 'white', 
            width:'200px', 
            marginTop:'10px',
            marginLeft:'40px',
            fontWeight:'bold'
        },
        regButton: {
            "&:hover": {
                backgroundColor: "#1b6838 !important",
                color: 'white'
            },
            backgroundColor: '#1b6838 !important', 
            color: '#102c1b', 
            margin:'20px 0', 
            width:'250px',
            marginLeft:'80px',
            fontWeight:'bold'
        },
        regButtonMobile: {
            "&:hover": {
                backgroundColor: "#1b6838 !important",
                color: 'white'
            },
            backgroundColor: '#1b6838 !important', 
            color: 'white', 
            margin:'10px 0', 
            width:'200px', 
            marginLeft:'40px',
            fontWeight:'bold'
        },
    })
    const classes = useStyles()
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <Dialog
                open={openLoginForm}
                onClose={handleClose}
                PaperProps={{
                    style: isDesktopOrLaptop? dialogStyle:dialogStyleMobile
                }}
            >
                <DialogTitle style={{display:'flex', justifyContent:'center'}}>Login Form</DialogTitle>
                    <FormControl style={isDesktopOrLaptop? authFormStyle:authFormStyleMobile}>
                        <FormLabel></FormLabel>
                            <TextField id="outlined-basic" size={isTabletOrMobile? 'small':'medium'} inputProps={{style: {color:'white'}}} input InputLabelProps={{style:{color:'white'}}} label="Username" variant="outlined" color="primary" className={isTabletOrMobile? classes.inputStyleMobile:classes.inputStyle}/>
                            <TextField
                                id="outlined-basic" size={isTabletOrMobile? 'small':'medium'} 
                                type={values.showPassword?'text':'password'} 
                                InputProps={{
                                    style: {color:'white'},
                                    endAdornment:(
                                        <InputAdornment>
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} 
                                input InputLabelProps={{style:{color:'white'}}} 
                                label="Password" variant="outlined" color="primary" 
                                className={isTabletOrMobile? classes.inputStyleMobile:classes.inputStyle}
                            />
                        <Button variant="contained" size={isTabletOrMobile? 'small':'medium'}  className={isTabletOrMobile? classes.formButtonMobile:classes.formButton}>
                            Login
                        </Button>
                        <Button variant="contained" size={isTabletOrMobile? 'small':'medium'} className={isTabletOrMobile? classes.regButtonMobile:classes.regButton}>
                            Register
                        </Button>
                    </FormControl>
            </Dialog>

        </div>
    );
};


export default Login;