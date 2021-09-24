import React, { Suspense } from "react";
import { Row, Col } from 'antd';

const How = React.lazy(() => import('./How/How'));
const DownloadPage = React.lazy(() => import('./DownloadPage/DownloadPage'));
const ChoosePage = React.lazy(() => import('./DownloadPage/ChoosePage'));
const ReadyPage = React.lazy(() => import('./DownloadPage/ReadyPage'));
const HomeBanner = React.lazy(() => import('./Banner/HomeBanner'));
const HomeTranding = React.lazy(() => import('./Trending/HomeTranding'));
const ProfessionalPage = React.lazy(() => import('./Professional/ProfessionalPage'));
const OutdoorPage = React.lazy(() => import('./OutDoor/OutdoorPage'));

const HomePage = () => {
    return (
        <>

            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <HomeBanner />
            </Suspense>
            <Row gutter={[32, 48]} className="my-5">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <HomeTranding />
                    </Suspense>

                </Col>
            </Row>
            <Row gutter={[32, 48]} className="my-5">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <OutdoorPage />
                    </Suspense>

                </Col>
            </Row>
            <Row gutter={[32, 48]} className="bg_light_pink my-5">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <How />
                    </Suspense>
                </Col>
            </Row>
            <Row gutter={[32, 48]} className="">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <ProfessionalPage />
                    </Suspense>
                </Col>
            </Row>
            <Row gutter={[32, 48]} className="bg_light_pink my-5">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <ReadyPage />
                    </Suspense>
                </Col>
            </Row>
            <Row gutter={[32, 48]} className="">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <DownloadPage />
                    </Suspense>
                </Col>
            </Row>
            <Row gutter={[32, 48]} className="bg-light">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                        <ChoosePage />
                    </Suspense>
                </Col>
            </Row>
        </>
    )
}
export default HomePage;
