import {createTheme} from '@mui/material/styles'
import {Card, CardContent, CardMedia, Stack, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import img__bgPatternCard from "../static/assets/bg-pattern-card.svg"
import img__profile from "../static/assets/default-avatar-user.png"
import * as React from "react";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ReactDOM from "react-dom/client";
import EditClientProfileModal from "./EditClientProfileModal";


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

const ClientProfileCard = (props) => {
    const [data, setData] = useState(props.data)

    function handleEditButton() {
        ReactDOM.createRoot(document.getElementById('edit-profile-modal')).render(
            <EditClientProfileModal setSnackbarData={props.setSnackbarData} setOpenSnackbar={props.setOpenSnackbar}
                                    font={props.font} data={data}
                                    updateRowAndAPIData={props.updateRowAndAPIData} setAPIData={setData}
                                    index={props.index}/>
        );
    }

    return (
        <Box>
            <div id="edit-profile-modal"/>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        placeContent: 'center',
                        backgroundColor: '#f2f2f2',
                        height: "100%",
                    }}
                >
                    <Card
                        sx={{
                            width: "100%",
                            borderRadius: '1.25em',
                            boxShadow: '2px 2px 25px rgba(0, 0, 0, 0.15)',
                            backgroundColor: "#fff",
                        }}
                    >
                        <CardContent
                            sx={{
                                position: 'relative',
                                padding: 0,
                            }}
                        >
                            <CardMedia sx={{position: 'absolute'}} component="img" image={img__bgPatternCard}/>
                        </CardContent>
                        <CardContent sx={{marginTop: '3em'}}>
                            <CardMedia
                                sx={{
                                    position: 'relative',
                                    width: '100px',
                                    margin: '0.5em auto',
                                    borderRadius: '100%',
                                    border: '4px solid transparent',
                                    borderColor: '#fff',
                                }}
                                component="img"
                                image={img__profile}
                            />
                            <Grid container>
                                <Grid item xs={6} md={12}>
                                    <Typography sx={{textAlign: 'center', mb: 2, fontSize: 20}} variant="body1"
                                                color="text.primary">
                                        {`${data['lastNam'] !== null ? data['lastNam'] : ""} ${data['fatherNam'] !== null ? data['fatherNam'] : ""} ${data['firstNam'] !== null ? data['firstNam'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Birth Date:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {`${data['birthDate'] !== null ? data['birthDate'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Birth Place:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {`${data['birthPlace'] !== null ? data['birthPlace'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Phone:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {` ${data['phoneM'] !== null ? data['phoneM'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Register number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {`${data['regNumber'] !== null ? data['regNumber'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Client number:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {`${data['clientNumber'] !== null ? data['clientNumber'] : ""}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 500, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        Date open:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    <Typography
                                        sx={{ml: 2, fontWeight: 400, fontFamily: props.font.typography.fontFamily}}
                                        variant="subtitle1" color="text.secondary">
                                        {`${data['dateOpen'] !== null ? data['dateOpen'] : ""}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={2}
                                sx={{marginTop: '1em', paddingTop: '1em', borderTop: '1px solid #ccc'}}
                            >
                                <Button sx={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: props.font.typography.fontFamily,
                                    letterSpacing: "1.5px",
                                    padding: "10px 25px",
                                    borderRadius: "25px 25px 25px 25px",
                                    background: "#6da0f8",
                                    transition: "0.25s ease",

                                    "&:hover": {
                                        "background": "#66d189",
                                    }
                                }} onClick={handleEditButton}>Edit</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </ThemeProvider>
        </Box>
    )
}

export default ClientProfileCard;
