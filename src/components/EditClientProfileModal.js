import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
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

export default function EditClientProfileModal(props) {
    const CLIENT_ID = props.data['id'];
    const firstName = useRef(props.data['firstNam']);
    const middleName = useRef(props.data['fatherNam']);
    const lastName = useRef(props.data['lastNam']);
    const [BirthDate, setBirthDate] = useState(new Date(props.data['birthDate']));
    const [Gender, setGender] = useState(props.data['gender']);
    const identityCardNumber = useRef(props.data['regNumber']);
    const BirthPlace = useRef(props.data['birthPlace']);
    const IndividualTaxpayerNumber = useRef(props.data['itn']);
    const CompanyName = useRef(props.data['companyNam']);
    const EMail = useRef(props.data['email']);
    const MobilePhone = useRef(props.data['phoneM']);
    const BusinessPhone = useRef(props.data['phone']);
    const HomePhone = useRef(props.data['phoneH']);
    const clientNumber = useRef(props.data['clientNumber']);

    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        firstName.current = props.data['firstNam'];
        clientNumber.current = props.data['clientNumber'];
        middleName.current = props.data['fatherNam'];
        lastName.current = props.data['lastNam'];
        identityCardNumber.current = props.data['regNumber'];
        BirthPlace.current = props.data['birthPlace'];
        MobilePhone.current = props.data['phoneM'];
        CompanyName.current = props.data['companyNam'];
        BusinessPhone.current = props.data['phone'];
        HomePhone.current = props.data['phoneH'];
        IndividualTaxpayerNumber.current = props.data['itn'];
    }, [props.data])
    const handleClose = () => setOpen(false);

    const handeClickSave = () => {
        axios.post("http://localhost:8080/editClient", {
            "clientIdentifier": CLIENT_ID,
            "editClientInObject": {
                "shortName": "",
                "firstName": firstName.current.value,
                "middleName": middleName.current.value,
                "lastName": lastName.current.value,
                "individualTaxpayerNumber": IndividualTaxpayerNumber.current.value,
                "homePhone": HomePhone.current.value,
                "mobilePhone": MobilePhone.current.value,
                "businessPhone": BusinessPhone.current.value,
                "eMail": EMail.current.value,
                "companyName": CompanyName.current.value,
                "identityCardNumber": identityCardNumber.current.value,
                "clientNumber": clientNumber.current.value,

            },
            "setCustomDataInObject": {},
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then(res => {
            if (res['data']['editClientV6Result']['value']['retCode'] === 0) {
                props.setSnackbarData({
                    severity: "success",
                    message: "Successfully!",
                });
                props.setOpenSnackbar(true);
            } else {
                props.setSnackbarData({
                    severity: "error",
                    message: "Error !!!",
                });
                props.setOpenSnackbar(true);
            }
        }).then(() => {
            axios.get(`http://localhost:8080/admin/getClientById?id=${CLIENT_ID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then(res => {
                    props.setAPIData(res.data);
                    props.updateRowAndAPIData(res.data, props.index);
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
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <Typography component="h1" variant="h5" fontWeight="800"
                                    fontFamily={props.font.typography.fontFamily} color="#000000"
                                    sx={{
                                        m: 1,
                                        mb: 3,
                                    }}>
                            Detailed Information
                        </Typography>
                        <TextField
                            id="FirstName"
                            label="First Name"
                            size="small"
                            sx={{
                                width: "30%",
                                m: 1,
                            }}
                            inputRef={firstName}
                            autoComplete="off"
                            defaultValue={firstName.current}
                            required
                        />
                        <TextField
                            id="MiddleName"
                            label="Middle Name"
                            size="small"
                            sx={{
                                width: "30%",
                                m: 1
                            }}
                            inputRef={middleName}
                            defaultValue={middleName.current}
                            autoComplete="off"
                            required
                        />
                        <TextField
                            id="LastName"
                            label="Last Name"
                            size="small"
                            sx={{
                                width: "30%",
                                m: 1,
                                mb: 2
                            }}
                            inputRef={lastName}
                            autoComplete="off"
                            defaultValue={lastName.current}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                id="BirthDate"
                                label="Date of Birth"
                                inputFormat="yyyy/MM/dd"
                                onChange={(e) => setBirthDate(e)}
                                value={BirthDate}
                                readOnly
                                renderInput={(params) => <TextField {...params} size="small"
                                                                    sx={{width: "30%", m: 1}}/>}
                            />
                        </LocalizationProvider>
                        <TextField
                            id="Gender"
                            label="Gender"
                            value={Gender === 'M' ? "Male" : Gender === "F" ? "Female" : "Other"}
                            sx={{m: 1, width: "30%"}}
                            size="small"
                            inputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="ClientNumber"
                            label="Client Number"
                            size="small"
                            sx={{
                                width: "30%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={clientNumber}
                            defaultValue={clientNumber.current}
                            autoComplete="off"
                        />
                        <TextField
                            id="IdentityCardNumber"
                            label="Identity CardNumber"
                            size="small"
                            sx={{
                                width: "47%",
                                m: 1,
                            }}
                            inputRef={identityCardNumber}
                            defaultValue={identityCardNumber.current}
                            autoComplete="off"
                            required
                        />
                        <TextField
                            id="BirthPlace"
                            label="Birth Place"
                            size="small"
                            sx={{
                                width: "46%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={BirthPlace}
                            defaultValue={BirthPlace.current}
                            InputProps={{
                                readOnly: true,
                            }}
                            autoComplete="off"
                        />
                        <TextField
                            id="EMail"
                            label="Email"
                            size="small"
                            sx={{
                                width: "47%",
                                m: 1,
                            }}
                            type="email"
                            inputRef={EMail}
                            autoComplete="off"
                            defaultValue={EMail.current}
                            required
                        />
                        <TextField
                            id="MobilePhone"
                            label="Mobile Phone"
                            size="small"
                            sx={{
                                width: "46%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={MobilePhone}
                            defaultValue={MobilePhone.current}
                            autoComplete="off"
                            required
                        />
                        <TextField
                            id="BusinessPhone"
                            label="Business Phone"
                            size="small"
                            sx={{
                                width: "47%",
                                m: 1,
                            }}
                            inputRef={BusinessPhone}
                            defaultValue={BusinessPhone.current}
                            autoComplete="off"
                        />
                        <TextField
                            id="HomePhone"
                            label="Home Phone"
                            size="small"
                            sx={{
                                width: "46%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={HomePhone}
                            defaultValue={HomePhone.current}
                            autoComplete="off"
                        />
                        <TextField
                            id="IndividualTaxpayerNumber"
                            label="Individual Taxpayer Number"
                            size="small"
                            sx={{
                                width: "47%",
                                m: 1,
                            }}
                            inputRef={IndividualTaxpayerNumber}
                            defaultValue={IndividualTaxpayerNumber.current}
                            autoComplete="off"
                        />
                        <TextField
                            id="CompanyName"
                            label="Company Name"
                            size="small"
                            sx={{
                                width: "46%",
                                m: 1,
                                mb: 2,
                            }}
                            inputRef={CompanyName}
                            defaultValue={CompanyName.current}
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
                            onClick={handeClickSave}
                        >
                            Save
                        </Button>
                    </Item>
                </Grid>
            </Modal>
        </div>
    );
}
