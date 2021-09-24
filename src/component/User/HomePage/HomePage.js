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
            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <HomeTranding />
            </Suspense>
            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <OutdoorPage />
            </Suspense>
            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <How />
            </Suspense>

            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <ProfessionalPage />
            </Suspense>

            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <ReadyPage />
            </Suspense>

            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <DownloadPage />
            </Suspense>

            <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                <ChoosePage />
            </Suspense>
        </>
    )
}
export default HomePage;
