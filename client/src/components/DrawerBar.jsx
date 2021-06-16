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
import { navigate } from '@reach/router';
import { ClickAwayListener } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


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
        // backgroundColor: '#bd4341'
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
        }
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
            {/* <ClickAwayListener onClickAway={openDrawer && handleClickAway}>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={openDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                > */}
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
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact Us"/>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button className={classes.drawerButtons}>
                                <ListItemIcon> 
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact Us"/>
                            </ListItem>
                        </List>
                </SwipeableDrawer>
                {/* </Drawer>
            </ClickAwayListener> */}
            
        </div>
    );
};



export default DrawerBar;