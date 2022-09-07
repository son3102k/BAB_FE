import React from "react";
import Typography from "@mui/material/Typography";
import {List, ListItem, ListItemText} from "@mui/material";
import Grid from "@mui/material/Grid";

function Review({value, globalData}) {
    const cart = value.cart;
    const products = cart.map((e)=> ({
        name: e.title, desc: `count: ${e.count}`, price: e.total
    }));
    products.push({name: 'Tax 10%', desc: '', price: value.cartTax});
    const addresses = [
        globalData.address1,
        globalData.address2,
        globalData.city,
        globalData.zip,
        globalData.country,
    ];
    const payments = [
        { name: "Card type", detail: "Visa" },
        { name: "Card holder", detail: globalData.cardname.toUpperCase() },
        { name: "Card number", detail: globalData.cardnumber },
        { name: "Expiry date", detail: globalData.expdate }
    ];
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map(product => (
                    <ListItem key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
                <ListItem>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1">
                        {`₽ ${value.cartTotal}`}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Shipping
                    </Typography>
                        <Typography gutterBottom>{`${globalData.firstname} ${globalData.lastname}`}</Typography>
                    <Typography gutterBottom>{addresses.join(", ")}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Review;
