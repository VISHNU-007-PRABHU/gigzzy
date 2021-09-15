import React, { Suspense,useState, useEffect } from 'react'
import { Row, Col, Button, Form, Card, Checkbox, Select,Skeleton } from 'antd';
import message from 'antd/lib/message';
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER_EMAIL_QUERY } from '../../../graphql/Admin/user';
const Address = React.lazy(() => import('../Book/Address'));

const { Option } = Select;
const content_data = {
    data1: "ADD YOUR WORKER",
    data2: "BACK",
    data3: "REGISTER",
}
const CompanyRegistrationDetail = (props) => {
    let history = useHistory();
    const [emails, setemails] = useState([]);
    const [address_visible, set_address_visible] = useState(false);
    const [user_id, set_user_id] = useState("");
    const result = useQuery(USER_EMAIL_QUERY);
    const { form } = props;
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    const SearchEmail = async (value) => {
        if (value) {
            let variable_data = { 'email': { $regex: '.*' + value + '.*', $options: 'i' }, role: 2 }
            result.refetch({ variables: { variable_data } })
        }
    }

    const chooseType = (type) => {
        props.change_from_type(type)
    }

    const SubmitData = (type) => {
        form.validateFields(async (err, values) => {
            props.submitFromData(values,"COMPANY_WORKER_DETAIL")
        })
    }

    console.log("SearchEmail -> result", result)
    return (
        <>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">{content_data['data1']}</div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="company_reg_detail">
                        <Row>
                            <Col className="" lg={24}>
                                <Card onClick={() => { set_address_visible(!address_visible) }}>
                                    Address
                                </Card>
                                <div className={address_visible ? "d-none":""}>
                                   <Address company={true} visible={address_visible} />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[0, 24]}>
                            <Col className="" lg={24}>
                                <Form.Item label="Add your worker">
                                    {form.getFieldDecorator("provider_email", {
                                        // initialValue: this.state.update_data.address,
                                        rules: [{ required: false }]
                                    })(<Select className="input_border" mode="tags" style={{ width: '100%' }} placeholder="Enter your worker email" onSearch={SearchEmail}>
                                        {emails.map(mailData => (
                                            <Option key={mailData.email}>{mailData.email}</Option>
                                        ))}
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" lg={24}>
                                <Form.Item label="">
                                    {form.getFieldDecorator("add_label", {
                                        rules: [{ required: false }]
                                    })(<Checkbox onChange={onChange}>Add label</Checkbox>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="" span={12}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary" className="w-50" onClick={() => { chooseType('COMPANY_REGISTRATION_DETAIL') }}>
                            <div>{content_data['data2']}</div>
                        </Button>
                    </div>
                </Col>
                <Col className="" span={12}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary" className="w-50" onClick={() => { SubmitData() }}>
                            <div>{content_data['data3']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(CompanyRegistrationDetail);
