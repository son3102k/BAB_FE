import Grid from "@mui/material/Grid";
import TopBarNav from "../components/TopBarNav";

export default function Layout(props) {
    return (
        <div className={'layout layout-' + props.page}>
            <Grid container spacing={0}>
                <Grid item xs={6} md={12}>
                    <TopBarNav />
                </Grid>
                <Grid item xs={6} md={1}>
                    {props.Sidebar}
                </Grid>
                <Grid item xs={6} md={11} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {props.mainContent}
                </Grid>
            </Grid>

        </div>
    );
}