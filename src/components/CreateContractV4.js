import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material";
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

export default function CreateContractV4(props) {
    const ContractName = useRef('');
    const ServiceGroup = useRef('');
    const CBSID = useRef('');
    const CBSNumber = useRef('');
    const ContractSubtypeCode = useRef('');
    const Currency = useRef('');
    const Product = useRef('');
    const [ProductCode, setProductCode] = useState('ISSDEB');
    const ContractRelation = useRef('');
    const InstitutionCode = useRef('');
    const [CloseDate, setCloseDate] = useState(new Date());
    const [institutionBranchCode, setInstitutionBranchCode] = useState(props.globalData.institutionBranchCode);
    const [branch, setBranch] = useState(props.globalData.branch);
    const reason = useRef('');
    const reasonCode = useRef('');
    const ClientScope = useRef('');
    const FieldsToClear = useRef('');

    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Create Contract';
    });

    const handleSubmit = () => {
        axios.post('http://localhost:8080/createContract', {
            "clientScope": ClientScope.current.value,
            "clientIdentifier": props.globalData.client_id,
            "contractRelation": ContractRelation.current.value,
            "reasonCode": reasonCode.current.value,
            "reason": reason.current.value,
            "fieldsToClear": FieldsToClear.current.value,
            "createContractInObject": {
                "branch": branch,
                "serviceGroup": ServiceGroup.current.value,
                "institutionCode": InstitutionCode.current.value,
                "contractSubtypeCode": ContractSubtypeCode.current.value,
                "currency": Currency.current.value,
                "product": Product.current.value,
                "productCode": ProductCode,
                "contractName": ContractName.current.value,
                "cbsid": CBSID.current.value,
                "cbsNumber": CBSNumber.current.value,
                "closeDate": CloseDate,
            },
            "setCustomDataInObject": {
                "addInfoType": "",
                "tagName": "",
                "tagValue": ""
            },
            "userInfo": ""
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            if (res['data']['createContractV4Result']['value']['retCode'] === 0) {
                const contract_id = res.data['createContractV4Result']['value']['createdContract']['value'];
                props.setGlobalData((prev)=>({
                    ...prev,
                    contract_id,
                    CBSNumber: CBSNumber.current.value,
                    CBSID: CBSID.current.value,
                    ContractSubtypeCode: ContractSubtypeCode.current.value,
                }));
                props.setActiveStep(props.activeStep + 1);
            } else {
                setOpenDialog(true);
                setMessage(res['data']['createContractV4Result']['value']['retMsg']['value']);
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
                                        fontFamily={font.typography.fontFamily} color="#000000"
                                        sx={{
                                            m: 1,
                                            mb: 3,
                                        }}>
                                Contract Information
                            </Typography>
                            <TextField
                                id="ServiceGroup"
                                label="Service Group"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={ServiceGroup}
                                autoComplete="off"
                            />
                            <TextField
                                id="ContractName"
                                label="Contract Name"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={ContractName}
                                autoComplete="off"
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="CloseDate"
                                    label="Close Date"
                                    inputFormat="yyyy/MM/dd"
                                    onChange={(e) => setCloseDate(e)}
                                    value={CloseDate}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "30%", m: 1}}/>}

                                />
                            </LocalizationProvider>
                            <TextField
                                id="CBSID"
                                label="CBSID"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                }}
                                inputRef={CBSID}
                                autoComplete="off"

                            />
                            <TextField
                                id="CBSNumber"
                                label="CBS Number"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={CBSNumber}
                                autoComplete="off"

                            />
                            <TextField
                                id="ContractSubtypeCode"
                                label="Contract Subtype Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={ContractSubtypeCode}
                                autoComplete="off"
                            />
                            <TextField
                                id="Currency"
                                label="Currency"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={Currency}
                                autoComplete="off"
                            />
                            <TextField
                                id="Product"
                                label="Product"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={Product}
                                autoComplete="off"
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
                                onChange={(e) => setProductCode(e.target.value)}
                                value={ProductCode}
                                autoComplete="off"
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
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
                                id="InstitutionBranchCode"
                                label="Institution Branch Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                value={institutionBranchCode}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="Branch"
                                label="Branch"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                onChange={(e) => setBranch(e.target.value)}
                                value={branch}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="reason"
                                label="reason"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={reason}
                                autoComplete="off"
                                defaultValue="Tao the"
                            />
                            <TextField
                                id="reasonCode"
                                label="reason Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={reasonCode}
                                autoComplete="off"
                            />
                            <TextField
                                id="InstitutionCode"
                                label="Institution Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                            <TextField
                                id="ClientScope"
                                label="Client Scope"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={ClientScope}
                                autoComplete="off"
                            />
                            <TextField
                                id="FieldsToClear"
                                label="Fields To Clear"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={FieldsToClear}
                                autoComplete="off"
                            />
                            <TextField
                                id="ContractRelation"
                                label="Contract Relation"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={ContractRelation}
                                autoComplete="off"
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
                            Next
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
