import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import { Button, Row, Col, Typography, Form, Input, Skeleton } from 'antd';
import jiffy from '../../../image/Gigzzy.png';
import main from '../../../image/Gigzzy.png';
import PhoneInput from 'react-phone-input-2';
import OtpInput from 'react-otp-input';
import 'react-phone-input-2/lib/style.css'
import '../../../scss/user.scss';
import { TiRefresh } from "react-icons/ti";

import { ADD_USER, CHECK_OPT, EMAIL_LOGIN, UPDATE_COMPANY } from '../../../graphql/User/login';
import { client } from "../../../apollo";
import { Alert_msg } from "../../Comman/alert_msg";
const { Text, Title } = Typography;

const ChooseRegistration = React.lazy(() => import('./ChooseRegistration'));
const CompanyRegistrationDetail = React.lazy(() => import('./CompanyRegistrationDetail'));
const CompanyWorkerDetail = React.lazy(() => import('./CompanyWorkerDetail'));
class User_Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            register: 0,
            otp_login: true,
            email_login: 0,
            choose_registration: false,
            company_registration_detail: false,
            company_worker_detail: false,
            country_code: '',
            location_code:"",
            login: 1,
            company_id: "",
            m_no: '',
            user_type: "individual"
        };
    }
    get_otp = async () => {
        const { form } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                await client.query({
                    query: ADD_USER,
                    variables: { option: "otp", phone_no: this.state.m_no, role: 1,location_code:this.state.location_code, country_code: this.state.country_code },
                    fetchPolicy: 'no-cache',
                }).then(result => {
                    console.log(result.data.addUser.status);
                    localStorage.setItem('user', JSON.stringify(result.data.addUser));
                    localStorage.setItem('currency', JSON.stringify(result.data.addUser.get_currency));
                    Alert_msg({ msg: result.data.addUser.otp, status: "success" });
                    this.setState({ login: 0 });
                });

            }
        });
    }

    resend_otp = async () => {
        var data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        await client.query({
            query: ADD_USER,
            variables: { option: "otp", phone_no: data.phone_no, role: 1, country_code: data.phone_no,location_code:this.state.location_code },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result.data.addUser.status);
            localStorage.setItem('user', JSON.stringify(result.data.addUser));
            localStorage.setItem('currency', JSON.stringify(result.data.addUser.get_currency));
            Alert_msg({ msg: result.data.addUser.otp, status: "success" });
            this.setState({ login: 0 });
        });
    }

    check_otp = async () => {
        const { form } = this.props;
        form.validateFields(async (err, values) => {
            console.log(values);
            var user = localStorage.getItem('user');
            console.log(user);
            if (!err) {
                await client.query({
                    query: CHECK_OPT,
                    variables: { _id: JSON.parse(user)._id, otp: values.otp },
                    fetchPolicy: 'no-cache',
                }).then(result => {
                    // console.log(result.data);
                    if (result.data.checkOtp.msg === "new user") {
                        Alert_msg(result.data.checkOtp);
                        this.setState({ choose_registration: 1, otp_login: 0 });
                    } else if (result.data.checkOtp.msg === "Wrong OTP") {
                        // console.log(this.props);
                        Alert_msg(result.data.checkOtp);
                        localStorage.setItem('userLogin', "failed");
                    } else {
                        // console.log(this.props);
                        if (result.data.checkOtp.user_type && result.data.checkOtp.user_type === "company") {
                            if (result.data.checkOtp.company_register_status === 1) {
                                this.setState({ company_registration_detail: 1, otp_login: 0 });
                                return false
                            } else if (result.data.checkOtp.company_register_status === 2) {
                                this.setState({ company_worker_detail: 1, otp_login: 0 });
                                return false
                            }
                        }
                        localStorage.setItem('userLogin', "success");
                        this.props.history.push('/');
                    }
                });

            }
        });
    }

    change_from_type = (data, option = {}) => {
        if (data === "COMPANY_REGISTRATION") {
            this.setState({ user_type: "company", register: 1, choose_registration: 0 });
        } else if (data === "INDIVIDUAL_REGISTRATION") {
            this.setState({ user_type: "individual", register: 1, choose_registration: 0 });
        } else if (data === "CHO0SE_REGISTRATION") {
            this.setState({ user_type: "individual", choose_registration: true, });
        } else if (data === "COMPANY_REGISTRATION_DETAIL") {
            this.setState({ user_type: "individual", company_registration_detail: true, });
        } else if (data === "COMPANY_WORKER_DETAIL") {
            this.setState({ user_type: "individual", company_worker_detail: true,company_registration_detail:false });
        }
    }


    submitFromData = async (data,type="") => {
        console.log("submitFromData -> data", data)
        data['user_type'] = this.state.user_type
        // this.setState({ company_registration_detail: 0, company_worker_detail: 1 });
        var user = localStorage.getItem('user');
        if (user) {
            data['user_id'] = JSON.parse(user)._id
        }
        let companyID = ""
        if (localStorage.getItem('user_company_id')) {
            companyID = localStorage.getItem('user_company_id')
        }
        if (data) {
            await client.mutate({
                mutation: UPDATE_COMPANY,
                variables: { _id: companyID, company_data: [data] },
            }).then(result => {
                console.log(result.data);
                Alert_msg(result.data.update_company_detail);
                if (result.data.update_company_detail.status === "success") {
                    if(type === "COMPANY_REGISTRATION_DETAIL"){
                        this.setState({ company_id: result.data.update_company_detail._id, company_registration_detail: 0, company_worker_detail: true });
                    }else if(type === "COMPANY_WORKER_DETAIL"){
                        localStorage.setItem("userLogin",'success')
                        this.props.history.push('/');
                    }
                } else {
                    if(type === "COMPANY_REGISTRATION_DETAIL"){
                        this.setState({ company_registration_detail: 1 });
                    }else if(type === "COMPANY_WORKER_DETAIL") {
                        this.setState({ company_worker_detail: 1 });
                    }
                }
            });

        }
    }

    emailLogin = async () => {
        const { form } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                await client.query({
                    query: EMAIL_LOGIN,
                    variables: { role: 1, email: values.email, password: values.password },
                    fetchPolicy: 'no-cache',
                }).then(result => {
                    console.log(result.data.sing_up.status);
                    localStorage.setItem('user', JSON.stringify(result.data.addUser));
                    Alert_msg({ msg: result.data.addUser.otp, status: "success" });
                    this.setState({ login: 0 });
                });

            }
        });
    }

    add_user = async () => {
        const { form } = this.props;
        form.validateFields(async (err, values) => {
            console.log(values);
            var user = localStorage.getItem('user');
            if (!err) {
                await client.mutate({
                    mutation: ADD_USER,
                    variables: { user_type: this.state.user_type, option: 'add', _id: JSON.parse(user)._id, last_name: values.last_name, first_name: values.first_name, email: values.email, password: values.password },
                }).then(result => {
                    console.log(result.data, "userdata");
                    Alert_msg(result.data.addUser);
                    if (result.data.addUser.status === "success") {
                        if (result.data.addUser.company_id && this.state.user_type === "company") {
                            this.setState({ company_id: result.data.addUser.company_id, company_registration_detail: 1, register: 0 });
                            localStorage.setItem('user_company_id', result.data.addUser.company_id);
                        } else {
                            localStorage.setItem('userLogin', "success")
                            this.props.history.push('/');
                        }
                    } else {
                        this.setState({ register: 1, otp_login: 0 });
                    }
                });

            }
        });
    }

    render() {
        const { form } = this.props;
        return (
            <Row style={{ overflow: 'auto', height: '100vh' }}>
                <Col lg={12} className="d-none d-lg-flex d-xl-flex justify-content-center align-items-center overflow-hidden h-100">
                    <div className="d-flex justify-content-around">
                        <img src={jiffy} alt="jiffy" style={{ width: 300 }} />
                    </div>
                </Col>
                <Col lg={12} md={24} sm={24} className="froms" style={{ overflow: 'auto', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={this.state.otp_login ? "w-75 mw-450" : " d-none"}>
                        <Row>
                            <Col span={24} className="d-flex d-sm-flex d-lg-none h4 justify-content-around py-3 my-2">
                                <img src={main} alt="jiffy" width='12' style={{ width: '8em', height: '3em' }} height='10' />
                            </Col>
                            <Col span={24} className="d-flex justify-content-around py-3">
                                <Title level={2}> <Text className="primary_color" strong={true} >LOGIN</Text></Title>
                            </Col>
                            <Row>
                                <Col span={24} className={this.state.login ? 'py-3' : 'd-none'}>
                                    <Form.Item label="Mobile Number">
                                        {form.getFieldDecorator("phone", {
                                            rules: this.state.login ? [{ required: true, message: 'Phone Number is required' }] : []
                                        })(<PhoneInput
                                            searchStyle={{ backgroundColor: 'white' }}
                                            placeholder="phone no"
                                            inputClass="input_border"
                                            buttonClass="input_border"
                                            inputStyle={{ height: '46px' }}
                                            country={'ke'}
                                            mask={{ in: '..........' }}
                                            onKeyDown={(event) => {
                                                if (event.keyCode === 13) {
                                                    this.get_otp();
                                                }
                                            }}
                                            onChange={(value, data, event) => {
                                                console.log("render -> data", data)
                                                this.setState({
                                                    m_no:value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
                                                    country_code: data.dialCode,
                                                    location_code: data.countryCode
                                                    });
                                            }} />

                                        )}
                                    </Form.Item>
                                </Col>

                                <Col span={24} className={this.state.login ? 'd-none' : 'py-3'}>
                                    <Form.Item className="otp_align" label="OTP">
                                        {form.getFieldDecorator("otp", {
                                            rules: this.state.login ? [] : [{ required: true, message: 'otp is required' }]
                                        })(<OtpInput
                                            onChange={otp => { this.setState({ otp }) }}
                                            numInputs={4}
                                            //inputStyle={{ width: '5em', margin: "0px 5px" }}
                                            //className="otp_align"
                                            inputStyle={{ width: '3em', height: '3em', margin: "0px 1px" }}
                                            separator={<span className="px-3"> </span>}
                                        />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Col span={24}>
                                <Button type="primary" size="large" block className={this.state.login ? '' : 'd-none'} htmlType="submit" onClick={this.get_otp}>
                                    Next
                                </Button>
                                <Button type="primary" size="large" block className={this.state.login ? 'd-none' : ''} htmlType="submit" onClick={this.check_otp}>
                                    Submit
                                </Button>
                                <Button type="link" size="large" block className={this.state.login ? 'd-none' : ''} onClick={this.resend_otp}>
                                    <TiRefresh className="primary_color" /> <span className="primary_color">resend otp</span>
                                </Button>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center py-3">
                                <Text>or</Text>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center">
                                <Button type="link" onClick={() => { this.props.history.push('/signup') }}><Text>Login via <span className="primary_color">Email Address</span> </Text></Button>
                            </Col>
                        </Row>
                    </div>

                    <div className={this.state.email_login ? "w-75 mw-450" : " d-none"}>
                        <Row>
                            <Col span={24} className="d-flex d-sm-flex d-lg-none h4 justify-content-around py-3 my-2">
                                <img src={main} alt="jiffy" width='12' style={{ width: '8em', height: '3em' }} height='10' />
                            </Col>
                            <Col span={24} className="d-flex justify-content-around py-3">
                                <Title level={2}> <Text className="primary_color" strong={true} >LOGIN</Text></Title>
                            </Col>
                            <Row>
                                <Col className="" lg={24}>
                                    <Form.Item label="Email">
                                        {form.getFieldDecorator("email", {
                                            rules: this.state.email_login ? [{ required: true }] : []
                                        })(<Input placeholder="Email" className="input_border" />)}
                                    </Form.Item>
                                </Col>
                                <Col className="" lg={24}>
                                    <Form.Item label="Password">
                                        {form.getFieldDecorator("password", {
                                            rules: this.state.email_login ? [{ required: true }] : []
                                        })(<Input.Password placeholder="Password" className="input_border border_less" onPressEnter={this.check_otp} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24}>
                                <Button type="primary" size="large" block className={this.state.email_login ? '' : 'd-none'} htmlType="submit" onClick={this.check_otp}>
                                    Submit
                                </Button>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center py-3">
                                <Text>or</Text>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center">
                                <Button type="link" onClick={() => { this.setState({ email_login: 0, otp_login: 1 }) }}><Text>Are you new here ? <span className="primary_color">Register</span></Text></Button>
                            </Col>
                        </Row>
                    </div>

                    <div className={this.state.register ? "w-75 mw-450" : " d-none"}>
                        <Row>
                            <Col span={24} className="d-flex d-sm-flex d-lg-none h4 justify-content-around py-3 my-2">
                                <img src={main} alt="jiffy" width='12' style={{ width: '8em', height: '3em' }} height='10' />
                            </Col>
                            <Col span={24} className="d-flex justify-content-around py-3">
                                <Title level={2}> <Text className="primary_color" strong={true} >REGISTER</Text></Title>
                            </Col>
                            <Row>
                                <Col className="" lg={24}>
                                    <Form.Item label="First Name">
                                        {form.getFieldDecorator("frist_name", {
                                            rules: this.state.register ? [{ required: true }] : []
                                        })(<Input className="input_border" />)}
                                    </Form.Item>
                                </Col>
                                <Col className="" lg={24}>
                                    <Form.Item label="Last Name">
                                        {form.getFieldDecorator("last_name", {
                                            rules: this.state.register ? [{ required: true }] : []
                                        })(<Input className="input_border" />)}
                                    </Form.Item>
                                </Col>
                                <Col className="" lg={24}>
                                    <Form.Item label="Email">
                                        {form.getFieldDecorator("email", {
                                            rules: this.state.register ? [{ required: true }] : []
                                        })(<Input className="input_border" />)}
                                    </Form.Item>
                                </Col>
                                <Col className="" lg={24}>
                                    <Form.Item label="Password">
                                        {form.getFieldDecorator("password", {
                                            rules: this.state.register ? [{ required: true }] : []
                                        })(<Input.Password className="input_border" />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24}>
                                <Button type="primary" size="large" block className={this.state.register ? '' : 'd-none'} htmlType="submit" onClick={this.add_user}>
                                    Register
                                </Button>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center py-3">
                                <Text>or</Text>
                            </Col>
                            <Col span={24} className="d-flex justify-content-center">
                                <Button type="link" onClick={() => { this.setState({ register: 0, otp_login: 1, login: 1 }) }}><Text>Are you new here ? <span className="primary_color">Register</span></Text></Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={this.state.choose_registration ? "w-75 mw-450" : " d-none"}>
                        <Suspense fallback={<Skeleton />}>
                            <ChooseRegistration change_from_type={this.change_from_type}></ChooseRegistration>
                        </Suspense>
                    </div>
                    <div className={this.state.company_registration_detail ? "w-75 mw-450" : " d-none"}>
                        <Suspense fallback={<Skeleton />}>
                            <CompanyRegistrationDetail change_from_type={this.change_from_type} submitFromData={this.submitFromData}></CompanyRegistrationDetail>
                        </Suspense>
                    </div>
                    <div className={this.state.company_worker_detail ? "w-75 mw-450" : " d-none"}>
                        <Suspense fallback={<Skeleton />}>
                            <CompanyWorkerDetail change_from_type={this.change_from_type} submitFromData={this.submitFromData}></CompanyWorkerDetail>
                        </Suspense>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Form.create()(User_Login);
