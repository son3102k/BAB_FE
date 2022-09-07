import React from "react";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReactDOM from "react-dom/client";
import CheckoutModal from "./CheckoutModal";

export default function CheckoutButton({value}) {
    const handleCheckoutClick = () => {
        ReactDOM.createRoot(document.getElementById('checkout-modal')).render(
            <CheckoutModal value={value} />
        );
    }
    return (
        <>
            <div id="checkout-modal"/>
            <Button variant="contained" sx={{
                mt: 5,
                width: 170,
            }} onClick={handleCheckoutClick}>
                <ShoppingCartCheckoutIcon/>
                Checkout
            </Button>
        </>
    );
}
