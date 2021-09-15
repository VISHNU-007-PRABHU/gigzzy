import React from 'react'
import { Link } from "react-router-dom";
import { Icon, Row, Col } from 'antd';

const content = {
    title: "How it works",
    btn_text: "Learn more"
}
const subcontent = [{
    icon: "message",
    title: "1.Tell us what your home needs",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}, {
    icon: "thunderbolt",
    title: "2.Tell us what your home needs",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}, {
    icon: "heart",
    title: "3.Tell us what your home needs",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}, {
    icon: "bulb",
    title: "4.Tell us what your home needs",
    data: "From routine maintenance and repairs to dream  home renovations , we can help with any project - big or small"
}]
function How() {
    return (
        <div className="my-5">
            <Row gutter={[24, 24]} >
                <Col>
                    <h2 className="bold mb-5 text-center">{content.title}</h2>
                </Col>
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {subcontent.map(itemdata => <>
                    <Col className="gutter-row" span={6}>
                        <div className="d-flex flex-column align-items-start">
                            <h3 className="bold"><Icon type={itemdata.icon} /> </h3>
                            <h3 className="">{itemdata.title}</h3>
                            <div className="">{itemdata.data}</div>
                        </div>
                    </Col>
                </>)}
            </Row>
            <Row gutter={[24, 24]} >
                <Col>
                    <div className="d-flex justify-content-around">
                        <Link to="/static_page/faq" target="_blank" className="normal_font_size">
                            {content.btn_text}
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default How