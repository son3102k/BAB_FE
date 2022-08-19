import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import background from '../static/assets/login-background.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {Alert, createTheme, Snackbar} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.openwaygroup.com/">
                openway
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const font = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotify] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        document.title = 'Đăng nhập'
    });

    const handleCloseNotify = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify(false);
    };

    const handleSubmit = async () => {
        const requestBody = {
            email,
            password,
        };
        const response = await axios.post('http://localhost:8080/login', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data['success']) {
            navigate('dashboard');
        } else {
            setNotify(true);
            setPassword('');
        }
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: 'wrap',
                alignItems: "flex-end",
                justifyContent: "center",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "100vh",
            }}>
            <Container component="main" maxWidth="xs" sx={{
                borderRadius: "16px",
                backgroundColor: "#ffffff"
            }}>
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 3, bgcolor: 'primary.main'}}>
                        <LoginOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily}>
                        Chào mừng Quý khách
                    </Typography>
                    <Box noValidate sx={{mt: 1, p: 1}}
                         onKeyDown={(e) => {
                             if (e.key === 'Enter') {
                                 handleSubmit(e);
                             }
                         }}>
                        <Box sx={{display: "flex", alignItems: "flex-end"}}>
                            <PersonOutlineIcon sx={{color: '#33ccff', mr: 1, my: 0.5}}/>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Tên đăng nhập"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                variant="standard"
                                sx={{minWidth: 350}}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box sx={{display: "flex", alignItems: "flex-end"}}>
                            <LockOutlinedIcon sx={{color: '#33ccff', mr: 1, my: 0.5}}/>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{minWidth: 350}}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Box>
                        {/*<FormControlLabel sx={{mt: 2 }}*/}
                        {/*    control={<Checkbox value="remember" color="primary" size="small"/>}*/}
                        {/*    label="Lưu thông tin"*/}
                        {/*/>*/}
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, fontSize: 13, p: 1.3, fontWeight: 'bold',
                                backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)"
                            }}
                            onClick={handleSubmit}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container sx={{mb: 3, mt: 1}}>
                            <Grid item xs>
                                <Link href="#" variant="body2" underline="none" fontWeight="700">
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" underline="none" fontWeight="700">
                                    {"Đăng ký tài khoản"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
            <Copyright sx={{width: '100%', color: '#ffffff', textAlign: 'right', mb: 2}}></Copyright>
            <Snackbar open={notify} autoHideDuration={3000} onClose={handleCloseNotify}>
                <Alert onClose={handleCloseNotify} severity="error" sx={{width: '100%'}}>
                    Tài khoản hoặc mật khẩu không chính xác
                </Alert>
            </Snackbar>
        </Container>
    );
}