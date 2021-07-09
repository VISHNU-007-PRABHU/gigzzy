import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { ACCEPT_JOB_MSG } from '../../../graphql/User/booking';
import { client } from '../../../apollo';
import { Form, Button, Spin } from 'antd';
import { Alert_msg } from '../../Comman/alert_msg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
class _CardForm extends Component {
    state = {
        errorMessage: '',
        loading: false,
        phone_number: '',
        country_code: '',
        m_no: '',
    };

    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        } else {
            this.setState({ errorMessage: '', loading: false, hide: false });
        }
    };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        let phone_number = `${this.state.country_code}${this.state.m_no}`
        if (!phone_number) {
            this.setState({
                errorMessage: "Please enter correct phone number"
            });
            return false
        }
        this.setState({ loading: true });

        await client.mutate({
            mutation: ACCEPT_JOB_MSG,
            variables: { booking_status: 10, booking_id: this.props.data._id, role: 1, phone_number: phone_number },
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({ loading: false });
            if (result.data.manage_booking[0].status === "success") {
                Alert_msg({ msg: "Job Booking Success", status: "success" });
                this.props.history.push('/bookings')
            } else {
                Alert_msg({ msg: "Job Booking Cancel Failed", status: "failed" });
            }
        });
        this.setState({ loading: false });
    }
    //     });
    // } else {
    //     Alert_msg({ msg: "Stripe is not working now ...", status: "failed" });
    // }

    render() {
        return (
            <div className="CardDemo w-100">
                <Spin spinning={this.state.loading} className="d-flex justify-content-center mt-4" size="large" >

                    <label className="w-100">
                        Mpesa phone number
                    </label>
                    <PhoneInput
                        searchStyle={{ backgroundColor: 'white' }}
                        placeholder="phone no"
                        inputClass="input_border"
                        buttonClass="input_border"
                        inputStyle={{ height: '46px' }}
                        country={'ke'}
                        mask={{ in: '..........' }}
                        onKeyDown={(event) => {
                            if (event.keyCode == 13) {
                                this.handleSubmit();
                            }
                        }}
                        value={this.state.m_no}
                        onChange={(value, data, event) => {
                            console.log("render -> value", value)
                            console.log("render -> m_no: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length)", value.replace(/[^0-9]+/g, '').slice(data.dialCode.length))
                            console.log("render -> data.dialCode", data.dialCode)
                            this.setState({
                                m_no: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
                                country_code: data.dialCode
                            });
                        }} />
                    <div className="error" role="alert">
                        {this.state.errorMessage}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button onClick={this.handleSubmit} className="mt-3 mx-auto" type="primary" htmlType="submit">
                            Accept and Pay
                        </Button>
                    </div>
                </Spin>
            </div>
        );
    }

}

export default Form.create()(withRouter(_CardForm));
