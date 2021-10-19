import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const ProjectDetail = (props) => {
    const form = props.customform
    const [contract_detail_data, set_contract_detail] = useState({});
    const [project_name_length, set_project_name_length] = useState("");
    useEffect(() => {
        set_contract_detail(props.contract_detail_data)
        set_project_name_length(props.contract_detail_data.name)

    }, [props])
    
    return (
        <>
            <Row>
                <Col span={24}>
                    <label class="d-flex w-100">
                        <span className="ant-form-item-required font-weight-bold">Project Name</span>
                        <span className="ml-auto text-black-50">{project_name_length?.length}/50</span>
                    </label>
                    <Form.Item >
                        {form.getFieldDecorator("name", {
                            initialValue: contract_detail_data?.name,
                            rules: [{ required: true ,message:'Project Name is required'}]
                        })(<Input  maxLength={50} className="extra_radius_input h-50x" value={contract_detail_data?.name} onChange={(e)=>{set_project_name_length(e.target.value)}} placeholder={"e.g. i need a cleaner for my office"} />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <label class="d-flex w-100">
                        <span className="ant-form-item-required font-weight-bold">Project Description</span>
                    </label>
                    <Form.Item>
                        {form.getFieldDecorator("description", {
                            initialValue: contract_detail_data?.description,
                            rules: [{ required: true ,message:'Project Descripiton is required'}]
                        })(<TextArea size={"large"} className="extra_radius_input" rows={6} />)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectDetail);
