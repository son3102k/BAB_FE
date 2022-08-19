import {createTheme} from '@mui/material/styles'
import {ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import ReactDOM from "react-dom/client";
import EditContractModal from "./EditContractModal"

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: 'hsl(185, 75%, 39%)',
            secondary: 'hsl(216, 99%, 60%)'
        },
        text: {
            primary: 'hsl(0, 0%, 16%)',
            secondary: ' hsl(0, 0%, 59%)'
        },
        background: {
            paper: 'hsl(0, 0%, 95%)',
            default: 'hsl(190, 80%, 80%)'
        }
    },
    typography: {
        body1: {
            fontSize: '1em',
            fontWeight: 700
        },
        body2: {
            fontSize: '0.65em',
            fontWeight: 400
        },
        caption: {
            fontSize: '0.90em',
            fontWeight: 700
        }
    },

    components: {
        MuiTypography: {
            defaultProps: {
                gutterBottom: true
            },
            styleOverrides: {
                root: {
                    marginBottom: '0.5em',
                    fontFamily: 'Kumbh Sans',
                    lineHeight: 1.15
                }
            }
        }
    }
})

const ContractInformartion = (props) => {
    const [selectedContractData, setSelectedContractData] = useState(props.selectContract);
    useEffect(() => {
        setSelectedContractData(props.selectContract);
    });

    function handleEdit() {
        ReactDOM.createRoot(document.getElementById('edit-contract-modal')).render(
            <EditContractModal font={props.font} data={selectedContractData} setSnackbarData={props.setSnackbarData}
                               setOpenSnackbar={props.setOpenSnackbar}
                               setSelectedContractDataReload={props.setSelectedContractDataReload}
                               c_number={selectedContractData['contractNumber']['value']}/>
        );
    }

    return (
        <Box>
            <div id="edit-contract-modal"/>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        borderLeft: "1px solid #f2f2f2",
                        boxSizing: "border-box",
                        borderBottom: "1px solid #f2f2f2",
                        borderTopRightRadius: 20,
                        width: '100%',
                        height: 260,
                        backgroundColor: '#fff'
                    }}
                >
                    <Grid container sx={{
                        width: "100%",
                    }}>
                        <Grid item xs={6} md={12} sx={{
                            textAlign: "right",
                        }}>
                            <IconButton onClick={handleEdit}>
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Contract Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['contractName'] !== null ? selectedContractData['contractName']['value'] : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Contract Number:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['contractNumber'] !== null ? selectedContractData['contractNumber']['value'] : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Client Full Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['clientFullName'] !== null ? selectedContractData['clientFullName']['value'] : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Client Category:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['clientCategory'] !== null ? selectedContractData['clientCategory']['value'].slice(2) : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Balance:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['balance'] !== null ? selectedContractData['balance']['value'] : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Currency:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['currency'] !== null ? selectedContractData['currency']['value'].slice(4) : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Product Category:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['productCategory'] !== null ? selectedContractData['productCategory']['value'].slice(2) : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                Status:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                variant="subtitle1" color="text.secondary">
                                {selectedContractData['status'] !== null ? selectedContractData['status']['value'].slice(3) : ""}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </Box>
    )
}

export default ContractInformartion;
