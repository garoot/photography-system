import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import Drawer from './DrawerBar';
import Login from './Login';


const Navbar = props => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [navStyle, setNavStyle] = useState({})
    const [openAuth, setOpenAuth] = useState(false)
    const is4K = useMediaQuery({minDeviceWidth: 1800})
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224, maxDeviceWidth:1500 })
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
        else if(is4K){
            setNavStyle({
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0px 460px 0px 450px'
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
                        size="large">
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