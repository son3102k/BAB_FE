import React from "react";
import {Title} from "../Title";
import {EmptyCart} from "./EmptyCart";
import {ProductConsumer} from "../Context";
import {CartList} from "./CartList";
import {CartTotals} from "./CartTotals";
import TopBarNav from "../../TopBarNav";

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
                                <CartList value={value} />
                                <CartTotals value={value} history={props.history} />
                            </>
                        );
                    } else return <EmptyCart />;
                }}
            </ProductConsumer>
        </section>
    );
};
