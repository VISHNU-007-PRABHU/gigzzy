import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button  } from 'antd';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripe_token = "pk_test_51JVsceD7QuZwAAzVHzQUYqN4GE8kc9xMc2KZHPNVwC748tz0mfeZ11Fm2s0IR9P1G1Wn0WVclLXiMGA0MrjzZosC00WFjDfUz4"
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <Button className="d-flex mx-auto" type="primary" disabled={!stripe || !elements}>
                Accept and Pay
            </Button>
        </form>
    );
};

const stripePromise = loadStripe(stripe_token);

const StripePayout = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);
export default StripePayout
