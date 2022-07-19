import IconButton from "@mui/material/IconButton";
import logo from "../static/assets/OW_Logotype_RGB_99x28_s2.png"
export default function OWLogo(props) {
    return (
        <IconButton>
            <img src={logo} width={180}/>
        </IconButton>
    );
}