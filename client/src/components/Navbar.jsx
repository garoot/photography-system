import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import MediaQuery from 'react-responsive';
import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from 'react';




const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));
const Navbar = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [navStyle, setNavStyle] = useState({})
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    useEffect(()=>{
        if(isDesktopOrLaptop){
            setNavStyle({
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0px 200px'
            })
        }else if(isTabletOrMobile){
            setNavStyle({
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0px 30px'
            })
        }
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
                        className={clsx(open)} 
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Photographer
                    </Typography>
                    <Button variant="contained" color="secondary">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon> 
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us"/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button >
                        <ListItemIcon> 
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};


export default Navbar;