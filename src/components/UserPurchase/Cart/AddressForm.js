import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


function AddressForm(props) {
    useEffect(() => {

    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            firstname: e.target.value,
                        })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            lastname: e.target.value,
                        })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            address1: e.target.value,
                        })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            address2: e.target.value,
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            city: e.target.value,
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            state: e.target.value,
                        })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            zip: e.target.value,
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        onChange={(e)=> props.setGlobalData({
                            ...props.globalData,
                            country: e.target.value,
                        })}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddressForm;
