import React, { Suspense, useState, useEffect } from 'react'
import { Row, Col, Form, InputNumber, Button, Modal, Skeleton } from 'antd';
import { Alert_msg } from '../../../../Comman/alert_msg';

const CreateDynamicMilestone = React.lazy(() => import('./CreateDynamicMilestone'));

const CreateMilestone = (props) => {
    var form = props.form
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [count, set_count] = useState(1);
    
    const no_need = () => {
        
    }
    
    const create_milestone = () => {
        form.validateFields(async (err, values) => {
            if (!err) {
                set_count(values.no_of_milestone)
                setIsModalVisible(!isModalVisible)
            } else {
                Alert_msg({ msg: "Milestone from created failed", status: "failed" })
            }
        })
    }

    return (
        <>
            <div className="d-flex justify-content-around">
                <div className="w-50">
                    <div className="d-flex justify-content-center normal_font_size p-4 bold">
                        <div>Create Project Milestones</div>
                    </div>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="">
                                {form.getFieldDecorator("no_of_milestone", {
                                    initialValue: count,
                                    rules: [{ required: true }]
                                })(<InputNumber type="number" size={"large"} className="w-100" min={1} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Button size={"large"} block onClick={() => { no_need() }} className="normal_font_size">
                                <div className="px-2"> No Need</div>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button size={"large"} block onClick={() => { create_milestone() }} className="bg-gradient-primary text-white normal_font_size">
                                <div className="px-2"> Create</div>
                            </Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 32]}>
                        <Col span={24}>
                            <Button size={"large"} block onClick={() => { create_milestone() }} className="bg-gradient-primary text-white normal_font_size">
                                <div className="px-2"> Submit</div>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <Modal title="Set your Project Milestones" onCancel={()=>{ setIsModalVisible(!isModalVisible)}} visible={isModalVisible} footer={null}>
                <Suspense fallback={<Skeleton active />}>
                    <CreateDynamicMilestone count={count} />
                </Suspense>
            </Modal>
        </>
    )
};
export default Form.create()(CreateMilestone);
