import React, { Suspense } from "react";
import { Skeleton, Row, Col } from 'antd';

const BannerSearch = React.lazy(() => import('./BannerSearch'));
const BannerIamges = React.lazy(() => import('./BannerImages'));

const HomeBanner = () => {
    return (
        <Row className="my-4">
            <Col className="mt-3 mb-5">
                <Row className="align-items-center flex-column flex-md-row">
                    <Col sm={24} md={10} className="p-4">
                        <Suspense fallback={<Skeleton active />}>
                            <BannerSearch />
                        </Suspense>
                    </Col>
                    <Col sm={24} md={14}>
                        <Suspense fallback={<Skeleton active />}>
                            <BannerIamges />
                        </Suspense>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default HomeBanner;
