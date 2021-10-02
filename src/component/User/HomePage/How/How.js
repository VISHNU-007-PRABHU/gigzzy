import React, { Suspense } from 'react'
import { Row, Col, Skeleton,Card } from 'antd';
import link from '../../../../image/home/conversation.png'
const TrendingHeader = React.lazy(() => import('../Trending/TrandingHeader'));

const header_data = {
    title1: "How",
    title2: "it works",
    title3: "Service provider Sign-up for free, no more lead chatgesfor jobs that you don't get",
    title4: "Get instant access to reliable and affordable Gigzzy service providers."
}
const subcontent = [{
    icon: "message",
    title: "1.Signup and complete registration",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big "
}, {
    icon: "thunderbolt",
    title: "2.Post a job or project",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}, {
    icon: "heart",
    title: "3.Accept quotes from service provider(s)",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}, {
    icon: "bulb",
    title: "4.Payment is processed after job completion",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}]
function How() {
    return (
        <div className="my-5">
            <Row className="bg_light_pink">
                <Col md={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader header_data={header_data} />
                    </Suspense>
                </Col>
            </Row>
            <Row  className="bg_light_pink">
                {subcontent.map(itemdata => <>
                    <Col className="gutter-row p-3" sm={24} md={6}>
                        <Card hoverable bordered={false}>
                            <div className="align-items-start d-flex flex-column mt-4">
                                <div className="how_icon_img">
                                    <img alt='gigzzy home banner' src={link} loading="lazy" class="p-2 lazyload img-fluid" />
                                </div>
                                <div className="bold py-3 primary_blue_color w-100">{itemdata.title}</div>
                                <div className="">{itemdata.data}</div>
                                <div className="primary_color">Learn more...</div>
                            </div>
                        </Card>
                    </Col>
                </>)}
            </Row>
        </div>
    )
}

export default How
