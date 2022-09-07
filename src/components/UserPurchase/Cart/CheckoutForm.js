import React, {useState} from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import {StepLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const steps = ["Shipping address", "Payment details", "Review your order"];


export default function CheckoutForm({value}) {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [globalData, setGlobalData] = useState({
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        cardname: '',
        cardnumber: '',
        expdate: '',
        cvv: '',
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm globalData={globalData} setGlobalData={setGlobalData}/>;
            case 1:
                return <PaymentForm globalData={globalData} setGlobalData={setGlobalData}/>;
            case 2:
                return <Review value={value} globalData={globalData} setGlobalData={setGlobalData}/>;
            default:
                throw new Error("Unknown step");
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === 2) {
            setIsLoading(true);
            axios.post("http://localhost:8080/acqPurchase", {
                amount: value.cartTotal,
                contractIdentifier: globalData.cardnumber,
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then((res) => {
                if (res.data['acqPurchaseResult']['value']['retCode'] === 0) {
                    setResult(`Your order number is ${Math.floor(Math.random() * (10000))}. We have 
                    emailed your order confirmation, and will send you an update when your order has shipped.`);
                    setIsLoading(false);
                    value.clearCart();
                } else {
                    setResult("We can't identify your card number");
                    setIsLoading(false);
                }
            });
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} className="checkout-modal-stepper" sx={{
                p: 3,
            }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        {isLoading && <CircularProgress />}
                        <Typography variant="subtitle1">
                            {result}
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className="checkout-modal-buttons" sx={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className="checkout-modal-button" sx={{
                                    marginTop: 3,
                                    marginLeft: 1
                                }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className="checkout-modal-button" sx={{
                                marginTop: 3,
                                marginLeft: 1
                            }}
                            >
                                {activeStep === steps.length - 1 ? "Place order" : "Next"}
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        </React.Fragment>
    );
}
