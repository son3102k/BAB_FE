import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import OWLogo from "./OWLogo";
import MenuDropdown from "./MenuDropdown.js";
import {useNavigate} from 'react-router';
import {useEffect, useState} from "react";

const adminPages = [
    {
        name: 'create',
        function: [
            {
                value: 'createcard',
                label: 'Create Card',
            }]
    },
    {
        name: 'action',
        function: [
            {
                value: 'acqpurchase',
                label: 'Acq Purchase',
            },
            {
                value: 'acqbalanceinquiry',
                label: 'Acq Balance Inquiry'
            },
            {
                value: 'clearpinattempt',
                label: 'Clear PIN Attempt'
            },
            {
                value: 'reissuecard',
                label: 'Reissue Card'
            }],
    },
];

const userPages = [
    {
        name: 'Purchase',
        function: [
            {
                value: 'buy',
                label: 'Product',
            },
            {
                value: 'cart',
                label: 'Cart',
            }]
    },
    {
        name: 'action',
        function: [
            {
                value: 'balanceinquiry',
                label: 'Balance Inquiry',
            }],
    }
];
const TopBarNav = (props) => {
    const [pages, setPages] = useState([]);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
        if (props.user) {
            setPages(userPages);
        } else {
            setPages(adminPages);
        }
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('LoggedIn');
        navigate('/');
    }

    return (
        <AppBar position="static" color={"transparent"} sx={{
            backgroundColor: "#ffffff",
            boxShadow: 0,
            width: "100%",
            minWidth: 500,
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <OWLogo user={props.user}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuDropdown page={page}/>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {
                            pages.map((page) => (
                                <MenuDropdown page={page}/>
                            ))}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Son Nguyen" src="/static/assets/avatar.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Container maxWidth="xl" sx={{
                width: 1,
                mt: 1,
                borderBottom: "1px solid #f2f2f2",
            }}/>
        </AppBar>

    );
};
export default TopBarNav;