import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SidebarItem from "./SidebarItem";
import "../static/css/Sidebar.css"

export default function Sidebar() {
    return(
        <div className="sidebar">
            <SidebarItem text="Home" to="/dashboard" Icon={DashboardIcon}/>
            <SidebarItem text="Card"  to="/cardmanage" Icon={CreditCardIcon} />
        </div>
    );
}
