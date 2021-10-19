import React, { useState, Suspense } from 'react'
import {Layout,Skeleton,Row,Col } from 'antd';
const { Content } = Layout;
const UserHeader = React.lazy(() => import('../../Layout/UserHeader'));
const ContractSteper = React.lazy(() => import('./ContractSteper'));

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];
function ContractBooking(props) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(1);
    return (
        <>
            <Row>
                <Col lg={{ span: 18, offset: 3 }} className="pt-5">
                    <Suspense fallback={<Skeleton active />}>
                        <ContractSteper></ContractSteper>
                    </Suspense>
                </Col>
            </Row>
        </>

    )
}

export default ContractBooking;
