import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme, MenuItem, useMediaQuery} from "@mui/material";
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

export default function CreateContractV4() {
    const matches = useMediaQuery('(min-width:1024px)');

    const [ContractNumber, setContractNumber] = useState('');
    const [ContractName, setContractName] = useState('');
    const [CBSID, setCBSID] = useState('');
    const [CBSNumber, setCBSNumber] = useState('');
    const [ContractSubtypeCode, setContractSubtypeCode] = useState('');
    const [Currency, setCurrency] = useState('');
    const [Product, setProduct] = useState('');
    const [ProductCode, setProductCode] = useState('');
    const [ContractRelation, setContractRelation] = useState('');
    const [ClientIdentifier,setClientIdentifier] = useState('');
    const [ CloseDate,setCloseDate] = useState(new Date());
    const [institutionBranchCode, setInstitutionBranchCode] = useState('');
    const [branch, setBranch] = useState('');
    const [reason,setReason] = useState('');
    const [reasonCode, setreasonCode] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [message,setMessage] = useState('');

    useEffect(() => {
        document.title = 'Create Contract V4';
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8080/createcontract',{
            reason,
            institutionBranchCode,
            "inObject": {
                branch,
            }
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setOpenDialog(true);
        setMessage(response.data['createClientV3Result']['value']['retMsg']['value']);
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
                            backgroundColor: "#88cc00",
                            p: 2,
                            color: '#fff',
                            m: 3.5,
                            mt: 2,
                            minHeight: 70,
                        }}>
                CREATE CONTRACT V4
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
                                Contract Information
                            </Typography>
                            <TextField
                                id="ContractNumber"
                                label="Contract Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setContractNumber(e.target.value)}
                                required
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
                                onChange={(e) => setContractName(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="CloseDate"
                                    label="Close Date"
                                    inputFormat="MM/dd/yyyy"
                                    onChange={(e) => setCloseDate(e)}
                                    value={CloseDate}
                                    renderInput={(params) => <TextField {...params} size="small" required
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
                                onChange={(e) => setCBSID(e.target.value)}
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
                                onChange={(e) => setCBSNumber(e.target.value)}
                            />
                            <TextField
                                id="ContractSubtypeCode"
                                label="Contract Subtype Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setContractSubtypeCode(e.target.value)}
                                required
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
                                onChange={(e) => setCurrency(e.target.value)}
                            />
                            <TextField
                                id="Product"
                                label="Product"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setProduct(e.target.value)}
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
                            />
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
                                id="InstitutionBranchCode"
                                label="Institution Branch Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setInstitutionBranchCode(e.target.value)}
                                required
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
                                required
                            />
                            <TextField
                                id="ClientIdentifier"
                                label="Client Identifier"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setClientIdentifier(e.target.value)}
                                required
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
                                onChange={(e) => setContractRelation(e.target.value)}
                                required
                            />
                            <TextField
                                id="reason"
                                label="reason"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setReason(e.target.value)}
                                required
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
                                onChange={(e) => setreasonCode(e.target.value)}
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
