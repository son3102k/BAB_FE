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

export default function EditContractModal(props) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    console.log(props.data);

    const branch = useRef(props.data['branch']['value'].split(";")[1]);
    const contractNumber = useRef(props.data['contractNumber']['value']);
    const contractName = useRef(props.data['contractName']['value']);
    const cbsNumber = useRef(props.data['']);
    const [closeDate, setCloseDate] = useState(props.data['']);

    useEffect(() => {
        branch.current = props.data['branch']['value'].split(";")[1];
        contractNumber.current = props.data['contractNumber']['value'];
        contractName.current = props.data['contractName']['value'];
        cbsNumber.current = props.data[''];
    }, [props.data])
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const handleSave = () => {
        axios.post("http://localhost:8080/editContract", {
            "contractIdentifier": contractNumber.current.value,
            "reason": "Edit Contract",
            "editContractInObject": {
                "branch": branch.current.value,
                "contractName": contractName.current.value,
                "cbsNumber": cbsNumber.current.value,
                "closeDate": ""
            },
            "setCustomDataInObject": {},
        }, {
            headers: {
                ContentType: "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res['data']['editContractV4Result']['value']['retCode'] === 0) {
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
                            fontFamily={props.font.typography.fontFamily} color="#000000"
                            sx={{
                                m: 1,
                                mb: 3,
                            }}>
                            Contract Information
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
                            id="contractNumber"
                            label="Contract Number"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1,
                            }}
                            inputRef={contractNumber}
                            autoComplete="off"
                            defaultValue={contractNumber.current}
                            InputProps={{
                                readOnly: true,
                            }}

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
                            required
                        />
                        <TextField
                            id="CBSNumber"
                            label="CBS Number"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={cbsNumber}
                            defaultValue={cbsNumber.current}
                            autoComplete="off"
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
