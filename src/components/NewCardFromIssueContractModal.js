import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import RemoveAccents from "../services/RemoveAccents";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: 16,
    width: "80%",
}));

export default function NewCardFromIssueContractModal(props) {
    const [open, setOpen] = useState(true);
    const EmbossedFirstName = useRef(RemoveAccents.remove(props.data.firstName));
    const EmbossedLastName = useRef(RemoveAccents.remove(`${props.data.middleName} ${props.data.lastName}`));
    const EmbossedCompanyName = useRef('');
    const [CardName, setCardName] = useState(RemoveAccents.remove(`${props.data.lastName} ${props.data.middleName} ${props.data.firstName}`));
    const [ExpirationDate, setExpirationDate] = useState(new Date());
    const CBSID = useRef(props.data.CBSID);
    const CBSNumber = useRef(props.data.CBSNumber);
    const [Branch, setBranch] = useState(props.data.branch);
    const ProductIdentifier = useRef('');
    const ProductionReason = useRef('');
    ;
    const [ProductCode, setProductCode] = useState('CARDMAIN');
    const EmbossedTitleCode = useRef('');
    const handleClose = () => {
        setOpen(false);
    }

    function handleSubmit() {
        axios.post('http://localhost:8080/createCard', {
            "contractIdentifier": props.data.contract_id,
            "productIdentifier": ProductIdentifier.current.value,
            "productCode": ProductCode,
            "embossedTitleCode": EmbossedTitleCode.current.value,
            "productionReason": ProductionReason.current.value,
            "inObject": {
                "branch": Branch,
                "cardName": CardName,
                "cbsid": CBSID.current.value,
                "cbsNumber": CBSNumber.current.value,
                "embossedFirstName": EmbossedFirstName.current.value,
                "embossedLastName": EmbossedLastName.current.value,
                "embossedCompanyName": EmbossedCompanyName.current.value,
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

            }
        }).then((res) => {
            if (res['data']['createCardV3Result']['value']['retCode'] === 0) {
                const cardNumber = res.data['createCardV3Result']['value']['cardNumber']['value'];
                props.setOpenSnackbar(true);
                props.setSnackbarData({
                    severity: "success",
                    message: `Successfully create card: ${cardNumber}`,
                });
                props.setCardIsLoading(true);
                axios.post("http://localhost:8080/getSubcontractsByPContract", {
                    contractIdentifier: props.c_number,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                }).then(res => {
                    props.setListCard(res['data']['getSubcontractsV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record']);
                    props.setCardIsLoading(false);
                });
            } else {
                props.setOpenSnackbar(true);
                props.setSnackbarData({
                    severity: "error",
                    message: res['data']['createCardV3Result']['value']['retMsg']['value']
                });
            }
        });
        handleClose();
    }

    useEffect(() => {
    },[props.data]);

    return (
        <Modal
            open={open}
        >
            <Grid item xs={6} md={12} sx={{
                display: "flex", justifyContent: "center", position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Item>
                    <Box sx={{
                        height: 20,
                        textAlign: "right",
                    }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Typography component="h1" variant="h5" fontWeight="800"
                                fontFamily={props.font.typography.fontFamily} color="#000000"
                                sx={{
                                    m: 1,
                                    mb: 3,
                                }}>
                        NEW CARD
                    </Typography>
                    <TextField
                        id="embossedFirstName"
                        label="Embossed First Name"
                        size="small"
                        sx={{
                            width: "47%",
                            m: 1,
                        }}
                        defaultValue={EmbossedFirstName.current}
                        inputRef={EmbossedFirstName}
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
                        defaultValue={EmbossedLastName.current}
                        inputRef={EmbossedLastName}
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
                        defaultValue={EmbossedCompanyName.current}
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
                        defaultValue={CBSNumber.current}
                        inputRef={CBSNumber}
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
                        defaultValue={CBSID.current}
                        inputRef={CBSID}
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
                    <TextField
                        id="ProductIdentifier"
                        label="Product Identifier"
                        size="small"
                        sx={{
                            width: "47%",
                            m: 1,
                        }}
                        inputRef={ProductIdentifier}
                        defaultValue={ProductIdentifier.current}
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
                        defaultValue={ProductionReason.current}
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
                        defaultValue={EmbossedTitleCode.current}
                    />

                    <Button
                        variant="contained"
                        sx={{
                            mt: 2, fontSize: 13, p: 1.3, fontWeight: 'bold',
                            backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)",
                            mb: 1
                        }}
                        onClick={handleSubmit}
                    >
                        NEW CARD
                    </Button>
                </Item>
            </Grid>


        </Modal>
    );
}