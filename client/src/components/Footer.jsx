import React from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {Link} from '@reach/router'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import { useMediaQuery } from 'react-responsive'


const Footer = props => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    const footerLinks = {
        display:'flex', 
        justifyContent:'center', 
        marginTop:'70px',
        color:'white',
        textDecoration:'none'
    }
    const footerLinks2 = {
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center',
        marginTop:'-40px',
        color:'white',
        textDecoration:'none'
    }
    const footerNewsletter = {
        display:'flex', 
        justifyContent:'flex-start', 
        // alignItems:'flex-start',
        marginTop:'50px',
        marginBottom:'10px',
        marginRight:'0px',
        // marginLeft: '20px',
        // maxWidth:'100%',
        width:'80%'
    }
    return (
        <div style={{backgroundColor:'#1b1d1c', height:'250px'}}>{!isTabletOrMobile && 
            // <Box style={{backgroundColor:'#1b1d1c', height:'250px'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={1} >
                        <Grid item xs={3} style={footerLinks}>
                                Services
                        </Grid>
                        {/* <Grid item xs={3} style={footerLinks}></Grid> */}
                        <Grid item xs={3} style={footerLinks}>
                            Visit
                        </Grid>
                        <Grid item xs={3} style={footerLinks}>
                            Legal
                        </Grid>
                        <Grid item xs={3} >
                            <FormControl style={{display:'flex', justifyContent:'center', flexDirection:'column',width:'80%'}}>
                                <TextField
                                    id="newsletter"
                                    label="Subscribe to our newsletter"
                                    style={footerNewsletter}
                                    InputLabelProps={{style:{color:'white', fontSize:'7px'}}}
                                    InputProps={{style:{color:'white'}}}
                                />
                                <Button variant="contained" color="secondary" style={{width:'50%'}}>
                                    Subscribe
                                </Button>
                                <FormHelperText></FormHelperText>
                            </FormControl>

                        </Grid>
                        <Grid item xs={3} style={footerLinks2}>
                            <span style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'5px' }}>
                            <Link to="#" style={{textDecoration:'none', color:'grey'}}>
                                Portrait Sessions
                            </Link>    
                            <Link to="#" style={{textDecoration:'none', color:'grey', alignItems:'center', margin:'5px'}}>
                                Video Editing
                            </Link>    
                            </span>
                        </Grid>
                        <Grid item xs={3} style={footerLinks2}>
                            <Link to="#" style={{textDecoration:'none', color:'grey', marginRight:'10px'}}>
                                Twitter
                            </Link>                            
                            <Link to="#" style={{textDecoration:'none', color:'grey', marginLeft:'10px'}}>
                                Instagram
                            </Link>                            
                        </Grid>
                        <Grid item xs={3} style={footerLinks2}>
                            <span style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'5px' }}>
                            <Link to="#" style={{textDecoration:'none', color:'grey'}}>
                                Terms
                            </Link>    
                            <Link to="#" style={{textDecoration:'none', color:'grey', alignItems:'center', margin:'5px'}}>
                                Privacy
                            </Link>    
                            </span>
                        </Grid>


                    </Grid>
                </Container>
            // </Box>
        }
            
        </div>
    );
};



export default Footer;