import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: 16,
    width: "80%",
}));

const statusCode = [
    {
        value: "00",
        label: "Account OK",
    },
    {
        value: "54",
        label: "Account to close",
    },
    {
        value: "114",
        label: "Auto-closed",
    },
    {
        value: "05",
        label: "Account Decline",
    },
    {
        value: "14",
        label: "Account Closed",
    }
];

export default function SetContractStatus(props) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const contractNumber = useRef(props.data['contractNumber']['value']);
    const contractName = useRef(props.data['contractName'] !== null ? props.data['contractName']['value'] : '');
    const [status, setStatus] = useState(statusCode[defaultStatus(props.data['statusCode']['value'].split(';')[0])].value);




    useEffect(() => {
    }, [])
    function defaultStatus(stt) {
        for (let i = 0; i < statusCode.length; i++) {
            if (statusCode[i].value === stt){
                return i;
            }
        }
        return '';
    }
    
    const handleSave = () => {
        axios.post("http://localhost:8080/setContractStatus", {
            "contractIdentifier": contractNumber.current.value,
            "reason": "Change status",
            "newStatus": status,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {
            
            if (res.data['setContractStatusResult']['value']['retCode'] === 0) {
                props.setSnackbarData({
                    severity: "success",
                    message: "Successfully!",
                });
                props.setOpenSnackbar(true);
            } else {
                props.setSnackbarData({
                    severity: "error",
                    message: "Error !",
                });
                props.setOpenSnackbar(true);
            }
        }).then(() => {
            axios.post("http://localhost:8080/getContractByNumber", {
                contractNumber: props.data['contractNumber']['value'],
            }, {
                headers: {
                    ContentType: "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,

                }
            }).then(res => {
                console.log(res);
                props.setSelectedContractDataReload(res.data['getContractByNumberV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record'][0])
            })
        })
            .then(() => {
                axios.post("http://localhost:8080/getContractByClientID", {
                    client: props.clientID,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
                    .then(res => {
                        props.setListContract(res['data']['getContractByClientV2Result']['value']['outObject']['value']['issContractDetailsAPIOutputV2Record'].filter(
                            (e) => {
                                if (e['contractCategory']['value'].split(";")[0] === "A") {
                                    return true;
                                }
                                return false;
                            }));
                    });
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
                        <Typography component="h1" variant="h5" fontWeight="800"
                            fontFamily={props.font.typography.fontFamily} color="#000000"
                            sx={{
                                m: 1,
                                mb: 3,
                            }}>
                            Set Contract Status
                        </Typography>
                        <TextField
                            id="contractName"
                            label="Contract Name"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={contractName}
                            defaultValue={contractName.current}
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
                                mb: 2,
                            }}
                            inputRef={contractNumber}
                            defaultValue={contractNumber.current}
                            InputProps={{
                                readOnly: true,
                            }}
                            autoComplete="off"
                        />
                        <TextField
                            id="status"
                            select
                            label="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{ m: 1, width: "45%" }}
                            size="small"
                        >

                            {statusCode.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

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
        </div>
    );
}
