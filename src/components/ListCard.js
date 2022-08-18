import CircularProgress from "@mui/material/CircularProgress";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from "@mui/material/Box";
import ReactDOM from "react-dom/client";
import EditCardModal from "./EditCardModal";
import axios from "axios";

export default function ListCard(props) {
    const [listCard, setListCard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const handleClickCard = (event, e) =>{
        console.log(e['id']['value']);
        axios.post("http://localhost:8080/getCardByContractID", {
            "contractIdentifier": e['id']['value'],
        }, {
            headers: {
                ContentType: "application/json"
            }
        }).then(res => {
            console.log(res['data']);
            if (res['data']['getCardResult']['value']['retCode'] === 0) {
                ReactDOM.createRoot(document.getElementById('cardModal')).render(
                    <EditCardModal font={props.font} data={res['data']['getCardResult']['value']['outObject']['value']['cardDetailsAPIRecord']} />
                );
                
            }
            else {
                setSeverity("error");
                setMessage("Error!!!");
                setOpenSnackbar(true);
            }
        });
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
                            <ListItemButton onClick={(event)=>handleClickCard(event, e)}
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