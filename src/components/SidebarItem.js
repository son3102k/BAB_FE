import "../static/css/SidebarItem.css"
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";


export default function SidebarItem({Icon,hl,to}) {
    return (
        <div className="link" style={hl && {border: "2px solid #42bff5"}}>
            <IconButton component={Link} to={to} disableRipple>
                <Icon color={hl && "primary"} fontSize="large" />
            </IconButton>
        </div>
    );
}