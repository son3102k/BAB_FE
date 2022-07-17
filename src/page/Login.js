import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import background from '../static/assets/login-background.png';

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


export default function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 3, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng nhập
                        </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p: 1 }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tên đăng nhập"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lưu thông tin"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container sx={{mb: 3}}>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Đăng ký tài khoản"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        <Copyright sx={{width: '100%', color: '#ffffff', textAlign: 'right', mb: 2}}></Copyright>
    </Container>
    );
}