import Grid from "@mui/material/Grid";
import ClientProfileCard from "./ClientProfileCard";
import ListIssueContract from "./ListIssueContract";

export default function IssueContract(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <ClientProfileCard data={props.data} font={props.font} updateRowAndAPIData={props.updateRowAndAPIData} index={props.index}/>
            </Grid>
            <Grid item xs={6} md={8}>
                <ListIssueContract cid={props.data['id']} font={props.font}/>
            </Grid>

        </Grid>
    );
}