import CircularProgress from "@mui/material/CircularProgress";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from "@mui/material/Box";
import ReactDOM from "react-dom/client";
import EditCardModal from "./EditCardModal"

export default function ListCard(props) {
    const [listCard, setListCard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = (event, e, i) =>{
        ReactDOM.createRoot(document.getElementById('cardModal')).render(
            <EditCardModal font={props.font} data={props.data[i]} />

        );
    }

    useEffect(() => {
        setListCard(props.data);
        setIsLoading(props.cardIsLoading);
    });

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
            <div id='cardModal'/>
            <List sx={{
                height: "100%",
            }}>
                {isLoading && <CircularProgress sx={{position: "absolute", top: "45%", left: "45%"}} color="primary"/>}
                {(listCard.length > 0 && !isLoading) &&
                    listCard.map((e, i) => (
                        <ListItem disablePadding>
                            <ListItemButton onClick={(event)=>handleEdit(event, e, i)}
                            >
                                <ListItemIcon>
                                    <OpenInNewIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText primary="Card Number"
                                              secondary={e['safeContractNumber']['value'].split(";")[1]}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}