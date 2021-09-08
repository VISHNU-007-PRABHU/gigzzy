import React, { useState } from 'react'
import { Row, Col, Form, Input } from 'antd';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;


const ProjectDetail = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [loading, setloading] = useState(false);
    const { form } = props;
    return (
        <>
            <Row>
                <Col span={24}>
                    <Form.Item label="Company Category">
                        {form.getFieldDecorator("name", {
                            rules: [{ required: true }]
                        })(<Input size={"large"} className="" placeholder={"e.g. i need a cleaner for my office"}/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label="About Company">
                        {form.getFieldDecorator("name", {
                            rules: [{ required: true }]
                        })(<TextArea size={"large"} rows={6} />)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectDetail);
