import React from "react";
import {Title} from "../Title";
import {EmptyCart} from "./EmptyCart";
import {ProductConsumer} from "../Context";
import {CartList} from "./CartList";
import {CartTotals} from "./CartTotals";
import TopBarNav from "../../TopBarNav";
import Grid from "@mui/material/Grid";
import {Divider} from "@mui/material";

export const Cart = props => {
    return (
        <section>
            <TopBarNav/>
            <ProductConsumer>
                {value => {
                    const { cart } = value;
                    if (cart.length > 0) {
                        return (
                            <>
                                <Title name="your" title="cart" />
                                <Divider/>
                                <Grid container>
                                    <Grid item xs={6} md={9}>
                                        <CartList value={value} />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <CartTotals value={value} history={props.history} />
                                    </Grid>
                                </Grid>


                            </>
                        );
                    } else return <EmptyCart />;
                }}
            </ProductConsumer>
        </section>
    );
};
