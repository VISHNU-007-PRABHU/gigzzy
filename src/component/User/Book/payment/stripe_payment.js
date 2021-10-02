import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Spin, Form } from 'antd';
import { ACCEPT_JOB_MSG } from '../../../../graphql/User/booking'
import { Alert_msg } from '../../../Comman/alert_msg';
import useReactRouter from 'use-react-router';
import { useMutation } from '@apollo/react-hooks';

import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripe_token = "pk_test_51JVsceD7QuZwAAzVHzQUYqN4GE8kc9xMc2KZHPNVwC748tz0mfeZ11Fm2s0IR9P1G1Wn0WVclLXiMGA0MrjzZosC00WFjDfUz4"

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const { history } = useReactRouter();
    const [errorMessage, set_errorMessage] = useState("")
    const [loading, set_loading] = useState(false)
    const [manage_booking, { loading: removeLoading }] = useMutation(ACCEPT_JOB_MSG)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { token, error } = await stripe.createToken(elements.getElement(CardElement));
        if (token && token.id) {
            set_loading(true);
            let input_data = {
                booking_status: props.current_booking_status,
                booking_id: props.data._id,
                role: 1,
                stripe_token: token.id,
                payment_option: "stripe"
            };
            if (localStorage.getItem("currency")) {
                input_data['location_code'] = JSON.parse(localStorage.getItem("currency")).location
            }
            let result = await manage_booking({ variables: input_data });
            set_loading(false);
            if (result.data.manage_booking && result.data.manage_booking[0].status === "success") {
                Alert_msg({ msg: "Waiting for your payment confirmation", status: "success" });
                history.push(`/admin-booking-invoice/${props.data._id}`)
            } else {
                Alert_msg({ msg: "payment failed", status: "success" });
            }
        }
    };

    return (
        <Spin spinning={loading} className="d-flex justify-content-center mt-4" size="large" >
            <Form onSubmit={handleSubmit}>
                <div className="px-4">
                    <CardElement options={{ hidePostalCode: true }} />
                    <div className="error" role="alert">
                        {errorMessage}
                    </div>
                    <Button htmlType="submit" block className="d-flex p-3 justify-content-center align-items-center normal_font_size bold" type="primary" disabled={!stripe || !elements}>
                        Accept and Pay
                    </Button>
                </div>
            </Form>
        </Spin>
    );
};

const stripePromise = loadStripe(stripe_token);

const StripePayout = (props) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm data={props.data} current_booking_status={props.current_booking_status}/>
    </Elements>
);
export default StripePayout
