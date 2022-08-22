import * as React from 'react';
import {useEffect} from 'react';
import {createTheme} from "@mui/material";
import Sidebar from "../components/Sidebar";
import ManageCardDatagrid from "../components/ManageCardDatagrid";
import Layout from "../components/Layout";
import SidebarItem from "../components/SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";

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


export default function CardManage() {
    useEffect(() => {
        document.title = "Card"
    })
    return (
        <Layout page="manage_card" Sidebar={
            <Sidebar>
                <SidebarItem text="Home" to="/dashboard" Icon={DashboardIcon}/>
                <SidebarItem text="Card" to="/cardmanage" Icon={CreditCardIcon} hl={1}/>
            </Sidebar>} mainContent={<ManageCardDatagrid font={font}/>}>
        </Layout>
    );
}
