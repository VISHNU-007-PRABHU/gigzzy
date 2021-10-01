import React, { Suspense, useState } from 'react'
import { Row, Col, Skeleton, Card } from 'antd';
import img1 from '../../../../image/home/ht1.png';
import img2 from '../../../../image/home/ht2.png';
const TrendingHeader = React.lazy(() => import('../Trending/TrandingHeader'));

const style = {
    padding: "0px",
    position: "absolute",
    top: "50px",
    color: "white",
    width: "100%",
}
const header_data = {
    title1: "Ready",
    title2: "To Gigzzy it?",
    title3: "Choose and book 100+ services and track then on Gigzzy App",
    title4: "we will send you a link, open it on your phone to download the app",
}

let data = [
    {
        title: "On Demand Gig",
        link: img1,
        data: "We Provide only verified, background checked and high quality Professionals"
    },
    {
        title: "Project",
        link: img2,
        data: "We match you with the right professional within your budget."
    }
]
const ReadyPage = () => {
    return (
        <div className="my-4">
            <Row className="align-items-center">
                <Col lg={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader header_data={header_data} />
                    </Suspense>
                </Col>
            </Row>
            <Row className="">
                {data.map(inner_data => (
                    <>
                        <Col sm={24} md={12}>
                            <div className="my-2 p-md-2 text-center">
                                <img alt='' loading="lazy" className="img-fluid lazyload" src={inner_data.link} />
                                <div style={style}>
                                    <div className="normal_font_size my-3 bold">{inner_data.title}</div>
                                    <div>{inner_data.data}</div>
                                </div>
                            </div>
                        </Col>
                    </>
                ))}
            </Row>
        </div>
    )
}
export default ReadyPage;
