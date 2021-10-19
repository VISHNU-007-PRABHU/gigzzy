import React, { useState, Suspense } from 'react'
import { Icon, Timeline, Tag, Modal, Typography, Form, Skeleton, Badge } from 'antd';
import step0 from '../../../image/step0.png';
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
const { Title } = Typography;
const original_steps = [
    {
        id: 1,
        title: 'First',
        title: 'Project Details',
        status: "Started",
        booking_status: "completed",
        date: "24 Aug 2021",
        budget: "KSH 5000",
        view: true
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

const MilestoneDetail = React.lazy(() => import('./MilestoneDetail'));

function Milestone(props) {
    const [milestone_price_visible, set_milestone_price_visible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);
    const [current_steps_detail, set_current_steps_detail] = useState({});

    return (
        <>
            <Title className="my-5" level={3}>Project Milestone</Title>

            <Timeline>
                {stepsdetail && stepsdetail.map((data, i) => {
                    return (
                        <Timeline.Item color="green" className="pb-4">
                            <div className="normal_font_size bold">Milestone {i}: {data?.title}</div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="normal_font_size primary_color py-1">{data?.budget}</div>
                                    <div className="d-flex">
                                        <div className="bold">
                                            {data?.date && <> <Badge status="success" /> {data?.date} </>}
                                        </div>
                                        <div className="text-danger px-3">{data?.booking_status}</div>
                                    </div>
                                </div>
                                <div className="">
                                    {data?.view &&
                                        <Tag onClick={() => {set_current_steps_detail(data); set_milestone_price_visible(!milestone_price_visible) }} color="green" className="cursor_point normal_font_size p-2">View Detail</Tag>
                                    }
                                </div>
                            </div>
                        </Timeline.Item>
                    )
                })}
            </Timeline>


            <Modal
                visible={milestone_price_visible}
                footer={null}
                onCancel={() => { set_milestone_price_visible(!milestone_price_visible) }}
            >
                <Suspense fallback={<Skeleton active />}>
                    <MilestoneDetail data={current_steps_detail}/>
                </Suspense>
            </Modal>
        </>

    )
}

export default Form.create()(Milestone);
