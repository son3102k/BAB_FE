import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function PaymentForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="Name on card"
                               onChange={(e) => props.setGlobalData({
                                   ...props.globalData,
                                   cardname: e.target.value,
                               })}
                               value={props.globalData.cardname.toUpperCase()}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardNumber" label="Card number"
                               onChange={(e) => props.setGlobalData({
                                   ...props.globalData,
                                   cardnumber: e.target.value,
                               })}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Expiry date"
                               onChange={(e) => props.setGlobalData({
                                   ...props.globalData,
                                   expdate: e.target.value,
                               })}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        onChange={(e) => props.setGlobalData({
                            ...props.globalData,
                            cvv: e.target.value,
                        })}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PaymentForm;
