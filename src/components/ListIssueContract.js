import {useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import ListCard from "./ListCard";
import ContractInformartion from "./ContractInformartion";
import AddCardIcon from '@mui/icons-material/AddCard';
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CircleIcon from '@mui/icons-material/Circle';
import ReactDOM from "react-dom/client";
import SetContractStatusModal from "./SetContractStatusModal";
import NewCardFromIssueContractModal from "./NewCardFromIssueContractModal";

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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => {
                setListContract(res['data']['getContractByClientV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record'].filter(
                    (e) => {
                        if (e['contractCategory']['value'].split(";")[0] === "A") {
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

    function handleSetContractStatus(event, contract) {
        ReactDOM.createRoot(document.getElementById('setContractStatus')).render(
            <SetContractStatusModal font={props.font} data={contract} setSnackbarData={props.setSnackbarData}
                                    setOpenSnackbar={props.setOpenSnackbar}
                                    setSelectedContractDataReload={setSelectedContractData}
                                    setListContract={setListContract}
                                    clientID={props.cid}/>
        );
    }

    function handleClickOpenContract(event, contract, i) {
        setCardIsLoading(true);
        setSelectedContractData(contract);
        handleListItemClick(i);
        axios.post("http://localhost:8080/getSubcontractsByPContract", {
            contractIdentifier: contract['contractNumber']['value'],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {
            setListCard(res['data']['getSubcontractsV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record']);
            setCardIsLoading(false);
            setIsDisplayCardAndContractInfo(true);
        });
    }

    function handleClickNewCard(event, e) {
        ReactDOM.createRoot(document.getElementById('newCardFromIssueContract')).render(
            <NewCardFromIssueContractModal font={props.font} data={{
                ...props.clientData,
                contract_id: e['id']['value'],
                CBSNumber: e['cbsnumber'] !== null ? e['cbsnumber']['value'] : "",
                CBSID: e['cbsid'] !== null ? e['cbsid']['value'] : "",
            }}
                                           setSnackbarData={props.setSnackbarData}
                                           setOpenSnackbar={props.setOpenSnackbar}
                                           setListCard={setListCard}
                                           setCardIsLoading={setCardIsLoading}
                                           c_number={e['contractNumber']['value']}/>
        );
    }

    return (
        <Grid container>
            <Grid item xs={6} md={6}>
                <div id="setContractStatus"/>
                <div id="newCardFromIssueContract"/>
                <Box
                    sx={{
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: '100%',
                        height: 540,
                        backgroundColor: 'background.paper',
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
                            <ListItem disablePadding secondaryAction={
                                <div>
                                    <IconButton edge="end" aria-label="status"
                                                onClick={(event) => handleSetContractStatus(event, e)}>
                                        <CircleIcon fontSize="small" sx={{
                                            maxWidth: 14
                                        }} color={e['statusCode']['value'].split(";")[0] === "00" ? "success" : ""}/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="credit-limit" sx={{
                                        mr: 1,
                                    }}>
                                        <AttachMoneyIcon color="primary"/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="add-card" sx={{
                                        mr: 0.5,
                                    }}
                                                onClick={(event) => handleClickNewCard(event, e)}>
                                        <AddCardIcon color="primary"/>
                                    </IconButton>
                                </div>
                            }>
                                <ListItemButton
                                    onClick={(event) => handleClickOpenContract(event, e, i)}
                                    selected={selectedIndex === i}>
                                    <ListItemText primary="Issue Contract" secondary={e['contractNumber']['value']}
                                                  sx={{
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
                    {isDisplayCardAndContractInfo &&
                        <ContractInformartion data={listContract} font={props.font}
                                              selectContract={selectedContractData}
                                              setSnackbarData={props.setSnackbarData}
                                              setOpenSnackbar={props.setOpenSnackbar}
                                              setSelectedContractDataReload={setSelectedContractData}
                                              setListContract={setListContract}
                                              clientID={props.cid}/>
                    }
                </Grid>
                <Grid item xs={6} md={12}>
                    {isDisplayCardAndContractInfo &&
                        <ListCard data={listCard} cardIsLoading={cardIsLoading} setSnackbarData={props.setSnackbarData}
                                  setOpenSnackbar={props.setOpenSnackbar}/>}
                </Grid>
            </Grid>
        </Grid>
    );
}