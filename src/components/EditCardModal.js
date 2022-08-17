import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IssueContract from "./IssueContract";
import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: 16,
    width: "80%",
}));

export default function EditCardModal(props) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    const branch = useRef(props.data['branch']['value'].split(";")[1])
    const contractName = useRef(props.data['contractName']['value'])
    const clientFullName = useRef(props.data['clientFullName']['value']);
    const contractNumber = useRef(props.data['contractNumber']['value']);
    const status = useRef(props.data['status']['value'].split(';')[1]);
    const balance = useRef(props.data['balance']['value']);

    console.log(props.data);

    useEffect(() => {
        branch.current = props.data['branch']['value'];
        clientFullName.current = props.data['clientFullName']['value'];
        contractName.current = props.data['contractName']['value'];
        contractNumber.current = props.data['contractNumber']['value'];
        status.current = props.data['status']['value'].split(";")[1];
        balance.current = props.data['balance']['value'];
    }, [props.data])
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const handleSave = () => {
        axios.post("http://localhost:8080/editCard", {
            "contractIdentifier": contractNumber.current.value,
            "reason": "Edit Card",
            "inObject": {
                "branch": branch.current.value,
                "cardName": contractName.current.value,

            },
        }, {
            headers: {
                ContentType: "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res['data']['editCardV2Result']['value']['retCode'] === 0) {
                setSeverity("success");
                setMessage("Successfully!");
                setOpenSnackbar(true);
            }
            else {
                setSeverity("error");
                setMessage("Error!!!");
                setOpenSnackbar(true);
            }
        });
        handleClose();
    }

    return (

        <div>
            <Modal
                open={open}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                        <Typography component="h1" variant="h5" fontWeight="800"
                            color="#000000"
                            sx={{
                                m: 1,
                                mb: 3,
                            }}>
                            Card Information
                        </Typography>
                        <TextField
                            id="branch"
                            label="Branch"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={branch}
                            defaultValue={branch.current}
                            InputProps={{
                                readOnly: true,
                            }}
                            autoComplete="off"
                        />
                        <TextField
                            id="contractName"
                            label="Contract Name"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1
                            }}
                            inputRef={contractName}
                            defaultValue={contractName.current}
                            autoComplete="off"

                        />
                        <TextField
                            id="clientName"
                            label="Client Name"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1,
                            }}
                            inputRef={clientFullName}
                            defaultValue={clientFullName.current}
                            InputProps={{
                                readOnly: true,
                            }}

                        />

                        <TextField
                            id="contractNumber"
                            label="Contract Number"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={contractNumber}
                            defaultValue={contractNumber.current}
                            autoComplete="off"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={status}
                            defaultValue={status.current}
                            autoComplete="off"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="balance"
                            label="Balance"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={balance}
                            defaultValue={balance.current}
                            autoComplete="off"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
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
                            Save
                        </Button>
                    </Item>
                </Grid>
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: 300 }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}