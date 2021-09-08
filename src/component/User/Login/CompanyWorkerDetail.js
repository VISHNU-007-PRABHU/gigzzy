import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Card, Checkbox, Select } from 'antd';
import message from 'antd/lib/message';
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { USER_EMAIL_QUERY } from '../../../graphql/Admin/user';

const { Option } = Select;
const content_data = {
    data1: "ADD YOUR WORKER",
    data2: "BACK",
    data3: "REGISTER",
}
const CompanyRegistrationDetail = (props) => {
    let history = useHistory();
    const [emails, setemails] = useState([]);
    const [Address, setAddress] = useState(false);
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
                                <Card onClick={() => { setAddress(true) }}>
                                    Address
                                </Card>
                                <Address user_id={""} visible={Address} />
                            </Col>
                        </Row>
                        <Row>
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
                                    {form.getFieldDecorator("name", {
                                        rules: [{ required: true }]
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
                        <Button type="primary" className="w-50">
                            <div>{content_data['data2']}</div>
                        </Button>
                    </div>
                </Col>
                <Col className="" span={12}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary" className="w-50">
                            <div>{content_data['data3']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(CompanyRegistrationDetail);
