import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Alert, Snackbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import ClientProfileCard from "./ClientProfileCard";
import ListIssueContract from "./ListIssueContract";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    backgroundColor: '#f2f2f2',
    boxShadow: 24,
    p: 4,
};

export default function MainModal(props) {
    const [open, setOpen] = useState(true);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({
        severity: "success",
        message: "",
    });
    const [clientData, setClientData] = useState({
        client_id: props.data['id'],
        branch: props.data['branch'],
        firstName: props.data['firstNam'],
        middleName: props.data['fatherNam'],
        lastName: props.data['lastNam'],
    });

    const handleClose = () => setOpen(false);
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                            <ClientProfileCard data={props.data} font={props.font}
                                               updateRowAndAPIData={props.updateRowAndAPIData}
                                               index={props.index}
                                               setSnackbarData={setSnackbarData}
                                               setOpenSnackbar={setOpenSnackbar}/>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <ListIssueContract cid={props.data['id']} font={props.font}
                                               setSnackbarData={setSnackbarData}
                                               setOpenSnackbar={setOpenSnackbar}
                                               clientData={clientData}/>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarData.severity} sx={{width: 300}}>
                    {snackbarData.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
