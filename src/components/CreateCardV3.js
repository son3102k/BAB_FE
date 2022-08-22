import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function CreateCardV3(props) {
    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    const [ContractSubtypeCode, setContractSubtypeCode] = useState(props.globalData.ContractSubtypeCode);
    const [EmbossedFirstName, setEmbossedFirstName] = useState(removeAccents(props.globalData.firstName));
    const [EmbossedLastName, setEmbossedLastName] = useState(removeAccents(`${props.globalData.middleName} ${props.globalData.lastName}`));
    const EmbossedCompanyName = useRef('');
    const [CardName, setCardName] = useState(removeAccents(`${props.globalData.lastName} ${props.globalData.middleName} ${props.globalData.firstName}`));
    const [ExpirationDate, setExpirationDate] = useState(new Date());
    const [CBSID, setCBSID] = useState(props.globalData.CBSID);
    const [CBSNumber, setCBSNumber] = useState(props.globalData.CBSNumber);
    const [Branch, setBranch] = useState(props.globalData.branch);
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

    const handleSubmit = () => {
        axios.post('http://localhost:8080/createCard', {
            "contractIdentifier": props.globalData.contract_id,
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
        }).then((res) => {
            if (res['data']['createCardV3Result']['value']['retCode'] === 0) {
                const card_id = res.data['createCardV3Result']['value']['createdCard']['value'];
                props.setGlobalData((prev) => ({
                    ...prev,
                    card_id,
                }));
                props.setActiveStep(props.activeStep + 1);
            } else {
                setOpenDialog(true);
                setMessage(res['data']['createCardV3Result']['value']['retMsg']['value']);
            }
        });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={6} sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mt: 1,
                    p: 1,
                }}>
                    <Grid item xs={6}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={props.font.typography.fontFamily} color="#000000"
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
                                required
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
                    <Grid item xs={6}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={props.font.typography.fontFamily} color="#000000"
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
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                mt: 2, fontSize: 13, p: 1.3, fontWeight: 'bold',
                                backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)"
                            }}
                        >
                            Finish
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
