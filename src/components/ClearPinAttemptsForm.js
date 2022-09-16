import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { Alert, Snackbar } from "@mui/material";
import ReactDOM from "react-dom/client";
import MainModal from "./MainModal";
import axios from "axios";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";


export default function ClearPinAttemptsForm({ font }) {
    const cardNumber = useRef('');
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        severity: "success",
        message: "",
    });
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleSubmit = () => {
        axios.post("http://localhost:8080/admin/clearPinAttempts", {
            "contractIdentifier": cardNumber.current.value,
            "reason": "Clear PIN Attempts",
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {

            if (res['data']['clearPINAttemptsResult']['value']['retCode'] === 0) {
                alert('Success');
                navigate('/dashboard');
                // setSnackbarData({
                //     severity: "success",
                //     message: "Successfully!",
                // });
                // setOpenSnackbar(true);
            } else {
                alert(res.data['clearPINAttemptsResult']['value']['retMsg']['value']);
            }
        });
    }

    useEffect(() => {

    });



    return (
        <div align="center">
            <Box sx={{ width: '100%', backgroundColor: "#ffffff", borderRadius: 4 }}>

                <Typography component="h1" fontWeight="700" fontFamily={font.typography.fontFamily} fontSize={40}
                    color="#1a8cff" sx={{ p: 4 }}>
                    Clear PIN Attempts
                </Typography>
                <div id="modal" />
                <TextField
                    id="Card Number"
                    label="Card Number"
                    size="small"
                    sx={{
                        width: "93%",
                        m: 1,
                        mb: 2,

                    }}
                    inputRef={cardNumber}
                    defaultValue={cardNumber.current}
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarData.severity} sx={{ width: 300 }}>
                        {snackbarData.message}
                    </Alert>
                </Snackbar>
            </Box>
        </div>

    );
}
