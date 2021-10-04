import React, { useState, Suspense } from 'react'
import { Icon, Timeline, Tag, message, Steps, Form, Skeleton, Badge } from 'antd';
import step0 from '../../../image/step0.png';
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
const { Step } = Steps;
const original_steps = [
    {
        id: 1,
        title: 'First',
        content: 'Project Details',
        status: "wait"
    },
    {
        id: 2,
        title: 'Second',
        content: 'Project Location',
        status: "wait"
    },
    {
        id: 3,
        title: 'Last',
        content: 'Budget',
        status: "wait"
    },
    {
        id: 4,
        title: 'final',
        content: 'Document',
        status: "wait"
    },
];

const layout = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 16 },
    offset: 8, span: 16
};

function Milestone(props) {
    const { form } = props;
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);

    const next = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "finish";
        setSteps(newItems)
        setCurrent(current + 1);
    }

    const prev = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "wait";
        setSteps(newItems)
        setCurrent(current - 1);
    }
    const done = () => {
        const newItems = [...stepsdetail];
        newItems[size(newItems) - 1]['status'] = "finish";
        setSteps(newItems)
        message.success('Processing complete!')
    }

    return (
        <>
            <Timeline>
                <Timeline.Item color="green" className="pb-4">
                    <div className="normal_font_size bold">Started</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="d-none normal_font_size primary_color py-1">KSH 5000</div>
                            <div className="d-flex">
                                <div className="bold">  <Badge className="d-none" status="success" /> 24 Aug 2021</div>
                                <div className="d-none text-danger px-3">completed</div>
                            </div>
                        </div>
                        <div className="d-none">
                            <Tag color="green" className="normal_font_size p-2">View Detail</Tag>
                        </div>
                    </div>
                </Timeline.Item>
                <Timeline.Item color="green">
                    <div className="normal_font_size bold">Milestone 1 : Gardening</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="normal_font_size primary_color py-1">KSH 5000</div>
                            <div className="d-flex">
                                <div className="bold">  <Badge status="success" /> 24 Aug 2021</div>
                                <div className="text-danger px-3">completed</div>
                            </div>
                        </div>
                        <div>
                            <Tag color="green" className="normal_font_size p-2">View Detail</Tag>
                        </div>
                    </div>
                </Timeline.Item>
                <Timeline.Item color="gray">
                    <div className="normal_font_size bold">Milestone 1 : Gardening</div>
                </Timeline.Item>
            </Timeline>
        </>

    )
}

export default Form.create()(Milestone);
