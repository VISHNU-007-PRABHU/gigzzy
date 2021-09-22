import React, { Suspense } from "react";
import {Row, Col } from 'antd';

const How = React.lazy(() => import('../About/how'));
const HomeBanner = React.lazy(() => import('./HomeBanner'));
const HomePage = () => {
    return (
        <Row>
            <Col lg={{ span: 20, offset: 2 }}>
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <HomeBanner />
                </Suspense>
            </Col>
        </Row>
    )
}
export default HomePage;
