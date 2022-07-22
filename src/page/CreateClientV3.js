import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme, MenuItem, useMediaQuery} from "@mui/material";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import '../static/css/CreateClientV3.css'
import TopBarNav from "../components/TopBarNav";

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
    const matches = useMediaQuery('(min-width:1024px)');

    useEffect(() => {
        document.title = 'Create Client V3';
    });

    const handleSubmit = (event) => {
        console.log('Submited');
    }
    return (
        <div>
            <TopBarNav/>
            <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily}
                        color="#000000"
                        sx={{
                            mt: 2,
                            textAlign: "center",
                            fontSize: 40
                        }}>
                Create Client V3
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
                                Thông tin khách hàng
                            </Typography>
                            <TextField
                                id="FirstName"
                                label="First Name"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                }}
                            />
                            <TextField
                                id="LastName"
                                label="Last Name"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1
                                }}
                            />
                            <TextField
                                id="MiddleName"
                                label="Middle Name"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                    mb: 2
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="BirthDate"
                                    label="Date of Birth"
                                    inputFormat="MM/dd/yyyy"
                                    // value={new Date()}
                                    // onChange={}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "30%", m: 1}}/>}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="Gender"
                                select
                                label="Gender"
                                // value={}
                                // onChange={handleChange}
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
                                id="Citizenship"
                                label="Citizen Ship"
                                size="small"
                                sx={{
                                    width: "30%",
                                    m: 1,
                                    mb: 2,
                                }}
                            />
                            <TextField
                                id="IdentityCardNumber"
                                label="Identity CardNumber"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
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
                            />
                            <TextField
                                id="IndividualTaxpayerNumber"
                                label="Individual Taxpayer Number"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
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
                            />
                            <TextField
                                id="EMail"
                                label="Email"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
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
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="RegistrationDate"
                                    label="Registration Date"
                                    inputFormat="MM/dd/yyyy"
                                    // value={new Date()}
                                    // onChange={}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "47%", m: 1}}/>}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    id="DateExpire"
                                    label="Date Expire"
                                    inputFormat="MM/dd/yyyy"
                                    // value={new Date()}
                                    // onChange={}
                                    renderInput={(params) => <TextField {...params} size="small"
                                                                        sx={{width: "46%", m: 1, mb: 2}}/>}
                                />
                                <TextField
                                    id="SocialSecurityNumber"
                                    label="Social Security Number"
                                    size="small"
                                    sx={{
                                        width: "47%",
                                        m: 1,
                                    }}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="PositionCode"
                                label="Position Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                            />
                            <TextField
                                id="BusinessPhone"
                                label="Business Phone"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
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
                                Các thông tin khác
                            </Typography>
                            <TextField
                                id="InstitutionBranchCode"
                                label="Institution Branch Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
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
                            />
                            <TextField
                                id="MaritalStatusCode"
                                label="Marital Status Code"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                            />
                            <TextField
                                id="SalutationCode"
                                label="Salutation Code"
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                            />
                            <TextField
                                id="Branch"
                                label="Branch"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                            />
                            <TextField
                                id="ClientCategory"
                                label="Client Category"
                                select
                                size="small"
                                sx={{
                                    width: "46%",
                                    m: 1,
                                    mb: 2,
                                }}
                            >
                                {client_category.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="ServiceGroup"
                                label="Service Group"
                                size="small"
                                sx={{
                                    width: "47%",
                                    m: 1,
                                }}
                            />
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
        </div>
    );
}
