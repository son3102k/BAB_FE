import * as React from 'react';
import {useEffect, useRef} from 'react';
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

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: 16,
    width: "80%",
}));

export default function EditCardModal(props) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    const branch = useRef(props.data['value']['branch']['value'].split(';')[1]);
    const cardName = useRef(props.data['value']['cardName']['value']);
    const cardNumber = useRef(props.data['value']['cardNumber']['value']);
    const status = useRef(props.data['value']['status']['value'].split(";")[1]);
    const client = useRef(props.data['value']['client']['value'].split(";")[1]);
    const creditLimit = useRef(props.data['value']['creditLimit']['value']);
    const embossedFirstName = useRef(props.data['value']['embossedFirstName']['value']);
    const embossedLastName = useRef(props.data['value']['embossedLastName']['value']);
    const embossedCompanyName = useRef(props.data['value']['embossedCompanyName']['value'])

    useEffect(() => {
        branch.current = props.data['value']['branch']['value'].split(';')[1];
        cardName.current = props.data['value']['cardName']['value'];
        cardNumber.current = props.data['value']['cardNumber']['value']
        status.current = props.data['value']['status']['value'].split(';')[1];
        client.current = props.data['value']['client']['value'].split(';')[1];
        creditLimit.current = props.data['value']['creditLimit']['value'];
        embossedFirstName.current = props.data['value']['embossedFirstName']['value'];
        embossedLastName.current = props.data['value']['embossedLastName']['value'];
        embossedCompanyName.current = props.data['value']['embossedCompanyName']['value'];
    })
    const handleSave = () => {
        axios.post("http://localhost:8080/editCard", {
            "contractIdentifier": cardNumber.current.value,
            "reason": "Edit Card",
            "inObject": {
                "embossedFirstName": embossedFirstName.current.value,
                "embossedLastName": embossedLastName.current.value,
                "embossedCompanyName": embossedCompanyName.current.value,
            },
        }, {
            headers: {
                ContentType: "application/json"
            }
        }).then(res => {
            if (res['data']['editCardV2Result']['value']['retCode'] === 0) {
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
                                <CloseIcon/>
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
                        {/*<TextField*/}
                        {/*    id="branch"*/}
                        {/*    label="Branch"*/}
                        {/*    size="small"*/}
                        {/*    sx={{*/}
                        {/*        width: "93%",*/}
                        {/*        m: 1,*/}
                        {/*        mb: 2,*/}
                        {/*    }}*/}
                        {/*    inputRef={branch}*/}
                        {/*    defaultValue={branch.current}*/}
                        {/*    InputProps={{*/}
                        {/*        readOnly: true,*/}
                        {/*    }}*/}
                        {/*    autoComplete="off"*/}
                        {/*/>*/}
                        <TextField
                            id="cardName"
                            label="Card Name"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1
                            }}
                            inputRef={cardName}
                            defaultValue={cardName.current}
                            autoComplete="off"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="client"
                            label="Client"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1,
                            }}
                            inputRef={client}
                            defaultValue={client.current}
                            InputProps={{
                                readOnly: true,
                            }}

                        />

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
                            defaultValue={cardNumber.current}
                            autoComplete="off"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="embossedFirstName"
                            label="Embossed First Name"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1
                            }}
                            inputRef={embossedFirstName}
                            defaultValue={embossedFirstName.current}
                            autoComplete="off"

                        />
                        <TextField
                            id="embossedLastName"
                            label="Embossed Last Name"
                            size="small"
                            sx={{
                                width: "45%",
                                m: 1,
                            }}
                            inputRef={embossedLastName}
                            defaultValue={embossedLastName.current}


                        />

                        <TextField
                            id="embossedCompanyName"
                            label="Embossed Company Name"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={embossedCompanyName}
                            defaultValue={embossedCompanyName.current}
                            autoComplete="off"

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
                            id="creditLimit"
                            label="Credit Limit"
                            size="small"
                            sx={{
                                width: "93%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={creditLimit}
                            defaultValue={creditLimit.current}
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
        </div>
    );
}