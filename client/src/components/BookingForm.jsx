import React, { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField'
import { format } from 'date-fns/esm';
import { toDate } from 'date-fns';
import {Router, Link, navigate} from '@reach/router'
import Box from '@mui/material/Box'
import { useMediaQuery } from 'react-responsive'
import { flexbox, height } from '@mui/system';
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '@mui/material/Button';
import axios from 'axios';



const BookingForm = props => {
    const mainStyle = {
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center',
        margin:'120px',
        // border:'1px solid black',
        width:'50%',
        // marginBottom:'100px',
        paddingBottom:'0px',
        // alignItems: 'flex-start'
    }
    const is4K = useMediaQuery({minDeviceHeight: 900})
    const isMobile = useMediaQuery({ maxHeight: 900, maxWidth: 450 })

    const backgroundStyleDesktop = {
        backgroundImage: "url(/background1.jpg)", 
        backgroundPosition: 'top', 
        backgroundRepeat:'repeat-x', 
        height:'100%'
    }
    const backgroundStyle4k = {
        backgroundImage: "url(/background1.jpg)", 
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
    // const backgroundLayerStyle4k = {
    //     backgroundColor: 'rgba(60, 60, 61, 0.35)', 
    //     position: 'absolute', 
    //     top:'0', 
    //     left:'0', 
    //     width:'100%', 
    //     height:'89.3%'
    // }
    const formStyle ={
        backgroundColor: 'white',
        // width: '40%',
        // height: '500px',
        display: 'flex',
        borderRadius: '5px',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:'100px',
        marginBottom: '50px',
        padding:'50px 95px'
    }
    const inputStyle ={
        margin: '30px',
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(0);
    const [notes, setNotes] = useState("");
    


    const bookHandler = (e)=> {
        let _date = e.target.value
        // let str_date = format(toDate(_date), 'MMddyyyy')
        console.log((_date))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(firstName)
        console.log(notes)
        axios.post('http://localhost:8000/bookings/create', {
            firstName,
            lastName,
            phoneNumber,
            email,
            date,
            notes
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    const handlePhoneNumber = (e)=>{
        console.log(e)
        setPhoneNumber(e)
    }
    return (
        <div>
            <Box className="App-header" style={is4K? backgroundStyle4k:backgroundStyleDesktop}>
                {/* <div style={is4K? backgroundLayerStyle4k: backgroundLayerStyle}>
                </div> */}
                <div style={formStyle}>
                    <form onSubmit={handleSubmit}>
                        <div style={inputStyle}>
                            <h3 style={{color:'black', marginTop:'-40px'}}>Book a Session</h3>

                        </div>
                        <div style={inputStyle}>
                            <TextField 
                                id="outlined-basic" 
                                label="First Name" 
                                variant="outlined" 
                                onChange = {(e)=> setFirstName(e.target.value)}
                            />
                        </div>
                        <div style={inputStyle}>
                            <TextField 
                                id="outlined-basic" 
                                label="Last Name" 
                                variant="outlined" 
                                onChange = {(e)=> setLastName(e.target.value)}
                            />
                        </div>
                        <div style={inputStyle}>
                            <MuiPhoneNumber 
                                defaultCountry={'au'}
                                onChange={handlePhoneNumber}
                            />
                        </div>
                        <div style={inputStyle}>
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                type='email'
                                onChange = {(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div style={inputStyle}>
                            <TextField
                                id="datetime-local"
                                label="Session Date & Time"
                                type="datetime-local"
                                // defaultValue="2017-05-24T10:30"
                                sx={{ width: 250 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> setDate(e.target.value)}
                            />
                        </div>
                        <div style={inputStyle}>
                            <TextField 
                                    id="outlined-basic" 
                                    label="Notes" 
                                    variant="outlined" 
                                    type='textarea'
                                    multiline
                                    rows={3}
                                    maxRows={10}
                                    onChange = {(e)=> setNotes(e.target.value)}
                                />
                        </div>
                        <div style={{display:'flex', justifyContent:'center',}}>
                            <Button  
                                type='submit'
                                style={{width:'85%'}}
                                variant="contained">Submit
                            </Button>
                        </div>


                    </form>                  
                </div>

            </Box>
        </div>


        // <div style = {mainStyle}>
        //     <form action="">
                
        //         <TextField
        //             id="datetime-local"
        //             label="Next appointment"
        //             type="datetime-local"
        //             defaultValue="2017-05-24T10:30"
        //             sx={{ width: 250 }}
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //             onChange={bookHandler}
        //         />
        //     </form>
        // </div>
    );
};


export default BookingForm;