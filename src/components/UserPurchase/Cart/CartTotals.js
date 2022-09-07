import React from "react";
import {Link} from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

export const CartTotals = ({ value, history }) => {
    const {cartSubTotal, cartTax, cartTotal, clearCart } = value;
    return (
        <>
            <div className="container mt-xl-5">
                <div className="row">
                    <div
                        className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8
      text-capitalize text-right"
                    >
                        <Link to="/cart">
                            <button
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                onClick={() => clearCart()}
                            >
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">subtotal :</span>
                            <strong>₽ {cartSubTotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">tax :</span>
                            <strong>₽ {cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">total :</span>
                            <strong>₽ {cartTotal}</strong>
                        </h5>
                        <CheckoutButton
                            value={value}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
