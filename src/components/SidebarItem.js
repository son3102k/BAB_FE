import "../static/css/SidebarItem.css"
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";


export default function SidebarItem({Icon , active, to}) {
        return (
            <div className="link">
                <IconButton component={Link} to={to} disableRipple>
                    <Icon color={active && "primary" } fontSize="large" />
                </IconButton>
            </div>
        );
    }