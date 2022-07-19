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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import OWLogo from "./OWLogo";
import MenuDropdown from "./MenuDropdown.js";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [
    {
    name: 'Clients',
    function: [
        {
            value:'CreateClientV3',
            label: 'Create Client V3',
        },
        {
            value: 'CreateClientV4',
            label: 'Create Client V4',
        }],
    },
    {
        name: 'Cards',
        function: [
            {
                value:'CreateCardV3',
                label: 'Create Card V3',
            },
            {
                value: 'CreateCardV4',
                label: 'Create Card V4',
            }],
    },
    {
        name: 'Contract',
        function: [
            {
                value:'CreateContractV3',
                label: 'Create Contract V3',
            },
            {
                value: 'CreateContractV4',
                label: 'Create Contract V4',
            }],
    },
];
const TopBarNav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        // console.log(anchorElNav)
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


    return (
            <AppBar position="static" color={"transparent"} sx={{
                boxShadow: 0,
                width: "100%",
                minWidth: 500,
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <OWLogo />
                        {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>*/}
                            {/*<IconButton*/}
                            {/*    size="large"*/}
                            {/*    aria-label="account of current user"*/}
                            {/*    aria-controls="menu-appbar"*/}
                            {/*    aria-haspopup="true"*/}
                            {/*    onClick={handleOpenNavMenu}*/}
                            {/*    color="inherit"*/}
                            {/*>*/}
                            {/*    <MenuIcon />*/}
                            {/*</IconButton>*/}
                            {/*<Menu*/}
                            {/*    id="menu-appbar"*/}
                            {/*    anchorEl={anchorElNav}*/}
                            {/*    anchorOrigin={{*/}
                            {/*        vertical: 'bottom',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    keepMounted*/}
                            {/*    transformOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    open={Boolean(anchorElNav)}*/}
                            {/*    onClose={handleCloseNavMenu}*/}
                            {/*    sx={{*/}
                            {/*        display: { xs: 'block', md: 'none' },*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {pages.map((page) => (*/}
                            {/*        <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                            {/*            <Typography textAlign="center">{page}</Typography>*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</Menu>*/}
                        {/*</Box>*/}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page)=>(
                                <MenuDropdown page={page} />
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Son Nguyen" src="/static/assets/avatar.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
                <Container maxWidth="xl" sx={{
                    width: 0.96,
                    mt: 1,
                    borderBottom: "1px solid black",
                 }}/>
            </AppBar>

    );
};
export default TopBarNav;