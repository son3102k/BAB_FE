import * as React from 'react';
import {useEffect } from "react";
import {createTheme} from "@mui/material";
import '../static/css/CreateClientV3.css'
import TopBarNav from "../components/TopBarNav";
import Sidebar from "../components/Sidebar";
import DataGridDemo from "../components/DataGridDemo";
import Grid from "@mui/material/Grid";

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



export default function Dashboard() {
    useEffect(()=>{
        document.title = "Home"
    })
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={6} md={12}>
                    <TopBarNav />
                </Grid>
                <Grid item xs={6} md={2}>
                    <Sidebar />
                </Grid>
            </Grid>
        </div>
    );
}
