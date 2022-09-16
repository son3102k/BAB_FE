import React from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import QrCodeIcon from '@mui/icons-material/QrCode';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "react-qr-code";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import QRCodeModal from "./QRCodeModal";
import { useEffect, useState } from "react";

export const CartTotals = ({ value, history }) => {
    const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
    const [open, setOpen] = useState(false);
    const handleClose = () => {

        setOpen(false);
        console.log(open);
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderRadius: 16,
        width: 500,
    }));

    const handleQrCode = () => {
        setOpen(true);
        ReactDOM.createRoot(document.getElementById('qr-modal')).render(
            <QRCodeModal value={cartTotal}></QRCodeModal>

        );
    }

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
                                Clear cart
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
                        <div id="qr-modal" />
                        <Button variant="contained" sx={{
                            mt: 5,
                            width: 170,
                        }} onClick={handleQrCode}>
                            <QrCodeIcon />
                            QR Code
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
