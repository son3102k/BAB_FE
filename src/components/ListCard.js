import CircularProgress from "@mui/material/CircularProgress";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useEffect, useState} from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from "@mui/material/Box";
import ContractInformartion from "./ContractInformartion";
import Grid from "@mui/material/Grid";

export default function ListCard(props) {

    const [listCard, setListCard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setListCard(props.data);
        setIsLoading(props.cardIsLoading);
    })
    return (
        <Box
            sx={{
                borderBottomRightRadius: 20,
                width: '100%',
                height: 280,
                bgcolor: 'background.paper',
                overflow: "auto",
                direction: "rtl",
                "::-webkit-scrollbar": {
                    width: "6px",
                },
                "::-webkit-scrollbar-button": {
                    height: 11,
                },
                "::-webkit-scrollbar-track": {
                    background: "gainsboro",
                    borderRadius: "5px",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                },
            }}
        >
            <List sx={{
                height: "100%",
            }}>
                {isLoading && <CircularProgress sx={{position: "absolute", top: "45%", left: "45%"}} color="primary"/>}
                {(listCard.length > 0 && !isLoading) &&
                    listCard.map((e, i) => (
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <OpenInNewIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Card" secondary={e['cardNumber']['value']}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}