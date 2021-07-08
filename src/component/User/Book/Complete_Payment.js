import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { ACCEPT_JOB_MSG, My_APPOINTMENTS } from '../../../graphql/User/booking';
import { client } from '../../../apollo';
import { Form, Button, Spin } from 'antd';
import { Alert_msg } from '../../Comman/alert_msg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
class _CardForm extends Component {
    state = {
        errorMessage: '',
        loading: false,
        hide: 0,
        phone_number: '',
        country_code: '',
        m_no:'',
    };

    handleChange = ({ error }) => {
        console.log(error)
        if (error) {
            this.setState({ errorMessage: error.message });
        } else {
            this.setState({ errorMessage: '', loading: false, hide: false });
        }
    };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log(this.props.stripe)
        let phone_number = `${this.state.country_code}${this.state.m_no}`

        if (!phone_number) {
            this.setState({ errorMessage: "Please enter correct phone number", loading: false });
        } else {
            this.setState({ loading: 1 });
            await client.mutate({
                mutation: ACCEPT_JOB_MSG,
                variables: { booking_status: 14, booking_id: this.props.data._id, role: 1, phone_number: phone_number },
                fetchPolicy: 'no-cache',
                refetchQueries: My_APPOINTMENTS,
            }).then(result => {
                if (result.data.manage_booking[0].status === "success") {
                    Alert_msg({ msg: "Job Completed Success", status: "success" });
                    this.setState({ hide: 1 });
                    this.props.handleResult({ msg: "Job Completed Success", status: "success" });
                } else {
                    Alert_msg({ msg: "Job Completed Failed", status: "failed" });
                }
                this.setState({ loading: 0 });
            });
        }

    };

    render() {
        return (
            <div className={this.state.hide ? "d-none" : "CardDemo w-100"}>
                <Spin spinning={this.state.loading} className="d-flex justify-content-center mt-4" size="large" >
                    <label className="w-100">
                        Card details
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
                            this.setState({
                                m_no: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
                                country_code: data.dialCode
                            });
                        }} />
                    <div className="error" role="alert">
                        {this.state.errorMessage}
                    </div>
                    <div className="d-flex mx-auto">
                        <Button onClick={this.handleSubmit}  className="mt-3 mx-auto" type="primary" htmlType="submit">
                            Accept and Pay
                        </Button>
                    </div>
                </Spin>
            </div>
        );
    }
}

const CardForm = withRouter(_CardForm);

export default class CompletePayment extends Component {
    render() {
        console.log(this.props);
        return (
            <CardForm handleResult={this.props.handleResult} data={this.props.data} />
        );
    }
}