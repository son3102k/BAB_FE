import * as React from 'react';
import {useEffect} from 'react';
import {createTheme} from "@mui/material";
import Layout from "../components/Layout";
import SidebarItem from "../components/SidebarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BalanceInquiryForm from "../components/BalanceInquiryForm";

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
        document.title = "Balance Inquiry"
    })
    return (
        <Layout page="balance_inquiry" user={true}
                mainContent={<BalanceInquiryForm font={font}/>}>
            
        </Layout>
    );
}
