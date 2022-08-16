import Grid from "@mui/material/Grid";
import TopBarNav from "../components/TopBarNav";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material";

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

export default function Layout(props) {
    return (
        <div className={'layout layout-' + props.page}>
            <Grid container spacing={0} sx={{ display: "flex", justifyContent: "center"}}>
                <Grid item xs={6} md={12}>
                    <TopBarNav />
                </Grid>
                <Grid item xs={6} md={1}>
                    {props.Sidebar}
                </Grid>
                <Grid item xs={6} md={11} sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    {props.mainContent}
                </Grid>
                <Grid item xs={6} md={8}>
                    {props.children}
                </Grid>
            </Grid>

        </div>
    );
}