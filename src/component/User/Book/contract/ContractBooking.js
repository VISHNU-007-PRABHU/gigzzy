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
            <Layout className="white">
                <Suspense fallback={<Skeleton active />}>
                    <UserHeader />
                </Suspense>

                <Content className="px-1 container user_select">
                    <Row>
                        <Col lg={{ span: 20, offset: 2 }}>
                            <Suspense fallback={<Skeleton active />}>
                                <ContractSteper></ContractSteper>
                            </Suspense>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>

    )
}

export default ContractBooking;
