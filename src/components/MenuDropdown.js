import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import * as React from 'react';
import {useEffect} from "react";



export default function MenuDropdown(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [item, setItem] = React.useState(null);
    const [page, setPage] = React.useState(props.page);

    const handleClickRedirect = () => {
        console.log(item);
    }

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
                sx={{ my: 2, color: 'black', display: 'block' }}
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
                    <MenuItem onClick={()=> console.log(func.value)}>
                        {func.label}
                    </MenuItem>
                ))}

            </Menu>
        </div>
    );
}
