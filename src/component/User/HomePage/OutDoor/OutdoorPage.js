import React, { Suspense } from "react";
import { Skeleton, Row, Col } from 'antd';
const header_data = {
    title1: "Out",
    title2: "Door Services",
    title3: "Choose and book 100+ services and track then on Gigzzy App",
    title4: "we will send you a link, open it on your phone to download the app",
}
const TrendingHeader = React.lazy(() => import('../Trending/TrandingHeader'));
const OutdoorCategory = React.lazy(() => import('./OutdoorCategory'));

const OutdoorPage = () => {
    return (
        <>
            <Row gutter={[32,32]}>
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader header_data={header_data} />
                    </Suspense>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <OutdoorCategory />
                    </Suspense>
                </Col>
            </Row>
        </>
    )
}
export default OutdoorPage;
