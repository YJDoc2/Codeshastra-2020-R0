import React from 'react';
import {
    Grid,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Button,
    makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
});

function NavBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (side, open) => event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button>
                    <NavLink
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontFamily: 'Roboto'
                        }}
                        to=''
                    >
                        <ListItemText>Home</ListItemText>
                    </NavLink>
                </ListItem>
                <Divider />
                <ListItem button>
                    <NavLink
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontFamily: 'Roboto'
                        }}
                        to='/login'
                    >
                        <Typography>Login</Typography>
                    </NavLink>
                </ListItem>
                <Divider />
                <ListItem button>
                    <NavLink
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontFamily: 'Roboto'
                        }}
                        to='/upload'
                    >
                        <Typography>Alert Us</Typography>
                    </NavLink>
                </ListItem>
                <Divider />
                <ListItem button>
                    <NavLink
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontFamily: 'Roboto'
                        }}
                        to='/NGO'
                    >
                        <Typography>Visit NGO Profile</Typography>
                    </NavLink>
                </ListItem>
                <Divider />
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <AppBar position='static'>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={toggleDrawer('left', true)}
                                edge='start'
                                color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Drawer
                            open={state.left}
                            onClose={toggleDrawer('left', false)}
                        >
                            {sideList('left')}
                        </Drawer>
                        <Grid item xs={10}>
                            <Typography variant='h4'>Divya Seva</Typography>
                        </Grid>
                        <NavLink
                            style={{ textDecoration: 'none', color: 'white' }}
                            to='/login'
                        >
                            <Grid item xs={1}>
                                <Button size='large' color='inherit'>
                                    Login
                                </Button>
                            </Grid>
                        </NavLink>
                    </Grid>
                </Toolbar>
            </AppBar>
            <br />
            <br />
        </React.Fragment>
    );
}

export default NavBar;
