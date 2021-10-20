import React, { useState, useEffect } from 'react'
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
    const [show_terms, setshow_terms] = useState(false);
    const [contract_detail_data, set_contract_detail] = useState({});
    var form = props.customform
    useEffect(() => {
        set_contract_detail(props.contract_detail_data)
        if(contract_detail_data.terms_condition!="")
        {
            setshow_terms(true);
        }
    }, [props])

    const onChange1 = e => {
        contract_detail_data.timeline_type = e.target.value
    };
    const onChange_timeline = e => {
        contract_detail_data.timeline = e.target.value
    };
    
    const timeline_description = () => {
        var date = new Date();
        var current_timeline=contract_detail_data?.timeline || 0
        switch (contract_detail_data?.timeline_type) {
            case "1":
                return "One time Job"
                break;
            case "2":
                var newDate = new Date(date.setMonth(date.getMonth()+parseInt(current_timeline)));
                return "Job will be repeating every month until "+newDate.toISOString().slice(0, 10).replace('T',' ')
                break;
            case "3":
                var newDate = new Date(date.setMonth(date.getMonth()+parseInt(current_timeline)*12));
                return "Job will be repeating every year until "+newDate.toISOString().slice(0, 10).replace('T',' ')
                break;
            case "4":
                return "Job will be repeating every months until you stop the recurring"
                break;
            default:
                return "One time Job"
                break;
        }
    }
    const timeline_type_addon = ()=>{
        switch (contract_detail_data?.timeline_type) {
            case "1":
                return ""
                break;
            case "2":
                return "Months"
                break;
            case "3":
                return "Years"
                break;
            case "4":
                return ""
                break;
            default:
                return ""
                break;
        }
        
    }
    return (
        <>
            <Row>
                <Col span={24}>
                    <label className="d-flex w-100">
                        <span className="ant-form-item-required font-weight-bold">Project Budget</span>
                    </label>
                    <Form.Item label="">
                        {form.getFieldDecorator("budget", {
                            initialValue: contract_detail_data?.budget,
                        })(<Input size={"large"} className="" addonAfter="Ksh" />)}
                    </Form.Item>
                </Col>
            </Row>
            <label className="d-flex w-100">
                <span className="ant-form-item-required font-weight-bold">Project Timeline</span>
            </label>
            <small>{timeline_description()}</small>
            {timeline_type_addon()!="" && 
            <Row>
                <Col span={24}>
                    <Form.Item label="">
                        {form.getFieldDecorator("timeline", {
                            initialValue: contract_detail_data?.timeline,
                        })(<Input size={"large"} className="" onChange={onChange_timeline}  addonAfter={timeline_type_addon()} />)}
                    </Form.Item>
                </Col>
            </Row>
            }
            <Row>
                <Col span={24}>
                    <Form.Item className="mb-0" label="">
                        {form.getFieldDecorator("timeline_type", {
                            initialValue: contract_detail_data?.timeline_type,
                        })(
                            <Radio.Group value={contract_detail_data?.timeline_type} onChange={onChange1} size={'large'} className="d-flex w-100">
                                <Col md={{span:18,offset:6}}>
                                    <Row className="font-weight-bold" >
                                        <Col className="py-2" md={{span:12,offset: 0}}>
                                            <Radio value={"1"}>One time</Radio>
                                        </Col>
                                        <Col className="py-2" md={{span:12,offset: 0}}>
                                            <Radio value={"2"}>Monthly</Radio>
                                        </Col>
                                        <Col className="py-2" md={{span:12,offset: 0}}>
                                            <Radio value={"3"}>Yearly</Radio>
                                        </Col>
                                        <Col className="py-2" md={{span:12,offset: 0}}>
                                            <Radio value={"4"}>Recurring</Radio>
                                        </Col>
                                    </Row>
                                </Col>
                            </Radio.Group>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col span={24}>
                    <Button onClick={() => { setshow_terms(!show_terms) }} type="link" className="primary_color normal_font_size p-0">
                        <div className="d-flex align-items-center">
                            <Icon type="plus-circle" />
                            <div className="px-3"> Add Terms and Conditions</div>
                        </div>
                    </Button>
                    <div className={show_terms ? '' : 'd-none'}>
                        <Form.Item label="">
                            {form.getFieldDecorator("terms_condition", {
                                initialValue: contract_detail_data?.terms_condition,
                            })(<TextArea size={"large"} rows={6} />)}
                        </Form.Item>
                    </div>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectBudget);
