import React, { Suspense } from "react";
import { Skeleton, Row, Col } from 'antd';

const TrendingCategory = React.lazy(() => import('./TrendingCategory'));
const AllServices = React.lazy(() => import('./AllServices'));
const TrendingHeader = React.lazy(() => import('./TrandingHeader'));
const HomeTranding = () => {
    return (
        <>
            <Row gutter={[32,32]}>
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader />
                    </Suspense>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingCategory />
                    </Suspense>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <AllServices />
                    </Suspense>
                </Col>
            </Row>
        </>
    )
}
export default HomeTranding;
