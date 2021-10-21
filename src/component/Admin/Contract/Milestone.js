import React, { useState, Suspense,useEffect } from 'react'
import { Typography,Timeline, Tag, Modal, Form, Skeleton, Badge } from 'antd';
import useReactRouter from 'use-react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {GET_MILESTONE_PAGINATION} from '../../../graphql/User/milestone'
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
const Title =Typography;
const MilestoneDetail = React.lazy(() => import('./MilestoneDetail'));

function Milestone(props) {
    const { history,match } = useReactRouter();
    const [milestone_price_visible, set_milestone_price_visible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);
    const [current_steps_detail, set_current_steps_detail] = useState({});
    console.log("match.params.id", match.params.id)
    const {data,loading,error} = useQuery(GET_MILESTONE_PAGINATION,{variables:{contract_id: match.params.id,location_code:"IN" }});

    useEffect(() => {
        console.log("data", data)
    }, [data])

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
