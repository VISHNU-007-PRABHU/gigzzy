import React, { useState, Suspense } from 'react'
import { Icon, Tag, message, Steps, Form, Skeleton, Badge } from 'antd';
import step0 from '../../../image/step0.png';
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
const { Step } = Steps;

function MilestoneDetail(props) {
    const { form } = props;
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);
    return (
        <>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">{content_data['data1']}</div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <img alt='' src={require("../../../image/handyman.jpg")} loading="lazy" className="w-100 br_14 h_18_em lazyload" />
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4}>{this.state.data.name}</Title>
                    <Title level={4} className="font-weight-light m-0 mb-1">{this.state.data.company_name}</Title>
                    <Title level={4} className="font-weight-light m-0 text-success">{"gradening"}</Title>
                </Col>
            </Row>

        </>

    )
}

export default Form.create()(MilestoneDetail);
