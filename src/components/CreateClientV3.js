import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";

const gender = [
    {
        value: 'M',
        label: 'Male',
    },
    {
        value: 'F',
        label: 'Female',
    },
    {
        value: 'N',
        label: 'Other',
    }
];

const client_category = [
    {
        value: 'P',
        label: 'Private',
    },
    {
        value: 'C',
        label: 'Commercial',
    },
    {
        value: 'A',
        label: 'Accountant',
    }
]

const prodcut_category = [
    {
        value: 'M',
        label: 'Acquiring',
    },
    {
        value: 'A',
        label: 'Accounting',
    },
    {
        value: 'C',
        label: 'Issuing',
    },
    {
        value: 'B',
        label: 'Bank Accounting',
    }
]

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    minHeight: '80vh',
    minWidth: 500,
    borderRadius: 16,
    width: "95%",

}));

export default function CreateClientV3(props) {

    const [shortName, setShortName] = useState('');
    const firstName = useRef('');
    const middleName = useRef('');
    const lastName = useRef('');
    const [BirthDate, setBirthDate] = useState(new Date(0));
    const [Gender, setGender] = useState(gender[0].value);
    const Citizenship = useRef('');
    const identityCardNumber = useRef('');
    const IdentityCardType = useRef('');
    const IndividualTaxpayerNumber = useRef('');
    const CompanyName = useRef('');
    const EMail = useRef('');
    const MobilePhone = useRef('');
    const [RegistrationDate, setRegistrationDate] = useState(new Date()+10);
    const [DateExpire, setDateExpire] = useState(new Date());
    const SocialSecurityNumber = useRef('');
    const PositionCode = useRef('');
    const BusinessPhone = useRef('');
    const HomePhone = useRef('');
    const [institutionBranchCode, setInstitutionBranchCode] = useState('0001');
    const [branch, setBranch] = useState('0101');
    const [clientTypeCode, setClientTypeCode] = useState('PR');
    const clientNumber = useRef('');
    const reason = useRef('');
    const reasonCode = useRef('');
    const ServiceGroup = useRef('');
    const LanguageCode = useRef('');
    const [ClientCategory, setClientCategory] = useState(client_category[0].value);
    const [ProductCategory, setProductCategory] = useState(prodcut_category[0].value);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Create Client';
    });

    const handleSubmit = (event) => {
        axios.post('http://localhost:8080/createClient', {
            reasonCode: reasonCode.current.value,
            reason: reason.current.value,
            institutionBranchCode,
            clientTypeCode,
            "inObject": {
                branch: branch,
                shortName: shortName,
                gender: Gender,
                firstName: firstName.current.value,
                middleName: middleName.current.value,
                lastName: lastName.current.value,
                birthDate: BirthDate.toISOString().slice(0, 10),
                identityCardType: IdentityCardType.current.value,
                citizenship: Citizenship.current.value,
                identityCardNumber: identityCardNumber.current.value,
                clientNumber: clientNumber.current.value,
                mobilePhone: MobilePhone.current.value,
                eMail: EMail.current.value,
                individualTaxpayerNumber: IndividualTaxpayerNumber.current.value,
                homePhone: HomePhone.current.value,
                businessPhone: BusinessPhone.current.value,
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                
            }
        }).then(res => {
            if (res['data']['createClientV3Result']['value']['retCode'] === 0) {
                const client_id = res['data']['createClientV3Result']['value']['newClient']['value'];
                props.setGlobalData({
                    client_id,
                    branch,
                    institutionBranchCode,
                    firstName: firstName.current.value,
                    middleName: middleName.current.value,
                    lastName: lastName.current.value,
                    contract_id: '',
                    CBSNumber: '',
                    CBSID: '',
                    ContractSubtypeCode: '',
                });
                props.setActiveStep(props.activeStep + 1);
            } else {
                setOpenDialog(true);
                setMessage(res['data']['createClientV3Result']['value']['retMsg']['value']);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (

        <div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={6} sx={{
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
                                        fontFamily={props.font.typography.fontFamily} color="#000000"
                                        sx={{
                                            m: 1,
                                            mb: 3,
                                        }}>
                                User Information
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
                                value={middleName.current.value}
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
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="BirthDate"
                                    label="Date of Birth"
                                    inputFormat="yyyy/MM/dd"
                                    onChange={(e) => setBirthDate(e)}
                                    value={BirthDate}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "30%", m: 1}}/>}

                                />
                            </LocalizationProvider>
                            <TextField
                                id="Gender"
                                select
                                label="Gender"
                                value={Gender}
                                onChange={(e) => setGender(e.target.value)}
                                sx={{m: 1, width: "30%"}}
                                size="small"
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                autoComplete="off"
                                required
                            />
                            <TextField
                                id="IdentityCardType"
                                label="Identity Card Type"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={IdentityCardType}
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
                                autoComplete="off"
                                required
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
                                autoComplete="off"
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="RegistrationDate"
                                    label="Registration Date"
                                    inputFormat="yyyy/MM/dd"
                                    value={RegistrationDate}
                                    onChange={(e) => setRegistrationDate(e)}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "47%", m: 1}}/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="DateExpire"
                                    label="Date Expire"
                                    inputFormat="yyyy/MM/dd"
                                    value={DateExpire}
                                    onChange={(e) => setDateExpire(e)}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "46%", m: 1, mb: 2}}/>}
                                />
                            </LocalizationProvider>
                            <TextField

                                id="reason"
                                label="Reason"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={reason}
                                defaultValue="Create client"
                                autoComplete="off"
                                required
                            />
                            <TextField

                                id="reasonCode"
                                label="Reason Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={reasonCode}
                                autoComplete="off"
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
                                autoComplete="off"
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={props.font.typography.fontFamily} color="#000000"
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
                                value={institutionBranchCode}
                                autoComplete="off"
                                InputProps={{
                                    readOnly: true,
                                }}
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
                                value={branch}
                                autoComplete="off"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="ClientTypeCode"
                                label="Client Type Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                value={clientTypeCode}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="Citizenship"
                                label="Citizen Ship"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={Citizenship}
                                autoComplete="off"
                            />
                            <TextField
                                id="SocialSecurityNumber"
                                label="Social Security Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                inputRef={SocialSecurityNumber}
                                autoComplete="off"
                            />
                            <TextField
                                id="reasonCode"
                                label="Reason Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={reasonCode}
                                autoComplete="off"
                            />
                            <TextField
                                id="PositionCode"
                                label="Position Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={PositionCode}
                                autoComplete="off"
                            />
                            <TextField
                                id="LanguageCode"
                                label="Language Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                inputRef={LanguageCode}
                                autoComplete="off"
                            />

                            <TextField
                                id="ClientCategory"
                                label="Client Category"
                                select
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setClientCategory(e.target.value)}
                            >
                                {client_category.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="ProductCategory"
                                label="Product Category"
                                select
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                {prodcut_category.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                            Next
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
