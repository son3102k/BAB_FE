import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {MenuItem} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function IssueContract() {
    return(
        <Grid container spacing={0}>
            <Grid item xs={6} md={4}>
                <Item>
                    <TextField
                        id="FirstName"
                        label="First Name"
                        size="small"
                        sx={{
                            width: "30%",
                            m: 1,
                        }}
                        // inputRef={firstName}
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
                        // inputRef={middleName}
                        // value={middleName.current.value}
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
                        // inputRef={lastName}
                        autoComplete="off"
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            id="BirthDate"
                            label="Date of Birth"
                            inputFormat="yyyy/MM/dd"
                            // onChange={(e) => setBirthDate(e)}
                            // value={BirthDate}
                            renderInput={(params) => <TextField {...params} size="small" required
                                                                sx={{width: "30%", m: 1}}/>}

                        />
                    </LocalizationProvider>
                    <TextField
                        id="Gender"
                        select
                        label="Gender"
                        // value={Gender}
                        // onChange={(e) => setGender(e.target.value)}
                        sx={{m: 1, width: "30%"}}
                        size="small"
                        required
                    >
                        {/*{gender.map((option) => (*/}
                        {/*    <MenuItem key={option.value} value={option.value}>*/}
                        {/*        {option.label}*/}
                        {/*    </MenuItem>*/}
                        {/*))}*/}
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
                        // inputRef={clientNumber}
                        autoComplete="off"
                        required
                    />
                    <TextField
                        id="IdentityCardNumber"
                        label="Identity CardNumber"
                        size="small"
                        sx={{
                            width: "47%",
                            m: 1,
                        }}
                        // inputRef={identityCardNumber}
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
                        // inputRef={IdentityCardType}
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
                        // inputRef={IndividualTaxpayerNumber}
                        autoComplete="off"
                    />
                </Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item></Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item></Item>
            </Grid>
        </Grid>
    );
}