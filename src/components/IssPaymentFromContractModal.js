import { useEffect, useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import RemoveAccents from "../services/RemoveAccents";
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: 16,
    width: 1000,
}));

export default function IssPaymentFromContractModal(props) {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const [amount, setAmount] = useState(0);
    const remark = useRef('');

    useEffect(() => {

    })
    const handleSave = () => {
        axios.post("http://localhost:8080/admin/paymentFromContract", {
            "contractIdentifier": props.data['contractNumber']['value'],
            "amount": amount,
            "transactionDetails": remark.current.value,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {
            if (res['data']['issPaymentFromContractResult']['value']['retCode'] === 0) {
                props.setSnackbarData({
                    severity: "success",
                    message: "Successfully!",
                });
                props.setOpenSnackbar(true);
            } else {
                props.setSnackbarData({
                    severity: "error",
                    message: "Error!!!",
                });
                props.setOpenSnackbar(true);
            }
        });
        handleClose();
    }

    return (
        <div>
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
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Grid container sx={{
                            textAlign: "left",
                            p: 3,
                            pr: 30,
                        }}>
                            <Grid item xs={6} md={12}>
                                <Typography component="h1" variant="h5" fontWeight="500"
                                    color="#000000"
                                    sx={{
                                        mb: 3,
                                    }}>
                                    From Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Typography component="h1" variant="h5" fontWeight="300"
                                    color="#000000"
                                    sx={{
                                        fontSize: 16,
                                    }}>
                                    Card Number
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} mb={3}>
                                <TextField variant="standard"
                                    defaultValue={`${props.data['contractNumber']['value']} - ${props.data['clientFullName']['value']}`}
                                    inputProps={{
                                        readOnly: true,
                                    }} helperText={`Available balance: ${props.data['balance']['value']}`}
                                    fullWidth sx={{
                                        border: "1px solid #f2f2f2",
                                        p: 2
                                    }} />
                            </Grid>
                            <Grid item xs={6} md={12}>
                                <Typography component="h1" variant="h5" fontWeight="500"
                                    color="#000000"
                                    sx={{
                                        mb: 3,
                                    }}>
                                    Deposit
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Typography component="h1" variant="h5" fontWeight="300"
                                    color="#000000"
                                    sx={{
                                        fontSize: 16,
                                    }}>
                                    Amount
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} mb={1}>
                                <FormControl fullWidth sx={{ width: "110%" }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={amount}
                                        type="number"
                                        sx={{
                                            "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
                                                "-webkit - appearance": 'none',
                                                "margin": 0,
                                            }
                                        }}
                                        onChange={e => { setAmount(e.target.value) }}
                                        startAdornment={<InputAdornment position="start">₽</InputAdornment>}
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Typography component="h1" variant="h5" fontWeight="300"
                                    color="#000000"
                                    sx={{
                                        fontSize: 16,
                                    }}>
                                    Remark
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    inputRef={remark}
                                    defaultValue={`Tru tien tu tai khoan ${RemoveAccents.remove(props.data['clientFullName']['value'])}`} sx={{
                                        width: "110%",
                                    }} />
                            </Grid>

                        </Grid>

                        <hr width="95%"></hr>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2, fontSize: 13, p: 1.3, fontWeight: 'bold',
                                backgroundImage: "linear-gradient(120deg,#00bfae 0,#0066ad 100%)",
                                mb: 1
                            }}
                            onClick={handleSave}
                        >
                            Done
                        </Button>
                    </Item>
                </Grid>
            </Modal>
        </div>
    );
}