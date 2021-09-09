import React, { useState } from 'react'
import { Row, Col, Form, Input, Radio, Collapse, Button, Icon } from 'antd';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
    background: 'white',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

const options1 = [
    { label: 'one', value: 'One time' },
    { label: 'year', value: 'Yearly' },
];

const options2 = [
    { label: 'monthly', value: 'Monthly' },
    { label: 'recurring', value: 'Recurring' },
];


const ProjectBudget = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [show_terms, setshow_terms] = useState(false);
    const { form } = props;
    const onChange1 = e => {
        console.log('radio1 checked', e.target.value);
    };
    return (
        <>
            <Row>
                <Col span={24}>
                    <Form.Item label="Project Budget">
                        {form.getFieldDecorator("budget", {
                            rules: [{ required: true }]
                        })(<Input size={"large"} className="" addonAfter="Ksh" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item label="Project Timeline">
                        {form.getFieldDecorator("timeline", {
                            rules: [{ required: true }]
                        })(<Input size={"large"} className="" addonAfter="Days" />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    <Radio.Group onChange={onChange1} size={'large'} className="d-flex w-100">
                        <div className="d-flex flex-column w-50 ml-5">
                            <Radio value={1}>One time</Radio>
                            <Radio value={2}>Monthly</Radio>
                        </div>
                        <div className="d-flex flex-column w-50">
                            <Radio value={3}>Yearly</Radio>
                            <Radio value={4}>Recurring</Radio>
                        </div>
                    </Radio.Group>
                </Col>
            </Row>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    <Button onClick={() => { setshow_terms(!show_terms) }} type="link" className="primary_color normal_font_size">
                        <div className="d-flex align-items-start">
                            <Icon type="plus-circle" />
                            <div className="px-2"> Add Terms and Conditions</div>
                        </div>
                    </Button>
                    <div className={show_terms ? '' : 'd-none'}>
                        <Form.Item label="">
                            {form.getFieldDecorator("timeline", {
                            })(<TextArea size={"large"} rows={6} />)}
                        </Form.Item>
                    </div>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectBudget);
