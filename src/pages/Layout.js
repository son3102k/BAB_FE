import Grid from "@mui/material/Grid";
import TopBarNav from "../components/TopBarNav";
import Sidebar from "../components/Sidebar";

export default function Layout(props) {
    return (
        <div className={'layout layout-' + props.page}>
            <Grid container spacing={0}>
                <Grid item xs={6} md={12}>
                    <TopBarNav />
                </Grid>
                <Grid item xs={6} md={2}>
                    {props.Sidebar}
                </Grid>
                <Grid item xs={6} md={10} sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    {props.mainContent}
                </Grid>
            </Grid>

        </div>
    );
}