import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import MediaQuery from 'react-responsive';
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { ClickAwayListener } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import Drawer from './DrawerBar';
import Login from './Login';


const Navbar = props => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [navStyle, setNavStyle] = useState({})
    const [openAuth, setOpenAuth] = useState(false)
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleAuthOpen = () => {
        setOpenAuth(true)
    }
    useEffect(()=>{
        if(isDesktopOrLaptop){
            setNavStyle({
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0px 220px 0px 200px'
            })
        }else if(isTabletOrMobile){
            setNavStyle({
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0px 30px'
            })
        }
        setOpenDrawer(false)
    }, [])

    return (
        <div>
            <AppBar position="fixed" color="primary">
                <Toolbar style={navStyle}>
                    <IconButton             
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(openDrawer)} 
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" onClick={()=> navigate('/')} style={{cursor: 'pointer'}}>
                        Photographer
                    </Typography>
                    <Button onClick={handleAuthOpen} variant="contained" color="secondary" style={{color: 'rgba(28, 65, 68, 0.904)', fontWeight:'bold'}}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer 
                open={openDrawer}
                setOpen={setOpenDrawer}
            />
            <Login 
                open={openAuth}
                setOpen={setOpenAuth}
            />
            
        </div>
    );
};


export default Navbar;