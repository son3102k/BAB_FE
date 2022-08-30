import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TopBarNav from "../components/TopBarNav";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {createTheme} from "@mui/material";
import CreateClientV3 from "../components/CreateClientV3";
import CreateContractV4 from "../components/CreateContractV4";
import CreateCardV3 from "../components/CreateCardV3";

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

const steps = ['Create Client', 'Create Contract', 'Create Card'];

export default function CreateCard() {
    const [globalData, setGlobalData] = useState({
        client_id: '',
        branch: '',
        institutionBranchCode: '',
        firstName: '',
        middleName: '',
        lastName: '',
        contract_id: '',
        CBSNumber: '',
        CBSID: '',
        ContractSubtypeCode: '',
        card_id: '',
    });

    const [activeStep, setActiveStep] = React.useState(0);

    function renderStepContent(step) {
        switch (step) {
            case 0:
                return <CreateClientV3 setActiveStep={setActiveStep} activeStep={activeStep} font={font}
                                       setGlobalData={setGlobalData}/>;
            case 1:
                return <CreateContractV4 setActiveStep={setActiveStep} activeStep={activeStep} font={font}
                                         setGlobalData={setGlobalData} globalData={globalData}/>;
            case 2:
                return <CreateCardV3 setActiveStep={setActiveStep} activeStep={activeStep} font={font}
                                     setGlobalData={setGlobalData} globalData={globalData}/>;
            default:
                return <div>Not Found</div>;
        }
    }

    useEffect(() => {
        document.title = 'Create Card';
    });

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{
            backgroundColor: "rgb(249,249,249)",
        }}>
            <TopBarNav/>
            <Typography component="h1" variant="h5" fontWeight="800" fontFamily={font.typography.fontFamily}
                        sx={{
                            textAlign: "left",
                            fontSize: 42,
                            backgroundColor: "#00b3b3",
                            p: 2,
                            color: '#fff',
                            m: 3.5,
                            mt: 2,
                            minHeight: 70,
                        }}>
                CREATE CARD
                <div>
                    <Container maxWidth="sm" fullWidth sx={{
                        width: 0.05,
                        mt: 1,
                        borderBottom: "5px solid #fff",
                        float: "left",
                    }}/>
                </div>
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6} md={10}><Box sx={{width: '100%', backgroundColor: "rgb(249,249,249)", mt: 3}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps} sx={{
                                        ".MuiStepLabel-label": {
                                            fontFamily: font.typography.fontFamily,
                                            fontWeight: 500,
                                            fontSize: 20,
                                        },
                                    }}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>
                                {`Create Card Successfully for client ${globalData.client_id}! \nYour card ID: ${globalData.card_id}`}
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, mb: 1}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleReset}>Create New Card</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {renderStepContent(activeStep)}
                        </React.Fragment>
                    )}
                </Box></Grid>
            </Grid>
        </Box>

    );
}
