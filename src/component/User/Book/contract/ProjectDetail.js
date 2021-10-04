import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const ProjectDetail = (props) => {
    const form = props.customform
    const [contract_detail_data, set_contract_detail] = useState({});
    useEffect(() => {
        set_contract_detail(props.contract_detail_data)
    }, [props])
    console.log()
    return (
        <>
            <Row>
                <Col span={24}>
                    <Form.Item label="Project Name">
                        {form.getFieldDecorator("name", {
                            initialValue: contract_detail_data?.name,
                            rules: [{ required: true }]
                        })(<Input size={"large"} className="" placeholder={"e.g. i need a cleaner for my office"} />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label="Project Description">
                        {form.getFieldDecorator("description", {
                            initialValue: contract_detail_data?.description,
                            rules: [{ required: true }]
                        })(<TextArea size={"large"} rows={6} />)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectDetail);
