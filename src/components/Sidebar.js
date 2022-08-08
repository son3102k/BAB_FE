import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SidebarItem from "./SidebarItem";
import "../static/css/Sidebar.css"

export default function Sidebar(props) {
    return(
        <div className="sidebar">
            {props.children}
        </div>
    );
}
