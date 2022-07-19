import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from 'react';

import {Link} from "react-router-dom"


export default function MenuDropdown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [item, setItem] = React.useState(null);
    const [page, setPage] = React.useState(props.page);

    const handleClickToggle = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    const handleCloseToggle = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <Button
                key={page.name}
                onClick={handleClickToggle}
                sx={{ my: 2, color: 'black', display: 'block', mr: 3}}
                onMouseOver={handleClickToggle}
            >
                {page.name}
            </Button>
            <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                id={'menu-'+page.name}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseToggle}
                MenuListProps={{ onMouseLeave: handleCloseToggle }}
                getContentAnchorEl={null}
            >
                {page.function.map((func)=>(

                        <MenuItem component={Link} to={`/${func.value}`}>
                            {func.label}
                        </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
