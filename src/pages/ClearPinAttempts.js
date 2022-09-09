import * as React from 'react';
import {useEffect} from 'react';
import {createTheme} from "@mui/material";
import Sidebar from "../components/Sidebar";
import ManageCardDatagrid from "../components/ManageCardDatagrid";
import Layout from "../components/Layout";
import SidebarItem from "../components/SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ClearPinAttemptsForm from "../components/ClearPinAttemptsForm";

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


export default function ClearPinAttempts() {
    useEffect(() => {
        document.title = "Clear Pin"
    })
    return (
        <Layout page="manage_card" Sidebar={
            <Sidebar>
                <SidebarItem text="Home" to="/dashboard" Icon={DashboardIcon}/>
                <SidebarItem text="Card" to="/cardmanage" Icon={CreditCardIcon} hl={1}/>
            </Sidebar>}mainContent={<ClearPinAttemptsForm font={font}/>}>
        </Layout>
    );
}
