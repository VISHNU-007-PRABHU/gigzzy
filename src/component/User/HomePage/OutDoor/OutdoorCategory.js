import React from "react";
import { Col, Row, Card } from 'antd';
import links from "../../../../image/for_design_only/carpet_cleaning.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let category_data = [
    {}, {}, {}, {}, {}, {}, {}, {}
]

const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    lazyLoad: true,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
};

const OutdoorCategory = () => {
    return (
        <Row gutter={[24, 24]} className="owl-stage-outer">
            <div className="featured_category container">
                <Slider className="owl-theme cursor_point slider_sm_padding" {...settings}>
                    {category_data.map((data, i) =>
                        <Col span={8}>
                            <Card
                                hoverable
                                bodyStyle={{ padding: '0' }}
                                border={false}
                            >
                                <img alt='' src={links} className="table_shadow img-fluid lazyload" loading="lazy" />
                            </Card>
                            <div className="text-center py-4 h3 bold primary_blue_color">{"Cleaning"}</div>
                        </Col>
                    )}
                </Slider>
            </div>
        </Row>
    )
}
export default OutdoorCategory;
