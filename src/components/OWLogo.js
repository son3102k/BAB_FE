import IconButton from "@mui/material/IconButton";
import logo from "../static/assets/OW_Logotype_RGB_99x28_s2.png"
import {Link} from "react-router-dom"

export default function OWLogo(props) {
    return (
        <IconButton component={Link} to="/dashboard" disableRipple>
            <img src={logo} width={180}/>
        </IconButton>
    );
}