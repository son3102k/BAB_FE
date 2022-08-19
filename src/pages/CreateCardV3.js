import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme, useMediaQuery} from "@mui/material";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import '../static/css/CreateClientV3.css'
import TopBarNav from "../components/TopBarNav";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Container from "@mui/material/Container";
import {useLocation} from "react-router-dom";


const font = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    minHeight: '45vh',
    minWidth: 500,
    borderRadius: 16,
    width: "95%",
}));

export default function CreateCardV3() {
    const location = useLocation();

    const matches = useMediaQuery('(min-width:1024px)');

    const [ContractSearchMethod, setContractSearchMethod] = useState('CONTRACT_ID');
    const [ContractIdentifier, setContractIdentifier] = useState(location.state.contract_id);
    const [ContractSubtypeCode, setContractSubtypeCode] = useState(location.state.ContractSubtypeCode);
    const [EmbossedFirstName, setEmbossedFirstName] = useState(location.state.firstName);
    const [EmbossedLastName, setEmbossedLastName] = useState(`${location.state.middleName} ${location.state.lastName}`);
    const EmbossedCompanyName = useRef('');
    const [CardName, setCardName] = useState(`${location.state.lastName} ${location.state.middleName} ${location.state.firstName}`);
    const [ExpirationDate, setExpirationDate] = useState(new Date());
    const [CBSID, setCBSID] = useState(location.state.CBSID);
    const [CBSNumber, setCBSNumber] = useState(location.state.CBSNumber);
    const [Branch, setBranch] = useState(location.state.branch);
    const ProductIdentifier = useRef('');
    const ProductionReason = useRef('');
    ;
    const [ProductCode, setProductCode] = useState('CARDMAIN');
    const EmbossedTitleCode = useRef('');
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Create Card';
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8080/createCard', {
            "contractSearchMethod": ContractSearchMethod,
            "contractIdentifier": location.state.contract_id,
            "productIdentifier": ProductIdentifier.current.value,
            "productCode": ProductCode,
            "embossedTitleCode": EmbossedTitleCode.current.value,
            "productionReason": ProductionReason.current.value,
            "inObject": {
                "branch": Branch,
                "contractSubtypeCode": ContractSubtypeCode,
                "cardName": CardName,
                "expirationDate": ExpirationDate,
                "cbsid": CBSID,
                "cbsNumber": CBSNumber,
                "embossedFirstName": EmbossedFirstName,
                "embossedLastName": EmbossedLastName,
                "embossedCompanyName": EmbossedCompanyName.current.value,
            },
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setOpenDialog(true);
        const {createdCard} = response.data['createCardV3Result']['value'];
        if (createdCard !== null && createdCard !== "undefined") {
            setMessage(response.data['createCardV3Result']['value']['retMsg']['value'] + "\n" +
                response.data['createCardV3Result']['value']['createdCard']['value'])
        } else {
            setMessage(response.data['createCardV3Result']['value']['retMsg']['value']);
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <div>
            <TopBarNav/>
            <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily}
                        color="#000000"
                        sx={{
                            textAlign: "left",
                            fontSize: 42,
                            backgroundColor: "#02e69e",
                            p: 2,
                            color: '#fff',
                            m: 3.5,
                            mt: 2,
                            minHeight: 70,
                        }}>
                CREATE CARD V3
                <div>
                    <Container maxWidth="sm" fullWidth sx={{
                        width: 0.05,
                        mt: 1,
                        borderBottom: "5px solid #fff",
                        float: "left",
                    }}/>
                </div>
            </Typography>
            <Box sx={{flexGrow: 1}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={6} sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mt: 1,
                    p: 1,
                }}>
                    <Grid item xs={matches ? 5 : 12}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={font.typography.fontFamily} color="#000000"
                                        sx={{
                                            m: 1,
                                            mb: 3,
                                        }}>
                                Card Information
                            </Typography>
                            <TextField
                                id="embossedFirstName"
                                label="Embossed First Name"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                value={EmbossedFirstName}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="embossedLastName"
                                label="Embossed Last Name"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                value={EmbossedLastName}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="embossedCompanyName"
                                label="Embossed Company Name"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={EmbossedCompanyName}
                            />
                            <TextField
                                id="CardName"
                                label="Card Name"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                value={CardName}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="CBSNumber"
                                label="CBS Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                value={CBSNumber}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="CBSID"
                                label="CBSID"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                value={CBSID}
                                inputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="Branch"
                                label="Branch"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                value={Branch}
                                inputProps={{
                                    readOnly: true
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="ExpirationDate"
                                    label="Expiration Date"
                                    inputFormat="yyyy/MM/dd"
                                    onChange={(e) => setExpirationDate(e)}
                                    value={ExpirationDate}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "46%", m: 1}}/>}
                                />
                            </LocalizationProvider>
                        </Item>
                    </Grid>
                    <Grid item xs={matches ? 5 : 12}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={font.typography.fontFamily} color="#000000"
                                        sx={{
                                            m: 1,
                                            mb: 3,
                                        }}>
                                Other Information
                            </Typography>
                            <TextField
                                id="ProductIdentifier"
                                label="Product Identifier"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={ProductIdentifier}
                            />
                            <TextField
                                id="ProductCode"
                                label="Product Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                value={ProductCode}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="ProductionReason"
                                label="Production Reason"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={ProductionReason}
                            />
                            <TextField
                                id="EmbossedTitleCode"
                                label="Embossed Title Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={EmbossedTitleCode}
                            />

                        </Item>
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2, fontSize: 13, p: 1.3, fontWeight: 'bold',
                                backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)"
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <div>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Result"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
