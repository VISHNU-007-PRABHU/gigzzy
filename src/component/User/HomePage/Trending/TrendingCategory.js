import React from "react";
import { Button, Row, Col } from 'antd';
import links from "../../../../image/for_design_only/carpet_cleaning.png"

let category_data =[
    {},{},{},{},{},{},{},{}
]
const TrendingCategory = () => {
    return (
        <Row gutter={[24, 24]} className="owl-stage-outer">
            {category_data.map(data => {
                return (
                    <Col  sm={12} md={6}>
                        <div>
                            <img alt='gigzzy home banner' src={links} loading="lazy" class="br_10 lazyload img-fluid" />
                            <div className="px-3 mt-n4">
                                <Button className="py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_blue_color table_shadow"  size={"large"} block>Cleaning</Button>
                            </div>
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}
export default TrendingCategory;
