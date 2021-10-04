import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Button,Select } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CONTRACT_FILE, GET_CONTRACT_FILES, DELETE_CONTRACT_FILE } from '../../../../graphql/User/contract';

const { Option } = Select;
const catgeoryoptions =[
    {
        _id:"others",
        name:"Other"
    }, {
        _id:"Drawing",
        name:"Drawing"
    }
]
const ProjectImagesCategoryModel = (props) => {
    let history = useHistory();
    const [image_detail, set_image_detail] = useState({});
    const [ContractJobFileUpload, { }] = useMutation(UPDATE_CONTRACT_FILE)
    const { getFieldDecorator } = props.form;

    useEffect(() => {
        set_image_detail(props.image_comman_data)
    }, [props])

    const submitData = async () => {
        props.form.validateFields(async (err, values) => {
            console.log("next -> values", values)
            if (!err) {
                values['_id'] = image_detail['_id'];
                console.log("submitData -> values", values)
                if (image_detail['_id']) {
                    let final_data = await ContractJobFileUpload({ variables: values })
                    if(final_data.data.ContractJobFileUpload.status==="success"){
                        props.modelReturnFuncion()
                    }
                }
            }
        })
    }
    return (
        <>
            <Form name="contract_image_update">
                <Row>
                    <Col span={24}>
                        <Form.Item label="Project Category">
                            {getFieldDecorator("category", {
                                initialValue: image_detail?.doc_category,
                                rules: [{ required: true }]
                            })( <Select
                                size={"large"} 
                                placeholder="Select a image category"
                                allowClear
                            >
                                {catgeoryoptions.map(item => (
                                    <Option value={item['_id']}>{item['name']}</Option>
                                ))}
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Project Tage">
                            {getFieldDecorator("image_tag", {
                                initialValue: image_detail?.image_tag,
                                rules: [{ required: true }]
                            })(<Input size={"large"} className="" />)}
                        </Form.Item>
                    </Col>
                </Row>
                <div className="steps-action justify-content-between d-flex">
                    <Button type="primary" className="w-50" block onClick={() => submitData()}>
                        <div className="normal_font_size">Submit</div>
                    </Button>
                </div>
            </Form>
        </>
    )
};
export default Form.create()(ProjectImagesCategoryModel);
