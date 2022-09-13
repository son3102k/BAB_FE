import * as React from 'react';
import { useEffect, useState, useRef} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {Alert, Snackbar} from "@mui/material";
import ReactDOM from "react-dom/client";
import MainModal from "./MainModal";
import axios from "axios";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export default function BalanceInquiryForm({ font }) {
    const cardNumber = useRef('');
    const [amountAvailable, setAmountAvailable] = useState('');
    const [creditLimit, setCreditLimit] = useState('');
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        severity: "success",
        message: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        minHeight: '50vh',
        minWidth: 500,
        borderRadius: 16,
        width: "95%",
    
    }));

    const handleSubmit = () => {
        axios.post("http://localhost:8080/acqBalanceInquiry", {
            "contractIdentifier": cardNumber.current.value,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {
            if (res['data']['acqBalanceInquiryResult']['value']['retCode'] === 0) {
                // alert(res.data['acqBalanceInquiryResult']['value']['balanceInfo']['value']);
                setAmountAvailable(res.data['acqBalanceInquiryResult']['value']['balanceInfo']['value'].split(';')[0]);
                setCreditLimit(res.data['acqBalanceInquiryResult']['value']['balanceInfo']['value'].split(';')[1])

                setSnackbarData({
                    severity: "success",
                    message: "Successfully!",
                });
                setOpenSnackbar(true);
            } else {
                alert(res.data['acqBalanceInquiryResult']['value']['retMsg']['value']);
            }
        });
    }

    useEffect(() => {

    });



    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={5} sx={{
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
                                Card Number
                            </Typography>

                            <TextField
                                id="cardNumber"
                                label="Card Number"
                                size="small"
                                sx={{
                                    width: "93%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={cardNumber}
                                defaultValue={cardNumber.current.value}
                                autoComplete="off"
                            />
                            <Typography component="h1" variant="h5" fontWeight="500"
                                        fontFamily={font.typography.fontFamily} color="#e60b0b"
                                        sx={{
                                            m: 1,
                                            mb: 3,
                                        }}>
                                Attention: Each request requires fee !!!
                            </Typography>
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
                                Result
                            </Typography>
                            <TextField
                                id="amountAvailable"
                                label="Amount Available"
                                size="small"
                                sx={{
                                    width: "90%",
                                    m: 1,
                                }}
                                value={amountAvailable}
                                autoComplete="off"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="creditLimit"
                                label="Credit Limit"
                                size="small"
                                sx={{
                                    width: "90%",
                                    m: 1,
                                    mb: 2,
                                }}
                                value={creditLimit}
                                autoComplete="off"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                          
                            
                        </Item>
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Button
                            onClick={handleSubmit}
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
