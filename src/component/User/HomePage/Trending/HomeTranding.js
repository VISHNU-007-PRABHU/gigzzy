import React, { Suspense } from "react";
import { Skeleton, Row, Col } from 'antd';

const TrendingCategory = React.lazy(() => import('./TrendingCategory'));
const AllServices = React.lazy(() => import('./AllServices'));
const TrendingHeader = React.lazy(() => import('./TrandingHeader'));
const HomeTranding = () => {
    return (
        <>
            <div className="my-0 my-md-4">
                <Row>
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
            </div>
        </>
    )
}
export default HomeTranding;
