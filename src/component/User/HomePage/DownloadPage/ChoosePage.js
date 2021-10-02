import React, { Suspense, useState } from 'react'
import { Row, Col, Skeleton, Card } from 'antd';
import img1 from '../../../../image/home/hi1.png';
import img2 from '../../../../image/home/hi2.png';
import img3 from '../../../../image/home/hi3.png';
const TrendingHeader = React.lazy(() => import('../Trending/TrandingHeader'));

const header_data = {
    title1: "Why",
    title2: "choose us",
    title3: "Choose and book 100+ services and track then on Gigzzy App",
    title4: "we will send you a link, open it on your phone to download the app",
}

let data = [
    {
        title: "High Quality & Trusted Professionals",
        link: img1,
        data: "We Provide only verified, background checked and high quality Professionals"
    },
    {
        title: "Matched to Your Needs",
        link: img2,
        data: "We match you with the right professional within your budget."
    }, {
        title: "Hustle Free Services",
        link: img3,
        data: "Super convenient, guaranteed service from booking to delivery"
    }
]
const ChoosePage = () => {
    return (
        <div className="my-4 ">
            <Row className="align-items-center d-flex flex-cloumn flex-md-row">
                <Col lg={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader header_data={header_data} />
                    </Suspense>
                </Col>
            </Row>
            <Row>
                {data.map(inner_data => (
                    <>
                        <Col sm={24} md={8} className="px-1 ">
                            <div className="text-center">
                                <Card className="green_border">
                                    <div className="d-flex justify-content-center">
                                        <div className="choose_page_img">
                                            <img alt='' loading="lazy" className="img-fluid lazyload" src={inner_data.link} />
                                        </div>
                                    </div>
                                    <div className="normal_font_size my-3 bold">{inner_data.title}</div>
                                    <div>{inner_data.data}</div>
                                </Card>
                            </div>
                        </Col>
                    </>
                ))}
            </Row>
        </div>
    )
}
export default ChoosePage;
