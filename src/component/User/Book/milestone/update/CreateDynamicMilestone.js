import React, { Suspense, useState, useEffect } from 'react'
import { Row, Col, Form, InputNumber, Input, Icon, Select, Button, Popconfirm, Upload } from 'antd';
import { Alert_msg } from '../../../../Comman/alert_msg';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_MILESTONE } from '../../../../../graphql/User/milestone';
import _ from 'lodash'

const { Option } = Select;
const { TextArea } = Input;

const sights = [{
    value: 'days',
    label: "Days"
}, {
    value: 'months',
    label: "Month"
}, {
    value: 'years',
    label: "Years"
}
]
const CreateMilestone = (props) => {
    var form = props.form

    const [form_count, set_form_count] = useState([]);
    const [update_milestone, { loading: updateLoading }] = useMutation(UPDATE_MILESTONE)

    useEffect(() => {
        let test_data = []
        for (let i = 1; i <= props.count; i++) {
            test_data.push({ count: i, file: [], image: [], title: "", description: "", error_title: false })
        }
        set_form_count(test_data)
    }, [props])

    const remove_from = (index) => {
        let after_remove_milestone = form_count.splice(index, 1);
        set_form_count(after_remove_milestone)
    }
    const save_milestone = (field, i) => {
        console.log("save_milestone -> form")
        form.validateFields(async (err, values) => {
            if (!err) {
                let file = []
                let milestone_data = {}

                if (_.size(values[`file_${i}`])) {
                    file = values[`file_${i}`].map(inner_file => {
                        return inner_file.originFileObj
                    })
                }
                milestone_data["title"] = values[`title_${i}`]
                milestone_data["description"] = values[`description_${i}`]
                milestone_data["timeline"] = values[`timeline_${i}`]
                milestone_data["timeline_type"] = values[`timeline_type_${i}`]
                milestone_data["budget"] = values[`budget_${i}`]

                if( milestone_data["budget"]  && milestone_data["title"] &&  milestone_data["timeline_type"] && milestone_data["description"] &&  milestone_data["timeline"]){
                    let input_data = {
                        milestone_data
                    }
                    if (_.size(file)) {
                        input_data['file'] = file
                    }
    
    
                    console.log("save_milestone -> input_data", input_data)
                    return false
                    let final_data = await update_milestone({ variables: input_data })
                    if (final_data.data.update_milestone.status === "success") {
                        Alert_msg(final_data.data.update_milestone)
                        // fetch_milestone()
                    }
                }else{
                    Alert_msg({ msg: "Please fill all the field", status: "failed" })
                }
            
            } else {
                Alert_msg({ msg: "Milestone update failed", status: "failed" })
            }
        })
    }

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <>
            <Row>

                <Form name="nested-milestone" className="">
                    {(form_count || []).map((field, i) => {
                        console.log("CreateMilestone -> field", field)
                        return (
                            <>
                                <Row gutter={[16, 0]}>
                                    <Col span={24}>
                                        <div className='d-flex w-100 justify-content-between normal_font_size pb-3'>
                                            <div> Milestone {i + 1}</div>
                                            {form_count.length >= 2 && <Popconfirm title="Sure to delete milestone ?" onConfirm={() => remove_from(i)}>
                                                <div className='cursor_point d-flex justify-content-between align-items-center text-danger'><Icon className="px-3" type="delete" /> <div>Remove</div></div>
                                            </Popconfirm>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 0]}>
                                    <Col span={24}>
                                        <Form.Item label="Title" key={i}>
                                            {form.getFieldDecorator(`title_${i}`, {
                                                keys: "",
                                                initialValue: "",
                                                rules: [{ required: field['error_title'] ? true : false }]

                                            })(<Input size={"large"} className="w-100" />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 0]}>
                                    <Col span={24}>
                                        <Form.Item label="Description" key={i}>
                                            {form.getFieldDecorator(`description_${i}`, {
                                                keys: "",
                                                initialValue: "",
                                            })(<TextArea size={"large"} rows={6} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 0]}>
                                    <Col span={12}>
                                        <Form.Item label="Amount to be released" key={i}>
                                            {form.getFieldDecorator(`budget_${i}`, {
                                                keys: "",
                                                initialValue: "",
                                            })(<Input type="number" size={"large"} className="w-100" min={1}  addonAfter="KSH"/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Duration" key={i}>
                                            {form.getFieldDecorator(`timeline_${i}`, {
                                                keys: "",
                                                initialValue: "",
                                            })(
                                                <InputNumber type="number" size={"large"} className="w-100" min={1} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="time type" key={i}>
                                            {form.getFieldDecorator(`timeline_type_${i}`, {
                                                keys: "",
                                                initialValue: "",
                                            })(<Select defaultValue="days" size={"large"} className="w-100">
                                                <Option value="days">Days</Option>
                                                <Option value="months">Months</Option>
                                                <Option value="years">Years</Option>
                                            </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 0]}>
                                    <Col span={24}>
                                        <div>
                                            <Form.Item label="">
                                                {form.getFieldDecorator(`file_${i}`, {
                                                    rules: [],
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: normFile,
                                                })(
                                                    <Upload
                                                        name="logo"
                                                        multiple={true}
                                                        listType="picture-card"
                                                        action="/upload.do"
                                                    >
                                                        <div>
                                                            <Icon type="plus" />
                                                            <div className="ant-upload-text">Upload</div>
                                                        </div>
                                                    </Upload>)}
                                            </Form.Item>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 0]}>
                                    <Col span={12}>
                                        {form_count.length >= 2 && <Popconfirm title="Sure to delete milestone ?" onConfirm={() => remove_from(i)}>
                                            <Button size={"large"} block className="normal_font_size">
                                                <div className="px-2"> Cancel</div>
                                            </Button>
                                        </Popconfirm>
                                        }
                                    </Col>
                                    <Col span={12}>
                                        <Button size={"large"} block onClick={() => { save_milestone(field, i) }} className="bg-gradient-primary text-white normal_font_size">
                                            <div className="px-2"> Done</div>
                                        </Button>
                                    </Col>
                                </Row>
                            </>)
                    })}
                </Form>
            </Row>

        </>
    )
};
export default Form.create()(CreateMilestone);
