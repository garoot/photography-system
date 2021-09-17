import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import React, { useEffect, useState } from 'react';
import { navigate, Link } from '@reach/router';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PublishIcon from '@material-ui/icons/Publish';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TheatersIcon from '@material-ui/icons/Theaters';

const drawerWidth = 235;
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
        backgroundColor: '#52aeca83'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerButtons: {
        '&:hover':{
            backgroundColor: '#285664e5',
            border: '1px solid transparent',
            borderRadius: '2px',
            color: 'white'
        },
        color:'black',
    },
    drawerCloseIcon: {
        '&:hover':{
            backgroundColor: '#285664e5',
            border: '1px solid transparent',
            borderRadius: '100px',
            color: 'white'
        }
    }
}));
const DrawerBar = props => {
    const {open, setOpen} = props;
    const [openDrawer, setOpenDrawer] = useState(false)
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClickAway = ()=> {
        console.log(openDrawer)
        if(openDrawer){
            // setOpen(false)
            setOpenDrawer(false)
            setOpen(false)
        }
    }

    useEffect(()=>{
        setOpenDrawer(open)
    }, [open])

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
        };
    return (
        <div>
            <SwipeableDrawer
                className={classes.drawer}
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} className={classes.drawerCloseIcon}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/photos/manage" style={{textDecoration:'none'}}>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Manage Photos"/>
                            </ListItem>
                        </Link>
                        <Link to="/gallery" style={{textDecoration:'none'}}>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <TheatersIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Gallery"/>
                            </ListItem>
                        </Link>
                        <Link to="#" style={{textDecoration:'none'}}>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <PhotoAlbumIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Photos"/>
                            </ListItem>
                        </Link>
                        <Link to="#" style={{textDecoration:'none'}}>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <EventAvailableIcon />
                                </ListItemIcon>
                                <ListItemText primary="Book a Session"/>
                            </ListItem>                        
                        </Link>

                    </List>
                    <Divider />
                    <List>
                        <Link to="contact" style={{textDecoration:'none'}}>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact Us"/>
                            </ListItem>                        
                        </Link>

                    </List>
            </SwipeableDrawer>
            
        </div>
    );
};



export default DrawerBar;