import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme, MenuItem, useMediaQuery} from "@mui/material";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import '../static/css/CreateClientV3.css'
import TopBarNav from "../components/TopBarNav";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Container from "@mui/material/Container";
import {Link, useNavigate} from 'react-router-dom';

const font = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

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

export default function CreateClientV3() {
    // const navigate = useNavigate();
    

    const matches = useMediaQuery('(min-width:1024px)');

    const [shortName, setShortName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [BirthDate, setBirthDate] = useState(new Date(0));
    const [Gender, setGender] = useState(gender[0].value);
    const [Citizenship, setCitizenship] = useState('');
    const [identityCardNumber, setIdentityCardNumber] = useState('');
    const [IdentityCardType, setIdentityCardType] = useState('');
    const [IndividualTaxpayerNumber, setIndividualTaxpayerNumber] = useState('');
    const [CompanyName,setCompanyName] = useState('');
    const [EMail, setEMail] = useState('');
    const [MobilePhone, setMobilePhone] = useState('');
    const [RegistrationDate, setRegistrationDate] = useState(new Date());
    const [DateExpire, setDateExpire] = useState(new Date());
    const [SocialSecurityNumber, setSocialSecurityNumber] = useState('');
    const [PositionCode, setPositionCode] = useState('');
    const [BusinessPhone, setBusinessPhone] = useState('');
    const [HomePhone, setHomePhone] = useState('');
    const [institutionBranchCode, setInstitutionBranchCode] = useState('');
    const [branch, setBranch] = useState('');
    const [clientTypeCode,setClientTypeCode] = useState('PR');
    const [clientNumber, setClientNumber] = useState('');
    const [reason,setReason] = useState('');
    const [reasonCode, setreasonCode] = useState('');
    const [ServiceGroup, setServiceGroup] = useState('');
    const [LanguageCode, setLanguageCode] = useState('');
    const [ClientCategory, setClientCategory] = useState(client_category[0].value);
    const [ProductCategory, setProductCategory] = useState(prodcut_category[0].value);
    const [openDialog, setOpenDialog] = useState(false);
    const [message,setMessage] = useState('');

    useEffect(() => {
        document.title = 'Create Client';
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShortName(lastName + firstName[0] + middleName[0]);
        const response = await axios.post('http://localhost:8080/createClient',{
            reason,
            institutionBranchCode,
            clientTypeCode,
            "inObject": {
                branch,
                shortName,
                firstName,
                lastName,
                middleName,
                Gender,
                BirthDate,
                IdentityCardType,
                Citizenship,
                identityCardNumber,
                clientNumber,  
            }
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setOpenDialog(true);
        // setMessage(response.data['createClientV3Reusult'])
        setMessage(response.data['createClientV3Result']['value']['retMsg']['value']);
        // var client_id = response.data['createClientV3Result']['value']['newClient']['value'];
        // navigate('/createContract', {state: {client_id: {client_id},
        //                          branch_id: {branch} }})
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        
            
        
        <div>
            <TopBarNav/>
            <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily}
                        color="#000000"
                        sx={{
                            textAlign: "left",
                            fontSize: 42,
                            backgroundColor: "#cc00cc",
                            p: 2,
                            color: '#fff',
                            m: 3.5,
                            mt: 2,
                            minHeight: 70,
                        }}>
                CREATE CLIENT V3
                <div>
                    <Container maxWidth="sm" fullWidth sx={{
                        width: 0.05,
                        mt: 1,
                        borderBottom: "5px solid #fff",
                        float: "left",
                    }}/>
                </div>
            </Typography>
            <Box sx={{flexGrow: 1}} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={6} sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    mt: 1,
                    p: 1,
                }}>
                    <Grid item xs={matches ? 5 : 12}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={font.typography.fontFamily} color="#000000"
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
                                onChange={(e) => setFirstName(e.target.value)}
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
                                onChange={(e) => setMiddleName(e.target.value)}
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
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="BirthDate"
                                    label="Date of Birth"
                                    inputFormat="MM/dd/yyyy"
                                    onChange={(e) => setBirthDate(e)}
                                    value={BirthDate}
                                    renderInput={(params) => <TextField {...params} size="small" required
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
                                required
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="Citizenship"
                                label="Citizen Ship"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                    mb: 2,
                                }}
                                onChange={(e) => setCitizenship(e.target.value)}
                            />
                            <TextField
                                id="IdentityCardNumber"
                                label="Identity CardNumber"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setIdentityCardNumber(e.target.value)}
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
                                onChange={(e) => setIdentityCardType(e.target.value)}
                            />
                            <TextField
                                id="IndividualTaxpayerNumber"
                                label="Individual Taxpayer Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setIndividualTaxpayerNumber(e.target.value)}
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
                                onChange={(e) => setCompanyName(e.target.value)}
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
                                onChange={(e) => setEMail(e.target.value)}
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
                                onChange={(e) => setMobilePhone(e.target.value)}
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="RegistrationDate"
                                    label="Registration Date"
                                    inputFormat="MM/dd/yyyy"
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
                                    inputFormat="MM/dd/yyyy"
                                    value={DateExpire}
                                    onChange={(e) => setDateExpire(e)}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "46%", m: 1, mb: 2}}/>}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="SocialSecurityNumber"
                                label="Social Security Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setSocialSecurityNumber(e.target.value)}
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
                                onChange={(e) => setPositionCode(e.target.value)}
                            />
                            <TextField
                                id="BusinessPhone"
                                label="Business Phone"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setBusinessPhone(e.target.value)}
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
                                onChange={(e) => setHomePhone(e.target.value)}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={matches ? 5 : 12}>
                        <Item>
                            <Typography component="h1" variant="h5" fontWeight="800"
                                        fontFamily={font.typography.fontFamily} color="#000000"
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
                                onChange={(e) => setInstitutionBranchCode(e.target.value)}
                                required
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
                                onChange={(e) => setBranch(e.target.value)}
                                required
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
                                id="ClientNumber"
                                label="Client Number"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                onChange={(e) => setClientNumber(e.target.value)}
                                required
                            />
                            <TextField
                                id="reason"
                                label="reason"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />
                            <TextField
                                id="reasonCode"
                                label="reason Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                                onChange={(e) => setreasonCode(e.target.value)}
                            />
                            <TextField
                                id="ServiceGroup"
                                label="Service Group"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                                onChange={(e) => setServiceGroup(e.target.value)}
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
                                onChange={(e) => setLanguageCode(e.target.value)}
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
                            type="submit"
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
