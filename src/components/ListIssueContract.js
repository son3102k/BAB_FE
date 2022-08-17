import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import ListCard from "./ListCard";
import ContractInformartion from "./ContractInformartion";

export default function ListIssueContract(props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [cardIsLoading, setCardIsLoading] = useState(false);
    const [listContract, setListContract] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [listCard, setListCard] = useState([]);
    const [selectedContractData, setSelectedContractData] = useState();
    const [isDisplayCardAndContractInfo, setIsDisplayCardAndContractInfo] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:8080/getContractByClientID", {
            client: props.cid,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setListContract(res['data']['getContractByClientV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record'].filter(
                    (e) => {
                        if (e['status']['value'].split(";")[0]==="51") {
                            return true;
                        }
                        return false;
                    }));
                setIsLoading(false);
            });
    }, []);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    function handleClickOpenContract(event, contract, i) {
        setCardIsLoading(true);
        setSelectedContractData(contract);
        handleListItemClick(i);
        axios.post("http://localhost:8080/getCardsByContract", {
            contractIdentifier: contract['contractNumber']['value'],
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setListCard(res['data']['getSubcontractsV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record']);
            setCardIsLoading(false);
            setIsDisplayCardAndContractInfo(true);
        });
    }

    return (
        <Grid container>
            <Grid item xs={6} md={6}>
                <Box
                    sx={{
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: '100%',
                        height: 540,
                        bgcolor: 'background.paper',
                        overflow: "auto",
                        direction: "rtl"
                        ,
                        "::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "::-webkit-scrollbar-button": {
                            height: 30,
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
                        {isLoading &&
                            <CircularProgress sx={{position: "absolute", top: "45%", left: "45%"}} color="primary"/>}
                        {listContract.length !== 0 && listContract.map((e, i) => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={(event) => handleClickOpenContract(event, e, i)}
                                    selected={selectedIndex === i}>
                                    <ListItemText primary="Issue Contract" secondary={e['contractNumber']['value']} sx={{
                                        direction: "ltr",
                                    }}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
            <Grid item xs={6} md={6}>
                <Grid item xs={6} md={12}>
                    {isDisplayCardAndContractInfo && <ContractInformartion data={listContract} font={props.font} selectContract={selectedContractData}/>}
                </Grid>
                <Grid item xs={6} md={12}>
                    {isDisplayCardAndContractInfo && <ListCard data={listCard} cardIsLoading={cardIsLoading}/>}
                </Grid>
            </Grid>
        </Grid>
    );
}