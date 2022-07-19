import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material";
import '../static/css/CreateClientV3.css'
import TopBarNav from "../components/TopBarNav";

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

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '80vh',
    minWidth: 500,
    borderRadius: 16,
    width: "95%"
}));

export default function CreateCardV3() {

    useEffect(() => {
        document.title = 'Create Card V3';
    });

    const handleSubmit = (event) => {
        console.log('Submited');
    }
    return (
        <div>
            <TopBarNav />
            <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily} color="#000000"
                        sx={{
                            mt: 2,
                            textAlign: "center",
                            fontSize: 40
                        }}>
                Create Card V3
            </Typography>
            <Box sx={{flexGrow: 1}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mt: 1,
                    p: 1,
                }}>

                    <Button
                        type="submit"

                        variant="contained"
                        sx={{mt : 5, fontSize: 13, p: 1.3 ,fontWeight: 'bold',
                            backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)"}}
                    >
                        Submit
                    </Button>
                </Grid>
            </Box>
        </div>
    );
}
