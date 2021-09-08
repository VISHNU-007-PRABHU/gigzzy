import React from 'react'
import { Row, Col } from 'antd';

const HomeAdons = () => {
    return (
        <div>
            <Row>
                <div className="feature_section pt-5 container mb-5">
                    <Row>
                        <Col sm={{ span: 8 }} className="px-1">
                            <div className="image_head"><img alt='' loading="lazy" className="lazyload" src={require("../../../image/quality.png")} /></div>
                            <p className="normal_font_size my-3 bold">High Quality & Trusted Professionals</p>
                            <label>We Provide only verified, background checked and high quality Professionals</label>
                        </Col>
                        <Col sm={{ span: 8 }} className="px-1">
                            <div className="image_head"><img alt='' loading="lazy" className="lazyload" src={require("../../../image/budget-management.png")} /></div>
                            <p className="normal_font_size my-3 bold">Matched to Your Needs</p>
                            <label>We match you with the right professional within your budget.</label>
                        </Col>
                        <Col sm={{ span: 8 }} className="px-1">
                            <div className="image_head"><img alt='' loading="lazy" className="lazyload" src={require("../../../image/like.png")} /></div>
                            <p className="normal_font_size my-3 bold">Hustle Free Services</p>
                            <label>Super convenient, guaranteed service from booking to delivery</label>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    )
}
export default HomeAdons;
