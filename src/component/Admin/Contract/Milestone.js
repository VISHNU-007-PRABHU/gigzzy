import React, { useState, Suspense, useEffect } from 'react'
import { Typography, Timeline, Tag, Modal, Form, Skeleton, Badge, Spin } from 'antd';
import useReactRouter from 'use-react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_MILESTONE_PAGINATION } from '../../../graphql/User/milestone'

const Title = Typography;
const MilestoneDetail = React.lazy(() => import('./MilestoneDetail'));


const payment_status = {
    0: "welcome Gizzy",
    50: "waiting for payment confirmation",
    9: "Pending",
    10: "Paided",
    11: "Booking canceled",
    4: "Job started",
    13: "Ongoing",
    14: "Completed"
}


function Milestone(props) {
    const { history, match } = useReactRouter();
    const [milestone_price_visible, set_milestone_price_visible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState([]);
    const [current_steps_detail, set_current_steps_detail] = useState({});
    console.log("match.params.id", match.params.id)
    const { data, loading, error } = useQuery(GET_MILESTONE_PAGINATION, { variables: { contract_id: match.params.id, location_code: "IN" } });

    useEffect(() => {
        setSteps(data.get_biding_milestone)
    }, [data])

    return (
        <>
            {(stepsdetail && stepsdetail.length > 0) && <>
                <Spin spinning={loading}>
                    <Title className="my-5" level={3}>Project Milestone</Title>
                    <Timeline>
                        {stepsdetail && stepsdetail.map((data, i) => {
                            return (
                                <Timeline.Item color={data?.booking_status === 14 ? "green" : "gray"} className="pb-4">
                                    <div className="normal_font_size bold">Milestone {i}: {data?.title}</div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="normal_font_size primary_color py-1">{data?.budget}</div>
                                            <div className="d-flex">
                                                <div className="bold">
                                                    <Badge status="success" /> {data?.created_at}
                                                </div>
                                                <div className="text-danger px-3">{payment_status[data?.booking_status]}</div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <Tag onClick={() => { set_current_steps_detail(data); set_milestone_price_visible(!milestone_price_visible) }} color="green" className="cursor_point normal_font_size p-2">
                                                View Detail
                                            </Tag>
                                        </div>
                                    </div>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                </Spin>
            </>
            }

            <Modal
                visible={milestone_price_visible}
                footer={null}
                onCancel={() => { set_milestone_price_visible(!milestone_price_visible) }}
            >
                <Suspense fallback={<Skeleton active />}>
                    <MilestoneDetail data={current_steps_detail} />
                </Suspense>
            </Modal>
        </>

    )
}

export default Form.create()(Milestone);
