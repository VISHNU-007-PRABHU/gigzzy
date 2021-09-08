import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, Icon, Select } from 'antd';
import message from 'antd/lib/message';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const { Option } = Select;

const content_data = {
    data1: "JOIN AS COMPANY",
    data2: "BACK",
    data3: "NEXT",
}
const FileUpload = React.lazy(() => import('../../Comman/FileUpload'));
const CompanyRegistrationDetail = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [loading, setloading] = useState(false);
    const { form } = props;
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
                            <Col className="justify-content-start d-flex" lg={24}>
                                <Form.Item label="Company Logo">
                                    {form.getFieldDecorator('file', {
                                        rules: [],
                                        valuePropName: 'fileList',
                                    })(
                                        <FileUpload> </FileUpload>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" lg={24}>
                                <Form.Item label="Company Name">
                                    {form.getFieldDecorator("name", {
                                        rules: [{ required: true }]
                                    })(<Input className="input_border" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" lg={24}>
                                <Form.Item label="Company Website">
                                    {form.getFieldDecorator("name", {
                                        rules: [{ required: true }]
                                    })(<Input className="input_border" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" lg={24}>
                                <Form.Item label="Company Category">
                                    {form.getFieldDecorator("name", {
                                        rules: [{ required: true }]
                                    })(<Input className="input_border" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" lg={24}>
                                <Form.Item label="About Company">
                                    {form.getFieldDecorator("name", {
                                        rules: [{ required: true }]
                                    })(<TextArea rows={4} className="pr-1" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="justify-content-start d-flex" lg={24}>
                                <Form.Item label="Company Profile">
                                    {form.getFieldDecorator('file', {
                                        rules: [],
                                        valuePropName: 'fileList',
                                    })(
                                        <FileUpload> </FileUpload>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="" lg={12}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary">
                            <div>{content_data['data2']}</div>
                        </Button>
                    </div>
                </Col>
                <Col className="" lg={12}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary">
                            <div>{content_data['data3']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(CompanyRegistrationDetail);
