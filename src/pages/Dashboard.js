import * as React from 'react';
import {useEffect} from 'react';
import {createTheme} from "@mui/material";
import '../static/css/Dashboard.css'
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import SidebarItem from "../components/SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Charts from "../components/Charts";

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
    useEffect(() => {
        document.title = "Home"
    })
    return (
        <Layout page="dashboard" Sidebar={
            <Sidebar>
                <SidebarItem text="Home" to="/dashboard" Icon={DashboardIcon} hl={1}/>
                <SidebarItem text="Card" to="/cardmanage" Icon={CreditCardIcon}/>
            </Sidebar>}
                mainContent={<Charts/>}>
        </Layout>
    );
}
